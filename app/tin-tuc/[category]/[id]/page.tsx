import { notFound } from "next/navigation";

import { NewsArticle } from "@/app/tin-tuc/_components/news-article";
import { newsPosts } from "@/app/_data/news";

const findPost = (category: string, id: string) => newsPosts.find((post) => post.category === category && post.id === id);

export async function generateMetadata({ params }: PageProps<"/tin-tuc/[category]/[id]">) {
  const { category, id } = await params;
  const post = findPost(category, id);
  return { title: post?.title, description: post?.content[0] };
}

export default async function Page({ params }: PageProps<"/tin-tuc/[category]/[id]">) {
  const { category, id } = await params;
  const post = findPost(category, id);
  if (!post) notFound();
  return <NewsArticle post={post} />;
}
