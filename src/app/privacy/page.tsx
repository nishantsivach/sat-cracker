import { Layout } from "@/components";
import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "Learn how SATCracker collects, uses, and protects your personal information when using our AI-powered SAT preparation platform.",
  path: "/privacy-policy",
});
export default function PrivacyPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-site-primary text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-site-accent/6 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-6 py-14 md:py-18">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shadow-sm">
              <ShieldCheck className="w-5 h-5 text-site-accent" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">Privacy Policy</h1>
          </div>
          <p className="text-white/50 text-sm">Last updated: {new Date().getFullYear()}</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <div className="space-y-10">
          {/* Introduction */}
          <div>
            <h2 className="text-sm font-bold text-site-text mb-3">1. Information We Collect</h2>
            <p className="text-sm text-site-text leading-relaxed">
              When you create an account on SATCracker, we collect your name, email address, and practice data (questions attempted, answers selected, and scores). If you subscribe to Premium, we process payment information through our secure payment provider — we never store your full credit card details.
            </p>
          </div>

          {/* Usage */}
          <div>
            <h2 className="text-sm font-bold text-site-text mb-3">2. How We Use Your Data</h2>
            <ul className="space-y-2 text-sm text-site-text leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-site-accent mt-2 shrink-0" />
                <span>To personalize your practice experience and track your progress over time.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-site-accent mt-2 shrink-0" />
                <span>To improve our AI tutor&apos;s explanations and recommendations.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-site-accent mt-2 shrink-0" />
                <span>To send you relevant updates about your account and SAT preparation resources (you can unsubscribe anytime).</span>
              </li>
            </ul>
          </div>

          {/* Sharing */}
          <div>
            <h2 className="text-sm font-bold text-site-text mb-3">3. Data Sharing</h2>
            <p className="text-sm text-site-text leading-relaxed">
              We do not sell, rent, or share your personal information with third parties. Your practice data is used solely to provide and improve the SATCracker service. Payment processing is handled by Stripe, which has its own privacy and security policies.
            </p>
          </div>

          {/* Security */}
          <div>
            <h2 className="text-sm font-bold text-site-text mb-3">4. Data Security</h2>
            <p className="text-sm text-site-text leading-relaxed">
              We use industry-standard encryption (SSL/TLS) to protect your data in transit. Your account is protected by secure authentication through Supabase Auth. We regularly review our security practices to keep your information safe.
            </p>
          </div>

          {/* Cookies */}
          <div>
            <h2 className="text-sm font-bold text-site-text mb-3">5. Cookies</h2>
            <p className="text-sm text-site-text leading-relaxed">
              We use essential cookies to keep you logged in and remember your preferences. We also use analytics cookies to understand how students use SATCracker so we can make it better. You can disable cookies in your browser settings, but some features may not work properly.
            </p>
          </div>

          {/* Rights */}
          <div>
            <h2 className="text-sm font-bold text-site-text mb-3">6. Your Rights</h2>
            <p className="text-sm text-site-text leading-relaxed">
              You can access, update, or delete your personal data at any time through your account settings. You can also request a complete export of your data by contacting us. If you delete your account, your data will be permanently removed within 30 days.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-sm font-bold text-site-text mb-3">7. Contact Us</h2>
            <p className="text-sm text-site-text leading-relaxed">
              If you have any questions about this privacy policy or how your data is handled, reach out to us at{" "}
              <a href="mailto:privacy@satcracker.com" className="text-site-secondary hover:text-site-primary transition-colors font-medium">
                privacy@satcracker.com
              </a>
              . We typically respond within 24 hours.
            </p>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-site-border/60">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-site-secondary hover:text-site-primary transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </section>
    </Layout>
  );
}