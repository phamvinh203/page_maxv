import { notFound, permanentRedirect } from "next/navigation";

import { NewsArticle } from "@/app/tin-tuc/_components/news-article";
import { JsonLd } from "@/app/_components/ui/json-ld";
import { getNewsPost, getNewsSitemap, postHref } from "@/app/_lib/newsApi";
import { articleJsonLd } from "@/app/_lib/seo";

// Toàn route static (dữ liệu cache 60 giây): đường dẫn chưa prerender thì Next chờ bản static xong mới trả,
// nên 404 (AC-SITE-04) và chuyển hướng 308 (AC-SITE-03) có mã HTTP thật thay vì trang 200 stream dần.
export const ensureStatic = "navigation";
export const instant = false;

// Cache Components đòi ≥ 1 bộ params; chưa có bài (hoặc API lỗi lúc build) thì dùng giá trị giữ chỗ "_" → notFound()
// mà không gọi API (slug thật không bao giờ là "_", BR-005).
const PLACEHOLDER = "_";

export async function generateStaticParams() {
  const posts = (await getNewsSitemap())?.posts ?? [];
  return posts.length ? posts.map(({ categorySlug, slug }) => ({ category: categorySlug, slug })) : [{ category: PLACEHOLDER, slug: PLACEHOLDER }];
}

export async function generateMetadata({ params }: PageProps<"/tin-tuc/[category]/[slug]">) {
  const { slug } = await params;
  if (slug === PLACEHOLDER) return {};
  // Lỗi API để trang tự ném ra error.tsx; metadata chỉ cần không vỡ.
  const post = await getNewsPost(slug).catch(() => null);
  if (!post) return {};
  const description = post.seoDescription || post.summary || undefined;
  return {
    title: post.seoTitle || post.title,
    description,
    alternates: { canonical: postHref(post) },
    robots: { index: true, follow: true },
    openGraph: { type: "article", title: post.seoTitle || post.title, description, ...(post.image && { images: [post.image.url] }) },
  };
}

export default async function Page({ params }: PageProps<"/tin-tuc/[category]/[slug]">) {
  const { category, slug } = await params;
  if (slug === PLACEHOLDER) notFound();
  const post = await getNewsPost(slug);
  if (!post) notFound();
  // Bài đã đổi danh mục: chuyển hướng vĩnh viễn sang đường dẫn đúng (BR-012).
  if (post.categorySlug !== category) permanentRedirect(postHref(post));
  return (
    <>
      <JsonLd data={articleJsonLd(post, postHref(post))} />
      <NewsArticle post={post} />
    </>
  );
}
