import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  HelpCircle,
  ClipboardList,
  Map,
  GraduationCap,
  Newspaper,
  Sparkles,
  Zap,
  BarChart3,
} from "lucide-react";

export default function AdminDashboardPage() {
  const quickActions = [
    {
      label: "Courses",
      href: "/admin/courses",
      icon: <BookOpen className="w-5 h-5 text-white" />,
      desc: "Create and manage SAT courses with modules and lessons",
      color: "bg-site-secondary",
      enabled: true,
    },
    {
      label: "Questions",
      href: "/admin/questions",
      icon: <HelpCircle className="w-5 h-5 text-white" />,
      desc: "Add, edit, and organize practice questions by topic",
      color: "bg-site-accent",
      enabled: true,
    },
    {
      label: "Mock Tests",
      href: "/admin/mock-tests",
      icon: <ClipboardList className="w-5 h-5 text-white" />,
      desc: "Full-length practice tests with timed sections",
      color: "bg-site-primary",
      enabled: false,
    },
    {
      label: "Topic Guides",
      href: "/admin/topic-guides",
      icon: <Map className="w-5 h-5 text-white" />,
      desc: "In-depth study guides for every SAT topic",
      color: "bg-site-secondary",
      enabled: false,
    },
    {
      label: "Colleges",
      href: "/admin/colleges",
      icon: <GraduationCap className="w-5 h-5 text-white" />,
      desc: "College profiles with SAT score requirements",
      color: "bg-site-accent",
      enabled: false,
    },
    {
      label: "Blog",
      href: "/admin/blog",
      icon: <Newspaper className="w-5 h-5 text-white" />,
      desc: "SAT tips, strategies, and study resources",
      color: "bg-site-primary",
      enabled: false,
    },
  ];

  const stats = [
    {
      label: "Courses",
      value: "Active",
      icon: <BookOpen className="w-5 h-5" />,
      color: "text-site-secondary bg-site-secondary/10",
      href: "/admin/courses",
    },
    {
      label: "Questions",
      value: "Active",
      icon: <HelpCircle className="w-5 h-5" />,
      color: "text-site-accent bg-site-accent/10",
      href: "/admin/questions",
    },
    {
      label: "Coming soon",
      value: "5 modules",
      icon: <Zap className="w-5 h-5" />,
      color: "text-site-primary bg-site-primary/10",
      href: null,
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-site-highlight rounded-full px-4 py-1.5 mb-4">
          <BarChart3 className="w-3.5 h-3.5 text-site-accent" />
          <span className="text-xs font-bold tracking-wider text-site-primary uppercase">
            Admin Panel
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-site-text tracking-tight mb-2">
          Dashboard
        </h1>
        <p className="text-site-muted text-sm max-w-lg">
          Everything you need to manage SATCracker content — courses, questions, and more.
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl border border-site-border p-5 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                {stat.icon}
              </div>
              {stat.href && (
                <Link
                  href={stat.href}
                  className="text-[11px] font-semibold text-site-muted hover:text-site-primary transition-colors cursor-pointer"
                >
                  View →
                </Link>
              )}
            </div>
            <p className="text-2xl font-black text-site-text tracking-tight">
              {stat.value}
            </p>
            <p className="text-xs text-site-muted mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mb-10">
        <h2 className="text-lg font-bold text-site-text mb-4">Quick actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <div key={action.label}>
              {action.enabled ? (
                <Link
                  href={action.href}
                  className="group bg-white rounded-2xl border border-site-border p-5 hover:border-site-accent/20 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 block cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {action.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-site-text text-sm mb-0.5 group-hover:text-site-primary transition-colors">
                        {action.label}
                      </h3>
                      <p className="text-xs text-site-muted leading-relaxed">
                        {action.desc}
                      </p>
                      <div className="flex items-center gap-1.5 mt-3 text-xs font-semibold text-site-secondary group-hover:text-site-primary transition-colors">
                        Open
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="bg-white/40 rounded-2xl border border-site-border/50 p-5 select-none">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center shrink-0 opacity-50`}
                    >
                      {action.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-bold text-site-text/40 text-sm">
                          {action.label}
                        </h3>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-site-muted bg-site-highlight px-2 py-0.5 rounded-full">
                          Soon
                        </span>
                      </div>
                      <p className="text-xs text-site-muted/50 leading-relaxed">
                        {action.desc}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Platform note */}
      <div className="bg-gradient-to-r from-site-highlight to-white rounded-2xl border border-site-border p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-site-accent/10 flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5 text-site-accent" />
        </div>
        <div>
          <p className="text-sm font-bold text-site-text">Platform status</p>
          <p className="text-xs text-site-muted mt-0.5 leading-relaxed">
            Courses and questions are live. Mock tests, topic guides, colleges, and blog modules are in development.
          </p>
        </div>
      </div>
    </div>
  );
}