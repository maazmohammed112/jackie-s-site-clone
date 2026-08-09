import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactElement } from "react";
import { Github, Linkedin, Mail, MapPin, Sparkles } from "lucide-react";

import heroDoodle from "@/assets/hero-doodle-teal.png";
import stampStrip from "@/assets/stamp-strip-teal.png";
import doodleComputer from "@/assets/doodle-computer.png";
import doodleMisc from "@/assets/doodle-misc.png";
const maazPoster = { url: "/maaz-poster.png" };
const portfolioFilm = { url: "/maaz-portfolio-15s.mp4" };
import ResumeReveal from "@/components/ResumeReveal";
import CrtProjects from "@/components/CrtProjects";
import WorkBoxes from "@/components/WorkBoxes";
import WorkExperienceTag from "@/components/WorkExperienceTag";
import EducationTicket from "@/components/EducationTicket";
import MarginDoodles from "@/components/MarginDoodles";
import CertificationsIndexBox from "@/components/CertificationsIndexBox";
import SmartMaazAssistant from "@/components/SmartMaazAssistant";
import TechWorldMemoriesConsole from "@/components/TechWorldMemoriesConsole";
import CorkboardGuestbook from "@/components/CorkboardGuestbook";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mohammed Maaz — Automation Analyst & AI Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Mohammed Maaz — Automation Analyst in Bengaluru working with UiPath, SAP BPA, Python, Agentic AI and cloud automation.",
      },
      { property: "og:title", content: "Mohammed Maaz — Automation Analyst & AI Engineer" },
      {
        property: "og:description",
        content: "Automation, SAP, data analytics and Agentic AI — built to feel effortless.",
      },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
      {
        property: "og:image",
        content:
          "https://project--91d6d64e-f900-417c-a466-6e4c8cd0e07c.lovable.app/og-image.jpg",
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Handwritten M monogram on torn craft paper" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Mohammed Maaz — Automation Analyst & AI Engineer" },
      {
        name: "twitter:description",
        content: "Automation, SAP, data analytics and Agentic AI — built to feel effortless.",
      },
      {
        name: "twitter:image",
        content:
          "https://project--91d6d64e-f900-417c-a466-6e4c8cd0e07c.lovable.app/og-image.jpg",
      },
      { name: "geo.region", content: "IN-KA" },
      { name: "geo.placename", content: "Bengaluru, Karnataka, India" },
      { name: "geo.position", content: "12.9716;77.5946" },
      { name: "ICBM", content: "12.9716, 77.5946" },
      {
        name: "keywords",
        content:
          "Mohammed Maaz, Automation Analyst Bengaluru, RPA developer, UiPath, Power Automate, SAP Build, AI automation, Agentic AI, Python, SQL, AWS certified",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Mohammed Maaz",
          jobTitle: "Automation Analyst",
          email: "mailto:maazmohammed112@gmail.com",
          url: "https://project--91d6d64e-f900-417c-a466-6e4c8cd0e07c.lovable.app/",
          image:
            "https://project--91d6d64e-f900-417c-a466-6e4c8cd0e07c.lovable.app/og-image.jpg",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Bengaluru",
            addressRegion: "Karnataka",
            addressCountry: "IN",
          },
          knowsAbout: [
            "AI automation",
            "Agentic AI",
            "RPA",
            "UiPath",
            "Power Automate",
            "SAP Build",
            "Python",
            "SQL",
            "AWS",
            "Data analytics",
          ],
          sameAs: [
            "https://www.linkedin.com/in/mohammed-maaz-a-0aa730217",
            "https://github.com/maazmohammed112",
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function StampRail({ side }: { side: "left" | "right" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed top-0 z-20 hidden h-screen w-[70px] opacity-90 md:block ${
        side === "left" ? "left-0" : "right-0"
      }`}
      style={{
        backgroundImage: `url(${stampStrip})`,
        backgroundRepeat: "repeat-y",
        backgroundSize: "100% auto",
      }}
    />
  );
}

type NavChild = {
  label: string;
  href: string;
  note: string;
  external?: boolean;
  icon?: "mail" | "github" | "linkedin" | "spark";
};

/** Hand-drawn chalk doodles that pop above each nav item on hover. */
function DoodleFace() {
  return (
    <svg viewBox="0 0 120 70" fill="none" className="h-full w-full">
      <g
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 30 L26 24 M14 16 L22 34 M8 22 L28 28" />
        <path d="M44 26c0-9 5-15 14-15s14 6 14 15" />
        <path d="M44 22c3-4 5-7 8-5 2-4 5-5 7-2 2-4 6-4 8 0 3-2 6 1 7 6" />
        <path d="M43 30c0 12 6 20 15 20s15-8 15-20" />
        <path d="M51 33v4 M65 33v4" />
        <path d="M52 42c3 4 9 4 12 0" />
        <path d="M96 20c6-4 9 2 5 6s-8 8-6 14" />
      </g>
    </svg>
  );
}

function DoodleBadge() {
  return (
    <svg viewBox="0 0 120 80" fill="none" className="h-full w-full">
      <g
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M54 22c4-8 8-14 12-18 1 7 0 13-2 18" />
        <path d="M64 22c6-6 11-9 16-11-2 5-6 9-10 12" />
        <path d="M34 24h44v40H34z" />
        <path d="M48 46c0-7 4-11 10-11s10 4 10 11" />
        <path d="M48 42c2-3 4-5 6-4 2-3 4-3 6 0 2-3 5-2 6 3" />
        <path d="M52 47v3 M62 47v3 M53 54c3 3 7 3 9 0" />
        <path d="M26 18l4 6 M22 30h7 M28 10l2 7" />
        <path d="M86 40l10 6-5 1 3 6-3 1-3-6-3 3z" />
      </g>
    </svg>
  );
}

function DoodleConnect() {
  return (
    <svg viewBox="0 0 120 70" fill="none" className="h-full w-full">
      <g
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 24h30v22H12z M12 24l15 12 15-12" />
        <path d="M60 46c-6 2-8-2-11-4 6 3 9 1 11-2-6-1-10-4-10-11 0-3 1-5 2-6-1-3 0-5 0-5 3 0 5 2 6 3a15 15 0 017 0c1-1 3-3 6-3 0 0 1 2 0 5 1 1 2 3 2 6 0 7-4 10-10 11 1 1 2 3 2 6v6" />
        <path d="M92 30v18 M92 22v2 M102 48V38c0-5-8-6-8 0" />
        <path d="M110 16c3 2 4 6 3 9" />
      </g>
    </svg>
  );
}

const NAV_DOODLES: Record<string, () => ReactElement> = {
  about: DoodleFace,
  work: DoodleBadge,
  connect: DoodleConnect,
};

const NAV: {
  id: string;
  label: string;
  hint: string;

  children?: NavChild[];
}[] = [
  { id: "about", label: "about", hint: "in-progress" },
  {
    id: "work",
    label: "work",
    hint: "what I ship",
    children: [
      { label: "experience", href: "#experience", note: "where I've worked" },
      { label: "selected work", href: "#work", note: "achievements" },
      { label: "certifications", href: "#certifications", note: "badges earned" },
    ],
  },
  {
    id: "connect",
    label: "connect",
    hint: "say hello",
    children: [
      {
        label: "memories console",
        href: "#memories",
        note: "retro GameBoy console",
        icon: "spark",
      },
      {
        label: "guestbook & reviews",
        href: "#guestbook",
        note: "pin a note or stamp",
        icon: "spark",
      },
      {
        label: "email",
        href: "mailto:maazmohammed112@gmail.com",
        note: "maazmohammed112@gmail.com",
        icon: "mail",
        external: true,
      },
      {
        label: "github",
        href: "https://github.com/maazmohammed112",
        note: "code I ship",
        icon: "github",
        external: true,
      },
      {
        label: "linkedin",
        href: "https://www.linkedin.com/in/mohammed-maaz-a-0aa730217",
        note: "let's network",
        icon: "linkedin",
        external: true,
      },
      { label: "connect", href: "#connect", note: "what I look for", icon: "spark" },
    ],
  },
];

function NavChildIcon({ icon }: { icon?: NavChild["icon"] }) {
  const cls = "h-4 w-4 shrink-0 text-primary";
  if (icon === "mail") return <Mail className={cls} />;
  if (icon === "github") return <Github className={cls} />;
  if (icon === "linkedin") return <Linkedin className={cls} />;
  if (icon === "spark") return <Sparkles className={cls} />;
  return <span className="font-marker text-sm text-primary">→</span>;
}

function Nav() {
  const [open, setOpen] = useState<string | null>(null);
  const [pos, setPos] = useState<{ top: number; left: number; width: number } | null>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const place = (id: string) => {
    const el = itemRefs.current[id];
    if (!el) return;
    const r = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const width = Math.min(288, vw - 24);
    let left = r.left + r.width / 2 - width / 2;
    left = Math.max(12, Math.min(left, vw - width - 12));
    setPos({ top: r.bottom + 22, left, width });
  };

  useEffect(() => {
    if (!open) return;
    const update = () => place(open);
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [open]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement)?.closest?.("[data-nav-item]")) setOpen(null);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <nav className="relative z-40 flex items-end justify-center gap-6 px-4 pt-28 pb-4 sm:gap-10 md:gap-16">
      {NAV.map((item) => {
        const Doodle = NAV_DOODLES[item.id];
        return (
        <div
          key={item.id}
          data-nav-item
          ref={(el) => {
            itemRefs.current[item.id] = el;
          }}
          className="relative"
        >
        <a
          href={`#${item.id}`}
          onClick={(e) => {
            if (item.children) {
              e.preventDefault();
              setOpen((cur) => {
                const next = cur === item.id ? null : item.id;
                if (next) place(item.id);
                return next;
              });
            } else {
              setOpen(null);
            }
          }}
          aria-expanded={item.children ? open === item.id : undefined}
          className="group relative block font-marker text-sm text-chalk/85 transition-colors hover:text-chalk sm:text-base md:text-lg"
        >
          {Doodle && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-full left-1/2 mb-2 h-14 w-24 -translate-x-1/2 translate-y-3 scale-90 text-chalk opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 sm:h-16 sm:w-28 md:h-20 md:w-36"
            >
              <Doodle />
            </span>
          )}
          <span className="relative inline-block px-4 py-1">
            <span
              aria-hidden="true"
              className="absolute inset-0 scale-75 rounded-[50%] border-2 border-chalk/70 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
            />
            {item.label}
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-5 left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap font-marker text-[10px] text-primary opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:text-xs"
          >
            {item.hint}
          </span>
        </a>

        {item.children && open === item.id && pos && (
          <div
            className="fixed z-50 animate-scale-in"
            style={{ top: pos.top, left: pos.left, width: pos.width }}
          >
            {/* stacked paper behind, for depth */}
            <span
              aria-hidden="true"
              className="absolute inset-0 translate-x-1.5 translate-y-2 rotate-[1.6deg] torn-paper bg-paper-deep/80"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 -translate-x-1 translate-y-1 -rotate-[2deg] torn-paper bg-paper/60"
            />
            {/* torn paper scrap */}
            <div className="relative -rotate-[0.8deg] paper-grid torn-paper bg-paper p-3 pt-6 pl-7 shadow-[0_30px_60px_-18px_rgba(0,0,0,.75),0_2px_0_rgba(0,0,0,.35)] ring-1 ring-ink/10">
              {/* washi tape */}
              <span
                aria-hidden="true"
                className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-[-3deg] bg-primary/40 shadow-[0_2px_6px_rgba(0,0,0,.35)]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, rgba(255,255,255,.35) 0 2px, transparent 2px 6px)",
                }}
              />
              {/* punched holes down the left margin */}
              <span aria-hidden="true" className="absolute left-2.5 top-8 h-2 w-2 rounded-full bg-ink/70 shadow-[inset_0_1px_2px_rgba(0,0,0,.6)]" />
              <span aria-hidden="true" className="absolute left-2.5 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-ink/70 shadow-[inset_0_1px_2px_rgba(0,0,0,.6)]" />
              <span aria-hidden="true" className="absolute bottom-8 left-2.5 h-2 w-2 rounded-full bg-ink/70 shadow-[inset_0_1px_2px_rgba(0,0,0,.6)]" />
              {/* red notebook margin rule */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-3 left-5 w-px bg-[repeating-linear-gradient(180deg,var(--color-primary)_0_4px,transparent_4px_9px)] opacity-60"
              />
              {/* dotted cut-here border */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-2 rounded-[10px] border-2 border-dotted border-ink/25"
              />
              {/* folded corner curl */}
              <span
                aria-hidden="true"
                className="absolute bottom-0 right-0 h-6 w-6 bg-[linear-gradient(135deg,transparent_50%,var(--color-paper-deep)_50%)] shadow-[-2px_-2px_6px_rgba(0,0,0,.25)]"
              />
              <div className="relative">
                {item.children.map((child, i) => (
                  <a
                    key={child.label}
                    href={child.href}
                    target={child.external ? "_blank" : undefined}
                    rel={child.external ? "noreferrer" : undefined}
                    onClick={() => setOpen(null)}
                    className={`group/nc flex items-start gap-3 px-2 py-2 transition-transform hover:translate-x-1 ${
                      i > 0
                        ? "border-t-2 border-dotted border-ink/25"
                        : ""
                    }`}
                  >
                    <span className="mt-1">
                      <NavChildIcon icon={child.icon} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-marker text-sm text-ink underline decoration-primary/0 decoration-wavy underline-offset-4 transition-colors group-hover/nc:decoration-primary/70">
                        {child.label}
                      </span>
                      <span className="block truncate font-monohand text-[11px] text-ink/60">
                        {child.note}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
        </div>
        );
      })}
    </nav>
  );
}

