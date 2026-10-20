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
      // Google wants a logo of at least 112x112; the 200x60 wordmark is too short, so use the square emblem.
      logo: `${site.url}/images/logo/Logo-Maxv-01.png`,
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
