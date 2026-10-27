"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { contact } from "@/app/_lib/contact";

export function ConsultationForm() {
  return (
    <form className="rounded-xl bg-white p-6 text-[#103578] shadow-lg" onSubmit={(event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const body = `Họ và tên: ${data.get("name")}\nSố điện thoại: ${data.get("phone")}\nLĩnh vực kinh doanh: ${data.get("industry") || "Chưa chọn"}\nTôi muốn được tư vấn và dùng thử MaxV HKD.`;
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent("Đăng ký tư vấn MaxV HKD")}&body=${encodeURIComponent(body)}`;
    }}>
      <h3 className="text-xl font-bold text-[#082967]">Đăng ký tư vấn &amp; dùng thử</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium" htmlFor="hkd-name">Họ và tên *<Input id="hkd-name" name="name" autoComplete="name" required maxLength={100} pattern=".*\S.*" placeholder="Nhập họ và tên" className="mt-1" /></label>
        <label className="text-sm font-medium" htmlFor="hkd-phone">Số điện thoại *<Input id="hkd-phone" name="phone" type="tel" autoComplete="tel" required pattern="[+]?[0-9]{9,15}" title="Nhập từ 9 đến 15 chữ số, có thể bắt đầu bằng dấu +" placeholder="Nhập số điện thoại" className="mt-1" /></label>
      </div>
      <label htmlFor="hkd-industry" className="mt-4 block text-sm font-medium">Lĩnh vực kinh doanh (không bắt buộc)</label>
      <select id="hkd-industry" name="industry" className="mt-1 h-10 w-full rounded-md border border-input bg-white px-3 text-sm focus-visible:outline-2 focus-visible:outline-blue-600">
        <option value="">Chọn lĩnh vực kinh doanh</option>
        {["Cửa hàng bán lẻ", "Thương mại", "Dịch vụ", "Sản xuất nhỏ", "Khác"].map(value => <option key={value}>{value}</option>)}
      </select>
      <label className="mt-4 flex items-start gap-2 text-sm"><input name="consent" type="checkbox" required className="mt-1 size-4 accent-blue-600" /><span>Tôi đồng ý để MaxV liên hệ tư vấn qua thông tin đã cung cấp.</span></label>
      <Button type="submit" className="mt-4 w-full">Đăng ký tư vấn &amp; dùng thử <ArrowRight aria-hidden="true" /></Button>
      <p className="mt-3 text-xs text-blue-900/70">Nút đăng ký mở ứng dụng email với nội dung đã điền. Bạn cần gửi email để hoàn tất, hoặc gọi {contact.hotlineDisplay}.</p>
    </form>
  );
}
