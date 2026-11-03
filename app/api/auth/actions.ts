"use server";

import { redirect } from "next/navigation";

import { postApi } from "@/app/api/auth/_lib";
import { RESET_DONE_QUERY } from "@/app/(auth)/_components/auth-shell";

export type AuthState = { error?: string; email?: string };

const PASSWORD_MISMATCH = "Mật khẩu nhập lại không khớp.";

export async function registerAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const password = String(formData.get("password"));
  if (password !== formData.get("passwordConfirm")) {
    return { error: PASSWORD_MISMATCH };
  }
  const { ok, message } = await postApi("/auth/register", {
    hoTen: formData.get("name"),
    email: formData.get("email"),
    sdt: formData.get("phone"),
    password,
  });
  if (!ok) return { error: message };
  // Registered: send the user to login with their new account.
  redirect("/dang-nhap");
}

// Step 1 of password reset: the API emails a 6-digit OTP (10-minute TTL,
// max 5 wrong entries) to the account's address.
export async function forgotPasswordAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const { ok, message } = await postApi("/auth/forgot-password", { email });
  if (!ok) return { error: message };
  // Echo the normalized email back so the client shows/resends exactly what the API received.
  return { email };
}

// Step 2: OTP + new password in one request. A successful reset bumps the
// account's tokenVersion server-side, so old sessions die and the user
// logs in again with the new password.
export async function resetPasswordAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const newPassword = String(formData.get("newPassword"));
  if (newPassword !== formData.get("newPasswordConfirm")) {
    return { error: PASSWORD_MISMATCH };
  }
  const email = String(formData.get("email") ?? "").trim();
  const otp = String(formData.get("otp") ?? "").trim();
  const { ok, message } = await postApi("/auth/reset-password", { email, otp, newPassword });
  if (!ok) return { error: message };
  // Reset done: like registration, go straight to login. The ?dat-lai flag tells
  // that page to confirm the change (so the user signs in with the NEW password).
  redirect(`/dang-nhap?${RESET_DONE_QUERY}=1`);
}
