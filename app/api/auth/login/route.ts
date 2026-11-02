import { NextResponse } from "next/server";

import { API_BASE, APP_URL, authCookieHeader, postApi, relaySessionCookies } from "@/app/api/auth/_lib";

// Server actions don't flush Set-Cookie in this Next build, so login runs as a
// route handler: it can relay the API's session tokens as .maxv.vn cookies so
// the browser carries the session when the client redirects to hddt.maxv.vn
// (which authenticates against api.maxv.vn by cookie). Browsers drop them on
// localhost — dev still works, hddt just asks to log in again there.
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | { email?: string; password?: string }
    | null;
  if (!body?.email || !body.password) {
    return NextResponse.json({ error: "Thiếu email hoặc mật khẩu." }, { status: 400 });
  }

  const { ok, status, message, data, setCookies } = await postApi("/auth/login", {
    email: body.email,
    password: body.password,
  });
  if (!ok) {
    return NextResponse.json({ error: message }, { status });
  }

  if (data?.mfaRequired) {
    return NextResponse.json({ ok: true, appUrl: APP_URL });
  }

  // Confirm the session is live before sending the user to the app.
  const me = await fetch(`${API_BASE}/auth/me`, {
    headers: { cookie: authCookieHeader(setCookies) },
    cache: "no-store",
  });
  if (!me.ok) {
    return NextResponse.json(
      { error: "Không xác thực được phiên đăng nhập, vui lòng thử lại." },
      { status: 502 },
    );
  }

  const out = NextResponse.json({ ok: true, appUrl: APP_URL });
  relaySessionCookies(out, setCookies);
  return out;
}
