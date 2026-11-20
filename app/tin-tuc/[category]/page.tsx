import { notFound } from "next/navigation";

import { NewsListing } from "@/app/tin-tuc/_components/news-listing";
import { getNewsCategories } from "@/app/_lib/newsApi";

const findCategory = async (slug: string) => (await getNewsCategories()).find((category) => category.slug === slug);

// Danh mục từ API (REQ-040). Cache Components đòi ≥ 1 params; API lỗi lúc build thì dùng giá trị giữ chỗ → notFound().
export async function generateStaticParams() {
  const categories = await getNewsCategories();
  return categories.length ? categories.map(({ slug }) => ({ category: slug })) : [{ category: "_" }];
}

export async function generateMetadata({ params }: PageProps<"/tin-tuc/[category]">) {
  const { category } = await params;
  const found = await findCategory(category);
  return found && { title: found.name, description: found.description ?? undefined, alternates: { canonical: `/tin-tuc/${category}` }, robots: { index: true, follow: true } };
}

export default async function Page({ params, searchParams }: PageProps<"/tin-tuc/[category]">) {
  const { category } = await params;
  const found = await findCategory(category);
  if (!found) notFound();
  return <NewsListing searchParams={searchParams} category={found.slug} />;
}
