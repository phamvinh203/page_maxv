import { createElement, Suspense } from "react";
import { Check, LayoutGrid, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Breadcrumbs } from "@/app/_components/ui/breadcrumbs";
import { Button } from "@/app/_components/ui/button";
import { ButtonLink } from "@/app/_components/ui/button-link";
import { Card, CardContent } from "@/app/_components/ui/card";
import { BannerCircles } from "@/app/_components/ui/banner-circles";
import { Container } from "@/app/_components/ui/container";
import { Input } from "@/app/_components/ui/input";
import { Pagination } from "@/app/_components/ui/pagination";
import { newsIcon, newsOverview } from "@/app/_data/news";
import { getFeaturedPosts, getNewsCategories, listNewsPosts, postHref, type PostCard } from "@/app/_lib/newsApi";
import { heroImage } from "@/app/_lib/assets";
import { cn } from "@/app/_lib/utils";

const trialPerks = ["Dùng thử miễn phí 15 ngày", "Không cần thanh toán", "Không ràng buộc"];

type Param = string | string[] | undefined;
type SearchParams = Promise<{ page?: Param; q?: Param; the?: Param }>;

const first = (value: Param) => (Array.isArray(value) ? value[0] : value);

export async function PostThumb({
  post,
  sizes,
  className,
}: {
  post: PostCard;
  sizes: string;
  className?: string;
}) {
  const icon = newsIcon((await getNewsCategories()).find((category) => category.slug === post.categorySlug)?.icon);
  return (
    <div className={cn("relative shrink-0 overflow-hidden bg-hero-tint", className)}>
      {post.image ? (
        <Image unoptimized src={post.image.url} alt="" fill sizes={sizes} className="object-cover" />
      ) : (
        createElement(icon, { "aria-hidden": true, className: "absolute inset-0 m-auto size-1/3 text-primary/30", strokeWidth: 1.25 })
      )}
    </div>
  );
}

export function SidebarPostItem({ post, showCategory }: { post: PostCard; showCategory?: boolean }) {
  return (
    <li className="group relative flex items-start gap-3 has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-primary">
      <PostThumb post={post} sizes="80px" className="aspect-[7/5] w-20 rounded-md" />
      <div className="min-w-0">
        <h3 className="text-xs leading-5 font-semibold text-foreground group-hover:text-primary">
          <Link href={postHref(post)} className="outline-none after:absolute after:inset-0">{post.title}</Link>
        </h3>
        {showCategory && (
          <p className="mt-1 text-[10px] font-medium tracking-wide text-primary uppercase">{post.categoryName}</p>
        )}
      </div>
    </li>
  );
}

function SearchInput({ defaultValue }: { defaultValue?: string }) {
  return (
    <form action="/tin-tuc" role="search" className="mt-6 max-w-md">
      <label htmlFor="news-search" className="sr-only">Tìm kiếm bài viết</label>
      <Input
        id="news-search"
        name="q"
        type="search"
        defaultValue={defaultValue}
        maxLength={100}
        placeholder="Tìm kiếm bài viết..."
        className="h-11 rounded-lg border-0 bg-white text-foreground placeholder:text-xs"
      />
    </form>
  );
}

// Ô tìm cần searchParams (dữ liệu theo request) nên nằm trong Suspense; fallback là ô trống.
async function SearchBox({ searchParams }: { searchParams: SearchParams }) {
  return <SearchInput defaultValue={first((await searchParams).q)} />;
}

