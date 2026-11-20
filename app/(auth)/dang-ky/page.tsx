import { Suspense } from "react";
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

// searchParams là dữ liệu runtime — truyền Promise xuống và await trong <Suspense>
// để khung trang prerender tĩnh, chỉ phần form được stream theo request (cacheComponents).
export default function Page({ searchParams }: PageProps<"/dang-ky">) {
  return (
    <AuthShell trial>
      <h1 className="text-2xl font-bold text-primary sm:text-3xl">
        Đăng ký MaxV miễn phí
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {trialSignup.description}
      </p>

      <Suspense fallback={<RegisterFormFallback />}>
        <RegisterSection searchParams={searchParams} />
      </Suspense>

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

/** Đọc ?contact=... (form dùng thử trang chủ đẩy sang) và prefill form đăng ký. */
async function RegisterSection({
  searchParams,
}: {
  searchParams: PageProps<"/dang-ky">["searchParams"];
}) {
  // Anything that isn't an email is treated as a phone number — the form's own
  // pattern validation will bounce a bad value.
  const raw = (await searchParams).contact;
  const contact = Array.isArray(raw) ? raw[0] : raw;
  const defaultEmail = contact?.includes("@") ? contact : undefined;
  const defaultPhone = contact && !contact.includes("@") ? contact : undefined;
  return <RegisterForm defaultEmail={defaultEmail} defaultPhone={defaultPhone} />;
}

/** Dựng khung placeholder cao tương đương form để không giật layout khi stream. */
function RegisterFormFallback() {
  return (
    <div aria-hidden="true" className="mt-6 space-y-4">
      <div className="h-10 animate-pulse rounded-lg bg-muted" />
      <div className="h-10 animate-pulse rounded-lg bg-muted" />
      <div className="h-10 animate-pulse rounded-lg bg-muted" />
      <div className="h-11 animate-pulse rounded-lg bg-muted" />
    </div>
  );
}
