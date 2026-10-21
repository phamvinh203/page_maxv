import { categoryOf } from "@/app/_data/news";
import { NewsListing } from "@/app/tin-tuc/_components/news-listing";

export const metadata = {
  title: "Khuyến mãi",
  description: categoryOf("khuyen-mai").description,
  alternates: { canonical: "/tin-tuc/khuyen-mai" },
};

export default function Page({ searchParams }: PageProps<"/tin-tuc/khuyen-mai">) {
  return <NewsListing searchParams={searchParams} category="khuyen-mai" />;
}
