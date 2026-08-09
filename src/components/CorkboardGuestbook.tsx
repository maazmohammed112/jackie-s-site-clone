import { useState, useEffect } from "react";

export interface GuestbookNote {
  id: string;
  name: string;
  message: string;
  stamp: string;
  date: string;
  likes: number;
  rotation: number;
  bgClass: string;
  pinColor: string;
}

const NOTE_THEMES = [
  { bgClass: "bg-[#fff7d1] text-[#332b00] border-[#e6dc9c]", pinColor: "bg-red-600" },
  { bgClass: "bg-[#e2f7d1] text-[#1c3300] border-[#c4e6a5]", pinColor: "bg-emerald-600" },
  { bgClass: "bg-[#ffd1dc] text-[#33000d] border-[#f0b0c0]", pinColor: "bg-blue-600" },
  { bgClass: "bg-[#d1e8ff] text-[#001f33] border-[#a5d0f0]", pinColor: "bg-zinc-100" },
  { bgClass: "bg-[#f7edd1] text-[#332500] border-[#e6d7a5]", pinColor: "bg-amber-500" },
  { bgClass: "bg-[#fbf7ee] text-[#2c281e] border-[#e4dccb]", pinColor: "bg-red-500" },
];

const INITIAL_NOTES: GuestbookNote[] = [
  {
    id: "note-1",
    name: "Arjun",
    message: "Loved the vibe of your portfolio! Super creative and inspiring!",
    stamp: "✨ LOVE IT!",
    date: "21 MAY 2024",
    likes: 12,
    rotation: -1.8,
    bgClass: NOTE_THEMES[0]!.bgClass,
    pinColor: NOTE_THEMES[0]!.pinColor,
  },
  {
    id: "note-2",
    name: "Priya",
    message: "Your projects are insane! Keep building and changing the world!",
    stamp: "💡 GENIUS",
    date: "20 MAY 2024",
    likes: 18,
    rotation: 2.1,
    bgClass: NOTE_THEMES[1]!.bgClass,
    pinColor: NOTE_THEMES[1]!.pinColor,
  },
  {
    id: "note-3",
    name: "Rahul",
    message: "Agentic AI & SAP automation partner material right here.",
    stamp: "💬 NEED TO TALK",
    date: "19 MAY 2024",
    likes: 9,
    rotation: -2.5,
    bgClass: NOTE_THEMES[2]!.bgClass,
    pinColor: NOTE_THEMES[2]!.pinColor,
  },
  {
    id: "note-4",
    name: "Kaleem",
    message: "Clean. Unique. Next level paper-craft portfolio!",
    stamp: "☕ CHAI APPROVED",
    date: "18 MAY 2024",
    likes: 15,
    rotation: 1.5,
    bgClass: NOTE_THEMES[3]!.bgClass,
    pinColor: NOTE_THEMES[3]!.pinColor,
  },
  {
    id: "note-5",
    name: "Sneha",
    message: "The paper-craft theme is just *chef's kiss* ♡",
    stamp: "⭐ I WILL STAMP",
    date: "17 MAY 2024",
    likes: 22,
    rotation: -1.2,
    bgClass: NOTE_THEMES[4]!.bgClass,
    pinColor: NOTE_THEMES[4]!.pinColor,
  },
  {
    id: "note-6",
    name: "Zain",
    message: "Keep shipping magic bro! Big fan 🥂",
    stamp: "🔥 LEGEND",
    date: "15 MAY 2024",
    likes: 14,
    rotation: 2.4,
    bgClass: NOTE_THEMES[5]!.bgClass,
    pinColor: NOTE_THEMES[5]!.pinColor,
  },
];

export interface RubberStamp {
  id: string;
  label: string;
  color: string;
  borderClass: string;
}

const STAMPS: RubberStamp[] = [
  { id: "chai", label: "☕ CHAI APPROVED", color: "text-[#1d4ed8]", borderClass: "border-[#1d4ed8]" },
  { id: "genius", label: "💡 GENIUS", color: "text-[#b91c1c]", borderClass: "border-[#b91c1c]" },
  { id: "loveit", label: "✨ LOVE IT!", color: "text-[#be185d]", borderClass: "border-[#be185d]" },
  { id: "legend", label: "🔥 LEGEND", color: "text-[#c2410c]", borderClass: "border-[#c2410c]" },
  { id: "needtoimprove", label: "🛠️ NEED TO IMPROVE", color: "text-[#a16207]", borderClass: "border-[#a16207]" },
  { id: "jealous", label: "😒 JEALOUS", color: "text-[#047857]", borderClass: "border-[#047857]" },
  { id: "needtotalk", label: "💬 NEED TO TALK", color: "text-[#6d28d9]", borderClass: "border-[#6d28d9]" },
  { id: "iwillstamp", label: "⭐ I WILL STAMP", color: "text-[#0284c7]", borderClass: "border-[#0284c7]" },
];

