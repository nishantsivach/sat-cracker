import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),

  title: {
    default: "SATCracker — AI-Powered SAT Prep | Practice Smarter",
    template: "%s | SATCracker",
  },

  description:
    "Prepare for the SAT with AI-powered explanations, adaptive practice questions, and real progress tracking.",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "SATCracker",
  },

  twitter: {
    card: "summary_large_image",
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-C28NLF769V"
          strategy="afterInteractive"
        />
        <Script id="google-analytics-1" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-C28NLF769V');
          `}
        </Script>

        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-MR80C1GSQC"
        />

        <Script id="google-analytics-2">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MR80C1GSQC');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}