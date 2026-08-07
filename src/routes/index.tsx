import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";

import heroDoodle from "@/assets/hero-doodle-teal.png";
import stampStrip from "@/assets/stamp-strip-teal.png";
import doodleComputer from "@/assets/doodle-computer.png";
import doodleMisc from "@/assets/doodle-misc.png";

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
    ],
  }),
  component: Index,
});

function ScrollPin() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-2 top-[8vh] z-40 h-[84vh] w-8 md:right-4"
    >
      {/* thread line */}
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-primary/70" />
      {/* needle pin + leaf badge */}
      <div
        className="absolute left-1/2 -translate-x-1/2 transition-transform duration-150 ease-out"
        style={{ top: `calc(${progress * 100}% - 22px)` }}
      >
        <svg width="32" height="44" viewBox="0 0 32 44" fill="none">
          <path
            d="M16 3c-2.6 0-4.4 2-4.4 4.6 0 2.2 1.3 3.4 2.4 4.6 1.1 1.2 1.6 2.2 1.6 3.6v22"
            stroke="var(--paper)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <ellipse cx="16" cy="7.4" rx="3.4" ry="4.4" stroke="var(--paper)" strokeWidth="1.4" />
          <circle cx="22" cy="20" r="6.4" fill="var(--paper)" />
          <path
            d="M22 16.4c3.2 0 4.6 1.6 4.6 3.8 0 2-1.6 3.6-4.2 3.6-2.4 0-4.2-1.4-4.2-3.4 0-2.2 1.6-4 3.8-4Z"
            fill="var(--primary)"
          />
          <path d="M25.6 17.4 19 22.6" stroke="var(--paper)" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

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

const NAV = [
  { id: "about", label: "about", hint: "who I am", doodle: "✺ ☺ ✎" },
  { id: "work", label: "work", hint: "what I ship", doodle: "▣ ☺ ➤" },
  { id: "connect", label: "connect", hint: "say hello", doodle: "in ✕ ☺" },
];

