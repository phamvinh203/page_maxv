"use server";

import { redirect } from "next/navigation";

import { postApi } from "@/app/api/auth/_lib";

export type AuthState = { error?: string };

export async function registerAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const password = String(formData.get("password"));
  if (password !== formData.get("passwordConfirm")) {
    return { error: "Mật khẩu nhập lại không khớp." };
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
