import { Bell, BookOpen, Briefcase, Building2, Calculator, FileText, Gift, Lightbulb, Megaphone, Newspaper, type LucideIcon } from "lucide-react";

export const newsOverview = {
  label: "Tin tức",
  description: "Cập nhật thông báo, sự kiện, hướng dẫn kế toán và các thông tin mới nhất từ MaxV Việt Nam.",
};

/** Tên icon danh mục do API trả (NEWS_CATEGORY_ICONS của be_maxv, OQ-05) → component lucide. */
const newsIcons: Record<string, LucideIcon> = {
  Bell, Gift, Calculator, Building2, FileText, Newspaper, Megaphone, BookOpen, Lightbulb, Briefcase,
};

export const newsIcon = (name: string | undefined): LucideIcon => (name && newsIcons[name]) || Newspaper;

/** Ngày theo giờ Việt Nam, dạng dd/mm/yyyy. */
export const formatNewsDate = (date: string) =>
  new Date(date).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "Asia/Ho_Chi_Minh" });
