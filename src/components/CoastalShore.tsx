import React from 'react';
import { BiotaSpecimen, ZoneData } from '../types';
import { SpecimenItem } from './SpecimenItem';
import { ChevronDown } from 'lucide-react';

interface CoastalShoreProps {
  specimens: BiotaSpecimen[];
  zone: ZoneData;
  onSelectSpecimen: (specimen: BiotaSpecimen) => void;
  discoveredIds?: Set<string>;
}

export const CoastalShore: React.FC<CoastalShoreProps> = ({
  specimens,
  zone,
  onSelectSpecimen,
  discoveredIds,
}) => {
  return (
    <section className="relative w-full pt-28 pb-16 px-4 select-none overflow-hidden">
      {/* Background Warm Paper Sun & Dunes */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-44 h-44 rounded-full bg-[#EAA838]/20 border border-[#EAA838]/40 pointer-events-none" />

      {/* Hero Title (Clean, Minimalist, No Wall of Text) */}
      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBDDCB] border border-[#DEC6AE] text-[#D95A47] font-mono text-xs font-bold tracking-widest uppercase shadow-paper-sm">
          <span>THE PACIFIC SHORELINE (+10M)</span>
        </div>

        <h1 className="text-6xl sm:text-8xl font-serif font-bold tracking-tight text-[#1E252B]">
          PELAGIA
        </h1>

        <p className="font-mono text-xs sm:text-sm text-[#D95A47] tracking-widest uppercase">
          A STOP-MOTION PAPERCRAFT OCEAN DESCENT
        </p>

        <p className="font-serif text-base sm:text-lg text-[#556058] max-w-md mx-auto italic leading-relaxed">
          "From the warm sand dunes, scroll down to enter the Pacific and descend eleven kilometers into the deep."
        </p>

        {/* Minimal Scroll Down Cue */}
        <div className="pt-6 flex flex-col items-center gap-1 font-mono text-xs text-[#8A968E]">
          <span className="tracking-widest uppercase">SCROLL TO DIVE</span>
          <ChevronDown className="w-5 h-5 text-[#D95A47] animate-bounce" />
        </div>
      </div>

      {/* Layered Papercraft Sand Dunes & Sea Oats Grass */}
      <div className="relative mt-12 w-full max-w-5xl mx-auto">
        <svg viewBox="0 0 1000 120" className="w-full h-auto paper-cutout" fill="none">
          {/* Back Dune */}
          <path d="M0 80 Q250 20 500 70 T1000 50 L1000 120 L0 120 Z" fill="#E8D5BC" stroke="#1E252B" strokeWidth="2.5" />
          {/* Front Dune */}
          <path d="M0 90 Q350 40 700 85 T1000 75 L1000 120 L0 120 Z" fill="#F4E7D3" stroke="#1E252B" strokeWidth="3" />
          {/* Sea Grass Blades */}
          <path d="M220 70 L215 35 M225 72 L230 40 M222 75 L218 45" stroke="#6D9886" strokeWidth="3" strokeLinecap="round" />
          <path d="M780 75 L775 42 M785 78 L792 48 M782 80 L778 52" stroke="#6D9886" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      {/* Free-floating Coastal Specimens (Gull & Ghost Crab) */}
      <div className="relative z-10">
        {specimens.map((specimen, idx) => (
          <SpecimenItem
            key={specimen.id}
            specimen={specimen}
            zone={zone}
            index={idx}
            onSelect={onSelectSpecimen}
            isDiscovered={discoveredIds?.has(specimen.id)}
          />
        ))}
      </div>
    </section>
  );
};
