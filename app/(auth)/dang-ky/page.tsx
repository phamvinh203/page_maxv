import type { Metadata } from "next";
import Link from "next/link";

import {
  AuthShell,
  GoogleAuthButton,
} from "@/app/(auth)/_components/auth-shell";
import { RegisterForm } from "@/app/(auth)/_components/register-form";
import { trialSignup } from "@/app/_data/trial-signup";

export const metadata: Metadata = {
  title: "Dùng thử miễn phí",
  description: trialSignup.description,
  alternates: { canonical: "/dang-ky" },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <AuthShell trial>
      <h1 className="text-2xl font-bold text-primary sm:text-3xl">
        Đăng ký MaxV miễn phí
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {trialSignup.description}
      </p>

      <RegisterForm />

      <GoogleAuthButton label="Đăng ký bằng Google" />

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Đã có tài khoản?{" "}
        <Link
          href="/dang-nhap"
          className="font-semibold text-primary hover:underline"
        >
          Đăng nhập
        </Link>
      </p>
    </AuthShell>
  );
}
