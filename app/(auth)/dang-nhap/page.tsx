import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CircleCheck } from "lucide-react";

import { AuthShell, GoogleAuthButton, RESET_DONE_QUERY } from "@/app/(auth)/_components/auth-shell";
import { LoginForm } from "@/app/(auth)/_components/login-form";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Đăng nhập tài khoản MaxV để quản lý hóa đơn điện tử, tờ khai thuế và sổ sách kế toán.",
  alternates: { canonical: "/dang-nhap" },
};

export default function Page({ searchParams }: PageProps<"/dang-nhap">) {
  return (
    <AuthShell>
      <h1 className="text-2xl font-bold text-primary sm:text-3xl">Đăng nhập MaxV</h1>
      <p className="mt-2 text-sm text-muted-foreground">Chào mừng bạn quay lại. Đăng nhập để tiếp tục công việc.</p>

      {/* Suspense boundary keeps the page's prerendered shell; only requests
          carrying the reset flag need the dynamic render. */}
      <Suspense>
        <ResetDoneBanner searchParams={searchParams} />
      </Suspense>

      <LoginForm />

      <GoogleAuthButton label="Đăng nhập bằng Google" />

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Chưa có tài khoản? <Link href="/dang-ky" className="font-semibold text-primary hover:underline">Đăng ký</Link>
      </p>
    </AuthShell>
  );
}

async function ResetDoneBanner({ searchParams }: Pick<PageProps<"/dang-nhap">, "searchParams">) {
  if (!(await searchParams)[RESET_DONE_QUERY]) return null;
  return (
    <p role="status" className="mt-6 flex items-start gap-3 rounded-xl bg-secondary/60 p-4 text-sm text-muted-foreground">
      <CircleCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
      Đã đặt lại mật khẩu thành công. Hãy đăng nhập bằng mật khẩu mới.
    </p>
  );
}
