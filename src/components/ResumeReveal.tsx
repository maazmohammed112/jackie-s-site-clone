import { useEffect, useRef, useState } from "react";
import { FileText } from "lucide-react";

const RESUME_URL = "/Mohammed-Maaz-Resume.pdf";

type Phase = "tearing" | "preparing" | "opening" | "done";

const SHARDS = [
  "polygon(0 0, 46% 0, 34% 30%, 12% 24%, 0 46%)",
  "polygon(46% 0, 100% 0, 100% 34%, 74% 26%, 58% 34%)",
  "polygon(100% 34%, 100% 100%, 62% 100%, 76% 72%, 70% 48%)",
  "polygon(0 46%, 20% 62%, 34% 82%, 30% 100%, 0 100%)",
  "polygon(30% 100%, 62% 100%, 56% 74%, 36% 70%)",
];

const SHARD_MOVE: { x: number; y: number; r: number }[] = [
  { x: -34, y: -30, r: -16 },
  { x: 32, y: -34, r: 14 },
  { x: 38, y: 26, r: 18 },
  { x: -36, y: 28, r: -14 },
  { x: 0, y: 40, r: 6 },
];

export default function ResumeReveal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [phase, setPhase] = useState<Phase>("tearing");
  const downloaded = useRef(false);

  useEffect(() => {
    if (!open) return;
    downloaded.current = false;
    setPhase("tearing");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t: number[] = reduce ? [0, 10, 20] : [420, 1900, 3000];
    const a = window.setTimeout(() => setPhase("preparing"), t[0] ?? 0);
    const b = window.setTimeout(() => setPhase("opening"), t[1] ?? 0);
    const c = window.setTimeout(() => {
      setPhase("done");
      if (!downloaded.current) {
        downloaded.current = true;
        const link = document.createElement("a");
        link.href = RESUME_URL;
        link.download = "Mohammed-Maaz-Resume.pdf";
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
    }, t[2] ?? 0);
    return () => [a, b, c].forEach(clearTimeout);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;
  const torn = phase !== "tearing";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Preparing your resume"
      className="fixed inset-0 z-[100] grid place-items-center bg-background/95 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[min(92vw,520px)] aspect-[4/3.4]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* teal hole behind the paper */}
        <div className="absolute inset-[8%] rounded-[40%_60%_45%_55%/55%_45%_60%_40%] bg-[radial-gradient(circle_at_50%_45%,oklch(0.42_0.08_184),oklch(0.26_0.05_184))] shadow-[inset_0_0_60px_rgba(0,0,0,0.55)]" />

        {/* torn paper shards */}
        {SHARDS.map((clip, i) => (
          <div
            key={i}
            aria-hidden="true"
            className="absolute inset-0 bg-paper-deep transition-transform duration-700 ease-out"
            style={{
              clipPath: clip,
              filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.45))",
              transform: torn
                ? `translate(${SHARD_MOVE[i]?.x ?? 0}px, ${SHARD_MOVE[i]?.y ?? 0}px) rotate(${SHARD_MOVE[i]?.r ?? 0}deg)`
                : "none",
            }}
          />
        ))}

        {/* centre content */}
        <div className="absolute inset-[14%] grid place-items-center text-center">
          {phase !== "opening" && phase !== "done" ? (
            <div className="animate-[fade-in_0.4s_ease-out] text-chalk">
              <FileText className="mx-auto h-10 w-10 opacity-90" strokeWidth={1.6} />
              <p className="mt-3 font-hand text-2xl leading-tight sm:text-3xl">
                Preparing
                <br />
                your resume
              </p>
              <div className="mt-3 flex justify-center gap-2">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="h-2 w-2 rounded-full bg-chalk/60"
                    style={{ animation: `pulse 1s ${d * 0.18}s infinite` }}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full animate-[slide-up-sheet_0.7s_cubic-bezier(0.22,1,0.36,1)_both]">
              <div className="mx-auto w-full max-w-[230px] rotate-[-2deg] rounded-[6px] bg-paper p-4 text-left shadow-[0_18px_30px_rgba(0,0,0,0.45)]">
                <p className="font-serif text-2xl text-primary">Maaz</p>
                <p className="font-monohand text-[9px] tracking-[0.18em] text-ink/70">
                  AUTOMATION ANALYST
                </p>
                {["About Me", "Experience", "Skills"].map((s) => (
                  <div key={s} className="mt-3">
                    <p className="font-marker text-[10px] text-primary underline">{s}</p>
                    <span className="mt-1 block h-px w-full bg-ink/25" />
                    <span className="mt-1.5 block h-px w-[85%] bg-ink/20" />
                    <span className="mt-1.5 block h-px w-[70%] bg-ink/15" />
                  </div>
                ))}
              </div>
              <p className="mx-auto mt-3 w-fit -rotate-1 bg-primary px-4 py-1 font-hand text-lg text-background">
                {phase === "done" ? "here you go!" : "Almost there…"}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3" onClick={(e) => e.stopPropagation()}>
        <a
          href={RESUME_URL}
          download="Mohammed-Maaz-Resume.pdf"
          className="rounded-[14px] border-[3px] border-primary px-6 py-2 font-marker text-sm text-primary transition-transform hover:-rotate-2"
        >
          download again
        </a>
        <button
          type="button"
          onClick={onClose}
          className="font-marker text-sm text-chalk/70 underline underline-offset-4 hover:text-chalk"
        >
          close
        </button>
      </div>
    </div>
  );
}
