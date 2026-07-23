"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";
import {
  User as UserIcon,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  GraduationCap,
  FileText,
  Target,
  WandSparkles,
  BookOpen,
  BarChart3,
  ShieldCheck,
  CreditCard,
} from "lucide-react";
import Image from "next/image";

export function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(async ({ data }) => {
      setUser(data.user);

      if (data.user) {
        try {
          const res = await fetch("/api/admin/me");
          if (res.ok) {
            const json = await res.json();
            setIsAdmin(json.isAdmin);
          }
        } catch {
          setIsAdmin(false);
        }
      }

      setAuthLoading(false);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    const handleClickOutside = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setShowAccountMenu(false);
        setShowLogoutConfirm(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      subscription.subscription.unsubscribe();
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setShowLogoutConfirm(false);
    setShowAccountMenu(false);
    setMobileMenuOpen(false);
    router.push("/");
    router.refresh();
  }

  const navItems = [
    { href: "/courses", text: "Courses" },
    { href: "/practice", text: "Practice" },
    { href: "/mock-tests", text: "Mock Tests" },
    { href: "/sat", text: "SAT Guide" },
    { href: "/pricing", text: "Pricing" },
    { href: "/blogs", text: "Blog" },
  ];

  const mobileNavItems = [
    { href: "/courses", icon: <BookOpen className="w-4 h-4" />, text: "Courses" },
    { href: "/practice", icon: <Target className="w-4 h-4" />, text: "Practice" },
    { href: "/mock-tests", icon: <BarChart3 className="w-4 h-4" />, text: "Mock Tests" },
    { href: "/sat", icon: <GraduationCap className="w-4 h-4" />, text: "SAT Guide" },
    { href: "/pricing", icon: <CreditCard className="w-4 h-4" />, text: "Pricing" },
    { href: "/blogs", icon: <FileText className="w-4 h-4" />, text: "Blog" },
  ];

  const initial = user?.email?.charAt(0).toUpperCase() || "U";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-site-border/60">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image src="/logo.svg" alt="SATCracker" width={180} height={48} className="h-12 w-auto" priority />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-site-muted hover:text-site-primary hover:bg-site-highlight transition-all"
            >
              {item.text}
            </Link>
          ))}

          {/* Auth */}
          {!authLoading && (
            <>
              {user ? (
                <div className="relative ml-2" ref={accountRef}>
                  <button
                    onClick={() => setShowAccountMenu(!showAccountMenu)}
                    className="flex items-center gap-1.5 pl-1.5 pr-2.5 py-1.5 rounded-lg hover:bg-site-highlight transition-all cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-site-primary flex items-center justify-center text-white text-xs font-bold shadow-sm">
                      {initial}
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 text-site-muted transition-transform ${showAccountMenu ? "rotate-180" : ""}`} />
                  </button>

                  {showAccountMenu && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl border border-site-border/60 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)] p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      {!showLogoutConfirm ? (
                        <>
                          <p className="px-3 py-2 text-xs text-site-muted truncate border-b border-site-border/60 mb-1">
                            {user.email}
                          </p>
                          {isAdmin && (
                            <Link
                              href="/admin"
                              onClick={() => setShowAccountMenu(false)}
                              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-site-text hover:bg-site-highlight transition-colors cursor-pointer"
                            >
                              <ShieldCheck className="w-4 h-4 text-site-muted" />
                              Admin Panel
                            </Link>
                          )}
                          <Link
                            href="/dashboard"
                            onClick={() => setShowAccountMenu(false)}
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-site-text hover:bg-site-highlight transition-colors cursor-pointer"
                          >
                            <BarChart3 className="w-4 h-4 text-site-muted" />
                            Dashboard
                          </Link>
                          <Link
                            href="/profile"
                            onClick={() => setShowAccountMenu(false)}
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-site-text hover:bg-site-highlight transition-colors cursor-pointer"
                          >
                            <UserIcon className="w-4 h-4 text-site-muted" />
                            Profile
                          </Link>
                          <button
                            onClick={() => setShowLogoutConfirm(true)}
                            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          >
                            <LogOut className="w-4 h-4" />
                            Logout
                          </button>
                        </>
                      ) : (
                        <div className="p-1">
                          <p className="text-sm font-semibold text-site-text px-1 mb-1">Log out of SATCracker?</p>
                          <p className="text-xs text-site-muted px-1 mb-3">
                            You&apos;ll need to log back in to access your progress.
                          </p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setShowLogoutConfirm(false)}
                              className="flex-1 px-3 py-2 rounded-lg text-sm font-medium text-site-text border border-site-border/60 hover:bg-site-highlight transition-colors cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleLogout}
                              className="flex-1 px-3 py-2 rounded-lg text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"
                            >
                              Log out
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2 ml-2">
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-lg text-sm font-medium text-site-text hover:text-site-primary hover:bg-site-highlight transition-all"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    className="px-4 py-2 rounded-lg text-sm font-bold bg-site-primary text-white hover:bg-site-primary/95 transition-all shadow-sm cursor-pointer"
                  >
                    Sign up free
                  </Link>
                </div>
              )}
            </>
          )}

          {/* SAT Coach CTA */}
          <Link
            href="/chat"
            className="ml-2 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-site-secondary to-site-primary text-white text-sm font-bold shadow-md shadow-site-primary/15 hover:shadow-lg hover:shadow-site-primary/20 hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <WandSparkles className="w-4 h-4" />
            SAT Coach
          </Link>
        </nav>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          {!authLoading && !user && (
            <Link href="/signup" className="px-3 py-1.5 rounded-lg bg-site-primary text-white text-xs font-bold shadow-sm">
              Sign up
            </Link>
          )}

          <Link
            href="/chat"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-site-secondary text-white text-xs font-bold shadow-sm"
          >
            <WandSparkles className="w-3 h-3" />
            Chat
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-site-primary hover:bg-site-highlight transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-site-border/60 bg-white/95 backdrop-blur-xl">
          <div className="px-4 py-3 space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-3 rounded-xl text-site-text hover:bg-site-highlight transition-colors"
            >
              <span className="text-sm font-medium">Home</span>
              <ChevronRight className="w-4 h-4 text-site-muted" />
            </Link>
            {mobileNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-3 rounded-xl text-site-text hover:bg-site-highlight transition-colors"
              >
                <span className="flex items-center gap-3 text-sm font-medium">
                  <span className="w-8 h-8 rounded-lg bg-site-highlight flex items-center justify-center">
                    {item.icon}
                  </span>
                  {item.text}
                </span>
                <ChevronRight className="w-4 h-4 text-site-muted" />
              </Link>
            ))}

            {!authLoading && (
              <div className="pt-2 mt-2 border-t border-site-border/60">
                {user ? (
                  <>
                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between px-3 py-3 rounded-xl text-site-text hover:bg-site-highlight transition-colors"
                      >
                        <span className="flex items-center gap-3 text-sm font-medium">
                          <span className="w-8 h-8 rounded-lg bg-site-highlight flex items-center justify-center">
                            <ShieldCheck className="w-4 h-4" />
                          </span>
                          Admin Panel
                        </span>
                        <ChevronRight className="w-4 h-4 text-site-muted" />
                      </Link>
                    )}
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-3 rounded-xl text-site-text hover:bg-site-highlight transition-colors"
                    >
                      <span className="flex items-center gap-3 text-sm font-medium">
                        <span className="w-8 h-8 rounded-lg bg-site-highlight flex items-center justify-center">
                          <BarChart3 className="w-4 h-4" />
                        </span>
                        Dashboard
                      </span>
                      <ChevronRight className="w-4 h-4 text-site-muted" />
                    </Link>
                    <Link
                      href="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-3 rounded-xl text-site-text hover:bg-site-highlight transition-colors"
                    >
                      <span className="flex items-center gap-3 text-sm font-medium">
                        <div className="w-8 h-8 rounded-lg bg-site-primary flex items-center justify-center text-white text-xs font-bold">
                          {initial}
                        </div>
                        {user.email}
                      </span>
                    </Link>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors text-sm font-medium mt-1 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="space-y-1">
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-3 rounded-xl text-site-text hover:bg-site-highlight transition-colors"
                    >
                      <span className="flex items-center gap-3 text-sm font-medium">
                        <span className="w-8 h-8 rounded-lg bg-site-highlight flex items-center justify-center">
                          <UserIcon className="w-4 h-4" />
                        </span>
                        Log in
                      </span>
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-site-primary text-white text-sm font-bold mt-1 shadow-sm"
                    >
                      Sign up for free
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile CTA */}
          <div className="px-4 py-4 border-t border-site-border/60 bg-site-highlight/30">
            <Link
              href="/chat"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-site-secondary to-site-primary text-white text-sm font-bold shadow-md"
            >
              <WandSparkles className="w-4 h-4" />
              Chat with AI SAT Coach
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}