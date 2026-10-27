import { CircleCheck, Clock3, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

import { BannerCircles } from "@/app/_components/ui/banner-circles";
import { Button } from "@/app/_components/ui/button";
import { Container } from "@/app/_components/ui/container";
import { modules } from "@/app/_data/pricing";
import { googleIcon } from "@/app/_lib/assets";

export const fieldClass = "mt-2 h-11 rounded-lg bg-white";
export const labelClass = "text-sm font-medium";

// trial perks only make sense on the signup page, not for existing customers logging in.
const perks = [
  { label: "Miễn phí 15 ngày", Icon: Clock3, trial: true },
  { label: "Không cần thanh toán", Icon: Sparkles, trial: true },
  { label: "Dữ liệu tách riêng từng công ty", Icon: ShieldCheck, trial: false },
];

// Every auth page (login, trial signup, password reset) shares this split: the form, plus a panel saying what MaxV does today.
export function AuthShell({ children, trial = false }: { children: ReactNode; trial?: boolean }) {
  return (
    <section className="bg-secondary/40 py-8 sm:py-12">
      <Container>
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-2xl border bg-white shadow-sm lg:grid-cols-[1fr_1.1fr]">
          <div className="p-6 sm:p-10">{children}</div>

          <aside className="relative isolate overflow-hidden bg-brand-banner p-6 text-white sm:p-10 lg:order-first">
            <BannerCircles />
            <p className="text-xs font-semibold tracking-wide text-blue-100">NỀN TẢNG KẾ TOÁN & THUẾ TRỰC TUYẾN</p>
            <h2 className="mt-3 text-2xl leading-snug font-bold sm:text-3xl">Một tài khoản MaxV cho hóa đơn, thuế và nhân sự của doanh nghiệp</h2>
            <p className="mt-3 text-sm leading-6 text-blue-50">Làm việc trên trình duyệt, ở mọi nơi. Đây là những gì MaxV đang làm được:</p>

            <ul className="mt-6 space-y-3">
              {modules.map(({ key, label, soon }) => (
                <li key={key} className="flex items-start gap-3 rounded-xl bg-white/10 p-3 text-sm ring-1 ring-white/15">
                  <CircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-sky-200" />
                  <span className="flex-1">{label}</span>
                  {soon && <span className="shrink-0 rounded-full bg-amber-300 px-2 py-0.5 text-[10px] font-semibold text-amber-950">Sắp ra mắt</span>}
                </li>
              ))}
            </ul>

            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/20 pt-5 text-xs text-blue-50">
              {perks.filter((perk) => trial || !perk.trial).map(({ label, Icon }) => (
                <li key={label} className="flex items-center gap-1.5"><Icon aria-hidden="true" className="size-4" />{label}</li>
              ))}
            </ul>
          </aside>
        </div>
      </Container>
    </section>
  );
}

// shortcut: Google OAuth is pending (like TrialSignup); enable this one button when it lands.
export function GoogleAuthButton({ label }: { label: string }) {
  return (
    <>
      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />hoặc<span className="h-px flex-1 bg-border" />
      </div>
      <Button type="button" variant="outline" disabled className="h-11 w-full rounded-lg disabled:opacity-100">
        <Image src={googleIcon} alt="" className="size-4" />
        {label}
      </Button>
    </>
  );
}
