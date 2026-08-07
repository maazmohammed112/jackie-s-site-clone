import { useEffect, useState } from "react";

/** Paper-shredder style loading animation shown on every page load. */
export function PageLoader() {
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setDone(true), 2200);
    const t2 = setTimeout(() => setHidden(true), 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = hidden ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [hidden]);

  if (hidden) return null;

  const strips = Array.from({ length: 11 });

  return (
    <div
      role="status"
      aria-label="Loading"
      className={`fixed inset-0 z-[10000] flex items-center justify-center bg-background transition-opacity duration-500 ${
        done ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative flex w-[260px] flex-col items-center sm:w-[320px]">
        <div className="relative h-[86px] w-[150px] overflow-hidden sm:h-[100px] sm:w-[180px]">
          <div className="loader-sheet absolute inset-x-0 top-0 h-full rounded-[3px] bg-chalk shadow-[0_10px_24px_-14px_oklch(0_0_0/70%)]" />
        </div>

        <div className="relative z-10 flex h-[58px] w-full items-center justify-center gap-3 rounded-xl bg-primary text-primary-foreground shadow-[0_16px_34px_-16px_oklch(0_0_0/80%)]">
          <span className="loader-spin block h-[18px] w-[18px] rounded-full border-[3px] border-primary-foreground/35 border-t-primary-foreground" />
          <span className="font-monohand text-[15px] font-bold tracking-[0.14em] lowercase">
            loading
          </span>
        </div>

        <div className="relative z-0 flex h-[74px] w-[70%] justify-between px-2">
          {strips.map((_, i) => (
            <span
              key={i}
              className="loader-strip block w-[5px] rounded-b-[2px] bg-chalk"
              style={{ animationDelay: `${(i % 4) * 0.18 + i * 0.03}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PageLoader;