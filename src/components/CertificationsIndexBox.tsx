import { useState } from "react";

interface Certification {
  id: string;
  num: string;
  title: string;
  category: "sap" | "cloud" | "ai" | "data";
  issuer: string;
  domain: string;
  level: string;
  credentialId: string;
  issuedOn: string;
  logoType: "sap" | "aws" | "azure" | "microsoft" | "anthropic" | "google" | "tableau";
}

const CERTIFICATIONS: Certification[] = [
  {
    id: "aws-saa",
    num: "001",
    title: "AWS SOLUTIONS ARCHITECT",
    category: "cloud",
    issuer: "Amazon Web Services",
    domain: "Cloud Architecture",
    level: "Professional",
    credentialId: "AWS-SAA-PRO-2023",
    issuedOn: "12 NOV 2023",
    logoType: "aws",
  },
  {
    id: "aws-genai",
    num: "002",
    title: "AWS GEN AI DEV ASSOCIATE - PROFESSIONAL",
    category: "cloud",
    issuer: "Amazon Web Services",
    domain: "Generative AI & ML",
    level: "Professional",
    credentialId: "AWS-GENAI-DEV-2024",
    issuedOn: "18 APR 2024",
    logoType: "aws",
  },
  {
    id: "sap-genai",
    num: "003",
    title: "SAP GEN AI DEVELOPER",
    category: "sap",
    issuer: "SAP SE",
    domain: "Generative AI Hub & Prompting",
    level: "Professional",
    credentialId: "SAP-GENAI-DEV-2025",
    issuedOn: "15 JAN 2025",
    logoType: "sap",
  },
  {
    id: "sap-build",
    num: "004",
    title: "SAP BUILD DEVELOPER",
    category: "sap",
    issuer: "SAP SE",
    domain: "Low-Code Process Automation",
    level: "Developer",
    credentialId: "SAP-BUILD-DEV-2024",
    issuedOn: "20 SEP 2024",
    logoType: "sap",
  },
  {
    id: "sap-data",
    num: "005",
    title: "SAP DATA ANALYST",
    category: "sap",
    issuer: "SAP SE",
    domain: "Enterprise Data Analytics",
    level: "Associate",
    credentialId: "SAP-DATA-ANALYST-2024",
    issuedOn: "08 JUN 2024",
    logoType: "sap",
  },
  {
    id: "azure-db",
    num: "006",
    title: "AZURE DB ADMINISTRATOR",
    category: "cloud",
    issuer: "Microsoft Azure",
    domain: "Database Administration (DP-300)",
    level: "Associate",
    credentialId: "AZURE-DBA-300-2024",
    issuedOn: "14 AUG 2024",
    logoType: "azure",
  },
  {
    id: "ms-sql-ai",
    num: "007",
    title: "MICROSOFT SQL AI DEVELOPER",
    category: "ai",
    issuer: "Microsoft",
    domain: "SQL AI Engineering & Vector DB",
    level: "Advanced",
    credentialId: "MS-SQL-AI-2025",
    issuedOn: "02 FEB 2025",
    logoType: "microsoft",
  },
  {
    id: "power-bi",
    num: "008",
    title: "POWER BI DATA ANALYST",
    category: "data",
    issuer: "Microsoft",
    domain: "BI & Data Visualization (PL-300)",
    level: "Associate",
    credentialId: "MS-PL300-2024",
    issuedOn: "11 MAR 2024",
    logoType: "microsoft",
  },
  {
    id: "claude-arch",
    num: "009",
    title: "CLAUDE ARCHITECT",
    category: "ai",
    issuer: "Anthropic",
    domain: "Agentic AI Systems & Architecture",
    level: "Architect",
    credentialId: "CLAUDE-ARCH-2025",
    issuedOn: "22 JAN 2025",
    logoType: "anthropic",
  },
  {
    id: "claude-dev",
    num: "010",
    title: "CLAUDE DEVELOPER",
    category: "ai",
    issuer: "Anthropic",
    domain: "Prompt Engineering & Claude API",
    level: "Developer",
    credentialId: "CLAUDE-DEV-2025",
    issuedOn: "10 JAN 2025",
    logoType: "anthropic",
  },
  {
    id: "g-ibm-meta",
    num: "011",
    title: "GOOGLE • IBM • META CERTIFIED",
    category: "data",
    issuer: "Google / IBM / Meta",
    domain: "Data Science & Machine Learning",
    level: "Specialist",
    credentialId: "GIM-DATA-SPEC-2024",
    issuedOn: "05 DEC 2024",
    logoType: "google",
  },
  {
    id: "tab-alt-dc",
    num: "012",
    title: "TABLEAU • ALTERYX • DATACAMP",
    category: "data",
    issuer: "Tableau / Alteryx / DataCamp",
    domain: "ETL & Analytics Automation",
    level: "Specialist",
    credentialId: "TAD-ANALYTICS-2024",
    issuedOn: "19 JUL 2024",
    logoType: "tableau",
  },
];

