"use server";

import { postApi } from "@/app/api/auth/_lib";

export type ContactLeadState = { error?: string; message?: string };

// Consent version shown on the privacy page. Must stay in the API's
// LEAD_CONSENT_VERSIONS whitelist or intake answers 409 CONSENT_VERSION_CHANGED.
const CONSENT_VERSION = "privacy-v1";

// POST /public/leads (plan 6.5): contact form on /lien-he. Empty optional
// fields are omitted — the API's zod rules reject empty strings, not just null.
export async function sendContactLeadAction(
  _prev: ContactLeadState,
  formData: FormData,
): Promise<ContactLeadState> {
  const idempotencyKey = String(formData.get("idempotencyKey") ?? "");
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const { ok, message: apiMessage, data } = await postApi(
    "/public/leads",
    {
      type: "contact",
      topic: formData.get("topic"),
      name: formData.get("name"),
      phone: formData.get("phone"),
      ...(email ? { email } : {}),
      ...(message ? { message } : {}),
      sourcePath: "/lien-he",
      consent: formData.get("consent") != null,
      consentVersion: CONSENT_VERSION,
      // Honeypot: real users never see this field; bots fill it and the API
      // answers a fake receipt without storing anything.
      website: String(formData.get("website") ?? ""),
    },
    { "Idempotency-Key": idempotencyKey },
  );
  if (!ok) return { error: apiMessage };
  const receipt = (data as { data?: { message?: string } } | null)?.data?.message;
  return { message: receipt ?? "Đã tiếp nhận thông tin của bạn. Chúng tôi sẽ liên hệ trong thời gian sớm nhất." };
}