function Nav() {
  return (
    <nav className="relative z-30 flex items-end justify-center gap-10 pt-16 pb-2 md:gap-16">
      {NAV.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="group relative font-marker text-base text-chalk/85 transition-colors hover:text-chalk md:text-lg"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap font-hand text-3xl text-chalk opacity-0 transition-all duration-300 group-hover:-top-14 group-hover:opacity-100"
          >
            {item.doodle}
          </span>
          <span className="relative inline-block px-4 py-1">
            <span
              aria-hidden="true"
              className="absolute inset-0 scale-75 rounded-[50%] border-2 border-chalk/70 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
            />
            {item.label}
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-marker text-xs text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            {item.hint}
          </span>
        </a>
      ))}
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
  const LOOKING_FOR = [
    "Impactful automation work",
    "Agentic AI in real workflows",
    "A sharp, curious team",
  ];
  const [checked, setChecked] = useState<string[]>([]);

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
      <StampRail side="left" />
      <StampRail side="right" />
      <ScrollPin />

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
        <section className="mt-16 md:mt-24" data-reveal>
          <h2 className="font-serif text-3xl text-chalk md:text-4xl">Where I've worked</h2>
          <div className="mt-8 space-y-6">
            {[
              {
                org: "Cognizant",
                role: "Analyst — Automation",
                when: "Aug 2025 – Present",
                points: [
                  "Enterprise automation with UiPath, Power Automate and Python to cut manual effort.",
                  "Approval and business-process workflows on SAP Build Process Automation.",
                  "SAP UI5 / Fiori apps built in SAP Business Application Studio on BTP.",
                  "REST API integrations across enterprise systems; Agentic AI initiatives.",
                ],
              },
              {
                org: "MSA Software",
                role: "Software Testing, QA Engineer",
                when: "Apr 2025 – Aug 2025",
                points: [
                  "Manual, exploratory, regression and functional testing across Web, Android, TV and Widget apps.",
                  "Tracked defects in Jira and validated fixes with developers.",
                ],
              },
              {
                org: "Self-Employed",
                role: "Freelance Full Stack Developer",
                when: "2025",
                points: [
                  "Full-stack apps with React, Next.js and Tailwind CSS.",
                  "Delivered PrimKart — an e-commerce platform with payment workflow and admin dashboard.",
                ],
              },
            ].map((job) => (
              <article
                key={job.org}
                className="rounded-[22px] border border-border bg-paper p-7 shadow-[var(--shadow-paper)] transition-transform hover:-translate-y-1 md:p-9"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-serif text-2xl text-primary md:text-3xl">{job.org}</h3>
                  <span className="font-monohand text-xs text-ink/60">{job.when}</span>
                </div>
                <p className="mt-1 font-marker text-sm text-ink">{job.role}</p>
                <ul className="mt-4 space-y-2">
                  {job.points.map((p) => (
                    <li key={p} className="flex gap-3 font-monohand text-sm leading-relaxed text-ink/75">
                      <span className="text-primary">→</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* WORK */}
        <section id="work" data-reveal className="mt-16 md:mt-24">
          <h2 className="mb-8 font-serif text-3xl text-chalk md:text-4xl">Selected work</h2>
          <div className="paper-grid relative rounded-[34px] border border-border bg-muted/40 p-8 md:p-12">
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { t: "PrimKart", d: "Full e-commerce platform with payment workflow and admin dashboard." },
                { t: "BunkBuddy", d: "1st place, Education Track — CODE4HOPE / ImpactX Hackathon." },
                { t: "DukaanSetu", d: "Top 30% of 2,989 at the OpenAI × NamasteDev Codex Hackathon." },
                { t: "Neuro SAN", d: "Multi-agent AI workflows for the Cognizant Neuro SAN challenge." },
                { t: "Discuss", d: "Social platform on Google Play — founder and solo developer." },
                { t: "SAP BPA workflows", d: "Enterprise approval automation on SAP BTP." },
              ].map((p, i) => (
                <article
                  key={p.t}
                  className="rounded-xl bg-paper p-6 shadow-[var(--shadow-paper)] transition-transform hover:-translate-y-1"
                  style={{ rotate: `${(i % 3) - 1}deg` }}
                >
                  <h3 className="font-marker text-base text-ink">{p.t}</h3>
                  <p className="mt-2 font-hand text-xl leading-snug text-ink/70">{p.d}</p>
                </article>
              ))}
            </div>
            <p className="mt-10 text-right font-hand text-2xl text-chalk/80">
              Ship it, measure it, then make it smaller.
            </p>
          </div>
        </section>

        {/* EDUCATION + CERTS */}
        <section className="mt-16 grid gap-6 md:mt-24 md:grid-cols-2" data-reveal>
          <div className="rounded-[26px] bg-paper p-8 shadow-[var(--shadow-paper)]">
            <h2 className="font-serif text-2xl text-primary">Education</h2>
            <div className="mt-5 space-y-5 font-monohand text-sm text-ink/80">
              <p>
                <span className="font-marker text-ink">Mangalayatan University</span>
                <br />
                MCA (Distance) • Oct 2025 – Present
              </p>
              <p>
                <span className="font-marker text-ink">Acharya Institute of Graduate Studies</span>
                <br />
                BCA • Aug 2022 – Jul 2025
              </p>
            </div>
          </div>
          <div className="paper-grid rounded-[26px] bg-paper-deep p-8 shadow-[var(--shadow-paper)]">
            <h2 className="font-serif text-2xl text-primary">Certifications</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                "SAP Gen AI Developer",
                "SAP Build Developer",
                "SAP Data Analyst",
                "AWS Solutions Architect",
                "Azure DB Administrator",
                "SQL AI Developer",
                "Power BI",
                "Claude Architect",
                "Claude Developer",
                "Google • IBM • Meta",
                "Tableau • Alteryx • DataCamp",
              ].map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-primary/40 px-3 py-1 font-monohand text-xs text-ink/80"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CONNECT */}
        <section id="connect" data-reveal className="relative mt-16 md:mt-24">
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
                          onClick={() =>
                            setChecked((prev) =>
                              prev.includes(item)
                                ? prev.filter((v) => v !== item)
                                : [...prev, item],
                            )
                          }
                          className="flex w-full items-center gap-4 text-left font-marker text-base text-primary transition-transform hover:translate-x-1"
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
                </ul>
                <a
                  href="mailto:maazmohammed112@gmail.com"
                  className="mt-8 inline-block rounded-[14px] border-[3px] border-primary px-8 py-3 font-marker text-base text-primary transition-transform hover:-rotate-2"
                >
                  let's chat!
                </a>
              </div>
              <div className="min-h-[240px] rounded-[10px] border-[10px] border-primary p-6">
                <ul className="space-y-5">
                  <li>
                    <a
                      href="mailto:maazmohammed112@gmail.com"
                      className="flex items-center gap-3 font-monohand text-sm text-ink transition-colors hover:text-primary"
                    >
                      <Mail className="h-5 w-5 text-primary" />
                      maazmohammed112@gmail.com
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/mohammed-maaz-a-0aa730217"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 font-monohand text-sm text-ink transition-colors hover:text-primary"
                    >
                      <Linkedin className="h-5 w-5 text-primary" />
                      mohammed-maaz-a
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/maazmohammed112"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 font-monohand text-sm text-ink transition-colors hover:text-primary"
                    >
                      <Github className="h-5 w-5 text-primary" />
                      maazmohammed112
                    </a>
                  </li>
                  <li className="flex items-center gap-3 font-monohand text-sm text-ink/70">
                    <MapPin className="h-5 w-5 text-primary" />
                    Bengaluru, Karnataka, India
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-24 text-center" data-reveal>
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
