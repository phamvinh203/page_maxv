import { NewsListing } from "@/app/_components/news/news-listing";

export const metadata = { title: "Doanh nghiệp" };

export default function Page({ searchParams }: PageProps<"/tin-tuc/doanh-nghiep">) {
  return <NewsListing searchParams={searchParams} category="doanh-nghiep" />;
}
