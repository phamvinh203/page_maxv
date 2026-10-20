// Decorative rings for the blue brand-banner sections; the parent needs relative + isolate + overflow-hidden.
export function BannerCircles() {
  return (
    <>
      <div aria-hidden="true" className="pointer-events-none absolute -top-28 -left-20 -z-10 size-80 rounded-full border-[40px] border-white/5" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 -bottom-48 -z-10 size-96 rounded-full border-[50px] border-white/5" />
    </>
  );
}