export default function CorkboardGuestbook() {
  const [notes, setNotes] = useState<GuestbookNote[]>(() => {
    try {
      const saved = localStorage.getItem("maaz_guestbook_notes_v2");
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_NOTES;
  });

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [selectedStamp, setSelectedStamp] = useState("☕ CHAI APPROVED");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHelmetShaking, setIsHelmetShaking] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("maaz_guestbook_notes_v2", JSON.stringify(notes));
    } catch {
      // ignore
    }
  }, [notes]);

  const handleHelmetClick = () => {
    setIsHelmetShaking(true);
    setTimeout(() => setIsHelmetShaking(false), 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);

    const theme = NOTE_THEMES[notes.length % NOTE_THEMES.length]!;

    const today = new Date();
    const formattedDate = `${today.getDate()} ${today.toLocaleString('default', { month: 'short' }).toUpperCase()} ${today.getFullYear()}`;

    const newNote: GuestbookNote = {
      id: `note-${Date.now()}`,
      name: name.trim() || "Visitor",
      message: message.trim(),
      stamp: selectedStamp,
      date: formattedDate,
      likes: 1,
      rotation: Math.random() * 6 - 3,
      bgClass: theme.bgClass,
      pinColor: theme.pinColor,
    };

    setTimeout(() => {
      setNotes((prev) => [newNote, ...prev]);
      setName("");
      setMessage("");
      setIsSubmitting(false);
    }, 300);
  };

  const handleLike = (id: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, likes: n.likes + 1 } : n))
    );
  };

  return (
    <section id="guestbook" className="relative my-20 px-3 sm:px-6 max-w-7xl mx-auto select-none">
      
      {/* Wooden Framed Outer Container */}
      <div className="relative bg-[#1c1815] p-3 sm:p-6 lg:p-7 rounded-[18px] border-[6px] sm:border-[8px] border-[#382a1d] shadow-[0_30px_70px_rgba(0,0,0,0.9)]">
        
        {/* Main 2-Column Grid: Corkboard Wall (Left 7 cols) + Forms & Stamps (Right 5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* LEFT COLUMN: Wooden Corkboard Wall */}
          <div className="lg:col-span-7 relative min-h-[580px] bg-[#9e6f47] p-4 sm:p-6 rounded-[12px] border-4 border-[#523820] shadow-[inset_0_4px_20px_rgba(0,0,0,0.85)] flex flex-col justify-between">
            
            {/* Real Corkboard Surface Grain Texture */}
            <div
              className="absolute inset-0 opacity-40 pointer-events-none rounded-[8px]"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 50% 50%, #472d16 1.5px, transparent 1.5px),
                  radial-gradient(circle at 20% 80%, #7a512c 2px, transparent 2px),
                  radial-gradient(circle at 80% 20%, #38200b 1px, transparent 1px)
                `,
                backgroundSize: "12px 12px, 16px 16px, 8px 8px",
              }}
            />

            {/* Top Area Container: Shakable Helmet Polaroid (Non-overlapping) + Header Banner */}
            <div className="relative z-10 mb-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              
              {/* SHAKABLE Polaroid Mecha Helmet Photo (Clicks or touches trigger physical shake animation on mobile & desktop) */}
              <div
                onClick={handleHelmetClick}
                title="Click me to shake!"
                className={`relative shrink-0 w-24 sm:w-26 bg-white p-2 shadow-xl border border-zinc-200 rotate-[-5deg] cursor-pointer transition-transform duration-300 hover:rotate-[-10deg] ${
                  isHelmetShaking ? "animate-bounce" : ""
                }`}
              >
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#b5a38a] rounded-sm opacity-70 border border-black/10" />
                <img src="/maaz-helmet.png" alt="Techwazzy Studio" className="w-full h-16 object-contain bg-zinc-900 rounded-[2px]" />
                <div className="font-['Silkscreen',monospace] text-[7px] text-center mt-1 text-zinc-700 font-bold">TECHWAZZY STUDIO</div>
              </div>

              {/* Header Title Banner */}
              <div className="flex-1 bg-[#f4ead6] text-[#201c16] p-3.5 sm:p-4 rounded-[6px] shadow-[0_8px_20px_rgba(0,0,0,0.5)] border border-[#201c16]/30 flex items-center justify-between">
                <div>
                  <h2 className="font-['Gloria_Hallelujah',cursive] text-xl sm:text-2xl font-bold text-[#201c16] leading-tight">
                    Techwazzy Life World
                  </h2>
                  <p className="font-['Caveat',cursive] text-sm sm:text-base text-[#201c16]/80 mt-0.5">
                    Real visitors. Real vibes. Real stamps. ♡
                  </p>
                </div>

                {/* Odometer Visitor Counter */}
                <div className="hidden xs:flex flex-col items-end shrink-0">
                  <div className="flex items-center gap-1 bg-[#181616] p-1.5 rounded-[4px] border border-white/20 shadow-inner">
                    <span className="font-['Silkscreen',monospace] text-[8px] text-chalk/70 mr-1 uppercase">Visitors</span>
                    <span className="bg-zinc-800 text-white font-['Space_Mono',monospace] text-xs sm:text-sm px-1.5 py-0.5 rounded-[2px] font-bold border border-white/10">0</span>
                    <span className="bg-zinc-800 text-white font-['Space_Mono',monospace] text-xs sm:text-sm px-1.5 py-0.5 rounded-[2px] font-bold border border-white/10">2</span>
                    <span className="bg-zinc-800 text-white font-['Space_Mono',monospace] text-xs sm:text-sm px-1.5 py-0.5 rounded-[2px] font-bold border border-white/10">4</span>
                    <span className="bg-zinc-800 text-white font-['Space_Mono',monospace] text-xs sm:text-sm px-1.5 py-0.5 rounded-[2px] font-bold border border-white/10">7</span>
                  </div>
                  <span className="font-['Caveat',cursive] text-[11px] text-[#201c16]/80 mt-0.5 italic">
                    amazing people so far! ↴
                  </span>
                </div>
              </div>

            </div>

            {/* Sticky Notes Grid (Clean 2 or 3 Column Layout) */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-1">
              {notes.map((note) => {
                const stampObj = STAMPS.find((s) => s.label === note.stamp) ?? STAMPS[0]!;

                return (
                  <div
                    key={note.id}
                    style={{ transform: `rotate(${note.rotation}deg)` }}
                    className={`relative p-3.5 rounded-[4px] shadow-[0_12px_24px_rgba(0,0,0,0.5)] border ${note.bgClass} transition-transform duration-300 hover:rotate-0 hover:z-30 hover:scale-[1.03] flex flex-col justify-between min-h-[175px]`}
                  >
                    {/* Pushpin Header */}
                    <span className={`absolute -top-2.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full ${note.pinColor} shadow-[0_2px_5px_rgba(0,0,0,0.6)] border border-white`} />

                    {/* Author Name */}
                    <div className="font-['Caveat',cursive] text-xs text-[#201c16]/70 font-bold text-right">
                      {note.name}
                    </div>

                    {/* Note Body Message */}
                    <p className="font-['Caveat',cursive] text-base sm:text-lg leading-snug font-bold my-1.5">
                      "{note.message}"
                    </p>

                    {/* Rubber Stamp Ink Badge & Date */}
                    <div>
                      <div className={`inline-block font-['Silkscreen',monospace] text-[9px] font-bold px-2 py-0.5 rounded-[3px] border-2 uppercase ${stampObj.color} ${stampObj.borderClass} bg-white/40 shadow-sm rotate-[-3deg]`}>
                        {note.stamp}
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#201c16]/10">
                        <span className="font-['Space_Mono',monospace] text-[8px] text-[#201c16]/60">
                          {note.date}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleLike(note.id)}
                          className="flex items-center gap-1 font-['Silkscreen',monospace] text-[9px] px-1.5 py-0.5 rounded-[3px] bg-white/60 border border-[#201c16]/20 hover:bg-white active:scale-90 transition-transform cursor-pointer"
                        >
                          <span>❤️</span>
                          <span>{note.likes}</span>
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Bottom Right Torn Note Paper Scrap (Positioned cleanly below grid - NO OVERLAPPING TEXT) */}
            <div className="relative z-10 mt-6 self-end max-w-[240px] bg-[#f4ead6] text-[#201c16] px-4 py-2.5 rounded-[4px] shadow-lg border border-[#201c16]/20 rotate-[2deg]">
              <span className="absolute -top-2.5 left-4 w-3.5 h-3.5 bg-red-600 rounded-full shadow-sm border border-white" />
              <p className="font-['Caveat',cursive] text-sm leading-tight text-center font-bold">
                Every stamp tells a story. Thanks for being a part of mine! ♡
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: Leave Note Form & Pick Reaction Stamp Panel (Fills dark empty space on the right side) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Top Tape Vibe Scrap */}
            <div className="relative bg-[#f4ead6] text-[#201c16] px-4 py-2 rounded-[4px] shadow-md border border-[#201c16]/20 rotate-[-1deg] text-center">
              <span className="absolute -top-2 left-6 w-12 h-4 bg-primary/40 rotate-[-5deg]" />
              <p className="font-['Caveat',cursive] text-lg font-bold">
                Drop your vibe. Leave your mark. 😊
              </p>
            </div>

            {/* LEAVE A QUICK NOTE Form Card */}
            <div className="relative bg-[#f4ead6] text-[#201c16] p-5 rounded-[8px] shadow-[0_16px_36px_rgba(0,0,0,0.7)] border-2 border-[#201c16]/20 rotate-[1deg]">
              
              {/* Spiral Rings */}
              <div className="absolute right-2 top-4 bottom-4 flex flex-col justify-between opacity-40">
                {Array.from({ length: 7 }).map((_, i) => (
                  <span key={i} className="w-2.5 h-2.5 rounded-full bg-zinc-800 shadow-inner" />
                ))}
              </div>

              <h3 className="font-['Silkscreen',monospace] text-sm sm:text-base font-bold text-[#201c16] mb-3 uppercase">
                LEAVE A QUICK NOTE
              </h3>

              <form onSubmit={handleSubmit} className="space-y-3.5 pr-4">
                
                {/* Message Textarea */}
                <div>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write something awesome..."
                    rows={3}
                    required
                    maxLength={120}
                    className="w-full bg-[#e8dec8] text-[#201c16] p-3 rounded-[4px] border border-[#201c16]/30 font-['Caveat',cursive] text-xl focus:outline-none focus:border-primary shadow-inner resize-none leading-snug"
                  />
                  <div className="text-right font-['Space_Mono',monospace] text-[10px] text-[#201c16]/60 mt-0.5">
                    {message.length} / 120
                  </div>
                </div>

                {/* Name Input */}
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  maxLength={30}
                  className="w-full bg-[#e8dec8] text-[#201c16] px-3 py-2 rounded-[4px] border border-[#201c16]/30 font-['Space_Mono',monospace] text-xs focus:outline-none focus:border-primary shadow-inner"
                />

                {/* Pin Note Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !message.trim()}
                  className="w-full flex items-center justify-center gap-2 font-['Silkscreen',monospace] text-xs font-bold bg-[#d9c39c] text-[#201c16] py-2.5 rounded-[4px] border-2 border-[#201c16]/30 shadow-md transition-transform hover:-rotate-1 active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <span>📌</span>
                  <span>{isSubmitting ? "PINNING..." : "PIN NOTE TO BOARD"}</span>
                </button>

              </form>

            </div>

            {/* PICK A REACTION STAMP Card (8 Custom Rubber Stamps) */}
            <div className="relative bg-[#f4ead6] text-[#201c16] p-4 sm:p-5 rounded-[8px] shadow-[0_16px_36px_rgba(0,0,0,0.7)] border-2 border-[#201c16]/20 rotate-[-1deg]">
              
              <h4 className="font-['Silkscreen',monospace] text-xs font-bold text-[#201c16] mb-3 uppercase flex items-center justify-between">
                <span>PICK A REACTION STAMP</span>
                <span> stamp</span>
              </h4>

              {/* Grid of 8 Rubber Stamps */}
              <div className="grid grid-cols-2 gap-2">
                {STAMPS.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedStamp(s.label)}
                    className={`font-['Silkscreen',monospace] text-[9px] py-2 px-1.5 rounded-[4px] border-2 uppercase transition-all duration-200 cursor-pointer text-center truncate ${
                      selectedStamp === s.label
                        ? `${s.color} ${s.borderClass} bg-white font-bold scale-105 shadow-md`
                        : "border-[#201c16]/25 bg-[#e8dec8] text-[#201c16]/70 hover:border-[#201c16]/60 hover:bg-white/50"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              <div className="text-right font-['Caveat',cursive] text-xs text-[#201c16]/70 mt-2 italic">
                More coming soon... ➔
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
