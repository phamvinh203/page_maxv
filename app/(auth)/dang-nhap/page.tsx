import type { Metadata } from "next";
import Link from "next/link";

import { AuthShell, GoogleAuthButton } from "@/app/(auth)/_components/auth-shell";
import { LoginForm } from "@/app/(auth)/_components/login-form";

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

      <LoginForm />

      <GoogleAuthButton label="Đăng nhập bằng Google" />

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Chưa có tài khoản? <Link href="/dang-ky" className="font-semibold text-primary hover:underline">Đăng ký</Link>
      </p>
    </AuthShell>
  );
}
