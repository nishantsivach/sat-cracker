import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { SEO_CONFIG, DEFAULT_ROBOTS } from "@/lib/seo/config";
import {
  createOrganizationSchema,
  createWebsiteSchema,
} from "@/lib/seo/schema";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SEO_CONFIG.siteUrl),

  title: {
    default: SEO_CONFIG.defaultTitle,
    template: SEO_CONFIG.titleTemplate,
  },

  description: SEO_CONFIG.defaultDescription,

  keywords: [...SEO_CONFIG.keywords],

  authors: [
    {
      name: SEO_CONFIG.author,
    },
  ],

  publisher: SEO_CONFIG.organizationName,

  themeColor: SEO_CONFIG.themeColor,

  robots: DEFAULT_ROBOTS,

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: SEO_CONFIG.siteUrl,
    siteName: SEO_CONFIG.siteName,
    locale: SEO_CONFIG.locale,

    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,

    images: [
      {
        url: SEO_CONFIG.defaultOgImage,
        width: 1200,
        height: 630,
        alt: SEO_CONFIG.siteName,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
    creator: SEO_CONFIG.twitterHandle || undefined,
    images: [SEO_CONFIG.defaultOgImage],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  // Uncomment after verifying your site in Google Search Console
  // verification: {
  //   google: process.env.GOOGLE_SITE_VERIFICATION,
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = createOrganizationSchema();
  const websiteSchema = createWebsiteSchema();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-C28NLF769V"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-C28NLF769V');
          `}
        </Script>

        {/* Remove this block if G-MR80C1GSQC is an old GA4 property */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MR80C1GSQC"
          strategy="afterInteractive"
        />

        <Script id="google-analytics-2" strategy="afterInteractive">
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