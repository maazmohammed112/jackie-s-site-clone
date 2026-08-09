import { useState, useEffect } from "react";

export interface GuestbookNote {
  id: string;
  name: string;
  message: string;
  stamp: string; // e.g. "☕ CHAI APPROVED" | "🚀 SHIP IT" | "👾 HACKATHON" | "💡 GENIUS"
  date: string;
  likes: number;
  rotation: number;
}

const INITIAL_NOTES: GuestbookNote[] = [
  {
    id: "note-1",
    name: "Alex (Automation Dev)",
    message: "Loved the 90s GameBoy console & SAP automation demos! Truly unique portfolio 🚀",
    stamp: "🚀 SHIP IT",
    date: "Just now",
    likes: 5,
    rotation: -1.5,
  },
  {
    id: "note-2",
    name: "Chai Enthusiast",
    message: "10/10 for the tea enthusiast note! Keep shipping epic Agentic AI builds ☕",
    stamp: "☕ CHAI APPROVED",
    date: "1 hour ago",
    likes: 8,
    rotation: 2.2,
  },
  {
    id: "note-3",
    name: "OpenAI Codex Fan",
    message: "The hackathon participant badge & Vande Bharat commute photos are super cool! 👾",
    stamp: "👾 HACKATHON",
    date: "3 hours ago",
    likes: 4,
    rotation: -2.8,
  },
];

const STAMPS = [
  { id: "chai", label: "☕ CHAI APPROVED", color: "border-amber-700 text-amber-900 bg-amber-100" },
  { id: "ship", label: "🚀 SHIP IT", color: "border-emerald-700 text-emerald-900 bg-emerald-100" },
  { id: "hackathon", label: "👾 HACKATHON", color: "border-purple-700 text-purple-900 bg-purple-100" },
  { id: "genius", label: "💡 GENIUS", color: "border-cyan-700 text-cyan-900 bg-cyan-100" },
];

