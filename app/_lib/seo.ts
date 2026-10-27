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

// Google requires a URL on every crumb but the last, so crumbs without href (e.g. a section with no page) are skipped.
export function breadcrumbJsonLd(items: { label: string; href?: string }[], currentPath: string) {
  const crumbs = items.filter((item, index) => item.href || index === items.length - 1);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map(({ label, href }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: label,
      item: `${site.url}${href ?? currentPath}`,
    })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

// ponytail: no offers until the plan prices are confirmed (see _data/pricing.ts); add them with the price.
export function softwareJsonLd({ name, description, path }: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url: `${site.url}${path}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: "vi-VN",
    publisher: { "@id": `${site.url}/#organization` },
  };
}

export function articleJsonLd(post: { title: string; date: string; image?: string; content: string[] }, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.content[0],
    datePublished: post.date,
    ...(post.image && { image: post.image.startsWith("http") ? post.image : `${site.url}${post.image}` }),
    mainEntityOfPage: `${site.url}${path}`,
    inLanguage: "vi-VN",
    author: { "@id": `${site.url}/#organization` },
    publisher: { "@id": `${site.url}/#organization` },
  };
}
