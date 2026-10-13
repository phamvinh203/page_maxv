import { NewsListing } from "@/app/_components/news/news-listing";

export const metadata = { title: "Ứng dụng & Tài liệu" };

export default function Page({ searchParams }: PageProps<"/tin-tuc/ung-dung-tai-lieu">) {
  return <NewsListing searchParams={searchParams} category="ung-dung-tai-lieu" />;
}
