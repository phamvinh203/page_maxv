import { NewsListing } from "@/app/tin-tuc/_components/news-listing";

export const metadata = { title: "Khuyến mãi" };

export default function Page({ searchParams }: PageProps<"/tin-tuc/khuyen-mai">) {
  return <NewsListing searchParams={searchParams} category="khuyen-mai" />;
}
