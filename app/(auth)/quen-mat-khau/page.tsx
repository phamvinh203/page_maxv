import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { AuthShell } from "@/app/(auth)/_components/auth-shell";
import { ForgotPasswordForm } from "@/app/(auth)/_components/forgot-password-form";
import { contact } from "@/app/_lib/contact";

export const metadata: Metadata = {
  title: "Quên mật khẩu",
  description: "Lấy lại mật khẩu tài khoản MaxV qua mã OTP gửi vào email đã đăng ký.",
  alternates: { canonical: "/quen-mat-khau" },
};

export default function Page() {
  return (
    <AuthShell>
      <Link href="/dang-nhap" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary">
        <ArrowLeft aria-hidden="true" className="size-4" />Quay lại đăng nhập
      </Link>
      <h1 className="mt-6 text-2xl font-bold text-primary sm:text-3xl">Quên mật khẩu?</h1>
      <p className="mt-2 text-sm text-muted-foreground">Nhập email đã đăng ký. MaxV sẽ gửi mã OTP để bạn đặt lại mật khẩu mới.</p>

      <ForgotPasswordForm />

      <p className="mt-8 rounded-xl bg-secondary/60 p-4 text-sm text-muted-foreground">
        Không còn dùng email cũ? Gọi hotline{" "}
        <a href={contact.hotlineHref} className="font-semibold text-primary hover:underline">{contact.hotlineDisplay}</a>{" "}
        để được hỗ trợ khôi phục tài khoản.
      </p>
    </AuthShell>
  );
}
