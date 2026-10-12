export type Customer = {
  name: string;
  logo?: string;
  href?: string;
  className?: string;
};

// logo accepts /images/customers/brand.svg or an https:// image URL; href is the brand website.
export const customers: Customer[] = [
  { name: "VNPT", logo: "", href: "", className: "text-[#008bcf] italic" },
  { name: "THACO", logo: "", href: "", className: "text-[#12447c] tracking-tight" },
  { name: "TNG", logo: "", href: "", className: "text-[#d42045] italic" },
  { name: "HÒA PHÁT", logo: "", href: "", className: "text-[#075a88] text-base" },
  { name: "GEMALINK", logo: "", href: "", className: "text-[#113c65] text-base" },
];
