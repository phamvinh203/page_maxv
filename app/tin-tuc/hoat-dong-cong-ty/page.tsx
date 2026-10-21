import { categoryOf } from "@/app/_data/news";
import { NewsListing } from "@/app/tin-tuc/_components/news-listing";

export const metadata = {
  title: "Hoạt động công ty",
  description: categoryOf("hoat-dong-cong-ty").description,
  alternates: { canonical: "/tin-tuc/hoat-dong-cong-ty" },
};

export default function Page({ searchParams }: PageProps<"/tin-tuc/hoat-dong-cong-ty">) {
  return <NewsListing searchParams={searchParams} category="hoat-dong-cong-ty" />;
}
