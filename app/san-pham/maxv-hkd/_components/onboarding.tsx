import { MessageCircle, Settings, UserRound } from "lucide-react";
import { Heading } from "./heading";
import { ButtonLink } from "@/app/_components/ui/button-link";
import { Container } from "@/app/_components/ui/container";

export function Onboarding() {
  return (
    <section aria-labelledby="onboarding-heading" className="rounded-t-2xl bg-sky-50 py-8">
      <Container className="grid items-center gap-7 lg:grid-cols-[1fr_1.8fr]">
        <div><Heading id="onboarding-heading"><span className="text-blue-600">Bắt đầu</span> có hướng dẫn,<br /><span className="text-blue-600">sử dụng có hỗ trợ</span></Heading><p className="mt-3">Đội ngũ MaxV đồng hành để bạn dễ dàng làm quen và sử dụng phần mềm hiệu quả.</p><ButtonLink href="/lien-he" className="mt-4">Nhận tư vấn cho hộ kinh doanh</ButtonLink></div>
        <ol className="grid gap-5 sm:grid-cols-3">
          {[
            { icon: MessageCircle, title: "Trao đổi nhu cầu", description: "Tư vấn giải pháp phù hợp với mô hình và cách thức quản lý hiện tại." },
            { icon: Settings, title: "Thiết lập dữ liệu", description: "Hỗ trợ khởi tạo dữ liệu ban đầu theo hướng dẫn." },
            { icon: UserRound, title: "Hướng dẫn sử dụng", description: "Hướng dẫn các thao tác quan trọng và giải đáp trong quá trình sử dụng." },
          ].map(({ icon: Icon, title, description }, index) => <li key={title} className="rounded-xl border border-sky-100 bg-white p-5 shadow-sm"><div className="mb-3 flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">{String(index + 1).padStart(2, "0")}</span><Icon aria-hidden="true" className="size-11 rounded-full bg-sky-50 p-2.5 text-blue-600" /></div><h3 className="text-sm font-bold text-[#082967]">{title}</h3><p className="mt-2 text-sm text-blue-900/75">{description}</p></li>)}
        </ol>
      </Container>
    </section>
  );
}
