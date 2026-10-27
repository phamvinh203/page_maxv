import { Phone } from "lucide-react";
import { contact } from "@/app/_lib/contact";
import { ConsultationForm } from "./consultation-form";
import { Container } from "@/app/_components/ui/container";

export function Consultation() {
  return (
    <section id="tu-van-hkd" aria-labelledby="consultation-heading" className="rounded-t-2xl bg-linear-to-br from-blue-500 via-blue-600 to-sky-500 py-10 text-white">
      <Container className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="inline-block rounded-full border border-white/60 px-4 py-1 text-xs font-semibold">LIÊN HỆ TƯ VẤN</p>
          <h2 id="consultation-heading" className="mt-4 text-3xl leading-tight font-bold sm:text-4xl">Bắt đầu quản lý sổ sách dễ dàng hơn cùng MaxV HKD</h2>
          <p className="mt-4 max-w-lg text-lg text-blue-50">Để lại thông tin, chúng tôi sẽ liên hệ tư vấn và hướng dẫn phù hợp với nhu cầu của bạn.</p>
          <a href={contact.hotlineHref} className="mt-5 inline-flex items-center gap-4 rounded-3xl border border-white/60 bg-white/10 px-5 py-3 hover:bg-white/20"><Phone aria-hidden="true" className="size-12 rounded-full bg-white p-3 text-blue-600" /><span><span className="block text-sm">Hotline tư vấn</span><strong className="text-3xl">{contact.hotlineDisplay}</strong></span></a>
        </div>
        <ConsultationForm />
      </Container>
    </section>
  );
}
