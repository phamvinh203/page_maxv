import { NewsListing } from "@/app/_components/news/news-listing";

export const metadata = { title: "Khuyến mãi" };

export default function Page({ searchParams }: PageProps<"/tin-tuc/khuyen-mai">) {
  return <NewsListing searchParams={searchParams} category="khuyen-mai" />;
}
