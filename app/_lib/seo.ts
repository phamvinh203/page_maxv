import type { Metadata } from "next";

export const site = {
  // shortcut: fallback is the current staging domain; set NEXT_PUBLIC_SITE_URL to the real one in production.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://app.vinhlab.site").replace(/\/$/, ""),
  name: "MaxV",
  title: "MaxV – Phần mềm kế toán online",
  description:
    "Kế toán nhanh hơn, quản trị tài chính dễ hơn với MaxV. Tự động lấy hóa đơn, hạch toán, quản lý công nợ, tồn kho, giá thành và lập báo cáo trên một nền tảng.",
};

export const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/images/logo_maxv.png`,
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "vi-VN",
      publisher: { "@id": `${site.url}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      name: site.name,
      url: site.url,
      description: site.description,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      publisher: { "@id": `${site.url}/#organization` },
    },
  ],
};

// shortcut: placeholder pages stay out of search; replace this metadata and add them to the sitemap when their content is ready.
export function createPlaceholderMetadata(
  title: string,
  path: string,
  description = `${title} | ${site.title}.`,
): Metadata {
  const shareTitle = `${title} | ${site.name}`;

  return {
    title,
    description,
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
