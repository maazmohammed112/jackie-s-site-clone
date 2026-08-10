import { useState } from "react";

interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  period: string;
  status: string;
  admitNo: string;
  code: string;
  description: string;
  seatInfo: string;
  year: string;
  image: string;
}

const EDUCATION_DATA: EducationItem[] = [
  {
    degree: "MCA",
    field: "Master of Computer Applications",
    institution: "Mangalayatan University",
    period: "Oct 2025 – Present",
    status: "Distance online",
    admitNo: "ADMIT 1",
    code: "MCA2025ONLINE",
    description:
      "Pursue higher knowledge and master advanced computer applications, cloud systems and modern software engineering from anywhere in the world!",
    seatInfo: "Row M0 Seat U1",
    year: "2025",
    image: "/education-mangalayatan-university.jpg",
  },
  {
    degree: "BCA",
    field: "Bachelor of Computer Applications",
    institution: "Acharya Institute of Graduate Studies",
    period: "Aug 2022 – Jul 2025",
    status: "Graduated",
    admitNo: "ADMIT 1",
    code: "BCA2022GRAD",
    description:
      "Build strong foundations in computer science, algorithm design, web development, and enterprise database systems.",
    seatInfo: "Row A2 Seat B5",
    year: "2022",
    image: "/education-acharya-institute.jpg",
  },
];

function DataMatrixBarcode() {
  // Authentic DataMatrix 14x14 pattern
  const pattern = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0],
    [1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0],
    [1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1],
    [1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0],
    [1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
    [1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  return (
    <svg viewBox="0 0 14 14" className="w-12 h-12 sm:w-14 sm:h-14">
      {pattern.map((row, r) =>
        row.map((val, c) =>
          val ? <rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} fill="#181616" /> : null
        )
      )}
    </svg>
  );
}

