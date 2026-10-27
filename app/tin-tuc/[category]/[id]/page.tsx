import { notFound } from "next/navigation";

import { NewsArticle } from "@/app/tin-tuc/_components/news-article";
import { JsonLd } from "@/app/_components/ui/json-ld";
import { newsPosts } from "@/app/_data/news";
import { articleJsonLd } from "@/app/_lib/seo";

const findPost = (category: string, id: string) => newsPosts.find((post) => post.category === category && post.id === id);

export async function generateMetadata({ params }: PageProps<"/tin-tuc/[category]/[id]">) {
  const { category, id } = await params;
  const post = findPost(category, id);
  return { title: post?.title, description: post?.content[0], alternates: { canonical: `/tin-tuc/${category}/${id}` } };
}

export default async function Page({ params }: PageProps<"/tin-tuc/[category]/[id]">) {
  const { category, id } = await params;
  const post = findPost(category, id);
  if (!post) notFound();
  return (
    <>
      <JsonLd data={articleJsonLd(post, `/tin-tuc/${category}/${id}`)} />
      <NewsArticle post={post} />
    </>
  );
}
