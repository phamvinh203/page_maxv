import { notFound } from "next/navigation";

import { NewsListing } from "@/app/tin-tuc/_components/news-listing";
import { newsCategories } from "@/app/_data/news";

export const generateStaticParams = () => newsCategories.map(({ slug }) => ({ category: slug }));

const findCategory = (slug: string) => newsCategories.find((category) => category.slug === slug);

export async function generateMetadata({ params }: PageProps<"/tin-tuc/[category]">) {
  const { category } = await params;
  const found = findCategory(category);
  return found && { title: found.label, description: found.description, alternates: { canonical: `/tin-tuc/${category}` } };
}

export default async function Page({ params, searchParams }: PageProps<"/tin-tuc/[category]">) {
  const { category } = await params;
  const found = findCategory(category);
  if (!found) notFound();
  return <NewsListing searchParams={searchParams} category={found.slug} />;
}
