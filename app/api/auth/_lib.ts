import type { NextResponse } from "next/server";

import { env } from "@/app/_lib/env";

export const API_BASE = env("API_BASE_URL");
export const APP_URL = env("APP_URL");
const APP_ORIGIN = new URL(APP_URL);
const COOKIE_DOMAIN = APP_ORIGIN.hostname.includes(".")
  ? `.${APP_ORIGIN.hostname.split(".").slice(-2).join(".")}`
  : undefined;
const COOKIE_SECURE = APP_ORIGIN.protocol === "https:";

const AUTH_COOKIES: readonly string[] = ["accessToken", "refreshToken"];

// Shared upstream POST. Parses the API's error envelope (error.message per the
// docs, else the top-level message the real errorHandler returns) once so every
// caller surfaces the same reason.
export async function postApi(path: string, body: unknown) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const data = (await res.json().catch(() => null)) as
    | { error?: { message?: string }; message?: string; mfaRequired?: boolean }
    | null;
  const message = data?.error?.message ?? data?.message ?? "Có lỗi xảy ra, vui lòng thử lại sau.";
  return { ok: res.ok, status: res.status, message, data, setCookies: res.headers.getSetCookie() };
}

// Cookie header for a follow-up call to the auth API, built from a login
// response's Set-Cookie list.
export function authCookieHeader(setCookies: string[]): string {
  return setCookies
    .map((raw) => raw.split(";")[0])
    .filter((pair) => AUTH_COOKIES.some((name) => pair.startsWith(`${name}=`)))
    .join("; ");
}

// Relay the API's new session tokens to the browser. Empty values are the
// API's cookie-clearing directives for its own /api/v1 paths — skip those.
export function relaySessionCookies(out: NextResponse, setCookies: string[]) {
  for (const raw of setCookies) {
    const [pair] = raw.split(";");
    const eq = pair.indexOf("=");
    const name = pair.slice(0, eq);
    const value = pair.slice(eq + 1);
    if (!AUTH_COOKIES.includes(name) || !value) continue;
    out.cookies.set(name, value, {
      ...(COOKIE_DOMAIN ? { domain: COOKIE_DOMAIN } : {}),
      httpOnly: true,
      secure: COOKIE_SECURE,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });
  }
}
