// Required, no hardcoded fallback: a missing env must fail loudly here,
// not silently route dev traffic at the production API.
export function env(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Thiếu biến môi trường ${name} — khai báo trong .env(.local).`);
  return value;
}
