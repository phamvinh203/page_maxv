import { ChevronDown } from "lucide-react";
import { Heading } from "./heading";
import { hkdFaqs } from "@/app/_data/maxv-hkd";
import { Container } from "@/app/_components/ui/container";

export function Faq() {
  return (
    <section id="cau-hoi" aria-labelledby="faq-heading" className="bg-linear-to-br from-white to-sky-50 py-10">
      <Container>
        <p className="inline-block rounded-full border border-blue-400 px-4 py-1 text-xs font-semibold text-blue-600">CÂU HỎI THƯỜNG GẶP</p>
        <Heading id="faq-heading">Giải đáp trước khi bắt đầu</Heading>
        <div className="mt-5 space-y-2">
          {hkdFaqs.map(({ q: question, a: answer }, index) => (
            <details key={question} open={index < 2} className="group rounded-xl border border-sky-100 bg-white p-3 shadow-sm">
              <summary className="flex cursor-pointer list-none items-center gap-4 rounded-md font-semibold text-[#082967] focus-visible:outline-2 focus-visible:outline-blue-600 [&::-webkit-details-marker]:hidden"><span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">{String(index + 1).padStart(2, "0")}</span><span className="flex-1 text-sm sm:text-base">{question}</span><ChevronDown aria-hidden="true" className="mr-2 size-5 shrink-0 transition-transform group-open:rotate-180" /></summary>
              <p className="mt-2 rounded-lg bg-sky-50 px-4 py-3 text-sm sm:pl-14">{answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
