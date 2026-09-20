import React from 'react';
import { BiotaSpecimen, ZoneData } from '../types';
import { SpecimenRenderer } from './papercraft/SpecimenRenderer';
import { pelagiaAudio } from '../lib/audioEngine';
import { BookOpen, Sparkles, CheckCircle2, Ruler, Compass } from 'lucide-react';

interface SpecimenItemProps {
  specimen: BiotaSpecimen;
  zone: ZoneData;
  index: number;
  onSelect: (specimen: BiotaSpecimen) => void;
  isDiscovered?: boolean;
}

export const SpecimenItem: React.FC<SpecimenItemProps> = ({
  specimen,
  zone,
  index,
  onSelect,
  isDiscovered = false,
}) => {
  const isEven = index % 2 === 0;

  const handleMouseEnter = () => {
    pelagiaAudio.playWaterBubble();
  };

  const handleClick = () => {
    pelagiaAudio.playSpecimenChime();
    onSelect(specimen);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto my-20 sm:my-32 px-4 select-none">
      {/* Specimen Arena */}
      <div
        className={`flex flex-col ${
          isEven ? 'md:flex-row' : 'md:flex-row-reverse'
        } items-center justify-between gap-8 sm:gap-14`}
      >
        {/* Living Papercraft Specimen Cutout in Water */}
        <div
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          className="cursor-pointer group relative p-6 sm:p-10 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
          title={`Click to inspect ${specimen.commonName} in Naturalist Journal`}
        >
          {/* Subtle water ripple ring on hover */}
          <div className="absolute inset-0 rounded-full border border-white/20 opacity-0 group-hover:opacity-40 transition-opacity scale-90 group-hover:scale-125 duration-500 pointer-events-none" />

          {/* Bioluminescent pulse halo for deep sea species */}
          {(zone.id === 'midnight' || zone.id === 'abyss' || zone.id === 'hadal') && (
            <div className="absolute inset-4 rounded-full bg-cyan-500/10 blur-xl opacity-60 group-hover:opacity-90 transition-opacity pointer-events-none" />
          )}

          {/* SVG Specimen */}
          <SpecimenRenderer type={specimen.papercraftType} />

          {/* Quick Click Hint Tag on Hover */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#FAF6EE] text-[#1E252B] border border-[#1E252B] rounded-full text-[10px] font-mono font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-paper-sm whitespace-nowrap pointer-events-none">
            🔍 Inspect Specimen
          </div>
        </div>

        {/* Vintage Naturalist Paper Placard (Guaranteed 100% Readable on Any Background!) */}
        <div
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          className={`cursor-pointer group relative w-full max-w-md bg-[#FAF6EE] text-[#1E252B] border-2 border-[#1E252B] rounded-xl p-5 sm:p-6 shadow-paper-md paper-grain transition-all duration-300 hover:-translate-y-1 hover:shadow-paper-lg ${
            isEven ? 'md:text-left' : 'md:text-left'
          }`}
        >
          {/* Brass Rivet / Grommet Hole Accent */}
          <div className="absolute -top-3 left-6 w-5 h-5 rounded-full bg-[#EAA838] border-2 border-[#1E252B] flex items-center justify-center shadow-paper-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1E252B]" />
          </div>

          {/* Top Metadata Rail */}
          <div className="flex items-center justify-between gap-2 border-b border-dashed border-[#1E252B]/20 pb-2.5 mb-3 font-mono text-[10px]">
            <div className="flex items-center gap-1.5 text-[#D95A47] font-bold tracking-widest uppercase">
              <Sparkles className="w-3 h-3" />
              <span>{specimen.plateNumber}</span>
              <span>·</span>
              <span>{specimen.tagCategory || 'Specimen'}</span>
            </div>

            {/* Discovered Stamp / Curiosity Pill */}
            {isDiscovered ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-100 border border-emerald-500 text-emerald-800 font-bold text-[9px] uppercase">
                <CheckCircle2 className="w-3 h-3" />
                <span>LOGGED</span>
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded bg-[#F4ECE1] border border-[#DEC6AE] text-[#9A6715] font-semibold text-[9px] uppercase">
                {specimen.curiosityRating}
              </span>
            )}
          </div>

          {/* Common Name */}
          <h3 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-[#1E252B] group-hover:text-[#D95A47] transition-colors">
            {specimen.commonName}
          </h3>

          {/* Binomial & Japanese Name */}
          <div className="flex flex-wrap items-center gap-1.5 mt-1 font-mono text-xs text-[#626863]">
            <span className="italic font-serif text-sm text-[#D95A47]">
              {specimen.binomialName}
            </span>
            <span>·</span>
            <span>{specimen.japaneseName}</span>
          </div>

          {/* Observation Note Snippet */}
          <p className="font-serif text-xs sm:text-sm text-[#4B5563] mt-2.5 leading-relaxed line-clamp-2 italic border-l-2 border-[#D95A47]/40 pl-2.5">
            "{specimen.observationNotes}"
          </p>

          {/* Bottom Depth & Dimension Badges */}
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-dashed border-[#1E252B]/20 font-mono text-[10px]">
            <div className="inline-flex items-center gap-1 px-2 py-1 bg-[#F4ECE1] rounded border border-[#DEC6AE] text-[#1E252B]">
              <Compass className="w-3 h-3 text-[#2F6D68]" />
              <span className="font-bold text-[#D95A47]">
                {specimen.depthMeters <= 0 ? `+${Math.abs(specimen.depthMeters)}M SHORE` : `-${specimen.depthMeters}M DEPTH`}
              </span>
            </div>

            <div className="inline-flex items-center gap-1 px-2 py-1 bg-[#F4ECE1] rounded border border-[#DEC6AE] text-[#1E252B]">
              <Ruler className="w-3 h-3 text-[#2F6D68]" />
              <span>SIZE: </span>
              <span className="font-bold text-[#1E252B]">{specimen.lengthMeters} M</span>
            </div>

            <div className="ml-auto inline-flex items-center gap-1 text-[#2F6D68] group-hover:translate-x-0.5 transition-transform font-bold text-[10px]">
              <BookOpen className="w-3 h-3" />
              <span>OPEN JOURNAL →</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
