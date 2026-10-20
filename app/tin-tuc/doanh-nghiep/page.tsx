import { NewsListing } from "@/app/tin-tuc/_components/news-listing";

export const metadata = { title: "Doanh nghiệp" };

export default function Page({ searchParams }: PageProps<"/tin-tuc/doanh-nghiep">) {
  return <NewsListing searchParams={searchParams} category="doanh-nghiep" />;
}
