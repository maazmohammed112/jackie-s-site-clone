import { useState } from "react";

interface Experience {
  company: string;
  role: string;
  duration: string;
  current: boolean;
  code: string;
  tagline: string;
  bullets: string[];
}

const EXPERIENCES: Experience[] = [
  {
    company: "Cognizant",
    role: "SAP BPA Automation Engineer",
    duration: "2022 — Present",
    current: true,
    code: "COG2022PRSNT",
    tagline:
      "Building low-code automation on SAP Build Process Automation, SAP Build Apps and SAP's Generative AI Prompt Editor for enterprise workflows.",
    bullets: [
      "Automated invoice approval workflows end-to-end, cutting manual processing time.",
      "Built leave approval automation using SAP Build Process Automation.",
      "Automated PO validation, reducing errors in the procurement cycle.",
      "Worked across SAP Build Apps and SAP Generative AI Prompt Editor to extend low-code tooling.",
    ],
  },
  {
    company: "MSA Software",
    role: "Software Testing, QA Engineer",
    duration: "Apr 2025 – Aug 2025",
    current: false,
    code: "MSA2025QA",
    tagline:
      "Manual, exploratory, regression and functional testing across Web, Android, TV and Widget apps.",
    bullets: [
      "Manual, exploratory, regression and functional testing across Web, Android, TV and Widget apps.",
      "Tracked defects in Jira and validated fixes with developers.",
    ],
  },
  {
    company: "Self-Employed",
    role: "Freelance Full Stack Developer",
    duration: "2025",
    current: false,
    code: "FREELANCE2025",
    tagline:
      "Full-stack web applications built with React, Next.js, and Tailwind CSS.",
    bullets: [
      "Full-stack apps with React, Next.js and Tailwind CSS.",
      "Delivered PrimKart — an e-commerce platform with payment workflow and admin dashboard.",
    ],
  },
];

function makeBarcodeBars(code: string) {
  const bars = [];
  let x = 4;
  for (let i = 0; i < code.length; i++) {
    const w = 1 + (code.charCodeAt(i) % 3);
    if (code.charCodeAt(i) % 2 === 0) {
      bars.push(<rect key={i} x={x} y={2} width={w} height={40} fill="#201c16" />);
    }
    x += w + 2;
  }
  return { bars, width: Math.max(x, 140) };
}

