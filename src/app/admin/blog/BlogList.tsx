"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search, ExternalLink, FileText, AlertTriangle } from "lucide-react";
import Pagination from "@/components/common/Pagination";


type Post = {
  id: string;
  title: string;
  slug: string;
  is_published: boolean;
  created_at: string;
};

export default function BlogList({
  posts,
  totalCount,
  currentPage,
  pageSize,
  search: initialSearch,
}: {
  posts: Post[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  search: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState(initialSearch);
  const [localPosts, setLocalPosts] = useState(posts);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => setLocalPosts(posts), [posts]);

  useEffect(() => {
    if (search === initialSearch) return;
    const timeout = setTimeout(() => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      params.set("page", "1");
      router.push(`${pathname}?${params.toString()}`);
    }, 400);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const togglePublish = async (post: Post) => {
    setBusyId(post.id);
    const nextValue = !post.is_published;
    setLocalPosts((prev) => prev.map((p) => (p.id === post.id ? { ...p, is_published: nextValue } : p)));
    try {
      const res = await fetch(`/api/admin/blog/${post.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...post, is_published: nextValue }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setLocalPosts((prev) => prev.map((p) => (p.id === post.id ? { ...p, is_published: post.is_published } : p)));
    } finally {
      setBusyId(null);
    }
  };

  const deletePost = async (id: string) => {
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setLocalPosts((prev) => prev.filter((p) => p.id !== id));
      router.refresh(); // keeps totalCount / page bounds accurate after a delete
    } finally {
      setBusyId(null);
      setDeleteTarget(null);
    }
  };

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-site-text">Blog</h1>
          <p className="text-sm text-site-muted mt-0.5">
            {totalCount} post{totalCount !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 bg-site-primary text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-site-primary/95 transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          New post
        </Link>
      </div>

      <div className="relative mb-5 max-w-sm">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-site-muted" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-site-border bg-white text-site-text placeholder:text-site-muted/60 focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all text-sm"
        />
      </div>

      <div className="bg-white border border-site-border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-site-border bg-site-highlight">
              <th className="text-left px-5 py-3.5 text-xs font-bold text-site-muted uppercase tracking-wider">Title</th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-site-muted uppercase tracking-wider hidden sm:table-cell">
                Slug
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-site-muted uppercase tracking-wider hidden md:table-cell">
                Created
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-site-muted uppercase tracking-wider">Status</th>
              <th className="text-right px-5 py-3.5 text-xs font-bold text-site-muted uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-site-border">
            {localPosts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-site-highlight flex items-center justify-center">
                      <FileText className="w-6 h-6 text-site-muted" />
                    </div>
                    <p className="text-site-muted text-sm">
                      {totalCount === 0 ? "No posts yet — write your first one." : "No posts match your search."}
                    </p>
                  </div>
                </td>
              </tr>
            )}
            {localPosts.map((post) => (
              <tr key={post.id} className="hover:bg-site-highlight/40 transition-colors">
                <td className="px-5 py-3.5">
                  <p className="font-semibold text-site-text">{post.title}</p>
                </td>
                <td className="px-5 py-3.5 text-site-muted font-mono text-xs hidden sm:table-cell">{post.slug}</td>
                <td className="px-5 py-3.5 text-site-muted text-xs hidden md:table-cell">
                  {new Date(post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </td>
                <td className="px-5 py-3.5">
                  <button
                    onClick={() => togglePublish(post)}
                    disabled={busyId === post.id}
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full transition-colors disabled:opacity-50 cursor-pointer border ${
                      post.is_published
                        ? "bg-green-50 text-site-success border-green-200 hover:bg-green-100"
                        : "bg-site-highlight text-site-muted border-site-border hover:bg-site-border"
                    }`}
                  >
                    {post.is_published ? "Published" : "Draft"}
                  </button>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-1">
                    <a
                      href={`/blogs/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View live page"
                      className="p-2 rounded-lg text-site-muted hover:text-site-secondary hover:bg-site-highlight transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <Link
                      href={`/admin/blog/${post.id}`}
                      title="Edit"
                      className="p-2 rounded-lg text-site-muted hover:text-site-primary hover:bg-site-highlight transition-colors cursor-pointer"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => setDeleteTarget(post.id)}
                      title="Delete"
                      className="p-2 rounded-lg text-site-muted hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/admin/blog"
        searchParams={{ search: search || undefined }}
      />

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="bg-white rounded-2xl border border-site-border shadow-2xl p-6 w-full max-w-sm mx-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-site-text">Delete this post?</p>
                <p className="text-xs text-site-muted mt-1">This action cannot be undone. The post will be permanently removed.</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-site-text border border-site-border hover:bg-site-highlight transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => deletePost(deleteTarget)}
                disabled={busyId === deleteTarget}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors disabled:opacity-50 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}