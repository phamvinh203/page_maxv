import { ArrowRight } from "lucide-react";

import { StepCard } from "@/app/_components/sections/step-card";
import { Container } from "@/app/_components/ui/container";
import { SectionHeading } from "@/app/_components/ui/section-heading";
import { workflowSteps } from "@/app/_data/workflow";

export function Workflow() {
  return (
    <section
      id="quy-trinh"
      aria-labelledby="workflow-heading"
      className="bg-section-fade py-10 sm:py-12"
    >
      <Container>
        <SectionHeading
          id="workflow-heading"
          className="sm:text-2xl lg:text-2xl"
        >
          Một ngày làm kế toán với MaxV
        </SectionHeading>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          Đơn giản hóa quy trình, tự động hóa công việc, tập trung vào giá trị thực.
        </p>

        <ol
          role="list"
          aria-label="Quy trình kế toán với MaxV"
          className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {workflowSteps.map(({ id, title, description }, index) => (
            <li key={id} className="group relative min-w-0">
              <StepCard compact index={index} title={title} description={description} />
              <ArrowRight
                aria-hidden="true"
                className="absolute top-1/2 -right-5 hidden size-4 -translate-y-1/2 text-primary/35 group-last:hidden xl:block"
              />
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
