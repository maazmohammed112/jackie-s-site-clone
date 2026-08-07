import { useCallback, useEffect, useRef, useState } from "react";

type CrtProject = {
  index: string;
  title: string;
  tag: string;
  lines: string[];
  href: string;
};

const PROJECTS: CrtProject[] = [
  {
    index: "01",
    title: "PrimKart",
    tag: "e-commerce / full stack",
    lines: ["React + Next.js storefront", "payment workflow", "admin dashboard"],
    href: "https://github.com/maazmohammed112",
  },
  {
    index: "02",
    title: "BunkBuddy",
    tag: "hackathon winner",
    lines: ["1st place, Education Track", "CODE4HOPE / ImpactX", "attendance intelligence"],
    href: "https://github.com/maazmohammed112",
  },
  {
    index: "03",
    title: "DukaanSetu",
    tag: "openai codex hackathon",
    lines: ["top 30% of 2,989 teams", "agentic retail workflows", "OpenAI x NamasteDev"],
    href: "https://github.com/maazmohammed112",
  },
  {
    index: "04",
    title: "Neuro SAN",
    tag: "multi-agent ai",
    lines: ["Cognizant Neuro SAN challenge", "agent orchestration", "tool-calling pipelines"],
    href: "https://github.com/maazmohammed112",
  },
  {
    index: "05",
    title: "Discuss",
    tag: "founder / solo dev",
    lines: ["social platform", "live on Google Play", "end-to-end product"],
    href: "https://github.com/maazmohammed112",
  },
  {
    index: "06",
    title: "SAP BPA flows",
    tag: "enterprise automation",
    lines: ["approval automation", "SAP BTP + Build Process", "UiPath handoffs"],
    href: "https://github.com/maazmohammed112",
  },
];

export default function CrtProjects() {
  const [i, setI] = useState(0);
  const [glitching, setGlitching] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const p = PROJECTS[i]!;

  const next = useCallback(() => {
    setGlitching(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setI((v) => (v + 1) % PROJECTS.length);
      setGlitching(false);
    }, 260);
  }, []);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  return (
    <div className="crt-stage mx-auto w-full max-w-[460px]">
      <div className="crt-monitor rounded-[34px] p-4 pb-0">
        <div className="crt-bezel relative rounded-[22px] p-5">
          <div
            className={`crt-screen relative min-h-[300px] overflow-hidden rounded-2xl ${glitching ? "is-glitching" : ""}`}
          >
            <div
              className={`relative z-[2] flex min-h-[240px] flex-col gap-3 px-5 pb-16 pt-6 sm:flex-row sm:gap-4 ${glitching ? "crt-jitter" : ""}`}
            >
              <div className="w-full sm:w-[38%]">
                <p className="font-monohand text-2xl leading-none text-primary-foreground">
                  {p.title}
                </p>
                <p className="mt-2 font-monohand text-[11px] uppercase tracking-widest text-primary-foreground/70">
                  {p.tag}
                </p>
              </div>
              <div className="flex-1 font-monohand text-sm leading-relaxed text-primary-foreground">
                {p.lines.map((l) => (
                  <p key={l}>&gt; {l}</p>
                ))}
                <p className="mt-2 text-primary-foreground/70">&gt; _</p>
              </div>
            </div>

            <div className="crt-scanlines" />
            <div className="crt-vignette" />
            <div className="crt-glitch" />

            <button
              type="button"
              onClick={next}
              aria-label="Next project"
              className="crt-next absolute bottom-4 right-4 z-[4] flex h-11 w-11 items-center justify-center"
            >
              <span className="crt-arrow" />
            </button>
          </div>

          <div className="relative z-[2] mx-1 mt-3 flex flex-wrap items-center justify-between gap-2">
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-full bg-paper px-4 py-2 font-monohand text-[11px] font-bold uppercase tracking-widest text-ink shadow-[0_4px_0_rgba(0,0,0,.35)] transition-transform hover:-translate-y-0.5"
            >
              Visit ↗
            </a>
            <span className="font-monohand text-[11px] tracking-[2px] text-paper/70">
              {p.index} / {String(PROJECTS.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="crt-lower mt-3.5 rounded-b-[22px] px-5 pb-5 pt-4">
          <div className="mb-3.5 flex items-center gap-2">
            <span className="crt-power-dot" />
            <span className="h-3 w-7 rounded-full bg-ink/80" />
          </div>
          <div className="h-2 w-3/5 rounded-md bg-ink/80" />
        </div>
      </div>
    </div>
  );
}