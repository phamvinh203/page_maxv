import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Header } from "@/app/_components/layout/header/header";
import { Footer } from "@/app/_components/layout/footer/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MaxV – Phần mềm kế toán online",
    template: "%s | MaxV",
  },
  description:
    "Kế toán nhanh hơn, quản trị tài chính dễ hơn với MaxV. Tự động lấy hóa đơn, hạch toán, quản lý công nợ, tồn kho, giá thành và lập báo cáo trên một nền tảng.",
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
