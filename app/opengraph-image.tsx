import { ImageResponse } from "next/og";

import { site } from "@/app/_lib/seo";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          padding: "70px 80px",
          background: "linear-gradient(135deg, #f0faff, #dcefff)",
          color: "#12395b",
        }}
      >
        <div style={{ display: "flex", fontSize: 48, fontWeight: 700, color: "#0068d9", marginBottom: 36 }}>
          MaxV
        </div>
        <div style={{ display: "flex", fontSize: 62, fontWeight: 700, lineHeight: 1.25 }}>
          Kế toán nhanh hơn.
        </div>
        <div style={{ display: "flex", fontSize: 62, fontWeight: 700, lineHeight: 1.25, color: "#0068d9" }}>
          Quản trị tài chính dễ hơn.
        </div>
        <div style={{ display: "flex", fontSize: 26, marginTop: 36 }}>
          Phần mềm kế toán online cho doanh nghiệp
        </div>
        <div style={{ display: "flex", fontSize: 22, marginTop: 42, color: "#526b7e" }}>
          {new URL(site.url).hostname}
        </div>
      </div>
    ),
    size,
  );
}
