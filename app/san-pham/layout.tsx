import { TrialSignup } from "@/app/_components/sections/trial-signup";

export default function Layout({ children }: LayoutProps<"/san-pham">) {
  return (
    <>
      {children}
      <TrialSignup />
    </>
  );
}
