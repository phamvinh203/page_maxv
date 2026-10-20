import { NewsListing } from "@/app/tin-tuc/_components/news-listing";

export const metadata = { title: "Hoạt động công ty" };

export default function Page({ searchParams }: PageProps<"/tin-tuc/hoat-dong-cong-ty">) {
  return <NewsListing searchParams={searchParams} category="hoat-dong-cong-ty" />;
}