export default function CorkboardGuestbook() {
  const [notes, setNotes] = useState<GuestbookNote[]>(() => {
    try {
      const saved = localStorage.getItem("maaz_guestbook_notes");
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback to initial notes
    }
    return INITIAL_NOTES;
  });

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [selectedStamp, setSelectedStamp] = useState("☕ CHAI APPROVED");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Save notes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("maaz_guestbook_notes", JSON.stringify(notes));
    } catch {
      // ignore quota errors
    }
  }, [notes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);

    const newNote: GuestbookNote = {
      id: `note-${Date.now()}`,
      name: name.trim() || "Anonymous Peer",
      message: message.trim(),
      stamp: selectedStamp,
      date: "Just now",
      likes: 1,
      rotation: Math.random() * 6 - 3, // random tilt -3deg to +3deg
    };

    setTimeout(() => {
      setNotes((prev) => [newNote, ...prev]);
      setName("");
      setMessage("");
      setIsSubmitting(false);
      setSubmittedSuccess(true);

      setTimeout(() => setSubmittedSuccess(false), 3000);
    }, 400);
  };

  const handleLike = (id: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, likes: n.likes + 1 } : n))
    );
  };

  return (
    <section id="guestbook" className="relative my-24 px-4 sm:px-6 max-w-5xl mx-auto select-none">
      
      {/* Torn Paper Section Header */}
      <div className="relative mb-12 text-center">
        <div className="inline-block relative">
          <div className="relative paper-grid torn-paper bg-[#f4ead6] text-[#201c16] px-8 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.6)] border-2 border-[#201c16]/20 rounded-[4px] rotate-[-1deg]">
            <h2 className="font-['Silkscreen',monospace] text-xl sm:text-3xl font-bold tracking-wider uppercase text-[#201c16]">
              TORN PAPER GUESTBOOK & REVIEWS
            </h2>
            <p className="font-['Caveat',cursive] text-xl sm:text-2xl font-bold text-primary italic mt-0.5">
              Leave a note or stamp your reaction 📌
            </p>
          </div>
          {/* Tape Accent */}
          <span className="absolute -top-3 -left-6 w-20 h-6 bg-primary/40 rotate-[-15deg] shadow-sm pointer-events-none" />
          <span className="absolute -bottom-3 -right-6 w-20 h-6 bg-primary/40 rotate-[10deg] shadow-sm pointer-events-none" />
        </div>
      </div>

      {/* Main Grid: Add Note Form (Left) + Pinned Notes Board (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Pin a Note Form Card */}
        <div className="lg:col-span-5 relative">
          <div className="relative paper-grid torn-paper bg-[#f4ead6] text-[#201c16] p-6 sm:p-7 shadow-[0_20px_40px_rgba(0,0,0,0.7)] border-2 border-[#201c16]/20 rounded-[8px] rotate-[-1deg]">
            
            {/* Red Pushpin */}
            <span className="absolute -top-3 left-6 w-4 h-4 rounded-full bg-red-600 shadow-md border-2 border-white" />
            
            <h3 className="font-['Gloria_Hallelujah',cursive] text-2xl font-bold text-[#201c16] mb-1">
              Pin a Note 📌
            </h3>
            <p className="font-['Caveat',cursive] text-lg text-[#201c16]/80 mb-5">
              Share your feedback, thoughts, or greeting!
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name / Handle */}
              <div>
                <label className="block font-['Space_Mono',monospace] text-xs font-bold text-[#201c16] uppercase mb-1">
                  Your Name / Handle
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tech Peer / Recruiter"
                  maxLength={30}
                  className="w-full bg-[#e8dec8] text-[#201c16] px-3.5 py-2 rounded-[4px] border border-[#201c16]/30 font-['Space_Mono',monospace] text-sm focus:outline-none focus:border-primary shadow-inner"
                />
              </div>

              {/* Note Message */}
              <div>
                <label className="block font-['Space_Mono',monospace] text-xs font-bold text-[#201c16] uppercase mb-1">
                  Note Message *
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message or review here..."
                  rows={3}
                  required
                  maxLength={180}
                  className="w-full bg-[#e8dec8] text-[#201c16] px-3.5 py-2.5 rounded-[4px] border border-[#201c16]/30 font-['Caveat',cursive] text-xl focus:outline-none focus:border-primary shadow-inner resize-none leading-snug"
                />
              </div>

              {/* Stamp Selection Buttons */}
              <div>
                <label className="block font-['Space_Mono',monospace] text-xs font-bold text-[#201c16] uppercase mb-2">
                  Select Reaction Stamp
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {STAMPS.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedStamp(s.label)}
                      className={`font-['Silkscreen',monospace] text-[10px] py-1.5 px-2 rounded-[4px] border-2 uppercase transition-transform active:scale-95 ${
                        selectedStamp === s.label
                          ? `${s.color} border-current font-bold scale-105 shadow-sm`
                          : "border-[#201c16]/20 bg-[#e8dec8] text-[#201c16]/70 hover:border-[#201c16]/50"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !message.trim()}
                className="w-full font-['Caveat',cursive] text-xl font-bold bg-primary text-primary-foreground py-2.5 rounded-[6px] border-2 border-primary-foreground/20 shadow-md transition-transform hover:-rotate-1 active:scale-95 disabled:opacity-50 cursor-pointer mt-2"
              >
                {isSubmitting ? "Pinning Note..." : "Pin Note to Board 📌"}
              </button>

              {submittedSuccess && (
                <div className="font-['Caveat',cursive] text-lg font-bold text-emerald-800 text-center animate-fade-in">
                  ✨ Note pinned to the wall successfully!
                </div>
              )}

            </form>

          </div>
        </div>

        {/* RIGHT COLUMN: Pinned Notes Corkboard Wall */}
        <div className="lg:col-span-7 relative min-h-[420px] bg-[#221f1b] p-5 sm:p-7 rounded-[14px] border-4 border-[#3a352e] shadow-[inset_0_4px_16px_rgba(0,0,0,0.85),0_20px_50px_rgba(0,0,0,0.6)]">
          
          {/* Corkboard Background Texture */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none rounded-[10px]"
            style={{
              backgroundImage: `
                radial-gradient(circle, #f4ead6 1px, transparent 1px),
                radial-gradient(circle, #000 1px, transparent 1px)
              `,
              backgroundSize: "8px 8px, 6px 6px",
              backgroundPosition: "0 0, 3px 3px",
            }}
          />

          <div className="relative z-10 space-y-5">
            {notes.map((note) => (
              <div
                key={note.id}
                style={{ transform: `rotate(${note.rotation}deg)` }}
                className="relative paper-grid torn-paper bg-[#f4ead6] text-[#201c16] p-4 sm:p-5 shadow-[0_10px_25px_rgba(0,0,0,0.6)] border border-[#201c16]/20 rounded-[4px] transition-transform duration-300 hover:rotate-0 hover:z-20 hover:scale-[1.02]"
              >
                {/* Red Pushpin */}
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-600 shadow-md border-2 border-white" />

                {/* Stamp Badge */}
                <div className="flex items-center justify-between mb-2 pt-1">
                  <span className="font-['Silkscreen',monospace] text-[10px] font-bold px-2 py-0.5 rounded-[3px] border border-[#201c16]/30 bg-[#e8dec8] text-[#201c16]">
                    {note.stamp}
                  </span>
                  <span className="font-['Space_Mono',monospace] text-[10px] text-[#201c16]/60">
                    {note.date}
                  </span>
                </div>

                {/* Note Message */}
                <p className="font-['Caveat',cursive] text-xl sm:text-2xl leading-snug text-[#201c16] font-bold my-2">
                  "{note.message}"
                </p>

                {/* Author & Like Button */}
                <div className="flex items-center justify-between pt-2 border-t border-[#201c16]/15">
                  <span className="font-['Gloria_Hallelujah',cursive] text-sm font-bold text-primary">
                    — {note.name}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleLike(note.id)}
                    className="flex items-center gap-1 font-['Silkscreen',monospace] text-xs px-2.5 py-1 rounded-[4px] bg-[#e8dec8] border border-[#201c16]/20 hover:bg-white active:scale-90 transition-transform cursor-pointer"
                  >
                    <span>❤️</span>
                    <span>{note.likes}</span>
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>

    </section>
  );
}
