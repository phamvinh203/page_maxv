import type { Metadata } from "next";

export const site = {
  url: "https://app.vinhlab.site",
  name: "MaxV",
  title: "MaxV – Phần mềm kế toán online",
  description:
    "Kế toán nhanh hơn, quản trị tài chính dễ hơn với MaxV. Tự động lấy hóa đơn, hạch toán, quản lý công nợ, tồn kho, giá thành và lập báo cáo trên một nền tảng.",
};

// shortcut: placeholder pages stay out of search; replace this metadata and add them to the sitemap when their content is ready.
export function createPlaceholderMetadata(title: string, path: string): Metadata {
  const description = `${title} | ${site.title}.`;
  const shareTitle = `${title} | ${site.name}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: { index: false, follow: true },
    openGraph: {
      type: "website",
      locale: "vi_VN",
      siteName: site.name,
      title: shareTitle,
      description,
      url: path,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [{ url: "/opengraph-image", alt: site.title }],
    },
  };
}
