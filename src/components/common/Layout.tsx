import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout({
  children,
  disableFooter,
}: {
  children: ReactNode;
  disableFooter?: boolean;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-site-surface via-white to-slate-200 text-site-text font-sans">
       <Header />
      <main className="pt-16">{children}</main>
      {!disableFooter && (
        <Footer />
      )}
    </div>
  );
}
