import { categoryOf } from "@/app/_data/news";
import { NewsListing } from "@/app/tin-tuc/_components/news-listing";

export const metadata = {
  title: "Tài chính - kế toán",
  description: categoryOf("tai-chinh-ke-toan").description,
  alternates: { canonical: "/tin-tuc/tai-chinh-ke-toan" },
};

export default function Page({ searchParams }: PageProps<"/tin-tuc/tai-chinh-ke-toan">) {
  return <NewsListing searchParams={searchParams} category="tai-chinh-ke-toan" />;
}
