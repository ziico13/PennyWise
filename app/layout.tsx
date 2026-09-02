import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://pennywisemoney.com";
const SITE_TITLE = "PennyWise — Financial Guidance for Newcomers to Canada";
const SITE_DESCRIPTION =
  "Practical financial guidance for immigrants building a new life in Canada — credit, banking, taxes, and more, explained clearly.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — PennyWise",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "PennyWise",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-foreground dark:bg-black">
        {ADSENSE_CLIENT_ID && (
          // A plain native <script> tag, deliberately not next/script's
          // <Script> component: even with strategy="beforeInteractive",
          // that component only emits a self.__next_s bootstrap array in
          // the server HTML and injects the real <script> tag client-side
          // during hydration. Google's AdSense site-verification crawler
          // does a plain HTTP fetch with no JS execution, so it needs an
          // actual literal <script src="..."> element in the raw HTML,
          // which only a native tag (not next/script) reliably produces.
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
          />
        )}
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
