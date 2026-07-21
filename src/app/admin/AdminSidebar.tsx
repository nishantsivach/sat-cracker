"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  HelpCircle,
  ClipboardList,
  FileText,
  Map,
  GraduationCap,
  Newspaper,
  ChevronRight,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, enabled: true },
  { href: "/admin/courses", label: "Courses", icon: BookOpen, enabled: true },
  { href: "/admin/questions", label: "Questions", icon: HelpCircle, enabled: true },
  { href: "/admin/mock-tests", label: "Mock Tests", icon: ClipboardList, enabled: true },
  { href: "/admin/seo-content", label: "SEO Content", icon: FileText, enabled: true },
  { href: "/admin/topic-guides", label: "Topic Guides", icon: Map, enabled: true },
  { href: "/admin/colleges", label: "Colleges", icon: GraduationCap, enabled: true },
  { href: "/admin/blog", label: "Blog", icon: Newspaper, enabled: true },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav className="w-56 shrink-0 border-r border-site-primary/20 bg-site-primary min-h-[calc(100vh-53px)] py-5">
      <div className="px-4 mb-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 px-2">
          Navigation
        </p>
      </div>
      <div className="space-y-0.5 px-3">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
          const Icon = item.icon;

          if (!item.enabled) {
            return (
              <div
                key={item.href}
                title="Coming soon"
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-white/20 cursor-not-allowed select-none"
              >
                <Icon className="w-4 h-4" />
                {item.label}
                <span className="ml-auto text-[9px] font-bold uppercase tracking-wider text-white/10">
                  Soon
                </span>
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all cursor-pointer ${
                isActive
                  ? "bg-site-accent/15 text-site-accent font-semibold shadow-sm"
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
              {isActive && (
                <ChevronRight className="w-3.5 h-3.5 ml-auto" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}