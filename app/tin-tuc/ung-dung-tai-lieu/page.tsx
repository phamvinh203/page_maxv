import { categoryOf } from "@/app/_data/news";
import { NewsListing } from "@/app/tin-tuc/_components/news-listing";

export const metadata = {
  title: "Ứng dụng & Tài liệu",
  description: categoryOf("ung-dung-tai-lieu").description,
  alternates: { canonical: "/tin-tuc/ung-dung-tai-lieu" },
};

export default function Page({ searchParams }: PageProps<"/tin-tuc/ung-dung-tai-lieu">) {
  return <NewsListing searchParams={searchParams} category="ung-dung-tai-lieu" />;
}
