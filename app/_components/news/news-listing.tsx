import { Suspense } from "react";
import { ArrowRight, Check, ChevronRight, LayoutGrid } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Container } from "@/app/_components/ui/container";
import { Input } from "@/app/_components/ui/input";
import { Pagination } from "@/app/_components/ui/pagination";
import { categoryOf, newsCategories, newsOverview, newsPosts, postHref, type NewsCategorySlug, type NewsPost } from "@/app/_data/news";
import { heroImage } from "@/app/_lib/assets";
import { cn } from "@/app/_lib/utils";

const trialPerks = ["Dùng thử miễn phí 15 ngày", "Không cần thanh toán", "Không ràng buộc"];

type SearchParams = Promise<{ page?: string | string[] }>;

const tabs = [
  { slug: undefined, label: "Tất cả", href: "/tin-tuc", Icon: LayoutGrid },
  ...newsCategories.map(({ slug, label, Icon }) => ({ slug, label, href: `/tin-tuc/${slug}`, Icon })),
];

export function PostThumb({
  post,
  sizes,
  className,
}: {
  post: NewsPost;
  sizes: string;
  className?: string;
}) {
  const { Icon } = categoryOf(post.category);
  return (
    <div className={cn("relative shrink-0 overflow-hidden bg-linear-to-br from-[#f1fbff] to-[#e3f3ff]", className)}>
      {post.image ? (
        <Image src={post.image} alt="" fill sizes={sizes} className="object-cover" />
      ) : (
        <Icon aria-hidden="true" className="absolute inset-0 m-auto size-1/3 text-primary/30" strokeWidth={1.25} />
      )}
    </div>
  );
}