export async function NewsListing({ category, searchParams }: { category?: string; searchParams: SearchParams }) {
  const [categories, featured] = await Promise.all([getNewsCategories(), getFeaturedPosts()]);
  const current = category ? categories.find((item) => item.slug === category) : undefined;
  const heading = current
    ? { label: current.name, description: current.description || newsOverview.description }
    : newsOverview;
  const tabs = [
    { slug: undefined, label: "Tất cả", href: "/tin-tuc", Icon: LayoutGrid },
    ...categories.map(({ slug, name, icon }) => ({ slug, label: name, href: `/tin-tuc/${slug}`, Icon: newsIcon(icon) })),
  ];

  return (
    <>
      <section
        aria-labelledby="news-heading"
        className="relative isolate overflow-hidden bg-brand-banner text-white"
      >
        <BannerCircles />
        <Container className="grid items-center gap-8 py-10 sm:py-12 lg:grid-cols-[1fr_auto]">
          <div>
            <Breadcrumbs
              className="text-blue-50"
              items={[
                { label: "Trang chủ", href: "/" },
                current ? { label: newsOverview.label, href: "/tin-tuc" } : { label: newsOverview.label },
                ...(current ? [{ label: current.name }] : []),
              ]}
            />
            <h1 id="news-heading" className="mt-5 text-3xl leading-tight font-bold tracking-tight uppercase sm:text-4xl">
              {heading.label}
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-blue-50">{heading.description}</p>
            <Suspense fallback={<SearchInput />}>
              <SearchBox searchParams={searchParams} />
            </Suspense>
          </div>
          <Image
            src={heroImage}
            alt=""
            sizes="340px"
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
                      <SidebarPostItem key={post.slug} post={post} showCategory />
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
                <ButtonLink href="/dang-ky" className="mt-4 h-9 rounded-md text-xs">Đăng ký dùng thử</ButtonLink>
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

async function PostList({ category, searchParams }: { category?: string; searchParams: SearchParams }) {
  const params = await searchParams;
  const q = first(params.q)?.trim().slice(0, 100) ?? "";
  const tag = first(params.the)?.trim() || undefined;
  const page = first(params.page);
  const requestedPage = page && /^\d+$/.test(page) ? Math.max(1, Number(page)) : 1;
  // Trang tìm kiếm / lọc thẻ không lập chỉ mục (AC-SITE-09); React đưa thẻ meta lên <head>.
  const noindex = (q || tag) && <meta name="robots" content="noindex, follow" />;

  if (q.length === 1) {
    return <>{noindex}<p className="text-sm text-muted-foreground">Nhập ít nhất 2 ký tự để tìm kiếm.</p></>;
  }

  let data;
  try {
    const filter = { category, tag, q: q || undefined };
    data = await listNewsPosts({ ...filter, page: requestedPage });
    // Trang vượt tổng: kẹp về trang cuối hợp lệ (EC-10).
    if (data && data.items.length === 0 && data.total > 0) {
      data = await listNewsPosts({ ...filter, page: Math.ceil(data.total / data.pageSize) });
    }
  } catch {
    return <p role="alert" className="text-sm text-muted-foreground">Không tải được danh sách bài viết. Vui lòng thử lại sau.</p>;
  }

  const posts = data?.items ?? [];
  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1;

  return (
    <>
      {noindex}
      {(q || tag) && (
        <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          {q && <p>Tìm thấy {data?.total ?? 0} bài viết cho “{q}”</p>}
          {tag && <p>Thẻ: <span className="font-semibold text-foreground">{data?.tag?.name ?? tag}</span></p>}
          <Link href={category ? `/tin-tuc/${category}` : "/tin-tuc"} className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
            <X aria-hidden="true" className="size-3.5" /> Bỏ lọc
          </Link>
        </div>
      )}
      {posts.length === 0 ? (
        <p className="text-sm text-muted-foreground">{q || tag ? "Không tìm thấy bài viết phù hợp." : "Chưa có bài viết nào."}</p>
      ) : (
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug} className="min-w-0">
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
      )}
      <Pagination
        currentPage={data?.page ?? 1}
        totalPages={totalPages}
        basePath={category ? `/tin-tuc/${category}` : "/tin-tuc"}
        query={{ q: q || undefined, the: tag }}
      />
    </>
  );
}
