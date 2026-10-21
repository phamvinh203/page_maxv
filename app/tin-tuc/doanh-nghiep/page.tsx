import { categoryOf } from "@/app/_data/news";
import { NewsListing } from "@/app/tin-tuc/_components/news-listing";

export const metadata = {
  title: "Doanh nghiệp",
  description: categoryOf("doanh-nghiep").description,
  alternates: { canonical: "/tin-tuc/doanh-nghiep" },
};

export default function Page({ searchParams }: PageProps<"/tin-tuc/doanh-nghiep">) {
  return <NewsListing searchParams={searchParams} category="doanh-nghiep" />;
}