const TITLES = [
  "Automation Analyst",
  "AWS Certified",
  "SAP Certified",
  "Microsoft Certified",
  "RPA Developer",
  "AI Automation",
  "Agentic AI",
  "Gen AI",
  "Data Analyst",
  "Full Stack Developer",
];

function RotatingTitle() {
  const [i, setI] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const out = setTimeout(() => setShow(false), 1900);
    const next = setTimeout(() => {
      setI((p) => (p + 1) % TITLES.length);
      setShow(true);
    }, 2200);
    return () => {
      clearTimeout(out);
      clearTimeout(next);
    };
  }, [i]);

  return (
    <span
      className={`inline-block transition-all duration-300 ${
        show ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
      }`}
    >
      {TITLES[i]}
    </span>
  );
}

function PaperCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[34px] bg-primary p-2.5 shadow-[var(--shadow-paper)] md:p-3 ${className}`}
    >
      <div className="paper-grid overflow-hidden rounded-[26px] bg-paper">{children}</div>
    </div>
  );
}

function Index() {
  return <Page />;
}

function ClickBurst() {
  useEffect(() => {
    const spawn = (x: number, y: number) => {
      const wrap = document.createElement("span");
      wrap.className = "click-burst";
      wrap.style.left = `${x}px`;
      wrap.style.top = `${y}px`;
      const n = 7;
      for (let i = 0; i < n; i++) {
        const line = document.createElement("i");
        const angle = (360 / n) * i + (Math.random() * 18 - 9);
        line.style.setProperty("--a", `${angle}deg`);
        line.style.setProperty("--d", `${18 + Math.random() * 16}px`);
        line.style.animationDelay = `${Math.random() * 60}ms`;
        wrap.appendChild(line);
      }
      document.body.appendChild(wrap);
      window.setTimeout(() => wrap.remove(), 800);
    };
    const onDown = (e: PointerEvent) => spawn(e.clientX, e.clientY);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, []);
  return null;
}

function PinnedPoster() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const posterRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [video, setVideo] = useState(false);

  useEffect(() => {
    if (!open && !video) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      setVideo(false);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, video]);

  useEffect(() => {
    const wrapEl = wrapRef.current;
    const posterEl = posterRef.current;
    if (!wrapEl || !posterEl) return;

    let ticking = false;

    const updatePosition = () => {
      const r = wrapEl.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = r.top + r.height / 2;
      const dist = center - vh / 2;
      const range = vh / 2 + r.height / 2;

      // Calculate progress 0 (hidden behind console) to 1 (fully revealed out from behind)
      const t = Math.min(1, Math.max(0, 1 - dist / (range * 0.75)));

      // Smoothly slide translateY from -120px (behind console) to 0px out in the open
      const translateY = (1 - t) * -120;
      const rotate = -3 + t * 3;
      const opacity = 0.35 + t * 0.65;

      posterEl.style.transform = `translateY(${translateY}px) rotate(${rotate}deg)`;
      posterEl.style.opacity = `${opacity}`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updatePosition);
        ticking = true;
      }
    };

    updatePosition();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <div ref={wrapRef} className="flex relative z-0 -mt-24 sm:-mt-32 justify-center scale-90 sm:scale-100 pointer-events-auto">
        <button
          ref={posterRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open portrait of Mohammed Maaz"
          className="relative rounded-[10px] bg-paper p-4 pt-9 shadow-[var(--shadow-paper)] cursor-pointer"
        >
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-3 h-4 w-4 -translate-x-1/2 rounded-full bg-primary shadow-[0_2px_6px_rgba(0,0,0,.45)]"
          />
          <img
            src={maazPoster.url}
            alt="Portrait of Mohammed Maaz with a hand-drawn mecha helmet doodle"
            loading="lazy"
            className="w-56 rounded-[4px] md:w-72"
          />
          <span className="mt-3 block text-center font-hand text-2xl text-ink/80">
            pinned — that's me
          </span>
        </button>
      </div>

      {/* play my portfolio film */}
      <div className="relative z-10 mt-6 flex justify-center px-4">
        <button
          type="button"
          onClick={() => setVideo(true)}
          className="group flex max-w-full items-center gap-3 rounded-[14px] border-[3px] border-primary bg-paper/95 px-5 py-3 text-left shadow-[0_14px_30px_rgba(0,0,0,.4)] transition-transform hover:-rotate-1"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-background">
            <svg viewBox="0 0 24 24" className="h-5 w-5 translate-x-[1px]" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="min-w-0">
            <span className="block font-marker text-sm text-primary">play my portfolio film</span>
            <span className="block truncate font-hand text-xl text-ink/70">15 seconds · paper-craft cinema</span>
          </span>
        </button>
      </div>

      {video && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Portfolio video"
          onClick={() => setVideo(false)}
          className="fixed inset-0 z-[110] grid place-items-center bg-background/95 p-3 backdrop-blur-sm sm:p-6"
        >
          <div
            className="w-full max-w-[min(96vw,1000px)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-[12px] bg-paper p-2 shadow-[var(--shadow-paper)] sm:p-3">
              <video
                src={portfolioFilm.url}
                controls
                autoPlay
                playsInline
                controlsList="nodownload"
                className="max-h-[72vh] w-full rounded-[6px] bg-background"
              />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setVideo(false)}
                className="rounded-[14px] border-[3px] border-primary px-5 py-2 font-marker text-sm text-primary transition-transform hover:-rotate-2"
              >
                ← back
              </button>
              <button
                type="button"
                onClick={() => setVideo(false)}
                aria-label="Close video"
                className="font-marker text-sm text-chalk/70 underline underline-offset-4 hover:text-chalk"
              >
                close
              </button>
            </div>
          </div>
        </div>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 grid place-items-center bg-background/85 p-6 backdrop-blur-sm animate-fade-in"
        >
          <img
            src={maazPoster.url}
            alt="Portrait of Mohammed Maaz"
            className="max-h-[85vh] rounded-[8px] bg-paper p-3 shadow-[var(--shadow-paper)]"
          />
        </div>
      )}
    </>
  );
}

function Page() {
  return <PageBody />;
}

const CONTACTS = [
  {
    icon: Mail,
    label: "maazmohammed112@gmail.com",
    href: "mailto:maazmohammed112@gmail.com",
  },
  {
    icon: Linkedin,
    label: "mohammed-maaz-a",
    href: "https://www.linkedin.com/in/mohammed-maaz-a-0aa730217",
  },
  {
    icon: Github,
    label: "maazmohammed112",
    href: "https://github.com/maazmohammed112",
  },
  {
    icon: MapPin,
    label: "Bengaluru, Karnataka, India",
    href: "https://maps.google.com/?q=Bengaluru,Karnataka,India",
  },
];

function ContactScraps() {
  return (
    <div className="relative pt-24 sm:pt-20">
      {/* torn scrap notes */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 w-[52%] max-w-[220px] -rotate-6">
        <div className="torn-paper bg-secondary px-5 py-4 shadow-[var(--shadow-paper)]">
          <p className="font-marker text-base leading-snug text-ink">
            Let's connect.
            <br />
            Let's create.
          </p>
        </div>
      </div>
      <div className="pointer-events-none absolute right-0 top-0 z-10 w-[46%] max-w-[190px] rotate-6">
        <div className="torn-paper paper-grid bg-paper-deep px-5 py-4 shadow-[var(--shadow-paper)]">
          <p className="font-marker text-base leading-snug text-ink">
            Software
            <br />
            should empower.
          </p>
        </div>
      </div>

      {/* main torn contact sheet */}
      <div className="torn-paper relative bg-paper-deep px-6 py-8 shadow-[var(--shadow-paper)] sm:px-8">
        <ul className="space-y-1">
          {CONTACTS.map(({ icon: Icon, label, href }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="flex items-center gap-4 border-b border-primary/60 py-3 font-monohand text-[13px] leading-snug text-ink transition-transform hover:translate-x-1 hover:text-primary sm:text-sm"
              >
                <Icon className="h-5 w-5 shrink-0 text-primary" />
                <span className="break-all">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function PageBody() {
  const LOOKING_FOR = [
    "Impactful automation work",
    "Agentic AI in real workflows",
    "A sharp, curious team",
  ];
  const [checked, setChecked] = useState<string[]>([]);
  const [resumeOnly, setResumeOnly] = useState(false);
  const [revealOpen, setRevealOpen] = useState(false);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!nodes.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((n) => n.classList.add("is-revealed"));
      return;
    }
    nodes.forEach((n) => n.classList.add("reveal-init"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-revealed");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <ClickBurst />
      <ResumeReveal open={revealOpen} onClose={() => setRevealOpen(false)} />
      <SmartMaazAssistant />
      <MarginDoodles />
      <StampRail side="left" />
      <StampRail side="right" />

      <div className="relative mx-auto max-w-5xl px-5 pb-24 md:px-8">
        <Nav />

        {/* HERO */}
        <section id="about" data-reveal className="pt-8 md:pt-12">
          <PaperCard>
            <div className="grid items-center gap-6 p-8 md:grid-cols-[1.05fr_1fr] md:p-14">
              <div>
                <p className="font-hand text-6xl leading-none text-primary md:text-7xl">
                  Mohammed Maaz
                </p>
                <p className="mt-3 h-10 font-serif text-3xl text-primary md:text-4xl">
                  <RotatingTitle />
                </p>
                <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-primary md:text-6xl">
                  Automation should
                  <br />
                  feel <span className="font-hand">effortless</span>
                </h1>
                <p className="mt-6 max-w-md font-monohand text-sm leading-relaxed text-ink/75">
                  Automation Analyst building enterprise workflows with UiPath, SAP BPA, Python and
                  Agentic AI — turning manual hours into measurable efficiency.
                </p>
                <p className="mt-6 flex items-center gap-2 font-marker text-sm text-primary/80 md:text-base">
                  <MapPin className="h-4 w-4" /> Bengaluru, India • GMT +5:30
                </p>
              </div>
              <img
                src={heroDoodle}
                alt="Hand-drawn sketch of a small character holding a card in front of a browser window surrounded by plants and birds"
                width={1024}
                height={1024}
                className="mx-auto w-full max-w-sm"
              />
            </div>
          </PaperCard>
        </section>

        {/* BADGES */}
        <section className="mt-10" data-reveal>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "UiPath",
              "Power Automate",
              "SAP BPA / BAS / BTP",
              "Python",
              "SQL",
              "AWS",
              "Power BI",
              "Agentic AI",
              "React / Next.js",
            ].map((s, i) => (
              <span
                key={s}
                className="rounded-full border border-primary/50 px-4 py-1.5 font-marker text-xs text-chalk/85 transition-colors hover:border-primary hover:text-primary"
                style={{ rotate: `${(i % 3) - 1}deg` }}
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* BELIEFS */}
        <section className="mt-16 md:mt-24" data-reveal>
          <PaperCard>
            <div className="p-8 md:p-14">
              <p className="font-serif text-xl text-primary md:text-2xl">
                3 things I strongly believe in
              </p>

              <div className="relative mt-10 grid gap-6 pb-6 md:grid-cols-2">
                <div className="animate-float rotate-[-4deg] rounded-sm bg-secondary p-8 shadow-[var(--shadow-paper)] [--tilt:-4deg]">
                  <p className="font-marker text-2xl leading-relaxed text-ink md:text-3xl">
                    automate the boring, keep the thinking.
                  </p>
                </div>
                <div className="paper-grid rotate-[3deg] rounded-sm bg-paper-deep p-8 shadow-[var(--shadow-paper)]">
                  <p className="font-monohand text-xl leading-relaxed text-ink md:text-2xl">
                    Data should answer, not decorate.
                  </p>
                </div>
                <div className="rotate-[-1deg] rounded-sm bg-secondary p-8 shadow-[var(--shadow-paper)] md:col-span-2 md:mx-auto md:w-1/2">
                  <p className="font-serif text-3xl italic leading-tight text-ink md:text-4xl">
                    Build agents, not busywork
                  </p>
                </div>
              </div>
            </div>
          </PaperCard>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="mt-16 md:mt-24" data-reveal>
          <div className="text-center">
            <h2 className="font-serif text-3xl text-chalk md:text-4xl">Where I've worked</h2>
          </div>
          <WorkExperienceTag />
        </section>

        {/* WORK */}
        <section id="work" data-reveal className="mt-16 md:mt-24">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-serif text-3xl text-chalk md:text-4xl">Selected work</h2>
          </div>
          <div className="paper-grid relative rounded-[34px] border border-border bg-muted/40 p-8 md:p-12">
            <div className="mb-10">
              <CrtProjects />
            </div>
            <WorkBoxes />
            <p className="mt-10 text-right font-hand text-2xl text-chalk/80">
              Ship it, measure it, then make it smaller.
            </p>
          </div>
        </section>

        {/* EDUCATION + CERTS */}
        <section
          id="education"
          className="relative z-10 mt-16 space-y-10 md:mt-24"
          data-reveal
        >
          <EducationTicket />

          <div id="certifications" className="scroll-mt-24">
            <CertificationsIndexBox />
          </div>
        </section>

        {/* TECHWAZZY MEMORIES CONSOLE */}
        <section id="memories" className="relative z-20 mt-16 md:mt-24" data-reveal>
          <TechWorldMemoriesConsole />
        </section>

        {/* CONNECT */}
        <PinnedPoster />

        <section id="connect" data-reveal className="relative z-10 mt-16 md:mt-24">
          <img
            src={doodleMisc}
            alt=""
            aria-hidden="true"
            loading="lazy"
            width={1024}
            height={640}
            className="pointer-events-none absolute -top-16 left-0 hidden w-64 opacity-70 lg:block"
          />
          <div className="rounded-[34px] bg-paper p-8 shadow-[var(--shadow-paper)] md:p-14">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <h2 className="border-y border-ink/30 py-3 font-serif text-4xl text-primary">
                  What I look for
                </h2>
                <ul className="mt-6 space-y-4">
                  {LOOKING_FOR.map((item) => {
                    const isOn = checked.includes(item);
                    return (
                      <li key={item} className="border-b border-dashed border-primary/40 pb-4">
                        <button
                          type="button"
                          aria-pressed={isOn}
                          disabled={resumeOnly}
                          onClick={() =>
                            setChecked((prev) =>
                              prev.includes(item)
                                ? prev.filter((v) => v !== item)
                                : [...prev, item],
                            )
                          }
                          className="flex w-full items-center gap-4 text-left font-marker text-base text-primary transition-transform hover:translate-x-1 disabled:pointer-events-none disabled:opacity-40"
                        >
                          <span className="relative grid h-6 w-6 shrink-0 place-items-center rounded-[5px] border-2 border-primary">
                            <svg
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                              className={`h-5 w-5 transition-all duration-300 ${
                                isOn ? "scale-100 opacity-100" : "scale-50 opacity-0"
                              }`}
                            >
                              <path
                                d="M4 13.5 L9.5 19 L20 5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span className={isOn ? "line-through decoration-2 opacity-70" : ""}>
                            {item}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                  <li className="border-b border-dashed border-primary/40 pb-4">
                    <button
                      type="button"
                      aria-pressed={resumeOnly}
                      onClick={() => setResumeOnly((v) => !v)}
                      className="flex w-full items-center gap-4 text-left font-marker text-base text-primary transition-transform hover:translate-x-1"
                    >
                      <span className="relative grid h-6 w-6 shrink-0 place-items-center rounded-[5px] border-2 border-primary">
                        <svg
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          className={`h-5 w-5 transition-all duration-300 ${
                            resumeOnly ? "scale-100 opacity-100" : "scale-50 opacity-0"
                          }`}
                        >
                          <path
                            d="M4 13.5 L9.5 19 L20 5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span className={resumeOnly ? "line-through decoration-2 opacity-70" : ""}>
                        Download my resume
                      </span>
                    </button>
                  </li>
                </ul>
                {resumeOnly ? (
                  <button
                    type="button"
                    onClick={() => setRevealOpen(true)}
                    className="mt-8 inline-block rounded-[14px] border-[3px] border-primary px-8 py-3 font-marker text-base text-primary transition-transform hover:-rotate-2"
                  >
                    download resume
                  </button>
                ) : (
                  <a
                    href="mailto:maazmohammed112@gmail.com"
                    className="mt-8 inline-block rounded-[14px] border-[3px] border-primary px-8 py-3 font-marker text-base text-primary transition-transform hover:-rotate-2"
                  >
                    let's chat!
                  </a>
                )}
              </div>
              <ContactScraps />
            </div>
          </div>
        </section>

        {/* TORN PAPER GUESTBOOK & REVIEWS */}
        <section id="guestbook" className="mt-16 md:mt-24" data-reveal>
          <CorkboardGuestbook />
        </section>

        {/* FOOTER */}
        <footer className="mt-16 text-center" data-reveal>
          <img
            src={doodleComputer}
            alt="Chalk drawing of a smiling retro computer"
            loading="lazy"
            width={768}
            height={640}
            className="mx-auto w-48 opacity-90"
          />
          <p className="mx-auto mt-6 max-w-xl font-hand text-3xl leading-snug text-chalk/90">
            “If a task repeats, it belongs to a bot — not to your afternoon.”
          </p>
          <div className="mt-6 overflow-hidden">
            <div className="animate-marquee flex w-max gap-16 font-marker text-sm text-foreground/80">
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i} className="whitespace-nowrap">
                  ✦ automate the repeatable • analyse the rest • built in Bengaluru ✦
                </span>
              ))}
            </div>
          </div>
          <p className="mt-10 font-hand text-5xl text-primary">Maaz</p>
        </footer>
      </div>
    </main>
  );
}