const TABS = [
  { id: "all", label: "ALL", bg: "bg-[#7d8c7c] text-white" },
  { id: "sap", label: "SAP & ENTERPRISE", bg: "bg-[#c5b597] text-[#201c16]" },
  { id: "cloud", label: "CLOUD & AWS/AZURE", bg: "bg-[#6c8e9d] text-white" },
  { id: "ai", label: "AI & ANTHROPIC", bg: "bg-[#9a7b8e] text-white" },
  { id: "data", label: "DATA & ANALYTICS", bg: "bg-[#c89968] text-[#201c16]" },
] as const;

function TechLogo({ type }: { type: Certification["logoType"] }) {
  if (type === "aws") {
    return (
      <svg viewBox="0 0 100 60" className="w-20 h-12 text-[#201c16]" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M 25 32 C 30 18, 70 18, 75 32 C 85 32, 90 44, 78 48 L 22 48 C 10 44, 15 32, 25 32 Z" />
        <path d="M 30 52 Q 50 60 70 52" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 66 50 L 71 52 L 67 56" strokeWidth="2" strokeLinecap="round" fill="none" />
        <text x="50" y="38" textAnchor="middle" className="font-['Silkscreen',monospace] text-[13px] font-bold" stroke="none" fill="currentColor">
          aws
        </text>
      </svg>
    );
  }
  if (type === "sap") {
    return (
      <svg viewBox="0 0 90 50" className="w-20 h-12 text-[#201c16]" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="10,5 80,5 80,45 10,45" />
        <path d="M 10,45 L 80,5" strokeWidth="1.5" />
        <text x="32" y="32" className="font-['Silkscreen',monospace] text-[18px] font-bold" stroke="none" fill="currentColor">
          SAP
        </text>
      </svg>
    );
  }
  if (type === "azure" || type === "microsoft") {
    return (
      <svg viewBox="0 0 90 50" className="w-18 h-12 text-[#201c16]" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="15" y="10" width="26" height="13" />
        <rect x="45" y="10" width="26" height="13" />
        <rect x="15" y="27" width="26" height="13" />
        <rect x="45" y="27" width="26" height="13" />
      </svg>
    );
  }
  if (type === "anthropic") {
    return (
      <svg viewBox="0 0 80 50" className="w-18 h-12 text-[#201c16]" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="40,8 70,42 10,42" />
        <line x1="25" y1="28" x2="55" y2="28" strokeWidth="2.5" />
      </svg>
    );
  }
  if (type === "google") {
    return (
      <svg viewBox="0 0 80 50" className="w-18 h-12 text-[#201c16]" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="40" cy="25" r="18" />
        <line x1="40" y1="25" x2="60" y2="25" strokeWidth="2.5" />
      </svg>
    );
  }
  // Tableau / default
  return (
    <svg viewBox="0 0 80 50" className="w-18 h-12 text-[#201c16]" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="40" y1="10" x2="40" y2="40" strokeWidth="2.5" />
      <line x1="25" y1="25" x2="55" y2="25" strokeWidth="2.5" />
      <circle cx="40" cy="25" r="4" fill="currentColor" />
    </svg>
  );
}

