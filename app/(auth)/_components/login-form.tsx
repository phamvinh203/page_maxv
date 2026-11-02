"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

import { fieldClass, labelClass } from "@/app/(auth)/_components/auth-shell";
import { PasswordInput } from "@/app/(auth)/_components/password-input";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";

// Login can't be a server action: this Next build drops Set-Cookie on action
// responses, but login must relay the API session to the browser. It posts to
// the /api/auth/login route handler, which relays the cookies; on success we
// navigate cross-origin with a full page load so hddt.maxv.vn sees them.
export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);
    const form = event.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: data.get("username"),
          password: data.get("password"),
        }),
      });
      const out = (await res.json().catch(() => null)) as { error?: string; appUrl?: string } | null;
      if (!res.ok) {
        setError(out?.error ?? "Có lỗi xảy ra, vui lòng thử lại sau.");
        return;
      }
      window.location.assign(out?.appUrl ?? "/");
    } catch {
      setError("Không kết nối được máy chủ, vui lòng thử lại sau.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-4">
      <div>
        <label htmlFor="username" className={labelClass}>Email</label>
        <Input id="username" name="username" type="email" required autoComplete="username" placeholder="Nhập email" className={fieldClass} />
      </div>
      <div>
        <label htmlFor="password" className={labelClass}>Mật khẩu</label>
        <PasswordInput id="password" name="password" required autoComplete="current-password" placeholder="Nhập mật khẩu" />
      </div>
      {/* After the password field, so Tab goes username → password without stopping on the link. */}
      <div className="text-right">
        <Link href="/quen-mat-khau" className="text-sm font-medium text-primary hover:underline">Quên mật khẩu?</Link>
      </div>
      {error && (
        <p role="alert" className="text-sm font-medium text-destructive">{error}</p>
      )}
      <Button type="submit" disabled={pending} className="h-12 w-full rounded-lg text-base disabled:opacity-100">
        {pending ? "Đang đăng nhập..." : "Đăng nhập"} <ArrowRight aria-hidden="true" />
      </Button>
    </form>
  );
}
