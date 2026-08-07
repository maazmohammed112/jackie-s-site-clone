import { createFileRoute } from "@tanstack/react-router";

import heroDoodle from "@/assets/hero-doodle.png";
import stampStrip from "@/assets/stamp-strip.png";
import doodleComputer from "@/assets/doodle-computer.png";
import doodleMisc from "@/assets/doodle-misc.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jamie — Product Designer in Cape Town" },
      {
        name: "description",
        content:
          "Portfolio of Jamie, a product designer who believes software should feel natural. Work, beliefs and a way to say hello.",
      },
      { property: "og:title", content: "Jamie — Product Designer in Cape Town" },
      {
        property: "og:description",
        content: "A product designer who believes software should feel natural.",
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

function Nav() {
  return (
    <nav className="relative z-30 flex items-center justify-center gap-8 pt-10 pb-2 text-2xl md:gap-14">
      <span className="text-3xl text-primary">☺</span>
      {["about", "work", "connect"].map((item) => (
        <a
          key={item}
          href={`#${item}`}
          className="font-marker text-base text-foreground transition-transform hover:-rotate-2 hover:text-primary md:text-lg"
        >
          {item}
        </a>
      ))}
    </nav>
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
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <StampRail side="left" />
      <StampRail side="right" />

      <div className="relative mx-auto max-w-5xl px-5 pb-24 md:px-8">
        <Nav />

        {/* HERO */}
        <section id="about" className="pt-8 md:pt-12">
          <PaperCard>
            <div className="grid items-center gap-6 p-8 md:grid-cols-[1.05fr_1fr] md:p-14">
              <div>
                <p className="font-hand text-6xl leading-none text-primary md:text-7xl">Jamie</p>
                <p className="mt-3 font-serif text-3xl text-primary md:text-4xl">
                  Product Designer
                </p>
                <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-primary md:text-6xl">
                  Software should
                  <br />
                  feel <span className="font-hand">natural</span>
                </h1>
                <p className="mt-6 font-marker text-sm text-primary/80 md:text-base">
                  Cape Town • GMT +2:00
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

        {/* BELIEFS */}
        <section className="mt-16 md:mt-24">
          <PaperCard>
            <div className="p-8 md:p-14">
              <p className="font-serif text-xl text-primary md:text-2xl">
                3 things I strongly believe in
              </p>

              <div className="relative mt-10 grid gap-6 pb-6 md:grid-cols-2">
                <div className="animate-float rotate-[-4deg] rounded-sm bg-secondary p-8 shadow-[var(--shadow-paper)] [--tilt:-4deg]">
                  <p className="font-marker text-2xl leading-relaxed text-ink md:text-3xl">
                    tirelessly pursue clarity.
                  </p>
                </div>
                <div className="paper-grid rotate-[3deg] rounded-sm bg-paper-deep p-8 shadow-[var(--shadow-paper)]">
                  <p className="font-monohand text-xl leading-relaxed text-ink md:text-2xl">
                    Software should empower.
                  </p>
                </div>
                <div className="rotate-[-1deg] rounded-sm bg-secondary p-8 shadow-[var(--shadow-paper)] md:col-span-2 md:mx-auto md:w-1/2">
                  <p className="font-serif text-3xl italic leading-tight text-ink md:text-4xl">
                    Design for moments
                  </p>
                </div>
              </div>
            </div>
          </PaperCard>
        </section>

        {/* WORK */}
        <section id="work" className="mt-16 md:mt-24">
          <div className="paper-grid relative rounded-[34px] border border-border bg-muted/40 p-8 md:p-12">
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { t: "Scheduling for clinics", d: "Turning a chaotic day into one calm timeline." },
                { t: "Freight negotiation", d: "Brokers, offers and timezones in one place." },
                { t: "Conference companion", d: "Find the talk you actually came for." },
                { t: "Ops timeline", d: "Live rail-works tracking for field crews." },
                { t: "Trail logbook", d: "Ride notes, photos and elevation, quietly." },
                { t: "Tiny experiments", d: "Weekend builds that taught me something." },
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
              Everything you do, do it with care.
            </p>
          </div>
        </section>

        {/* CONNECT */}
        <section id="connect" className="relative mt-16 md:mt-24">
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
                  {["Impactful work", "Meaningful work", "A diverse team of talented folks"].map(
                    (item) => (
                      <li
                        key={item}
                        className="flex items-center gap-4 border-b border-dashed border-primary/40 pb-4 font-marker text-base text-primary"
                      >
                        <span className="h-5 w-5 shrink-0 rounded-[4px] border-2 border-primary" />
                        {item}
                      </li>
                    ),
                  )}
                </ul>
                <a
                  href="mailto:hello@example.com"
                  className="mt-8 inline-block rounded-[14px] border-[3px] border-primary px-8 py-3 font-marker text-base text-primary transition-transform hover:-rotate-2"
                >
                  let's chat!
                </a>
              </div>
              <div className="min-h-[240px] rounded-[10px] border-[10px] border-primary" />
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-24 text-center">
          <img
            src={doodleComputer}
            alt="Chalk drawing of a smiling retro computer"
            loading="lazy"
            width={768}
            height={640}
            className="mx-auto w-48 opacity-90"
          />
          <div className="mt-6 overflow-hidden">
            <div className="animate-marquee flex w-max gap-16 font-marker text-sm text-foreground/80">
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i} className="whitespace-nowrap">
                  ♫ made slowly, in Cape Town • sketched before it was shipped ♫
                </span>
              ))}
            </div>
          </div>
          <p className="mt-10 font-hand text-5xl text-primary">Jamie</p>
        </footer>
      </div>
    </main>
  );
}
