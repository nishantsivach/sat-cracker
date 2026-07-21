"use client";

import { useState, useEffect } from "react";
import { X, Plus, Search, Link2, ArrowRightLeft, Loader2 } from "lucide-react";

type GuideOption = { id: string; name: string };
type RelatedRow = { id: string; guide: GuideOption };

export default function RelatedGuidesManager({
  guideId,
  initialRelated,
}: {
  guideId: string;
  initialRelated: RelatedRow[];
}) {
  const [related, setRelated] = useState<RelatedRow[]>(initialRelated);
  const [allGuides, setAllGuides] = useState<GuideOption[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/topic-guides")
      .then((res) => (res.ok ? res.json() : { guides: [] }))
      .then((data) =>
        setAllGuides((data.guides ?? []).filter((g: GuideOption) => g.id !== guideId))
      )
      .catch(() => setError("Couldn't load other guides."))
      .finally(() => setLoading(false));
  }, [guideId]);

  const relatedIds = new Set(related.map((r) => r.guide.id));
  const available = allGuides.filter(
    (g) => !relatedIds.has(g.id) && g.name.toLowerCase().includes(search.toLowerCase())
  );

  const addRelation = async (guide: GuideOption) => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/topic-guide-relations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic_guide_id: guideId, related_topic_guide_id: guide.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Couldn't link that guide");
      setRelated((prev) => [...prev, { id: data.id, guide }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  const removeRelation = async (rowId: string) => {
    setRelated((prev) => prev.filter((r) => r.id !== rowId));
    await fetch(`/api/admin/topic-guide-relations/${rowId}`, { method: "DELETE" }).catch(() => {});
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Linked guides */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-site-text flex items-center gap-2">
            <Link2 className="w-4 h-4 text-site-secondary" />
            Linked
            <span className="text-xs font-normal text-site-muted">
              ({related.length})
            </span>
          </h3>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 mb-3">
            {error}
          </div>
        )}

        {related.length === 0 ? (
          <div className="border-2 border-dashed border-site-border rounded-xl px-4 py-10 text-center">
            <div className="w-10 h-10 mx-auto rounded-xl bg-site-highlight flex items-center justify-center mb-3">
              <ArrowRightLeft className="w-5 h-5 text-site-muted" />
            </div>
            <p className="text-sm text-site-muted">No related guides yet</p>
            <p className="text-xs text-site-muted mt-1">
              Link guides from the bank on the right.
            </p>
          </div>
        ) : (
          <div className="space-y-1.5 max-h-[400px] overflow-y-auto pr-1">
            {related.map((row, index) => (
              <div
                key={row.id}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white border border-site-border hover:border-site-accent/20 transition-colors text-sm group"
              >
                <span className="text-xs font-mono font-bold text-site-muted shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 truncate text-site-text">{row.guide.name}</span>
                <button
                  onClick={() => removeRelation(row.id)}
                  className="p-1.5 rounded-lg text-site-muted hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer shrink-0 opacity-0 group-hover:opacity-100"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Available guides */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-site-text flex items-center gap-2">
            <Search className="w-4 h-4 text-site-accent" />
            Available
            <span className="text-xs font-normal text-site-muted">
              ({available.length})
            </span>
          </h3>
        </div>

        <div className="relative mb-3">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-site-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search guides..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-site-border bg-white text-site-text placeholder:text-site-muted/60 focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all text-sm"
          />
        </div>

        <div className="space-y-1.5 max-h-[350px] overflow-y-auto pr-1">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-5 h-5 animate-spin text-site-muted" />
            </div>
          )}
          {!loading && available.length === 0 && (
            <div className="border border-site-border rounded-xl px-4 py-8 text-center">
              <p className="text-sm text-site-muted">
                {search ? "No matching guides." : "All guides are already linked."}
              </p>
            </div>
          )}
          {available.map((g) => (
            <div
              key={g.id}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-site-border hover:border-site-accent/20 transition-colors text-sm"
            >
              <span className="flex-1 truncate text-site-text">{g.name}</span>
              <button
                onClick={() => addRelation(g)}
                disabled={busy}
                className="p-1.5 rounded-lg text-site-accent hover:bg-site-accent/10 hover:text-amber-600 disabled:opacity-40 transition-colors cursor-pointer shrink-0"
                title="Link this guide"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}