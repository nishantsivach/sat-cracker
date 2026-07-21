import Link from "next/link";
import {
    ArrowRight,
    BookOpen,
    HelpCircle,
    ClipboardList,
    Map,
    GraduationCap,
    Newspaper,
    FileText,
    Sparkles,
    BarChart3,
    CheckCircle2,
    Zap,
    Layers,
    Clock,
    ShieldCheck,
} from "lucide-react";

export default function AdminDashboardPage() {
    const quickActions = [
        {
            label: "Courses",
            href: "/admin/courses",
            icon: <BookOpen className="w-5 h-5 text-white" />,
            desc: "Manage SAT courses, modules, and lessons",
            color: "bg-site-secondary",
            colorLight: "bg-site-secondary/10 text-site-secondary",
        },
        {
            label: "Questions",
            href: "/admin/questions",
            icon: <HelpCircle className="w-5 h-5 text-white" />,
            desc: "Create and organize SAT practice questions",
            color: "bg-site-accent",
            colorLight: "bg-site-accent/10 text-site-accent",
        },
        {
            label: "Mock Tests",
            href: "/admin/mock-tests",
            icon: <ClipboardList className="w-5 h-5 text-white" />,
            desc: "Full-length SAT mock tests with timed sections",
            color: "bg-site-primary",
            colorLight: "bg-site-primary/10 text-site-primary",
        },
        {
            label: "SEO Content",
            href: "/admin/seo-content",
            icon: <FileText className="w-5 h-5 text-white" />,
            desc: "SAT guides, FAQs, logistics, and comparison pages",
            color: "bg-site-secondary",
            colorLight: "bg-site-secondary/10 text-site-secondary",
        },
        {
            label: "Topic Guides",
            href: "/admin/topic-guides",
            icon: <Map className="w-5 h-5 text-white" />,
            desc: "In-depth study guides for every SAT topic",
            color: "bg-site-accent",
            colorLight: "bg-site-accent/10 text-site-accent",
        },
        {
            label: "Colleges",
            href: "/admin/colleges",
            icon: <GraduationCap className="w-5 h-5 text-white" />,
            desc: "College profiles with SAT score requirements",
            color: "bg-site-primary",
            colorLight: "bg-site-primary/10 text-site-primary",
        },
        {
            label: "Blog",
            href: "/admin/blog",
            icon: <Newspaper className="w-5 h-5 text-white" />,
            desc: "Publish SAT articles and preparation tips",
            color: "bg-site-secondary",
            colorLight: "bg-site-secondary/10 text-site-secondary",
        },
    ];

    return (
        <div>
            {/* Header */}
            <div className="mb-10">
                <div className="inline-flex items-center gap-2 bg-site-highlight rounded-full px-4 py-1.5 mb-4">
                    <BarChart3 className="w-3.5 h-3.5 text-site-accent" />
                    <span className="text-xs font-bold tracking-wider text-site-primary uppercase">
                        Admin Panel
                    </span>
                </div>

                <h1 className="text-3xl font-black tracking-tight text-site-text">
                    Dashboard
                </h1>
                <p className="text-site-muted mt-2 max-w-xl text-[15px] leading-relaxed">
                    Manage SATCracker content — courses, questions, mock tests, SEO pages, and more — all from one place.
                </p>
            </div>

            {/* Stats row */}
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
                <div className="bg-white rounded-2xl border border-site-border p-5 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-site-secondary/10 flex items-center justify-center">
                            <Layers className="w-5 h-5 text-site-secondary" />
                        </div>
                        <CheckCircle2 className="w-4 h-4 text-site-success" />
                    </div>
                    <p className="text-3xl font-black text-site-text">7</p>
                    <p className="text-xs text-site-muted mt-1">Active modules</p>
                </div>

                <div className="bg-white rounded-2xl border border-site-border p-5 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-site-accent/10 flex items-center justify-center">
                            <Zap className="w-5 h-5 text-site-accent" />
                        </div>
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-bold text-green-700">
                            <CheckCircle2 className="w-3 h-3" />
                            Healthy
                        </span>
                    </div>
                    <p className="text-3xl font-black text-site-text">All Live</p>
                    <p className="text-xs text-site-muted mt-1">System status</p>
                </div>

                <div className="bg-white rounded-2xl border border-site-border p-5 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-site-primary/10 flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5 text-site-primary" />
                        </div>
                        <Clock className="w-4 h-4 text-site-muted" />
                    </div>
                    <p className="text-3xl font-black text-site-text">v1.0</p>
                    <p className="text-xs text-site-muted mt-1">Platform version</p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-10">
                <div className="mb-5">
                    <h2 className="text-lg font-bold text-site-text">
                        Content management
                    </h2>
                    <p className="text-sm text-site-muted mt-0.5">
                        All modules are live and ready to use
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {quickActions.map((action) => (
                        <Link
                            key={action.label}
                            href={action.href}
                            className="group relative bg-white rounded-2xl border border-site-border p-5 hover:border-site-accent/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                    {action.icon}
                                </div>
                                <span className={`inline-flex items-center gap-1 rounded-full ${action.colorLight} px-2.5 py-1 text-[10px] font-bold`}>
                                    <CheckCircle2 className="w-3 h-3" />
                                    Live
                                </span>
                            </div>

                            <h3 className="font-bold text-site-text text-sm mb-1 group-hover:text-site-primary transition-colors">
                                {action.label}
                            </h3>
                            <p className="text-xs text-site-muted leading-relaxed">
                                {action.desc}
                            </p>

                            <div className="flex items-center gap-1.5 mt-4 text-xs font-semibold text-site-secondary group-hover:text-site-primary transition-colors">
                                Manage
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Platform status */}
            <div className="bg-gradient-to-r from-site-highlight to-white rounded-2xl border border-site-border p-6 flex items-start gap-5">
                <div className="w-10 h-10 rounded-xl bg-site-accent/10 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-site-accent" />
                </div>
                <div>
                    <h3 className="font-bold text-site-text text-sm">Platform status</h3>
                    <p className="text-xs text-site-muted mt-1 leading-relaxed">
                        All content management modules are live — Courses, Questions, Mock Tests, SEO Content, Topic Guides, Colleges, and Blog. Additional analytics and enhancements coming as the platform evolves.
                    </p>
                </div>
            </div>
        </div>
    );
}