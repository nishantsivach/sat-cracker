"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";
import {
  Home,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  ChevronRight,
  GraduationCap,
  FileText,
  Target,
  WandSparkles,
  BookOpen,
  BarChart3,
} from "lucide-react";
import Image from "next/image";

export function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const logoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setAuthLoading(false);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    // Close popover on outside click
    const handleClickOutside = (e: MouseEvent) => {
      if (logoutRef.current && !logoutRef.current.contains(e.target as Node)) {
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
    setMobileMenuOpen(false);
    router.push("/");
    router.refresh();
  }

  const navItems = [
    { href: "/", icon: <Home className="w-4 h-4" />, text: "Home" },
    {
      href: "/courses",
      icon: <BookOpen className="w-4 h-4" />,
      text: "Courses",
    },
    {
      href: "/practice",
      icon: <Target className="w-4 h-4" />,
      text: "Practice",
    },
    {
      href: "/sat",
      icon: <GraduationCap className="w-4 h-4" />,
      text: "SAT Guide",
    },
    {
      href: "/blogs",
      icon: <FileText className="w-4 h-4" />,
      text: "Blog",
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-site-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image
            src="/logo.png"
            alt="SATCracker"
            width={180}
            height={48}
            className="h-12 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium text-site-muted hover:text-site-primary hover:bg-site-highlight transition-all"
            >
              {item.icon}
              {item.text}
            </Link>
          ))}

          {/* Auth buttons */}
          {!authLoading && (
            <>
              {user ? (
                <div className="flex items-center gap-1 ml-1">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium text-site-muted hover:text-site-primary hover:bg-site-highlight transition-all"
                  >
                    <BarChart3 className="w-4 h-4" />
                    Dashboard
                  </Link>

                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium text-site-muted hover:text-site-primary hover:bg-site-highlight transition-all"
                  >
                    <div className="w-6 h-6 rounded-md bg-site-primary flex items-center justify-center text-white text-[10px] font-bold">
                      {user.email?.charAt(0).toUpperCase() || "U"}
                    </div>
                    Profile
                  </Link>

                  {/* Logout with confirmation popover */}
                  <div className="relative" ref={logoutRef}>
                    <button
                      onClick={() => setShowLogoutConfirm(!showLogoutConfirm)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-site-muted hover:text-red-600 hover:bg-red-50 transition-all"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>

                    {/* Confirmation popover */}
                    {showLogoutConfirm && (
                      <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl border border-site-border shadow-xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        <p className="text-sm font-semibold text-site-text mb-1">
                          Log out of SATCracker?
                        </p>
                        <p className="text-xs text-site-muted mb-4">
                          You&apos;ll need to log back in to access your progress and practice data.
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setShowLogoutConfirm(false)}
                            className="flex-1 px-3 py-2 rounded-lg text-sm font-medium text-site-text border border-site-border hover:bg-site-highlight transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleLogout}
                            className="flex-1 px-3 py-2 rounded-lg text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors"
                          >
                            Log out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
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
                    className="px-4 py-2 rounded-lg text-sm font-bold bg-site-primary text-white hover:bg-site-primary/90 transition-all shadow-sm"
                  >
                    Sign up free
                  </Link>
                </div>
              )}
            </>
          )}

          {/* AI Tutor CTA */}
          <Link
            href="/chat"
            className="ml-2 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-site-secondary to-site-primary text-white text-sm font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <WandSparkles className="w-4 h-4" />
            SAT Coach
          </Link>
        </nav>

        {/* Mobile: Actions + Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          {!authLoading && !user && (
            <Link
              href="/signup"
              className="px-3 py-1.5 rounded-lg bg-site-primary text-white text-xs font-bold"
            >
              Sign up
            </Link>
          )}

          <Link
            href="/chat"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-site-secondary text-white text-xs font-bold"
          >
            <WandSparkles className="w-3 h-3" />
            Chat
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-site-primary hover:bg-site-highlight transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-site-border bg-white">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
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
              <div className="pt-2 mt-2 border-t border-site-border">
                {user ? (
                  <>
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
                          {user.email?.charAt(0).toUpperCase() || "U"}
                        </div>
                        {user.email}
                      </span>
                    </Link>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors text-sm font-medium mt-1"
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
                      className="flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-site-primary text-white text-sm font-bold mt-1"
                    >
                      Sign up for free
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile bottom CTA */}
          <div className="px-4 py-4 border-t border-site-border">
            <Link
              href="/chat"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-site-secondary to-site-primary text-white text-sm font-bold"
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