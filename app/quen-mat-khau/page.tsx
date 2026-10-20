import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { AuthShell, fieldClass, labelClass } from "@/app/_components/sections/auth-shell";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { contact } from "@/app/_lib/contact";

export const metadata: Metadata = {
  title: "Quên mật khẩu",
  description: "Lấy lại mật khẩu tài khoản MaxV qua email hoặc số điện thoại đã đăng ký.",
  alternates: { canonical: "/quen-mat-khau" },
};

export default function Page() {
  return (
    <AuthShell>
      <Link href="/dang-nhap" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary">
        <ArrowLeft aria-hidden="true" className="size-4" />Quay lại đăng nhập
      </Link>
      <h1 className="mt-6 text-2xl font-bold text-primary sm:text-3xl">Quên mật khẩu?</h1>
      <p className="mt-2 text-sm text-muted-foreground">Nhập email hoặc số điện thoại đã đăng ký. MaxV sẽ gửi hướng dẫn đặt lại mật khẩu cho bạn.</p>

      {/* shortcut: no auth backend yet, so the form is display-only; wire a server action when password reset exists. */}
      <form className="mt-8 space-y-4">
        <div>
          <label htmlFor="username" className={labelClass}>Email hoặc số điện thoại</label>
          <Input id="username" name="username" required autoComplete="username" placeholder="Nhập email hoặc số điện thoại" className={fieldClass} />
        </div>
        <Button type="submit" disabled className="h-12 w-full rounded-lg text-base disabled:opacity-100">
          Gửi hướng dẫn <ArrowRight aria-hidden="true" />
        </Button>
      </form>

      <p className="mt-8 rounded-xl bg-secondary/60 p-4 text-sm text-muted-foreground">
        Không còn dùng email hoặc số điện thoại cũ? Gọi hotline{" "}
        <a href={contact.hotlineHref} className="font-semibold text-primary hover:underline">{contact.hotlineDisplay}</a>{" "}
        để được hỗ trợ khôi phục tài khoản.
      </p>
    </AuthShell>
  );
}