export function Breadcrumbs({
  items,
  className,
}: {
  items: { label: string; href?: string }[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={cn("flex flex-wrap items-center gap-1.5 text-xs", className)}>
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {index > 0 && <ChevronRight aria-hidden="true" className="size-3" />}
            {item.href ? (
              <Link href={item.href} className={cn("hover:underline", className)}>{item.label}</Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function SidebarPostItem({ post, showCategory }: { post: NewsPost; showCategory?: boolean }) {
  return (
    <li className="group relative flex items-start gap-3 has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-primary">
      <PostThumb post={post} sizes="80px" className="aspect-[7/5] w-20 rounded-md" />
      <div className="min-w-0">
        <h3 className="text-xs leading-5 font-semibold text-foreground group-hover:text-primary">
          <Link href={postHref(post)} className="outline-none after:absolute after:inset-0">{post.title}</Link>
        </h3>
        {showCategory && (
          <p className="mt-1 text-[10px] font-medium tracking-wide text-primary uppercase">{categoryOf(post.category).label}</p>
        )}
      </div>
    </li>
  );
}

export function NewsListing({ category, searchParams }: { category?: NewsCategorySlug; searchParams: SearchParams }) {
  const current = category ? categoryOf(category) : undefined;
  const heading = current ?? newsOverview;
  const featured = newsPosts.filter((post) => post.featured);

  return (
    <>
      <section
        aria-labelledby="news-heading"
        className="relative isolate overflow-hidden bg-linear-to-r from-[#0073df] to-[#0053bc] text-white"
      >
        <div aria-hidden="true" className="pointer-events-none absolute -top-28 -left-20 -z-10 size-80 rounded-full border-[40px] border-white/5" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -bottom-48 -z-10 size-96 rounded-full border-[50px] border-white/5" />
        <Container className="grid items-center gap-8 py-10 sm:py-12 lg:grid-cols-[1fr_auto]">
          <div>
            <Breadcrumbs
              className="text-blue-50"
              items={[
                { label: "Trang chủ", href: "/" },
                current ? { label: newsOverview.label, href: "/tin-tuc" } : { label: newsOverview.label },
                ...(current ? [{ label: current.label }] : []),
              ]}
            />
            <h1 id="news-heading" className="mt-5 text-3xl leading-tight font-bold tracking-tight uppercase sm:text-4xl">
              {heading.label}
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-blue-50">{heading.description}</p>
            {/* shortcut: search is pending (like the header button); wire it up once articles come from a real source. */}
            <div className="mt-6 max-w-md">
              <label htmlFor="news-search" className="sr-only">Tìm kiếm bài viết</label>
              <Input
                id="news-search"
                type="search"
                disabled
                placeholder="Tìm kiếm bài viết..."
                className="h-11 rounded-lg border-0 bg-white text-foreground placeholder:text-xs disabled:opacity-100"
              />
            </div>
          </div>
          <Image
            src={heroImage}
            alt=""
            sizes="340px"
            loading="eager"
            className="hidden h-auto w-85 rounded-2xl shadow-2xl ring-1 ring-white/30 lg:block"
          />
        </Container>
      </section>

      <Container className="py-8 sm:py-10">
        <nav aria-label="Danh mục tin tức">
          <ul className="flex flex-wrap gap-2">
            {tabs.map(({ slug, label, href, Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={slug === category ? "page" : undefined}
                  className={cn(
                    "inline-flex h-9 items-center gap-1.5 rounded-md border px-3 text-xs font-medium transition-colors",
                    slug === category ? "border-primary bg-primary text-primary-foreground" : "bg-white text-foreground hover:bg-secondary",
                  )}
                >
                  <Icon aria-hidden="true" className="size-3.5" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_20rem] lg:items-start">
          <section aria-labelledby="news-list-heading">
            <h2 id="news-list-heading" className="sr-only">Danh sách bài viết</h2>
            <Suspense fallback={<p role="status" className="text-sm text-muted-foreground">Đang tải bài viết...</p>}>
              <PostList category={category} searchParams={searchParams} />
            </Suspense>
          </section>
          <aside aria-label="Thông tin thêm" className="space-y-5">
            {featured.length > 0 && (
              <Card className="shadow-xs">
                <CardContent className="p-5">
                  <h2 className="text-sm font-semibold text-foreground">Bài viết nổi bật</h2>
                  <ul className="mt-4 space-y-4">
                    {featured.map((post) => (
                      <SidebarPostItem key={post.id} post={post} showCategory />
                    ))}
                  </ul>
                  {current && (
                    <Button asChild variant="outline" className="mt-5 h-9 w-full rounded-md border-primary text-xs text-primary">
                      <Link href="/tin-tuc">Xem tất cả bài viết</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            <Card className="border-0 bg-secondary shadow-none">
              <CardContent className="p-5">
                <h2 className="text-sm leading-6 font-semibold text-foreground">Dùng thử phần mềm kế toán miễn phí</h2>
                <ul className="mt-3 space-y-2">
                  {trialPerks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check aria-hidden="true" className="size-4 shrink-0 text-primary" strokeWidth={2.5} />
                      {perk}
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-4 h-9 rounded-md text-xs">
                  <Link href="/dung-thu">Đăng ký dùng thử <ArrowRight aria-hidden="true" /></Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 bg-muted shadow-none">
              <CardContent className="p-5">
                <h2 className="text-sm font-semibold text-foreground">Liên hệ tư vấn</h2>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  Chúng tôi luôn sẵn sàng hỗ trợ và giải đáp mọi thắc mắc của bạn.
                </p>
                <Button asChild variant="outline" className="mt-4 h-9 rounded-md border-primary text-xs text-primary">
                  <Link href="/lien-he">Liên hệ MaxV</Link>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </Container>
    </>
  );
}

async function PostList({ category, searchParams }: { category?: NewsCategorySlug; searchParams: SearchParams }) {
  const { page } = await searchParams;
  const posts = category ? newsPosts.filter((post) => post.category === category) : newsPosts;
  const totalPages = Math.max(1, Math.ceil(posts.length / 9));
  const requestedPage = typeof page === "string" && /^\d+$/.test(page) ? Number(page) : 1;
  const currentPage = Math.min(Math.max(1, requestedPage), totalPages);
  const visiblePosts = posts.slice((currentPage - 1) * 9, currentPage * 9);
  if (posts.length === 0) return <p className="text-sm text-muted-foreground">Chưa có bài viết nào.</p>;
  return (
    <>
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {visiblePosts.map((post) => (
          <li key={post.id} className="min-w-0">
            <Card className="group relative h-full overflow-hidden shadow-xs transition-shadow hover:shadow-md has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-primary">
              <PostThumb post={post} sizes="(min-width: 1280px) 280px, (min-width: 640px) 45vw, 100vw" className="aspect-[7/5]" />
              <CardContent className="p-4">
                <h3 className="text-sm leading-6 font-semibold text-foreground group-hover:text-primary">
                  {/* stretched link: the whole card is clickable */}
                  <Link href={postHref(post)} className="outline-none after:absolute after:inset-0">{post.title}</Link>
                </h3>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
      <Pagination currentPage={currentPage} totalPages={totalPages} basePath={category ? `/tin-tuc/${category}` : "/tin-tuc"} />
    </>
  );
}