export default function WorkExperienceTag() {
  const defaultIdx = EXPERIENCES.findIndex((e) => e.current);
  const [activeIndex, setActiveIndex] = useState(defaultIdx !== -1 ? defaultIdx : 0);
  const [flipped, setFlipped] = useState(false);

  const exp = (EXPERIENCES[activeIndex] ?? EXPERIENCES[0])!;
  const { bars: barcodeBars, width: barcodeWidth } = makeBarcodeBars(exp.code);

  return (
    <div className="flex flex-col items-center pt-8 sm:pt-12 pb-4 px-2">
      {/* Global SVG Filters for sketchy noise effect */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <filter id="sketchy" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="2" seed="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" />
          </filter>
          <filter id="sketchyThread" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="9" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
          </filter>
        </defs>
      </svg>

      {/* Stage Container */}
      <div className="stage-container relative w-[320px] xs:w-[340px] sm:w-[360px] max-w-[92vw] mt-14 sm:mt-16 mb-6 [perspective:1600px]">
        <div
          onClick={() => setFlipped((prev) => !prev)}
          className="tag-wrap relative w-full pb-[144%] cursor-pointer select-none [tap-highlight-color:transparent]"
        >
          <div
            className={`tag-inner absolute inset-0 transition-transform duration-700 [transform-style:preserve-3d] ${
              flipped ? "[transform:rotateY(180deg)]" : ""
            }`}
          >
            {/* FRONT FACE */}
            <div className="face face-front absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden]">
              {/* Backing Card - Theme Primary Blue/Teal */}
              <div
                className="backing absolute inset-0 left-[7%] top-[5%] rounded-[22px] rotate-[4deg] shadow-[0_30px_50px_-20px_rgba(0,0,0,0.6)]"
                style={{
                  background: "linear-gradient(160deg, var(--color-primary), oklch(0.52 0.13 184))",
                }}
              />

              {/* String */}
              <svg className="string absolute -top-[68px] sm:-top-[72px] left-1/2 w-[100px] sm:w-[112px] h-[80px] sm:h-[86px] -translate-x-[56%] -rotate-[3deg] pointer-events-none" viewBox="0 0 120 92">
                <g filter="url(#sketchyThread)">
                  <path
                    d="M60 90 C 18 84, 4 48, 20 26 C 33 8, 62 0, 78 12 C 92 23, 84 44, 64 40 C 48 37, 46 20, 60 13"
                    stroke="#8f8f8f"
                    strokeWidth="3.2"
                    fill="none"
                    strokeLinecap="round"
                  />
                </g>
              </svg>

              {/* Grommet Hole */}
              <div
                className="grommet-hole absolute top-[12px] sm:top-[14px] left-1/2 w-[30px] sm:w-[34px] h-[30px] sm:h-[34px] -translate-x-[58%] -rotate-[4deg] rounded-full z-10"
                style={{
                  background: "radial-gradient(circle at 35% 30%, #d8cba9, #b9a97e 55%, #86795a 100%)",
                  boxShadow: "inset 0 0 0 4px #f1e6d1, inset 0 0 0 6px #6d6249",
                }}
              >
                <div className="absolute inset-[7px] sm:inset-[9px] rounded-full bg-[#171310]" />
              </div>

              {/* Cream Card */}
              <div
                className="card absolute inset-0 right-[7%] bottom-[5%] rounded-[20px] -rotate-[4deg] shadow-[0_24px_40px_-18px_rgba(0,0,0,0.55),inset_0_0_0_1px_rgba(0,0,0,0.04)] flex flex-col items-center p-5 sm:p-6 pt-[30px] sm:pt-[34px] pb-4 sm:pb-[20px] text-[#201c16] overflow-hidden"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, rgba(0,0,0,0.015) 0 1px, transparent 1px 3px), linear-gradient(155deg, #f4ead6, #f1e6d1 55%, #ecdfc3)",
                }}
              >
                {exp.current && (
                  <span
                    className="current-flag absolute top-3 right-3 font-hand text-[15px] sm:text-[16px] font-bold tracking-wider bg-primary text-primary-foreground px-2.5 py-0.5 rounded-[5px] rotate-[3deg] shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
                  >
                    current
                  </span>
                )}

                {/* Garment Wash Icons */}
                <div className="icon-row flex gap-2.5 sm:gap-3.5 my-4 sm:my-5 mt-3 sm:mt-4">
                  {/* Iron */}
                  <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8 overflow-visible">
                    <g filter="url(#sketchy)">
                      <path d="M4 18 C4 9 7 5.5 12.5 5.5 C17.5 5.5 19.5 9.5 18.5 14 C18 16.5 16.5 18 14 18 Z" stroke="#201c16" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M3 18.5 H16.5" stroke="#201c16" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8.5 5.8 C9 4 11 3.3 12.7 4.3" stroke="#201c16" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                  </svg>
                  {/* Crown 30 */}
                  <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8 overflow-visible">
                    <g filter="url(#sketchy)">
                      <path d="M4 10 L4 17 L20 17 L20 10 L15.5 13.3 L12 6.5 L8.5 13.3 Z" stroke="#201c16" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="4" cy="9" r="1" stroke="#201c16" strokeWidth="1.6" fill="none" />
                      <circle cx="12" cy="5.3" r="1" stroke="#201c16" strokeWidth="1.6" fill="none" />
                      <circle cx="20" cy="9" r="1" stroke="#201c16" strokeWidth="1.6" fill="none" />
                    </g>
                    <text x="12" y="16" textAnchor="middle" className="font-['Space_Mono',monospace] text-[9px] font-bold" fill="#201c16" stroke="none">30</text>
                  </svg>
                  {/* Do not tumble dry */}
                  <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8 overflow-visible">
                    <g filter="url(#sketchy)">
                      <rect x="4" y="4" width="16" height="16" rx="2.5" stroke="#201c16" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="12" r="5" stroke="#201c16" strokeWidth="1.6" fill="none" />
                      <line x1="5.5" y1="5.5" x2="18.5" y2="18.5" stroke="#201c16" strokeWidth="1.6" strokeLinecap="round" />
                    </g>
                  </svg>
                  {/* Do not dry clean */}
                  <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8 overflow-visible">
                    <g filter="url(#sketchy)">
                      <circle cx="12" cy="12" r="8" stroke="#201c16" strokeWidth="1.6" fill="none" />
                      <line x1="6" y1="6" x2="18" y2="18" stroke="#201c16" strokeWidth="1.6" strokeLinecap="round" />
                      <line x1="18" y1="6" x2="6" y2="18" stroke="#201c16" strokeWidth="1.6" strokeLinecap="round" />
                    </g>
                  </svg>
                  {/* Do not bleach */}
                  <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8 overflow-visible">
                    <g filter="url(#sketchy)">
                      <path d="M12 3.5 L21 19.5 H3 Z" stroke="#201c16" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      <line x1="8" y1="10.5" x2="16" y2="17" stroke="#201c16" strokeWidth="1.6" strokeLinecap="round" />
                      <line x1="16" y1="10.5" x2="8" y2="17" stroke="#201c16" strokeWidth="1.6" strokeLinecap="round" />
                      <line x1="16.5" y1="17.5" x2="20" y2="21.5" stroke="#201c16" strokeWidth="1.6" strokeLinecap="round" />
                    </g>
                  </svg>
                </div>

                <h3 className="self-start font-['Silkscreen',monospace] text-[24px] xs:text-[26px] sm:text-[28px] leading-none mb-1 tracking-[0.01em]">
                  {exp.company}
                </h3>
                <p className="self-start font-['Space_Mono',monospace] text-[10.5px] sm:text-[11px] font-bold tracking-[0.06em] uppercase text-[#7a6a4c] mb-2.5">
                  {exp.role} · {exp.duration}
                </p>
                <p className="self-start font-['Space_Mono',monospace] text-[12px] xs:text-[13px] sm:text-[13.5px] leading-[1.5] mb-auto pb-2">
                  {exp.tagline}
                </p>

                <p className="self-start font-['Space_Mono',monospace] text-[9.5px] sm:text-[10px] text-[#a08a5f] tracking-[0.08em] uppercase mb-2">
                  Tap to flip →
                </p>

                <div className="barcode-wrap w-full flex flex-col items-start gap-0.5">
                  <svg viewBox={`0 0 ${barcodeWidth} 46`} className="h-[40px] sm:h-[46px] w-[130px] sm:w-[150px]">
                    {barcodeBars}
                  </svg>
                  <span className="font-['Space_Mono',monospace] text-[11px] sm:text-[12px] tracking-[0.06em] font-bold">
                    {exp.code}
                  </span>
                </div>
              </div>
            </div>

            {/* BACK FACE */}
            <div className="face face-back absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden]">
              {/* Backing Card - Theme Primary Blue/Teal */}
              <div
                className="backing absolute inset-0 left-[7%] top-[5%] rounded-[22px] rotate-[4deg] shadow-[0_30px_50px_-20px_rgba(0,0,0,0.6)]"
                style={{
                  background: "linear-gradient(160deg, var(--color-primary), oklch(0.52 0.13 184))",
                }}
              />

              {/* Cream Card */}
              <div
                className="card absolute inset-0 right-[7%] bottom-[5%] rounded-[20px] -rotate-[4deg] shadow-[0_24px_40px_-18px_rgba(0,0,0,0.55),inset_0_0_0_1px_rgba(0,0,0,0.04)] flex flex-col items-start p-4 sm:p-5 pt-[22px] sm:pt-[26px] pb-3 sm:pb-4 text-[#201c16] overflow-hidden"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, rgba(0,0,0,0.015) 0 1px, transparent 1px 3px), linear-gradient(155deg, #f4ead6, #f1e6d1 55%, #ecdfc3)",
                }}
              >
                <h4 className="font-['Silkscreen',monospace] text-[16px] sm:text-[18px] leading-tight mb-0.5">
                  {exp.role}
                </h4>
                <p className="font-['Space_Mono',monospace] text-[10px] sm:text-[10.5px] text-[#7a6a4c] uppercase tracking-[0.05em] mb-2 sm:mb-3">
                  {exp.company} · {exp.duration}
                </p>

                <ul className="list-none p-0 m-0 mb-auto flex flex-col gap-1.5 sm:gap-2">
                  {exp.bullets.map((b, i) => (
                    <li key={i} className="relative pl-3.5 font-['Space_Mono',monospace] text-[10.5px] sm:text-[11.5px] leading-[1.4]">
                      <span className="absolute left-0 text-primary font-bold">—</span>
                      {b}
                    </li>
                  ))}
                </ul>

                <p className="font-['Space_Mono',monospace] text-[9.5px] sm:text-[10px] text-[#a08a5f] tracking-[0.08em] uppercase mt-auto pt-1">
                  ← Tap to flip back
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Handwritten Employer Names Selection (No Background Box, White Text & Pencil Underline) */}
      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-4 max-w-[500px]">
        {EXPERIENCES.map((e, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={e.company}
              type="button"
              onClick={() => {
                setActiveIndex(i);
                setFlipped(false);
              }}
              className="relative font-hand text-2xl sm:text-3xl text-white cursor-pointer transition-opacity hover:opacity-100 py-1"
              style={{ opacity: isActive ? 1 : 0.65 }}
            >
              <span className="relative inline-block px-1">
                {e.company}
                {isActive && (
                  <svg
                    className="absolute -bottom-1.5 left-0 w-full h-[8px] overflow-visible pointer-events-none"
                    viewBox="0 0 60 8"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M1 4 C 15 1, 30 6, 45 2.5 C 52 1.5, 57 4.5, 59 3.5"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
