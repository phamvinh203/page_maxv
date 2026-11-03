"use client";

import { ArrowRight, Box, CircleCheck, Handshake, Headphones } from "lucide-react";
import Link from "next/link";
import { useActionState, useState } from "react";

import { sendContactLeadAction, type ContactLeadState } from "@/app/api/leads/actions";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";

const fieldClass = "mt-2 h-11 rounded-lg bg-white";
const labelClass = "text-sm font-medium";
const required = <span className="text-red-500">*</span>;

const topics = [
  { value: "tu-van", label: "Tư vấn sản phẩm", Icon: Box },
  { value: "ho-tro", label: "Hỗ trợ sử dụng", Icon: Headphones },
  { value: "hop-tac", label: "Hợp tác", Icon: Handshake },
];

export function ContactForm() {
  const [sentMessage, setSentMessage] = useState<string | null>(null);
  // One key per intentional submission, kept on retries (plan 6.5) — regenerated
  // only after a success, so "gửi yêu cầu khác" creates a fresh lead.
  const [idempotencyKey, setIdempotencyKey] = useState(() => crypto.randomUUID());

  const [state, formAction, pending] = useActionState<ContactLeadState, FormData>(
    async (prev, formData) => {
      const result = await sendContactLeadAction(prev, formData);
      if (!result.error) {
        setSentMessage(result.message ?? null);
        setIdempotencyKey(crypto.randomUUID());
      }
      return result;
    },
    {},
  );

  if (sentMessage) {
    return (
      <div className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-start gap-3 rounded-xl bg-secondary/60 p-4">
          <CircleCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
          <p className="text-sm text-muted-foreground">{sentMessage}</p>
        </div>
        <button
          type="button"
          onClick={() => setSentMessage(null)}
          className="mt-6 text-sm font-medium text-primary hover:underline"
        >
          Gửi yêu cầu khác
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-bold text-primary">Bạn muốn MaxV hỗ trợ điều gì?</h2>
      <p className="mt-2 text-sm text-muted-foreground">Hãy cho chúng tôi biết nhu cầu của bạn. Đội ngũ MaxV sẽ liên hệ lại trong thời gian sớm nhất.</p>

      {/* Honeypot: hidden from humans (display:none), bots fill every input. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      <input type="hidden" name="idempotencyKey" value={idempotencyKey} />

      <fieldset className="mt-6 grid gap-3 sm:grid-cols-3">
        <legend className="sr-only">Chủ đề cần trao đổi</legend>
        {topics.map(({ value, label, Icon }, i) => (
          <label key={value} className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border bg-white px-3 py-3 text-sm font-medium has-checked:border-primary has-checked:bg-primary has-checked:text-primary-foreground has-focus-visible:ring-2 has-focus-visible:ring-primary">
            <input type="radio" name="topic" value={value} defaultChecked={i === 0} className="sr-only" />
            <Icon className="size-5" aria-hidden="true" />{label}
          </label>
        ))}
      </fieldset>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>Họ và tên {required}</label>
          <Input id="name" name="name" required maxLength={100} placeholder="Nhập họ và tên của bạn" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>Số điện thoại {required}</label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            required
            pattern="[0-9+][0-9 .\-()]{7,19}"
            title="Số điện thoại 8–20 chữ số, có thể bắt đầu bằng +"
            autoComplete="tel"
            placeholder="Nhập số điện thoại"
            className={fieldClass}
          />
        </div>
        {/* Email giờ đứng một mình nên chiếm đủ hàng, không để nửa phải trống. */}
        <div className="sm:col-span-2">
          <label htmlFor="email" className={labelClass}>Email</label>
          <Input id="email" name="email" type="email" maxLength={254} placeholder="Nhập email của bạn" className={fieldClass} />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="message" className={labelClass}>Nội dung cần trao đổi</label>
        <textarea id="message" name="message" rows={4} maxLength={5000} placeholder="Chia sẻ ngắn gọn nhu cầu của bạn..." className="mt-2 w-full rounded-lg border border-input px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50" />
      </div>

      <label className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
        <input type="checkbox" name="consent" required className="size-4" />
        Tôi đồng ý với <Link href="/chinh-sach-bao-mat" className="text-primary underline">chính sách bảo mật</Link>
      </label>

      {state.error && (
        <p role="alert" className="mt-4 text-sm font-medium text-destructive">{state.error}</p>
      )}

      <Button
        type="submit"
        disabled={pending}
        className="mt-6 h-12 w-full rounded-lg text-base disabled:opacity-100"
      >
        {pending ? "Đang gửi..." : "Gửi yêu cầu tư vấn"} <ArrowRight aria-hidden="true" />
      </Button>
      <p className="mt-3 text-center text-xs text-muted-foreground">Thông tin được sử dụng để tiếp nhận và phản hồi yêu cầu của bạn.</p>
    </form>
  );
}
