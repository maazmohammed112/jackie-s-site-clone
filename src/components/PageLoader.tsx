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

  const stripHeights = [14, 20, 10, 18, 12, 22, 9, 19, 13, 21, 11, 17, 15];
  const dots = Array.from({ length: 8 });

  return (
    <div
      role="status"
      aria-label="Loading"
      className={`fixed inset-0 z-[10000] flex items-center justify-center bg-background transition-opacity duration-500 ${
        done ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex scale-[0.85] flex-col items-center drop-shadow-[0_10px_14px_rgba(0,0,0,0.28)] sm:scale-100">
        {/* paper feeding in */}
        <div className="h-[78px] w-[140px] overflow-hidden rounded-t-[4px]">
          <div className="loader-feed h-full w-full rounded-t-[4px] bg-chalk" />
        </div>

        {/* housing */}
        <div className="w-[150px] overflow-hidden rounded-xl">
          <div className="h-[9px] bg-paper-deep" />
          <div className="flex h-[52px] items-center justify-center gap-[10px] bg-primary">
            <div className="loader-dots relative h-[22px] w-[22px] flex-none">
              {dots.map((_, i) => (
                <span
                  key={i}
                  className="absolute left-1/2 top-1/2 -m-[2px] block h-[4px] w-[4px] rounded-full bg-primary-foreground"
                  style={{
                    transformOrigin: "2px 2px",
                    transform: `rotate(${i * 45}deg) translate(9px, 0)`,
                    opacity: 1 - i * 0.12,
                  }}
                />
              ))}
            </div>
            <span className="loader-pulse font-monohand text-[15px] font-bold lowercase tracking-[0.12em] text-primary-foreground">
              loading
            </span>
          </div>
          <div className="h-[7px] bg-primary/60" />
        </div>

        {/* shredded strips */}
        <div className="flex w-[118px] justify-between">
          {stripHeights.map((h, i) => (
            <span
              key={i}
              className={`loader-flutter block w-[6px] origin-top rounded-b-[3px] ${
                i % 2 ? "bg-paper-deep" : "bg-chalk"
              }`}
              style={{ height: `${h}px`, animationDelay: `${i * 0.06}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PageLoader;