import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AuthShell, GoogleAuthButton, fieldClass, labelClass } from "@/app/(auth)/_components/auth-shell";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Đăng nhập tài khoản MaxV để quản lý hóa đơn điện tử, tờ khai thuế và sổ sách kế toán.",
  alternates: { canonical: "/dang-nhap" },
};

export default function Page() {
  return (
    <AuthShell>
      <h1 className="text-2xl font-bold text-primary sm:text-3xl">Đăng nhập MaxV</h1>
      <p className="mt-2 text-sm text-muted-foreground">Chào mừng bạn quay lại. Đăng nhập để tiếp tục công việc.</p>

      {/* shortcut: no auth backend yet, so the form is display-only; wire a server action when login exists. */}
      <form className="mt-8 space-y-4">
        <div>
          <label htmlFor="username" className={labelClass}>Email hoặc số điện thoại</label>
          <Input id="username" name="username" required autoComplete="username" placeholder="Nhập email hoặc số điện thoại" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="password" className={labelClass}>Mật khẩu</label>
          <Input id="password" name="password" type="password" required autoComplete="current-password" placeholder="Nhập mật khẩu" className={fieldClass} />
        </div>
        {/* After the password field, so Tab goes username → password without stopping on the link. */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input type="checkbox" name="remember" className="size-4" />
            Ghi nhớ đăng nhập
          </label>
          <Link href="/quen-mat-khau" className="text-sm font-medium text-primary hover:underline">Quên mật khẩu?</Link>
        </div>
        <Button type="submit" disabled className="h-12 w-full rounded-lg text-base disabled:opacity-100">
          Đăng nhập <ArrowRight aria-hidden="true" />
        </Button>
      </form>

      <GoogleAuthButton label="Đăng nhập bằng Google" />

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Chưa có tài khoản? <Link href="/dang-ky" className="font-semibold text-primary hover:underline">Đăng ký</Link>
      </p>
    </AuthShell>
  );
}
