import { useState } from "react";

const ITEMS = [
  { t: "PrimKart", d: "Full e-commerce platform with payment workflow and admin dashboard." },
  { t: "BunkBuddy", d: "1st place, Education Track — CODE4HOPE / ImpactX Hackathon." },
  { t: "DukaanSetu", d: "Top 30% of 2,989 at the OpenAI × NamasteDev Codex Hackathon." },
  { t: "Neuro SAN", d: "Multi-agent AI workflows for the Cognizant Neuro SAN challenge." },
  { t: "Discuss", d: "Social platform on Google Play — founder and solo developer." },
  { t: "SAP BPA workflows", d: "Enterprise approval automation on SAP BTP." },
];

function PencilArrow({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 40 26"
      className={`work-toggle-arrow h-5 w-7 ${open ? "is-open" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 8c5 5 9 9 16 12 6-3 11-7 16-12" />
      <path d="M5.5 6.6C10 11.4 14 15 20 18" opacity="0.5" />
    </svg>
  );
}

export default function WorkBoxes() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex items-center gap-2 rounded-full border border-primary/50 bg-paper px-4 py-2 font-monohand text-[11px] font-bold uppercase tracking-widest text-ink shadow-[0_4px_0_rgba(0,0,0,.3)] transition-transform hover:-translate-y-0.5"
        >
          {open ? "hide all projects" : "see all projects"}
          <PencilArrow open={open} />
        </button>
      </div>

      {open && (
        <div className="work-grid-open mt-8 grid gap-6 md:grid-cols-3">
          {ITEMS.map((p, i) => (
            <article
              key={p.t}
              className="rounded-xl bg-paper p-6 shadow-[var(--shadow-paper)] transition-transform hover:-translate-y-1"
              style={{ rotate: `${(i % 3) - 1}deg`, animationDelay: `${i * 60}ms` }}
            >
              <h3 className="font-marker text-base text-ink">{p.t}</h3>
              <p className="mt-2 font-hand text-xl leading-snug text-ink/70">{p.d}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
