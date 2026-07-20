import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { BarChart3 } from "lucide-react";
import AdminSidebar from "./AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") redirect("/");

  return (
    <div className="min-h-screen bg-site-background">
      <header className="border-b border-site-border bg-white/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-site-primary flex items-center justify-center">
                <BarChart3 className="w-3.5 h-3.5 text-site-accent" />
              </div>
              <span className="text-sm font-bold text-site-primary">
                SAT<span className="text-site-accent">Cracker</span>
              </span>
            </div>
            <span className="w-px h-5 bg-site-border" />
            <span className="text-[10px] font-bold uppercase tracking-wider bg-site-accent/10 text-site-accent px-2.5 py-1 rounded-full">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-site-muted">{user.email}</span>
            <Link
              href="/"
              className="text-xs font-medium text-site-muted hover:text-site-primary transition-colors cursor-pointer flex items-center gap-1"
            >
              ← Back to site
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}