import { NewsListing } from "@/app/_components/news/news-listing";

export const metadata = { title: "Doanh nghiệp" };

export default async function Page({ searchParams }: {
  searchParams: Promise<{ page?: string | string[] }>;
}) {
  const { page } = await searchParams;
  return <NewsListing page={page} category="doanh-nghiep" />;
}
