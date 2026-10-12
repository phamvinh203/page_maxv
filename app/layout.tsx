import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Header } from "@/app/_components/layout/header/header";
import { Footer } from "@/app/_components/layout/footer/footer";
import { site } from "@/app/_lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  // Pages are noindex until they opt in (robots index: true here and in sitemap.ts); a forgotten opt-in fails safe.
  robots: { index: false, follow: true },
  // Title, description and images are inherited from the metadata above and from app/opengraph-image.tsx.
  openGraph: { type: "website", locale: "vi_VN", siteName: site.name, url: "./" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="sr-only z-50 rounded-lg bg-primary px-4 py-3 text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3">Đến nội dung chính</a>
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
