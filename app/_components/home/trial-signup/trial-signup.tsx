import { ArrowRight } from "lucide-react";

import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Container } from "@/app/_components/ui/container";
import { Input } from "@/app/_components/ui/input";
import { trialSignup } from "@/app/_data/trial-signup";

export function TrialSignup() {
  return (
    <section
      id="dung-thu"
      aria-labelledby="trial-signup-heading"
      className="relative isolate overflow-hidden border-y border-white/20 bg-linear-to-r from-[#0073df] to-[#0053bc] py-9 text-white sm:py-10"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -top-28 -left-20 -z-10 size-80 rounded-full border-[40px] border-white/5" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 -bottom-48 -z-10 size-96 rounded-full border-[50px] border-white/5" />

      <Container className="grid items-center gap-7 lg:grid-cols-[1.2fr_1fr] lg:gap-10">
        <div>
          <Badge variant="outline" className="border-white/30 bg-white/5 text-[10px] font-semibold tracking-wide text-white">
            BẮT ĐẦU NGAY
          </Badge>
          <h2 id="trial-signup-heading" className="mt-3 max-w-2xl text-xl leading-8 font-bold sm:text-2xl">
            {trialSignup.title}
          </h2>
          <p className="mt-2 text-xs leading-6 text-blue-50 sm:text-sm">
            {trialSignup.description}
          </p>
        </div>

        {/* shortcut: registration and OAuth destinations are pending; wire submissions before enabling these controls. */}
        <fieldset disabled aria-describedby="trial-signup-status" className="min-w-0">
          <legend className="sr-only">Đăng ký dùng thử MaxV</legend>
          <p id="trial-signup-status" className="sr-only">Đăng ký dùng thử hiện chưa khả dụng.</p>
          <div className="flex flex-col gap-2 rounded-xl border border-white/70 bg-white p-1.5 shadow-lg shadow-blue-950/10 sm:flex-row sm:items-center">
            <label htmlFor="trial-contact" className="sr-only">Số điện thoại hoặc email của bạn</label>
            <Input
              id="trial-contact"
              name="contact"
              type="text"
              placeholder="Nhập số điện thoại hoặc email của bạn"
              className="h-11 flex-1 border-0 bg-white text-foreground shadow-none placeholder:text-xs disabled:opacity-100"
            />
            <Button type="button" className="h-11 rounded-lg px-5 text-xs disabled:opacity-100">
              Đăng ký dùng thử <ArrowRight aria-hidden="true" />
            </Button>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <p className="w-full text-xs text-blue-50 sm:w-auto">Hoặc đăng ký nhanh qua</p>
            <Button type="button" variant="outline" className="h-9 min-w-28 rounded-lg border-white/70 bg-white text-xs text-muted-foreground disabled:opacity-100">
              <span aria-hidden="true" className="text-base font-bold text-[#4285f4]">G</span>
              Google
            </Button>
            <Button type="button" variant="outline" className="h-9 min-w-28 rounded-lg border-white/70 bg-white text-xs text-muted-foreground disabled:opacity-100">
              <span aria-hidden="true" className="grid size-4 grid-cols-2 gap-0.5">
                <span className="bg-[#f25022]" />
                <span className="bg-[#7fba00]" />
                <span className="bg-[#00a4ef]" />
                <span className="bg-[#ffb900]" />
              </span>
              Microsoft
            </Button>
          </div>
        </fieldset>
      </Container>
    </section>
  );
}
