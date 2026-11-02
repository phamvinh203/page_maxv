"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useActionState } from "react";

import { fieldClass, labelClass } from "@/app/(auth)/_components/auth-shell";
import { PasswordInput } from "@/app/(auth)/_components/password-input";
import { registerAction, type AuthState } from "@/app/api/auth/actions";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";

const required = <span className="text-destructive">*</span>;

export function RegisterForm() {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(registerAction, {});

  return (
    <form action={formAction} className="mt-8">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className={labelClass}>
            Họ và tên {required}
          </label>
          <Input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Nguyễn Văn A"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email {required}
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="ban@congty.vn"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Số điện thoại {required}
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            required
            pattern="0[0-9]{9}"
            title="Số điện thoại gồm 10 số, bắt đầu bằng 0"
            autoComplete="tel"
            placeholder="0901234567"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="password" className={labelClass}>
            Mật khẩu {required}
          </label>
          <PasswordInput
            id="password"
            name="password"
            required
            minLength={8}
            pattern="(?=.*[A-Za-z])(?=.*\d).{8,}"
            title="Mật khẩu tối thiểu 8 ký tự, gồm cả chữ và số"
            autoComplete="new-password"
            placeholder="Tối thiểu 8 ký tự, gồm chữ và số"
          />
        </div>

        <div>
          <label htmlFor="passwordConfirm" className={labelClass}>
            Xác nhận mật khẩu {required}
          </label>
          <PasswordInput
            id="passwordConfirm"
            name="passwordConfirm"
            required
            minLength={8}
            autoComplete="new-password"
            placeholder="Nhập lại mật khẩu"
          />
        </div>
      </div>

      {/* Link nằm ngoài label để click vào nó không toggle checkbox. */}
      <p className="mt-5 flex items-start gap-2 text-sm text-muted-foreground">
        <input
          id="consent"
          type="checkbox"
          name="consent"
          required
          aria-label="Tôi đồng ý với chính sách bảo mật"
          className="mt-0.5 size-4"
        />
        <span>
          <label htmlFor="consent" className="cursor-pointer">Tôi đồng ý với </label>
          <Link href="/chinh-sach-bao-mat" className="text-primary underline">
            chính sách bảo mật
          </Link>
        </span>
      </p>

      {state.error && (
        <p role="alert" className="mt-4 text-sm font-medium text-destructive">{state.error}</p>
      )}

      <Button
        type="submit"
        disabled={pending}
        className="mt-6 h-12 w-full rounded-lg text-base disabled:opacity-100"
      >
        {pending ? "Đang tạo tài khoản..." : "Tạo tài khoản"} <ArrowRight aria-hidden="true" />
      </Button>
    </form>
  );
}
