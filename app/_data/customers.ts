export type Customer = {
  name: string;
  logo?: string;
  href?: string;
  className?: string;
};

// logo accepts /images/customers/brand.svg or an https:// image URL; href is the brand website.
export const customers: Customer[] = [
  { name: "TanKeToan", logo: "/images/customers/tan_ke_toan_logo.webp", href: "https://tanketoan.vn/" },
  { name: "Office360", logo: "/images/customers/office360_logo.webp", href: "https://office360.vn/" },
  { name: "Mitasp", logo: "/images/customers/mitasp_logo.webp", href: "https://mitasp.com/" },
  { name: "Bkav", logo: "/images/customers/bkav_logo.svg", href: "https://bkav.com/" },
  { name: "AzTax", logo: "/images/customers/tax_solution_logo.webp", href: "https://aztax.vn/" },
  { name: "PwC", logo: "/images/customers/pwc_logo.webp", href: "https://www.pwc.com/vn/vn.html" },
  { name: "J&T Express", logo: "/images/customers/J&T_Express_logo.svg", href: "https://jtexpress.vn/" },
  { name: "Hoanghamobile", logo: "/images/customers/hoanghamobile_logo.webp", href: "https://hoanghamobile.com/" },
];
