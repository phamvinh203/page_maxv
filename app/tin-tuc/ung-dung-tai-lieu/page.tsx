import { NewsListing } from "@/app/_components/news/news-listing";

export const metadata = { title: "Ứng dụng & Tài liệu" };

export default async function Page({ searchParams }: {
  searchParams: Promise<{ page?: string | string[] }>;
}) {
  const { page } = await searchParams;
  return <NewsListing page={page} category="ung-dung-tai-lieu" />;
}
