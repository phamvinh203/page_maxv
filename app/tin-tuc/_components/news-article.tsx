import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { CommentSection } from "@/app/tin-tuc/_components/comment-section";
import { HideNavUntilScroll } from "@/app/tin-tuc/_components/hide-nav-until-scroll";
import { addHeadingIds, NewsContent } from "@/app/tin-tuc/_components/news-content";
import { SidebarPostItem } from "@/app/tin-tuc/_components/news-listing";
import { NewsToc } from "@/app/tin-tuc/_components/news-toc";
import { ViewBeacon } from "@/app/tin-tuc/_components/view-beacon";
import { Breadcrumbs } from "@/app/_components/ui/breadcrumbs";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Container } from "@/app/_components/ui/container";
import { formatNewsDate, newsOverview } from "@/app/_data/news";
import type { PublicPost } from "@/app/_lib/newsApi";
import { cn } from "@/app/_lib/utils";

export function NewsArticle({ post }: { post: PublicPost }) {
  const categoryHref = `/tin-tuc/${post.categorySlug}`;
  const fullWidth = post.layout === "FULL_WIDTH";
  const { html, toc } = addHeadingIds(post.content);
  const related = post.related.length > 0 && (
    <Card className="shadow-xs">
      <CardContent className="p-5">
        <h2 className="text-sm font-semibold text-foreground">Bài viết liên quan</h2>
        {/* Toàn chiều rộng: liên quan nằm dưới nội dung dạng lưới (BR-052). */}
        <ul className={cn("mt-4", fullWidth ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3" : "space-y-4")}>
          {post.related.map((item) => (
            <SidebarPostItem key={item.slug} post={item} />
          ))}
        </ul>
      </CardContent>
    </Card>
  );

  return (
    <Container className="py-8 sm:py-10">
      <ViewBeacon slug={post.slug} />
      {post.hideNavUntilScroll && <HideNavUntilScroll />}
      <Breadcrumbs
        className="text-muted-foreground"
        items={[
          { label: "Trang chủ", href: "/" },
          { label: newsOverview.label, href: "/tin-tuc" },
          { label: post.categoryName, href: categoryHref },
        ]}
      />

      <div className={cn("mt-6 grid gap-8", !fullWidth && "lg:grid-cols-[1fr_20rem] lg:items-start")}>
        <div className="min-w-0">
          <article>
            <header>
              <p className="text-xs font-medium tracking-wide text-primary uppercase">{post.categoryName}</p>
              <h1 className="mt-2 text-2xl leading-tight font-bold tracking-tight text-foreground sm:text-3xl">{post.title}</h1>
              <time dateTime={post.publishedAt} className="mt-3 block text-xs text-muted-foreground">{formatNewsDate(post.publishedAt)}</time>
            </header>

            {post.image && (
              <div className="relative mt-6 aspect-video overflow-hidden rounded-xl bg-hero-tint">
                <Image unoptimized src={post.image.url} alt={post.image.alt || post.title} fill priority sizes="(min-width: 1024px) 720px, 100vw" className="object-cover" />
              </div>
            )}

            {post.showToc && toc.length >= 2 && <NewsToc items={toc} />}

            <NewsContent html={html} className="mt-6" />

            {post.tags.length > 0 && (
              <ul aria-label="Thẻ" className="mt-8 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li key={tag.slug}>
                    <Link href={`/tin-tuc?the=${encodeURIComponent(tag.slug)}`} className="inline-flex h-7 items-center rounded-full border px-3 text-xs text-muted-foreground hover:border-primary hover:text-primary">
                      #{tag.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            <Button asChild variant="outline" className="mt-8 h-9 rounded-md border-primary text-xs text-primary">
              <Link href={categoryHref}><ArrowLeft aria-hidden="true" /> Quay lại {post.categoryName}</Link>
            </Button>
          </article>

          {fullWidth && related && <section aria-label="Bài viết liên quan" className="mt-10">{related}</section>}

          <Suspense fallback={<p role="status" className="mt-10 text-sm text-muted-foreground">Đang tải bình luận...</p>}>
            <CommentSection post={post} />
          </Suspense>
        </div>

        {!fullWidth && related && <aside aria-label="Bài viết liên quan">{related}</aside>}
      </div>
    </Container>
  );
}
