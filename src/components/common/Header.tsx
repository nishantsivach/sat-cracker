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
} from "lucide-react";
import Image from "next/image";

export function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
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
    { href: "/courses", icon: <BookOpen className="w-4 h-4" />, text: "Courses" },
    { href: "/practice", icon: <Target className="w-4 h-4" />, text: "Practice" },
    { href: "/mock-tests", icon: <BarChart3 className="w-4 h-4" />, text: "Mock Tests" },
    { href: "/sat", icon: <GraduationCap className="w-4 h-4" />, text: "SAT Guide" },
    { href: "/blogs", icon: <FileText className="w-4 h-4" />, text: "Blog" },
  ];

  const initial = user?.email?.charAt(0).toUpperCase() || "U";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-site-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image src="/logo.png" alt="SATCracker" width={180} height={48} className="h-12 w-auto" />
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

          {!authLoading && (
            <>
              {user ? (

                <div className="relative ml-2" ref={accountRef}>
                  <button
                    onClick={() => setShowAccountMenu(!showAccountMenu)}
                    className="flex items-center gap-1.5 pl-1.5 pr-2.5 py-1.5 rounded-lg hover:bg-site-highlight transition-all"
                  >
                    <div className="w-7 h-7 rounded-full bg-site-primary flex items-center justify-center text-white text-xs font-bold">
                      {initial}
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-site-muted" />
                  </button>

                  {showAccountMenu && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl border border-site-border shadow-xl p-2 z-50">
                      {!showLogoutConfirm ? (
                        <>
                          <p className="px-3 py-2 text-xs text-site-muted truncate border-b border-site-border mb-1">
                            {user.email}
                          </p>
                          <Link
                            href="/dashboard"
                            onClick={() => setShowAccountMenu(false)}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-site-text hover:bg-site-highlight transition-colors"
                          >
                            <BarChart3 className="w-4 h-4 text-site-muted" />
                            Dashboard
                          </Link>
                          <Link
                            href="/profile"
                            onClick={() => setShowAccountMenu(false)}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-site-text hover:bg-site-highlight transition-colors"
                          >
                            <UserIcon className="w-4 h-4 text-site-muted" />
                            Profile
                          </Link>
                          <button
                            onClick={() => setShowLogoutConfirm(true)}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            Logout
                          </button>
                        </>
                      ) : (
                        <div className="p-1">
                          <p className="text-sm font-semibold text-site-text mb-1">Log out of SATCracker?</p>
                          <p className="text-xs text-site-muted mb-3">
                            You&apos;ll need to log back in to access your progress.
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
                    className="px-4 py-2 rounded-lg text-sm font-bold bg-site-primary text-white hover:brightness-110 transition-all shadow-sm"
                  >
                    Sign up free
                  </Link>
                </div>
              )}
            </>
          )}

          <Link
            href="/chat"
            className="ml-2 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-site-primary text-white text-sm font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <WandSparkles className="w-4 h-4" />
            SAT Coach
          </Link>
        </nav>

        {/* Mobile Actions Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          {!authLoading && !user && (
            <Link href="/signup" className="px-3 py-1.5 rounded-lg bg-site-primary text-white text-xs font-bold">
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
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu — unchanged, icons still shown here */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-site-border bg-white">
          <div className="px-4 py-3 space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-3 rounded-xl text-site-text hover:bg-site-highlight transition-colors"
            >
              <span className="text-sm font-medium">Home</span>
              <ChevronRight className="w-4 h-4 text-site-muted" />
            </Link>
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

          <div className="px-4 py-4 border-t border-site-border">
            <Link
              href="/chat"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-site-primary text-white text-sm font-bold"
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