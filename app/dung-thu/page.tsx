import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AuthShell, GoogleAuthButton, fieldClass, labelClass } from "@/app/_components/sections/auth-shell";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { modules } from "@/app/_data/pricing";
import { trialSignup } from "@/app/_data/trial-signup";

export const metadata: Metadata = {
  title: "Dùng thử miễn phí",
  description: trialSignup.description,
  alternates: { canonical: "/dung-thu" },
};

const required = <span className="text-red-500">*</span>;

export default function Page() {
  return (
    <AuthShell trial>
      <h1 className="text-2xl font-bold text-primary sm:text-3xl">Dùng thử MaxV miễn phí</h1>
      <p className="mt-2 text-sm text-muted-foreground">{trialSignup.description}</p>

      {/* shortcut: no registration backend yet, so the form is display-only; wire a server action when signup exists. */}
      <form className="mt-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClass}>Họ và tên {required}</label>
            <Input id="name" name="name" required autoComplete="name" placeholder="Nguyễn Văn A" className={fieldClass} />
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>Số điện thoại {required}</label>
            <Input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="09xx xxx xxx" className={fieldClass} />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>Email {required}</label>
            <Input id="email" name="email" type="email" required autoComplete="email" placeholder="ban@congty.vn" className={fieldClass} />
          </div>
          <div>
            <label htmlFor="taxCode" className={labelClass}>Mã số thuế</label>
            <Input id="taxCode" name="taxCode" pattern="\d{10}(-\d{3})?" placeholder="10 hoặc 13 số" className={fieldClass} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="company" className={labelClass}>Tên doanh nghiệp {required}</label>
            <Input id="company" name="company" required autoComplete="organization" placeholder="Công ty TNHH ..." className={fieldClass} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="password" className={labelClass}>Mật khẩu {required}</label>
            <Input id="password" name="password" type="password" required minLength={8} autoComplete="new-password" placeholder="Tối thiểu 8 ký tự" className={fieldClass} />
          </div>
        </div>

        <fieldset className="mt-5">
          <legend className={labelClass}>Bạn quan tâm đến</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {modules.filter(({ soon }) => !soon).map(({ key, short }) => (
              <label key={key} className="cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium has-checked:border-primary has-checked:bg-primary has-checked:text-primary-foreground has-focus-visible:ring-2 has-focus-visible:ring-primary">
                <input type="checkbox" name="modules" value={key} className="sr-only" />
                {short}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
          <input type="checkbox" name="consent" required className="size-4" />
          Tôi đồng ý với <Link href="/chinh-sach-bao-mat" className="text-primary underline">chính sách bảo mật</Link>
        </label>

        <Button type="submit" disabled className="mt-6 h-12 w-full rounded-lg text-base disabled:opacity-100">
          Tạo tài khoản dùng thử <ArrowRight aria-hidden="true" />
        </Button>
      </form>

      <GoogleAuthButton label="Đăng ký bằng Google" />

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Đã có tài khoản? <Link href="/dang-nhap" className="font-semibold text-primary hover:underline">Đăng nhập</Link>
      </p>
    </AuthShell>
  );
}
