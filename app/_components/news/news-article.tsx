import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { PostThumb, SidebarPostItem } from "@/app/_components/news/news-listing";
import { Breadcrumbs } from "@/app/_components/ui/breadcrumbs";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Container } from "@/app/_components/ui/container";
import { categoryOf, newsOverview, newsPosts, type NewsPost } from "@/app/_data/news";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC" });

export function NewsArticle({ post }: { post: NewsPost }) {
  const category = categoryOf(post.category);
  const related = newsPosts.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 4);

  return (
    <Container className="py-8 sm:py-10">
      <Breadcrumbs
        className="text-muted-foreground"
        items={[
          { label: "Trang chủ", href: "/" },
          { label: newsOverview.label, href: "/tin-tuc" },
          { label: category.label, href: `/tin-tuc/${category.slug}` },
        ]}
      />

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_20rem] lg:items-start">
        <article>
          <header>
            <p className="text-xs font-medium tracking-wide text-primary uppercase">{category.label}</p>
            <h1 className="mt-2 text-2xl leading-tight font-bold tracking-tight text-foreground sm:text-3xl">{post.title}</h1>
            <time dateTime={post.date} className="mt-3 block text-xs text-muted-foreground">{formatDate(post.date)}</time>
          </header>

          {post.image && (
            <PostThumb post={post} sizes="(min-width: 1024px) 720px, 100vw" className="mt-6 aspect-video rounded-xl" />
          )}

          <div className="mt-6 space-y-4 text-sm leading-7 text-foreground">
            {post.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <Button asChild variant="outline" className="mt-8 h-9 rounded-md border-primary text-xs text-primary">
            <Link href={`/tin-tuc/${category.slug}`}><ArrowLeft aria-hidden="true" /> Quay lại {category.label}</Link>
          </Button>
        </article>

        {related.length > 0 && (
          <aside aria-label="Bài viết liên quan">
            <Card className="shadow-xs">
              <CardContent className="p-5">
                <h2 className="text-sm font-semibold text-foreground">Bài viết liên quan</h2>
                <ul className="mt-4 space-y-4">
                  {related.map((item) => (
                    <SidebarPostItem key={item.id} post={item} />
                  ))}
                </ul>
              </CardContent>
            </Card>
          </aside>
        )}
      </div>
    </Container>
  );
}
