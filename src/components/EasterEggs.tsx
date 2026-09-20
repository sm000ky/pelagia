import React, { useState } from 'react';
import { Sparkles, X, Compass, Anchor, AlertTriangle, Eye } from 'lucide-react';
import { pelagiaAudio } from '../lib/audioEngine';

interface EasterEggProps {
  currentDepth: number;
}

export const EasterEggs: React.FC<EasterEggProps> = ({ currentDepth }) => {
  const [activeNote, setActiveNote] = useState<{ title: string; content: string; sign: string } | null>(null);

  const openNote = (title: string, content: string, sign: string, soundType: 'pop' | 'bubble' | 'rumble' = 'bubble') => {
    if (soundType === 'pop') pelagiaAudio.playBottlePop();
    else if (soundType === 'rumble') pelagiaAudio.playLeviathanRumble();
    else pelagiaAudio.playWaterBubble();

    pelagiaAudio.playPaperRustle();
    setActiveNote({ title, content, sign });
  };

  return (
    <>
      {/* 1. Waterline (+0m): Origami Paper Boat */}
      <div className="relative w-full max-w-4xl mx-auto my-8 px-4 flex justify-center select-none">
        <button
          onClick={() =>
            openNote(
              'ORIGAMI EXPEDITION VESSEL #002',
              'A small folded paper boat drifting on the surface swells. Scrawled inside the hull in vermilion ink is an oath:\n\n"Burung Jian hanya punya satu sayap. Kita harus saling merengkuh untuk bisa menembus batas langit dan samudra. Ayo menyelam sampai ke dasarnya, Darling!"',
              'Zero Two (Code: 002) × sm000ky',
              'pop'
            )
          }
          className="group cursor-pointer p-4 rounded-xl border border-dashed border-[#1E252B]/30 hover:border-[#D95A47] hover:bg-white/40 transition-all flex items-center gap-3 bg-white/20 backdrop-blur-xs"
          title="Inspect Drifting Origami Boat"
        >
          {/* Origami Boat SVG */}
          <svg viewBox="0 0 60 40" className="w-10 h-7 text-[#D95A47] group-hover:scale-110 transition-transform" fill="currentColor">
            <polygon points="5,25 55,25 45,35 15,35" />
            <polygon points="30,5 30,22 12,22" fill="#FAF6EE" stroke="#1E252B" strokeWidth="1.5" />
            <polygon points="32,8 48,22 32,22" fill="#EAA838" stroke="#1E252B" strokeWidth="1.5" />
          </svg>
          <div className="text-left font-mono text-[11px]">
            <div className="font-bold text-[#D95A47] flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>EASTER EGG // DRIFTING PAPER VESSEL</span>
            </div>
            <div className="text-[#626863] text-[10px]">Click to unfold message inside</div>
          </div>
        </button>
      </div>

      {/* 2. Twilight (-650m): Wax-Sealed Green Glass Message Bottle */}
      <div className="relative w-full max-w-3xl mx-auto my-16 px-4 flex justify-end select-none">
        <button
          onClick={() =>
            openNote(
              'ANTIQUE BATHYAL MESSAGE IN A BOTTLE',
              'Recovered at -650m in the Mesopelagic twilight gloom. The parchment is salt-stained but the handwriting remains crisp:\n\n"To whoever dredges this flask from the twilight realm: If you descend past the midnight void into the hadal floor, remember that the ocean has no bottom for those who dare look beneath the crust. Beware what sleeps under the trench."',
              'Archival Log — HMS Challenger Expedition (1875)',
              'pop'
            )
          }
          className="group cursor-pointer p-3.5 rounded-xl border border-cyan-500/40 hover:border-cyan-400 bg-[#0C1B26]/80 hover:bg-[#122737] transition-all flex items-center gap-3 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
          title="Recover Message in a Bottle"
        >
          {/* Glass Bottle SVG */}
          <svg viewBox="0 0 30 60" className="w-6 h-12 text-cyan-400 group-hover:rotate-12 transition-transform" fill="currentColor">
            <rect x="11" y="2" width="8" height="8" rx="1" fill="#D97706" />
            <path d="M10 10 L20 10 L22 22 L26 30 L26 54 C26 58, 4 58, 4 54 L4 30 L8 22 Z" fill="#0E7490" fillOpacity="0.7" stroke="#38BDF8" strokeWidth="1.5" />
            <rect x="8" y="28" width="14" height="18" rx="1" fill="#FEF3C7" opacity="0.8" />
          </svg>
          <div className="text-left font-mono text-[11px]">
            <div className="font-bold text-cyan-300 flex items-center gap-1">
              <span>🍾 WAX-SEALED ANTIQUE FLASK (-650M)</span>
            </div>
            <div className="text-cyan-400/70 text-[10px]">Click to uncork and read message</div>
          </div>
        </button>
      </div>

      {/* 3. Midnight (-2,600m): Deep Sound Hydrophone & Shadow of the Titan */}
      <div className="relative w-full max-w-4xl mx-auto my-20 px-4 select-none">
        <div
          onClick={() =>
            openNote(
              'CLASSIFIED BIO-ACOUSTIC CONTACT: "THE KLAXOSAUR LEVIATHAN"',
              'Hydrophone sensors registered a massive biological sonic anomaly (14 Hz ultra-low infrasound pulse). A silhouette measuring over 120 meters in length just glided past the research bathyscaphe.\n\n"Darling... did you see that gigantic shadow? That is not an ordinary whale. Its bio-resonance matches the ancestral Klaxosaur bio-core!"',
              'Strelizia Acoustic Sensor Log // Depth: -2,600m',
              'rumble'
            )
          }
          className="cursor-pointer group relative p-5 rounded-2xl border-2 border-[#EAA838]/40 hover:border-[#EAA838] bg-[#0A1017]/90 hover:bg-[#0F1823] transition-all shadow-[0_0_25px_rgba(234,168,56,0.15)] flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          {/* Radar Blip Animation */}
          <div className="flex items-center gap-3 font-mono">
            <div className="relative w-10 h-10 rounded-full border border-[#EAA838] flex items-center justify-center bg-[#171F2C]">
              <span className="w-2 h-2 rounded-full bg-[#EAA838] animate-ping" />
              <Eye className="w-4 h-4 text-[#EAA838]" />
            </div>
            <div>
              <div className="font-bold text-[#F59E0B] text-xs flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>SONAR ANOMALY DETECTED // 120-METER BIO-CONTACT</span>
              </div>
              <div className="text-slate-400 text-[10px]">Click to decode sonar intercept transcript</div>
            </div>
          </div>

          <div className="px-3 py-1 rounded bg-[#EAA838]/20 border border-[#EAA838]/50 text-[#F59E0B] font-mono text-[10px] font-bold group-hover:scale-105 transition-transform">
            PLAY HYDROPHONE ECHO
          </div>
        </div>
      </div>

      {/* 4. Hadal (-10,200m): Indestructible Ceramic Coffee Cup */}
      <div className="relative w-full max-w-3xl mx-auto my-16 px-4 flex justify-start select-none">
        <button
          onClick={() =>
            openNote(
              'HOMO SAPIENS ARTIFACT: ANCIENT EXPEDITION MUG',
              'Resting upright on the Marianas hadal silt at 1,000 atmospheres of crushing pressure sits a single porcelain coffee mug.\n\nPrinted on its side is a faded logo:\n"NO SLEEP TILL CHALLENGER DEEP // ZERO TWO & SM000KY".\n\nUnder 16,000 PSI of water, steel collapses, but this mug stands eternal.',
              'Hadal Trench Observation Camera // -10,200m',
              'bubble'
            )
          }
          className="group cursor-pointer p-3 rounded-xl border border-red-500/40 hover:border-red-400 bg-[#0A070B]/80 hover:bg-[#150D17] transition-all flex items-center gap-3 text-red-200 shadow-[0_0_15px_rgba(239,68,68,0.15)]"
          title="Inspect Deep Trench Artifact"
        >
          {/* Coffee Mug SVG */}
          <svg viewBox="0 0 40 40" className="w-8 h-8 text-red-400 group-hover:scale-110 transition-transform" fill="currentColor">
            <rect x="8" y="10" width="20" height="22" rx="3" fill="#FAF6EE" stroke="#1E252B" strokeWidth="2" />
            <path d="M28 14 C35 14, 35 26, 28 26" fill="none" stroke="#1E252B" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 18 h12 M12 22 h8" stroke="#D95A47" strokeWidth="1.5" />
          </svg>
          <div className="text-left font-mono text-[11px]">
            <div className="font-bold text-red-300 flex items-center gap-1">
              <span>☕ FORGOTTEN EXPEDITION ARTIFACT (-10,200M)</span>
            </div>
            <div className="text-red-400/70 text-[10px]">Click to inspect plaque</div>
          </div>
        </button>
      </div>

      {/* Easter Egg Modal Card */}
      {activeNote && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none animate-in fade-in-0 duration-200"
          onClick={() => setActiveNote(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-[#FAF6EE] text-[#1E252B] border-2 border-[#1E252B] rounded-2xl p-6 sm:p-8 shadow-paper-lg paper-grain space-y-4"
          >
            <div className="flex items-center justify-between border-b border-dashed border-[#1E252B]/30 pb-3">
              <span className="font-mono text-[10px] font-bold text-[#D95A47] tracking-widest uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SECRET EXPEDITION LOG</span>
              </span>
              <button
                onClick={() => setActiveNote(null)}
                className="p-1 rounded-lg border border-[#1E252B] hover:bg-[#D95A47] hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-2xl font-serif font-bold text-[#1E252B]">
              {activeNote.title}
            </h3>

            <p className="font-serif text-sm sm:text-base text-[#2D312E] leading-relaxed whitespace-pre-line italic bg-[#F4ECE1] p-4 rounded-xl border border-[#DEC6AE]">
              {activeNote.content}
            </p>

            <div className="pt-2 text-right font-mono text-xs text-[#626863] border-t border-dashed border-[#1E252B]/20">
              — {activeNote.sign}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