export default function CertificationsIndexBox() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const filtered =
    activeCategory === "all"
      ? CERTIFICATIONS
      : CERTIFICATIONS.filter((c) => c.category === activeCategory);

  const activeCard = (filtered[currentIndex % filtered.length] ?? CERTIFICATIONS[0])!;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filtered.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto my-12 px-2 sm:px-4">
      {/* Category Filing Tabs Header */}
      <div className="flex flex-wrap items-end gap-1 sm:gap-2 px-3 z-10 relative">
        {TABS.map((tab) => {
          const isSelected = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveCategory(tab.id);
                setCurrentIndex(0);
              }}
              className={`font-['Space_Mono',monospace] text-[10px] sm:text-[11.5px] font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-t-[8px] transition-transform duration-200 cursor-pointer shadow-sm border-t border-x border-black/20 ${
                tab.bg
              } ${isSelected ? "-translate-y-1 scale-105 shadow-md z-20" : "opacity-80 hover:opacity-100"}`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Outer Metallic / Wooden Filing Drawer Container */}
      <div className="relative rounded-[16px] bg-gradient-to-b from-[#2b2723] via-[#1f1c19] to-[#141210] p-4 sm:p-6 md:p-8 border-4 border-[#3a342e] shadow-[0_30px_70px_rgba(0,0,0,0.85),inset_0_2px_4px_rgba(255,255,255,0.1)]">
        
        {/* Interior Drawer Slots Texture */}
        <div className="relative bg-[#161412] rounded-[10px] p-4 sm:p-6 border border-white/5 shadow-inner min-h-[360px] sm:min-h-[420px] flex flex-col justify-between overflow-hidden">
          
          {/* Background Card Slots Lines */}
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-full pointer-events-none opacity-20 bg-[repeating-linear-gradient(180deg,transparent_0_12px,rgba(255,255,255,0.05)_12px_14px)]" />

          {/* Stacked Cards Visual Effect behind the main active card */}
          <div className="relative w-full flex-1 flex items-center justify-center py-4">
            
            {/* Background stacked dummy cards for depth */}
            <div className="absolute w-[94%] h-[240px] sm:h-[280px] bg-[#d9cca9] rounded-[8px] -top-3 shadow-md opacity-40 scale-95 border border-black/10" />
            <div className="absolute w-[97%] h-[240px] sm:h-[280px] bg-[#e4d8b8] rounded-[8px] -top-1.5 shadow-md opacity-70 scale-98 border border-black/10" />

            {/* MAIN ACTIVE PUNCH CARD */}
            <div
              onClick={handleNext}
              className="relative w-full max-w-2xl bg-[#f4ead6] text-[#201c16] rounded-[8px] p-5 sm:p-7 shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_0_1px_rgba(0,0,0,0.08)] cursor-pointer select-none transition-transform duration-300 hover:scale-[1.01]"
              style={{
                clipPath:
                  "polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%, 0 16px)",
                background:
                  "repeating-linear-gradient(0deg, rgba(0,0,0,0.015) 0 1px, transparent 1px 3px), linear-gradient(155deg, #f8f0de, #f4ead6 55%, #eae0c7)",
              }}
            >
              {/* Top Row Punch Holes Pattern */}
              <div className="flex justify-between items-center font-['Space_Mono',monospace] text-[9px] text-[#7a6a4c] tracking-[0.2em] mb-4 pb-2 border-b border-[#201c16]/10">
                <span className="truncate">1  0  000  0  .01  0  000  001</span>
                <span className="font-['Silkscreen',monospace] text-xs font-bold text-[#201c16]">
                  {activeCard.num}
                </span>
              </div>

              {/* Main Certification Header */}
              <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                <h3 className="font-['Space_Mono',monospace] text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-[#201c16] max-w-[75%] leading-tight">
                  {activeCard.title}
                </h3>
              </div>

              {/* Certificate Details Grid & Tech Logo */}
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 items-center my-4">
                
                {/* Left Metadata Grid */}
                <div className="font-['Space_Mono',monospace] text-xs sm:text-[13px] space-y-1.5 text-[#201c16]/90">
                  <div className="flex">
                    <span className="w-32 uppercase text-[#7a6a4c]">ISSUER</span>
                    <span className="font-bold">: {activeCard.issuer}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 uppercase text-[#7a6a4c]">DOMAIN</span>
                    <span className="font-bold">: {activeCard.domain}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 uppercase text-[#7a6a4c]">LEVEL</span>
                    <span className="font-bold">: {activeCard.level}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 uppercase text-[#7a6a4c]">CREDENTIAL ID</span>
                    <span className="font-bold">: {activeCard.credentialId}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 uppercase text-[#7a6a4c]">ISSUED ON</span>
                    <span className="font-bold">: {activeCard.issuedOn}</span>
                  </div>
                </div>

                {/* Right Logo & Rubber Stamp */}
                <div className="flex flex-col items-center sm:items-end justify-between gap-3">
                  <TechLogo type={activeCard.logoType} />

                  {/* Red Angled Rubber Stamp */}
                  <div className="font-['Silkscreen',monospace] text-xs sm:text-sm font-bold tracking-widest text-[#d94a38] border-2 border-[#d94a38] px-3 py-1 rounded-[4px] -rotate-12 shadow-sm bg-[#f4ead6]/80 backdrop-blur-[1px]">
                    VERIFIED
                  </div>
                </div>

              </div>

              {/* Bottom Punch Hole Numbers Sequence */}
              <div className="mt-6 pt-3 border-t border-[#201c16]/10 flex justify-between items-center font-['Space_Mono',monospace] text-[8px] sm:text-[9.5px] text-[#7a6a4c] tracking-widest overflow-hidden">
                <span>1 2 3 4 5 6 7 8 9 10 11 12 14 15 16 22 25 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45</span>
              </div>
            </div>

            {/* Side Note Taped to Box */}
            <div className="hidden lg:block absolute -right-6 top-6 w-36 bg-[#f1e6d1] text-[#201c16] p-3 rounded-[4px] shadow-md rotate-3 border border-black/10">
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 h-5 w-12 bg-white/40 border border-black/10 rotate-[-2deg]" />
              <p className="font-['Caveat',cursive] text-sm leading-tight text-[#201c16]">
                Flip through cards to explore each certification. ⤵
              </p>
            </div>

          </div>

          {/* Drawer Bottom Controls & Brass Plaque */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
            
            {/* Card Counter */}
            <div className="font-['Space_Mono',monospace] text-xs text-chalk/70">
              CARD <span className="font-bold text-chalk">{(currentIndex % filtered.length) + 1}</span> OF <span className="font-bold text-chalk">{filtered.length}</span>
            </div>

            {/* Brass Index Plaque (Center) */}
            <div className="relative px-6 py-2 rounded-[6px] bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#b8860b] text-[#1a1405] text-center shadow-[0_4px_10px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.8)] border border-[#8b6508]">
              <span className="absolute left-1.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#5c4008] shadow-inner" />
              <span className="absolute right-1.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#5c4008] shadow-inner" />
              <h4 className="font-['Silkscreen',monospace] text-xs sm:text-sm font-bold tracking-wider uppercase">
                CERTIFICATIONS INDEX
              </h4>
              <p className="font-['Caveat',cursive] text-xs font-bold leading-none text-[#3d2b06]">
                Verified. Trusted. Achieved.
              </p>
            </div>

            {/* Next / Prev Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous certification"
                className="px-3 py-1.5 rounded-[4px] bg-[#2a2622] hover:bg-primary border border-white/15 text-chalk font-['Silkscreen',monospace] text-xs transition-colors"
              >
                ← PREV
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next certification"
                className="px-3 py-1.5 rounded-[4px] bg-[#2a2622] hover:bg-primary border border-white/15 text-chalk font-['Silkscreen',monospace] text-xs transition-colors"
              >
                NEXT →
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