function SingleTicket({ item, index }: { item: EducationItem; index: number }) {
  return (
    <div
      className={`relative w-full max-w-4xl mx-auto my-6 rounded-[4px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.75)] overflow-hidden transition-transform duration-300 hover:rotate-0 ${
        index % 2 === 0 ? "rotate-[-1deg]" : "rotate-[1deg]"
      }`}
    >
      {/* Ticket Wrapper */}
      <div className="flex flex-col md:flex-row bg-[#161515] text-[#f1e6d1] border border-white/10 relative">
        
        {/* Left Section: Campus Photo with Red Theme Duotone Overlay */}
        <div
          onClick={() => {
            if (item.institution.toLowerCase().includes("mangalayatan")) {
              window.dispatchEvent(new CustomEvent("maaz_edu_mangalayatan_clicked"));
            } else {
              window.dispatchEvent(new CustomEvent("maaz_edu_acharya_clicked"));
            }
          }}
          title={`Click to hear Maaz's story about ${item.institution}!`}
          className="w-full md:w-56 lg:w-64 h-48 md:h-auto shrink-0 relative overflow-hidden border-b md:border-b-0 md:border-r border-white/15 bg-red-950 cursor-pointer group"
        >
          <img
            src={item.image}
            alt={`${item.institution} Campus`}
            className="w-full h-full object-cover filter contrast-[1.2] brightness-95 saturate-[1.2] transition-transform duration-300 group-hover:scale-105"
          />
          {/* Red Theme Color Duotone Filter Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-red-950/90 via-red-900/40 to-red-900/20 mix-blend-multiply pointer-events-none" />
          <div className="absolute inset-0 bg-red-800/35 mix-blend-color pointer-events-none" />
          
          <div className="absolute bottom-2.5 left-3 font-['Silkscreen',monospace] text-[10px] tracking-wider text-amber-100 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] z-10 font-bold">
            {item.degree} • {item.status}
          </div>
        </div>

        {/* Center Main Section: Ticket Information */}
        <div className="flex-1 p-5 sm:p-6 lg:p-7 flex flex-col justify-between space-y-4">
          {/* Top Description */}
          <p className="font-['Instrument_Serif',serif] text-xl sm:text-2xl lg:text-[26px] leading-[1.15] text-[#f1e6d1] tracking-wide max-w-2xl">
            {item.description}
          </p>

          <div className="space-y-1">
            {/* Admit Label */}
            <div className="font-['Silkscreen',monospace] text-base sm:text-lg tracking-[0.15em] text-white">
              {item.admitNo}
            </div>

            {/* Institution Subtitle */}
            <div className="font-['Instrument_Serif',serif] text-lg sm:text-xl text-[#f1e6d1]/80 italic">
              {item.institution} — {item.field} ({item.period})
            </div>

            {/* Row & Seat Info */}
            <div className="font-['Space_Mono',monospace] text-xs text-[#8f8f8f] tracking-wider uppercase pt-1">
              {item.seatInfo} • GATE 05 • BOARDING PASS
            </div>
          </div>

          {/* Big Pixel Degree Title & Year */}
          <div className="flex items-end justify-between pt-2 border-t border-white/10">
            <span className="font-['Silkscreen',monospace] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider text-white">
              {item.degree}
            </span>
            <span className="font-['Silkscreen',monospace] text-lg sm:text-xl text-[#8f8f8f]">
              {item.year}
            </span>
          </div>
        </div>

        {/* Right Perforated Stub */}
        <div className="w-full md:w-36 lg:w-40 bg-[#ebdcc4] text-[#181616] shrink-0 relative flex flex-row md:flex-col justify-between items-center p-4 sm:p-5 border-t md:border-t-0 md:border-l-2 border-dashed border-[#161515]">
          
          {/* Semi-circular Cutout Notches */}
          <div className="hidden md:block absolute -top-3 -left-3 w-6 h-6 rounded-full bg-[#0d1616] border border-black/20" />
          <div className="hidden md:block absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-[#0d1616] border border-black/20" />
          <div className="md:hidden absolute -top-3 -left-3 w-6 h-6 rounded-full bg-[#0d1616] border border-black/20" />
          <div className="md:hidden absolute -top-3 -right-3 w-6 h-6 rounded-full bg-[#0d1616] border border-black/20" />

          {/* Rotated Barcode Code Text */}
          <div className="font-['Space_Mono',monospace] text-[10px] sm:text-[11px] font-bold tracking-widest uppercase md:[writing-mode:vertical-rl] md:rotate-180 text-[#181616]">
            {item.code}
          </div>

          {/* Rotated Seat / Row Text */}
          <div className="font-['Space_Mono',monospace] text-[10px] sm:text-[11px] font-bold tracking-wider uppercase md:[writing-mode:vertical-rl] md:rotate-180 text-[#555] hidden sm:block">
            {item.seatInfo}
          </div>

          {/* DataMatrix Barcode Graphic */}
          <div className="shrink-0">
            <DataMatrixBarcode />
          </div>
        </div>

      </div>
    </div>
  );
}

export default function EducationTicket() {
  const [activeTab, setActiveTab] = useState<"all" | "mca" | "bca">("all");

  const filteredData =
    activeTab === "all"
      ? EDUCATION_DATA
      : EDUCATION_DATA.filter((item) => item.degree.toLowerCase() === activeTab);

  return (
    <div className="w-full py-4">
      {/* Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 px-2">
        <div>
          <h2 className="font-['Instrument_Serif',serif] text-3xl sm:text-4xl text-chalk">
            Education Passport
          </h2>
          <p className="font-['Space_Mono',monospace] text-xs text-chalk/60 mt-1">
            Boarding passes to academic milestones & degrees
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2 font-['Silkscreen',monospace] text-xs">
          {(["all", "mca", "bca"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-[4px] uppercase transition-colors border ${
                activeTab === tab
                  ? "bg-primary border-primary text-primary-foreground font-bold"
                  : "bg-[#181616] border-white/20 text-chalk/70 hover:border-chalk"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tickets Container */}
      <div className="space-y-6">
        {filteredData.map((item, idx) => (
          <SingleTicket key={item.degree} item={item} index={idx} />
        ))}
      </div>
    </div>
  );
}
