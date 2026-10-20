import { NewsListing } from "@/app/tin-tuc/_components/news-listing";

export const metadata = { title: "Tin tức" };

export default function Page({ searchParams }: PageProps<"/tin-tuc">) {
  return <NewsListing searchParams={searchParams} />;
}
