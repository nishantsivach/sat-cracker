"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Search, ChevronDown, ChevronRight, Pencil, X, Clock, Save, Loader2 } from "lucide-react";
import Pagination from "@/components/common/Pagination";

type Subscription = {
  user_id: string;
  full_name: string | null;
  email: string | null;
  plan: string;
  status: string;
  provider: string;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  updated_at: string;
};

type SubEvent = {
  id: string;
  event_type: string;
  provider: string;
  raw_payload: Record<string, unknown> & { manual_override?: boolean };
  created_at: string;
};

const PLAN_LABEL: Record<string, string> = {
  free: "Free",
  premium_monthly: "Premium Monthly",
  premium_yearly: "Premium Yearly",
};

const STATUS_STYLES: Record<string, string> = {
  active: "bg-green-50 text-green-700 border-green-200",
  past_due: "bg-amber-50 text-amber-700 border-amber-200",
  canceled: "bg-site-highlight text-site-muted border-site-border",
  expired: "bg-red-50 text-red-600 border-red-200",
};

export default function SubscriptionsList({
  subscriptions,
  totalCount,
  currentPage,
  pageSize,
  search: initialSearch,
  status: initialStatus,
  plan: initialPlan,
  currentUserId,
}: {
  subscriptions: Subscription[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  search: string;
  status: string;
  plan: string;
  currentUserId?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState(initialSearch);
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);

  useEffect(() => {
    if (search === initialSearch) return;
    const timeout = setTimeout(() => navigate({ search }), 400);
    return () => clearTimeout(timeout);
  }, [search]);

  const navigate = (overrides: Partial<{ search: string; status: string; plan: string }>) => {
    const params = new URLSearchParams();
    const next = { search, status: initialStatus, plan: initialPlan, ...overrides };
    if (next.search) params.set("search", next.search);
    if (next.status !== "all") params.set("status", next.status);
    if (next.plan !== "all") params.set("plan", next.plan);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-site-text">Subscriptions</h1>
        <p className="text-sm text-site-muted mt-0.5">
          {totalCount} subscriber{totalCount !== 1 ? "s" : ""} total
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="relative max-w-xs flex-1 min-w-[180px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-site-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-site-border bg-white text-site-text placeholder:text-site-muted/60 focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all text-sm"
          />
        </div>
        <select
          value={initialStatus}
          onChange={(e) => navigate({ status: e.target.value })}
          className="px-4 py-2.5 rounded-xl border border-site-border bg-white text-site-text text-sm focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all cursor-pointer"
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="past_due">Past due</option>
          <option value="canceled">Canceled</option>
          <option value="expired">Expired</option>
        </select>
        <select
          value={initialPlan}
          onChange={(e) => navigate({ plan: e.target.value })}
          className="px-4 py-2.5 rounded-xl border border-site-border bg-white text-site-text text-sm focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all cursor-pointer"
        >
          <option value="all">All plans</option>
          <option value="free">Free</option>
          <option value="premium_monthly">Premium Monthly</option>
          <option value="premium_yearly">Premium Yearly</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-site-border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-site-border bg-site-highlight">
              <th className="w-10" />
              <th className="text-left px-5 py-3.5 text-xs font-bold text-site-muted uppercase tracking-wider">User</th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-site-muted uppercase tracking-wider">Plan</th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-site-muted uppercase tracking-wider">Status</th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-site-muted uppercase tracking-wider hidden md:table-cell">Renews / Ends</th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-site-muted uppercase tracking-wider hidden sm:table-cell">Provider</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-site-border">
            {subscriptions.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center text-site-muted text-sm">
                  No subscriptions match your filters.
                </td>
              </tr>
            )}
            {subscriptions.map((sub) => (
              <SubscriptionRow
                key={sub.user_id}
                sub={sub}
                expanded={expandedUserId === sub.user_id}
                onToggle={() => setExpandedUserId(expandedUserId === sub.user_id ? null : sub.user_id)}
                isCurrentUser={sub.user_id === currentUserId}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/admin/subscriptions"
          searchParams={{
            search: search || undefined,
            status: initialStatus !== "all" ? initialStatus : undefined,
            plan: initialPlan !== "all" ? initialPlan : undefined,
          }}
        />
      </div>
    </div>
  );
}

function SubscriptionRow({
  sub,
  expanded,
  onToggle,
  isCurrentUser,
}: {
  sub: Subscription;
  expanded: boolean;
  onToggle: () => void;
  isCurrentUser?: boolean;
}) {
  return (
    <>
      <tr onClick={onToggle} className="hover:bg-site-highlight/40 transition-colors cursor-pointer">
        <td className="pl-5 py-3.5">
          {expanded ? (
            <ChevronDown className="w-4 h-4 text-site-muted" />
          ) : (
            <ChevronRight className="w-4 h-4 text-site-muted" />
          )}
        </td>
        <td className="px-5 py-3.5">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-site-text">{sub.full_name ?? "—"}</p>
            {isCurrentUser && (
              <span className="inline-flex items-center gap-1 rounded-full bg-site-accent/10 border border-site-accent/20 px-2 py-0.5 text-[10px] font-bold text-site-accent">
                You
              </span>
            )}
          </div>
          <p className="text-xs text-site-muted mt-0.5">{sub.email ?? "—"}</p>
        </td>
        <td className="px-5 py-3.5">
          <span className="text-sm text-site-text">{PLAN_LABEL[sub.plan] ?? sub.plan}</span>
        </td>
        <td className="px-5 py-3.5">
          <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border ${STATUS_STYLES[sub.status] ?? ""}`}>
            {sub.status}
            {sub.cancel_at_period_end && sub.status === "active" && (
              <span className="text-amber-600">· pending cancel</span>
            )}
          </span>
        </td>
        <td className="px-5 py-3.5 text-site-muted text-xs hidden md:table-cell">
          {sub.current_period_end
            ? new Date(sub.current_period_end).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "—"}
        </td>
        <td className="px-5 py-3.5 text-site-muted text-xs hidden sm:table-cell capitalize">
          {sub.provider}
        </td>
      </tr>
      {expanded && (
        <tr>
          <td colSpan={6} className="bg-site-highlight/30 px-8 py-5">
            <SubscriptionDetail sub={sub} />
          </td>
        </tr>
      )}
    </>
  );
}

function SubscriptionDetail({ sub }: { sub: Subscription }) {
  const [events, setEvents] = useState<SubEvent[] | null>(null);
  const [editing, setEditing] = useState(false);
  const [plan, setPlan] = useState(sub.plan);
  const [status, setStatus] = useState(sub.status);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const editRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`/api/admin/subscriptions/${sub.user_id}/events`)
      .then((res) => (res.ok ? res.json() : { events: [] }))
      .then((data) => setEvents(data.events ?? []))
      .catch(() => setEvents([]));
  }, [sub.user_id]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (editRef.current && !editRef.current.contains(e.target as Node)) {
        setEditing(false);
      }
    };
    if (editing) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [editing]);

  const saveOverride = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/subscriptions/${sub.user_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, status, current_period_end: null }),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Save failed");
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSaving(false);
    }
  };

  return (
    <div className="grid sm:grid-cols-2 gap-8">
      <div ref={editRef}>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold uppercase tracking-wider text-site-muted">Manual override</p>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-1 text-xs font-semibold text-site-secondary hover:text-site-primary transition-colors cursor-pointer"
            >
              <Pencil className="w-3 h-3" />
              Edit
            </button>
          )}
        </div>

        {editing ? (
          <div className="bg-white rounded-xl border border-site-border p-4 space-y-3">
            <div>
              <label className="block text-[10px] font-bold text-site-muted uppercase tracking-wider mb-1">Plan</label>
              <select
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-site-border bg-site-background text-sm focus:outline-none focus:border-site-accent/40 cursor-pointer"
              >
                <option value="free">Free</option>
                <option value="premium_monthly">Premium Monthly</option>
                <option value="premium_yearly">Premium Yearly</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-site-muted uppercase tracking-wider mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-site-border bg-site-background text-sm focus:outline-none focus:border-site-accent/40 cursor-pointer"
              >
                <option value="active">Active</option>
                <option value="past_due">Past due</option>
                <option value="canceled">Canceled</option>
                <option value="expired">Expired</option>
              </select>
            </div>

            {error && (
              <div className="p-2 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600">{error}</div>
            )}

            <div className="flex gap-2">
              <button
                onClick={saveOverride}
                disabled={saving}
                className="flex-1 inline-flex items-center justify-center gap-1.5 bg-site-primary text-white text-sm font-semibold px-3 py-2 rounded-lg hover:bg-site-primary/95 disabled:opacity-50 cursor-pointer"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    Save
                  </>
                )}
              </button>
              <button
                onClick={() => setEditing(false)}
                className="flex items-center justify-center px-3 py-2 rounded-lg border border-site-border text-site-muted hover:bg-site-highlight cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-site-muted leading-relaxed">
              Grants comp access or manually corrects a subscription. This bypasses billing — no charge or refund. A provider webhook can overwrite this.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-site-border p-4">
            <p className="text-sm text-site-muted">
              Grant comp access or correct a subscription manually. Bypasses billing.
            </p>
          </div>
        )}
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-site-muted mb-3">Event history</p>
        {events === null ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-5 h-5 animate-spin text-site-muted" />
          </div>
        ) : events.length === 0 ? (
          <div className="bg-white rounded-xl border border-site-border p-4">
            <p className="text-sm text-site-muted">No events recorded yet.</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {events.map((e) => (
              <div
                key={e.id}
                className="flex items-start gap-2.5 text-xs bg-white rounded-xl border border-site-border px-3 py-2.5"
              >
                <Clock className="w-3.5 h-3.5 text-site-muted mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="font-semibold text-site-text capitalize truncate">
                    {e.event_type.replace(/_/g, " ")}
                    {e.raw_payload?.manual_override && (
                      <span className="text-site-accent font-normal ml-1">(admin)</span>
                    )}
                  </p>
                  <p className="text-site-muted mt-0.5">
                    {new Date(e.created_at).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}