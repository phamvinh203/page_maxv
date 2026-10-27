import { NewsListing } from "@/app/tin-tuc/_components/news-listing";
import { newsOverview } from "@/app/_data/news";

export const metadata = { title: "Tin tức", description: newsOverview.description, alternates: { canonical: "/tin-tuc" } };

export default function Page({ searchParams }: PageProps<"/tin-tuc">) {
  return <NewsListing searchParams={searchParams} />;
}
