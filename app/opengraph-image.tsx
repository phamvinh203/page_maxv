import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { site } from "@/app/_lib/seo";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logo = `data:image/png;base64,${await readFile(join(process.cwd(), "public/images/logo/Logo-Maxv-02.png"), "base64")}`;

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
        <div style={{ width: 240, height: 72, marginBottom: 36, backgroundImage: `url(${logo})`, backgroundSize: "contain", backgroundRepeat: "no-repeat" }} />
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
