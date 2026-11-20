"use client";

import { ArrowRight } from "lucide-react";
import { useActionState, useState } from "react";

import { fieldClass, labelClass, newPasswordProps, required } from "@/app/(auth)/_components/auth-shell";
import { PasswordInput } from "@/app/(auth)/_components/password-input";
import { forgotPasswordAction, resetPasswordAction, type AuthState } from "@/app/api/auth/actions";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";

// Password reset runs in two steps on one page, mirroring the API: ask for an
// OTP by email, then submit the OTP together with the new password. Step 2
// redirects straight to /dang-nhap on success (see resetPasswordAction).
export function ForgotPasswordForm() {
  // null = email step; set to the address once step 1 succeeds (the action
  // returns the normalized email it sent the OTP to).
  const [email, setEmail] = useState<string | null>(null);

  const [emailState, submitEmail, emailPending] = useActionState<AuthState, FormData>(
    async (_prev, formData) => {
      const result = await forgotPasswordAction(_prev, formData);
      if (!result.error) setEmail(result.email ?? null);
      return result;
    },
    {},
  );

  // Step 2 — the action navigates to /dang-nhap itself; state only carries errors.
  const [resetState, submitReset, resetPending] = useActionState<AuthState, FormData>(
    resetPasswordAction,
    {},
  );

  if (email === null) {
    return (
      <form action={submitEmail} className="mt-8 space-y-4">
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

        {emailState.error && (
          <p role="alert" className="text-sm font-medium text-destructive">{emailState.error}</p>
        )}

        <Button
          type="submit"
          disabled={emailPending}
          className="h-12 w-full rounded-lg text-base disabled:opacity-100"
        >
          {emailPending ? "Đang gửi mã..." : "Gửi mã OTP"} <ArrowRight aria-hidden="true" />
        </Button>
      </form>
    );
  }

  const error = resetState.error ?? emailState.error;
  return (
    <form action={submitReset} className="mt-8 space-y-4">
      <input type="hidden" name="email" value={email} />

      <p className="rounded-xl bg-secondary/60 p-4 text-sm text-muted-foreground">
        Nhập mã 6 chữ số vừa gửi tới <span className="font-medium text-foreground">{email}</span>.
        Mã có hiệu lực 10 phút và hết hiệu lực sau 5 lần nhập sai.
      </p>

      <div>
        <label htmlFor="otp" className={labelClass}>
          Mã OTP {required}
        </label>
        <Input
          id="otp"
          name="otp"
          required
          inputMode="numeric"
          pattern="[0-9]{6}"
          maxLength={6}
          autoComplete="one-time-code"
          placeholder="Nhập 6 chữ số"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="newPassword" className={labelClass}>
          Mật khẩu mới {required}
        </label>
        <PasswordInput
          id="newPassword"
          name="newPassword"
          required
          {...newPasswordProps}
        />
      </div>

      <div>
        <label htmlFor="newPasswordConfirm" className={labelClass}>
          Xác nhận mật khẩu {required}
        </label>
        <PasswordInput
          id="newPasswordConfirm"
          name="newPasswordConfirm"
          required
          minLength={8}
          autoComplete="new-password"
          placeholder="Nhập lại mật khẩu mới"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={resetPending}
        className="h-12 w-full rounded-lg text-base disabled:opacity-100"
      >
        {resetPending ? "Đang đặt lại mật khẩu..." : "Đặt lại mật khẩu"} <ArrowRight aria-hidden="true" />
      </Button>

      <div className="flex items-center justify-between text-sm">
        {/* Gửi lại mã đi qua submitEmail với email đã có sẵn trong form. */}
        <button
          type="submit"
          formAction={submitEmail}
          disabled={emailPending}
          className="font-medium text-primary hover:underline disabled:opacity-50"
        >
          {emailPending ? "Đang gửi lại mã..." : "Gửi lại mã"}
        </button>
        <button
          type="button"
          onClick={() => setEmail(null)}
          className="font-medium text-muted-foreground hover:text-primary"
        >
          Dùng email khác
        </button>
      </div>
    </form>
  );
}
