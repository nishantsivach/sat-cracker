import Link from "next/link";
import { ReactNode } from "react";
import {
  BookOpen,
  MessageCircle,
  Home,
  BarChart3,
  User,
  Menu,
  X,
} from "lucide-react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-100 via-white to-neutral-200 text-neutral-800 font-sans">
      {/* Header with CSS-only mobile menu */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 shadow-sm border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-blue-700 text-white p-1 rounded">
              <BarChart3 className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold text-blue-900">
              SAT<span className="text-blue-700">Cracker</span>
            </h1>
          </Link>

          {/* Hidden checkbox for mobile menu toggle */}
          <input
            type="checkbox"
            id="mobile-menu-toggle"
            className="hidden peer"
          />

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-1 text-neutral-600 hover:text-blue-700 transition-colors"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              href="/blogs"
              className="flex items-center gap-1 text-neutral-600 hover:text-blue-700 transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              <span>Study Materials</span>
            </Link>
            <Link
              href="/practice"
              className="flex items-center gap-1 text-neutral-600 hover:text-blue-700 transition-colors"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Practice Tests</span>
            </Link>
            <Link
              href="/profile"
              className="flex items-center gap-1 text-neutral-600 hover:text-blue-700 transition-colors"
            >
              <User className="h-4 w-4" />
              <span>My Profile</span>
            </Link>
            <Link
              href="/chat"
              className="px-4 py-2 rounded-xl bg-blue-700 text-white hover:bg-blue-800 transition-colors flex items-center gap-1"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Start Chat</span>
            </Link>
          </nav>

          {/* Mobile menu button (label for the checkbox) */}
          <label
            htmlFor="mobile-menu-toggle"
            className="md:hidden p-2 text-neutral-600 hover:text-blue-700 transition-colors cursor-pointer"
          >
            {/* Show X when menu is open, Menu icon when closed */}
            <Menu className="h-6 w-6 peer-checked:hidden block" />
            <X className="h-6 w-6 peer-checked:block hidden" />
          </label>
        </div>

        {/* Mobile navigation - hidden by default, shown when checkbox is checked */}
        <div className="max-h-0 md:hidden overflow-hidden transition-all duration-300 peer-checked:max-h-screen bg-white border-t border-neutral-200 shadow-lg">
          <nav className="flex flex-col gap-4 py-4 px-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-neutral-600 hover:text-blue-700 transition-colors py-2"
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link
              href="/blogs"
              className="flex items-center gap-2 text-neutral-600 hover:text-blue-700 transition-colors py-2"
            >
              <BookOpen className="h-5 w-5" />
              <span>Study Materials</span>
            </Link>
            <Link
              href="/practice"
              className="flex items-center gap-2 text-neutral-600 hover:text-blue-700 transition-colors py-2"
            >
              <BarChart3 className="h-5 w-5" />
              <span>Practice Tests</span>
            </Link>
            <Link
              href="/profile"
              className="flex items-center gap-2 text-neutral-600 hover:text-blue-700 transition-colors py-2"
            >
              <User className="h-5 w-5" />
              <span>My Profile</span>
            </Link>
            <Link
              href="/chat"
              className="flex items-center gap-2 mt-2 px-4 py-3 rounded-xl bg-blue-700 text-white hover:bg-blue-800 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Start Chat</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Page content */}
      <main className="pt-16">{children}</main>

      {/* Footer */}
      <footer className="bg-neutral-800 text-neutral-300">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-blue-700 text-white p-1 rounded">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-white">
                  SAT<span className="text-blue-400">Cracker</span>
                </h2>
              </div>
              <p className="text-sm text-neutral-400">
                Your ultimate companion for SAT preparation. We help students
                achieve their desired scores with quality content and tools.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/blogs"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Study Materials
                  </Link>
                </li>
                <li>
                  <Link
                    href="/practice"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Practice Tests
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tips"
                    className="hover:text-blue-400 transition-colors"
                  >
                    SAT Tips
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="hover:text-blue-400 transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-blue-400 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Stay Connected</h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-neutral-400 hover:text-blue-400 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-blue-400 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-blue-400 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-blue-400 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
              <div className="mt-6">
                <h4 className="text-sm font-medium text-white mb-2">
                  Subscribe to our newsletter
                </h4>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="px-3 py-2 bg-neutral-700 text-white rounded text-sm flex-1 border border-neutral-600 focus:outline-none focus:border-blue-500"
                  />
                  <button className="px-3 py-2 bg-blue-700 text-white rounded text-sm hover:bg-blue-800 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-700 mt-8 pt-8 text-center text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} SATCracker. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
