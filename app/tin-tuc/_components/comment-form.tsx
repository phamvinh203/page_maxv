"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { formatNewsDate } from "@/app/_data/news";
import type { PublicComment } from "@/app/_lib/newsApi";

// Gửi thẳng từ trình duyệt tới domain API để be_maxv thấy IP thật của khách (ADR-005). Biến build-time.
const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");
// Cùng phiên bản chính sách với form Lead (app/api/leads/actions.ts).
const CONSENT_VERSION = "privacy-v1";

/** Form gửi bình luận (REQ-045); có `parentId` thì là trả lời. Bình luận chờ duyệt nên không hiện ngay. */
export function CommentForm({ slug, parentId }: { slug: string; parentId?: string }) {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  const idPrefix = parentId ? `reply-${parentId}` : "comment";

  if (!API_URL) return <p className="mt-3 text-sm text-muted-foreground">Bình luận tạm thời chưa khả dụng.</p>;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setPending(true);
    setResult(null);
    try {
      const res = await fetch(`${API_URL}/public/news/posts/${encodeURIComponent(slug)}/comments`, {
        method: "POST",
        credentials: "omit",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          content: String(data.get("content") ?? ""),
          ...(parentId && { parentId }),
          consent: data.get("consent") != null,
          consentVersion: CONSENT_VERSION,
          website: String(data.get("website") ?? ""),
        }),
      });
      const body = (await res.json().catch(() => null)) as { data?: { message?: string }; message?: string } | null;
      setResult({ ok: res.ok, message: body?.data?.message ?? body?.message ?? "Có lỗi xảy ra, vui lòng thử lại sau." });
      if (res.ok) form.reset();
    } catch {
      setResult({ ok: false, message: "Không gửi được bình luận. Vui lòng kiểm tra kết nối và thử lại." });
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-3 grid gap-3">
      {/* Honeypot: hidden from humans (display:none), bots fill every input (BR-026a). */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${idPrefix}-website`}>Website</label>
        <input id={`${idPrefix}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor={`${idPrefix}-name`} className="text-xs font-medium">Họ tên</label>
          <Input id={`${idPrefix}-name`} name="name" required minLength={2} maxLength={100} autoComplete="name" className="mt-1" />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-email`} className="text-xs font-medium">Email (không hiển thị công khai)</label>
          <Input id={`${idPrefix}-email`} name="email" type="email" required maxLength={254} autoComplete="email" className="mt-1" />
        </div>
      </div>
      <div>
        <label htmlFor={`${idPrefix}-content`} className="text-xs font-medium">Nội dung</label>
        <textarea
          id={`${idPrefix}-content`}
          name="content"
          required
          minLength={2}
          maxLength={3000}
          rows={4}
          className="mt-1 w-full rounded-md border border-input bg-white px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
      </div>
      {/* Link nằm ngoài label để click vào nó không toggle checkbox. */}
      <p className="flex items-start gap-2 text-xs text-muted-foreground">
        <input id={`${idPrefix}-consent`} type="checkbox" name="consent" required className="mt-0.5 size-4" />
        <span>
          <label htmlFor={`${idPrefix}-consent`} className="cursor-pointer">Tôi đồng ý với </label>
          <Link href="/chinh-sach-bao-mat" className="text-primary underline">chính sách bảo mật</Link>
        </span>
      </p>
      {result && (
        <p role={result.ok ? "status" : "alert"} className={result.ok ? "text-sm font-medium text-primary" : "text-sm font-medium text-destructive"}>
          {result.message}
        </p>
      )}
      <Button type="submit" disabled={pending} className="h-9 w-fit rounded-md text-xs">
        {pending ? "Đang gửi..." : parentId ? "Gửi trả lời" : "Gửi bình luận"}
      </Button>
    </form>
  );
}

/** Nút "Trả lời" dưới bình luận gốc: mở form trả lời ngay bên dưới. */
function ReplyButton({ slug, parentId, authorName }: { slug: string; parentId: string; authorName: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-1">
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="text-xs font-medium text-primary hover:underline">
        {open ? "Đóng" : "Trả lời"}
      </button>
      {open && (
        <div className="mt-2 rounded-md bg-muted/50 p-3">
          <p className="text-xs text-muted-foreground">Trả lời {authorName}</p>
          <CommentForm slug={slug} parentId={parentId} />
        </div>
      )}
    </div>
  );
}

function CommentBody({ comment }: { comment: Omit<PublicComment, "replies"> }) {
  return (
    <>
      <p className="flex flex-wrap items-center gap-2 text-sm">
        <span className="font-semibold text-foreground">{comment.authorName}</span>
        {comment.isAdmin && <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">MaxV</span>}
        <time dateTime={comment.createdAt} className="text-xs text-muted-foreground">{formatNewsDate(comment.createdAt)}</time>
      </p>
      {/* Văn bản thuần, không qua innerHTML (AC-CMT-05). */}
      <p className="mt-1 text-sm leading-6 whitespace-pre-line text-foreground">{comment.content}</p>
    </>
  );
}

/** Danh sách bình luận đã duyệt; trang đầu do server render, "Xem thêm" tải 20 bình luận gốc tiếp theo từ API công khai. */
export function CommentList({ slug, allowReply, initial, hasMore }: {
  slug: string;
  allowReply: boolean;
  initial: PublicComment[];
  hasMore: boolean;
}) {
  const [items, setItems] = useState(initial);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(hasMore);
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");

  async function loadMore() {
    setState("loading");
    try {
      const res = await fetch(`${API_URL}/public/news/posts/${encodeURIComponent(slug)}/comments?page=${page + 1}`, { credentials: "omit" });
      if (!res.ok) throw new Error(String(res.status));
      const { data } = (await res.json()) as { data: { items: PublicComment[]; total: number; page: number; pageSize: number } };
      setItems((prev) => [...prev, ...data.items.filter((item) => !prev.some((p) => p.id === item.id))]);
      setPage(data.page);
      setMore(data.page * data.pageSize < data.total);
      setState("idle");
    } catch {
      setState("error");
    }
  }

  if (items.length === 0) return null;
  return (
    <>
      <ul className="mt-5 space-y-5">
        {items.map((comment) => (
          <li key={comment.id}>
            <CommentBody comment={comment} />
            {allowReply && <ReplyButton slug={slug} parentId={comment.id} authorName={comment.authorName} />}
            {comment.replies.length > 0 && (
              <ul className="mt-3 space-y-3 border-l-2 pl-4 sm:ml-4">
                {comment.replies.map((reply) => (
                  <li key={reply.id}><CommentBody comment={reply} /></li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      {more && API_URL && (
        <Button type="button" variant="outline" disabled={state === "loading"} onClick={loadMore} className="mt-5 h-9 rounded-md text-xs">
          {state === "loading" ? "Đang tải..." : "Xem thêm bình luận"}
        </Button>
      )}
      {state === "error" && <p role="alert" className="mt-2 text-xs text-destructive">Không tải thêm được bình luận. Vui lòng thử lại.</p>}
    </>
  );
}
