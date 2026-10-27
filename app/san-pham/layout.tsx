import { TrialSignup } from "@/app/_components/sections/trial-signup";
import { HideOn } from "./_components/hide-on";

export default function Layout({ children }: LayoutProps<"/san-pham">) {
  return (
    <>
      {children}
      {/* MaxV HKD has its own consultation form at the bottom. */}
      <HideOn path="/san-pham/maxv-hkd">
        <TrialSignup />
      </HideOn>
    </>
  );
}
