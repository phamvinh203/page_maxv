import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <svg width="180" height="180" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" fill="#0068d9" />
        <path d="M10 46V18h7l7 13 7-13h7v28h-7V30l-7 12-7-12v16z" fill="#fff" />
        <path d="m40 20 7 18 7-18h6L49 46h-5L34 20z" fill="#6ee7ef" />
      </svg>
    ),
    size,
  );
}
