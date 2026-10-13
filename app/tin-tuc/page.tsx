import { NewsListing } from "@/app/_components/news/news-listing";

export const metadata = { title: "Tin tức" };

export default function Page({ searchParams }: PageProps<"/tin-tuc">) {
  return <NewsListing searchParams={searchParams} />;
}
