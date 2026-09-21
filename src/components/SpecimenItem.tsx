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

const getZoneTheme = (zoneId: string) => {
  switch (zoneId) {
    case 'coastal':
      return {
        cardBg: 'bg-[#FAF3E8]',
        borderColor: 'border-[#DEC6AE]',
        plateColor: 'text-[#D95A47]',
        titleColor: 'text-[#2D312E]',
        subColor: 'text-[#6B7280]',
        quoteColor: 'text-[#4B5563] border-[#D95A47]/40',
        badgeBg: 'bg-[#F4ECE1]',
        badgeBorder: 'border-[#DEC6AE]',
        badgeText: 'text-[#2D312E]',
        accentColor: 'text-[#D95A47]',
        glow: 'shadow-paper-md',
        rivetColor: 'bg-[#EAA838]',
        hoverBorder: 'group-hover:border-[#D95A47]',
      };
    case 'sunlight':
      return {
        cardBg: 'bg-[#EDF7F5]',
        borderColor: 'border-[#50857D]',
        plateColor: 'text-[#2F6D68]',
        titleColor: 'text-[#0F332B]',
        subColor: 'text-[#3B665D]',
        quoteColor: 'text-[#1B4339] border-[#2F6D68]/50',
        badgeBg: 'bg-[#DDECE8]',
        badgeBorder: 'border-[#50857D]/60',
        badgeText: 'text-[#0F332B]',
        accentColor: 'text-[#2F6D68]',
        glow: 'shadow-paper-md',
        rivetColor: 'bg-[#50857D]',
        hoverBorder: 'group-hover:border-[#2F6D68]',
      };
    case 'twilight':
      return {
        cardBg: 'bg-[#152B3C]/95 backdrop-blur-sm',
        borderColor: 'border-[#38BDF8]/60',
        plateColor: 'text-[#38BDF8]',
        titleColor: 'text-[#F8FAFC]',
        subColor: 'text-[#94A3B8]',
        quoteColor: 'text-[#CBD5E1] border-[#38BDF8]/50',
        badgeBg: 'bg-[#0E1E2B]',
        badgeBorder: 'border-[#38BDF8]/40',
        badgeText: 'text-[#E2E8F0]',
        accentColor: 'text-[#38BDF8]',
        glow: 'shadow-[0_4px_24px_rgba(56,189,248,0.2)]',
        rivetColor: 'bg-[#38BDF8]',
        hoverBorder: 'group-hover:border-[#38BDF8]',
      };
    case 'midnight':
      return {
        cardBg: 'bg-[#0E1724]/95 backdrop-blur-sm',
        borderColor: 'border-[#F59E0B]/60',
        plateColor: 'text-[#F59E0B]',
        titleColor: 'text-[#FFFBEB]',
        subColor: 'text-[#94A3B8]',
        quoteColor: 'text-[#E2E8F0] border-[#F59E0B]/50',
        badgeBg: 'bg-[#080E17]',
        badgeBorder: 'border-[#F59E0B]/40',
        badgeText: 'text-[#FEF3C7]',
        accentColor: 'text-[#F59E0B]',
        glow: 'shadow-[0_4px_28px_rgba(245,158,11,0.22)]',
        rivetColor: 'bg-[#F59E0B]',
        hoverBorder: 'group-hover:border-[#F59E0B]',
      };
    case 'abyss':
      return {
        cardBg: 'bg-[#0D0B18]/95 backdrop-blur-sm',
        borderColor: 'border-[#A855F7]/60',
        plateColor: 'text-[#C084FC]',
        titleColor: 'text-[#FAF5FF]',
        subColor: 'text-[#A78BFA]',
        quoteColor: 'text-[#E9D5FF] border-[#A855F7]/50',
        badgeBg: 'bg-[#080610]',
        badgeBorder: 'border-[#A855F7]/40',
        badgeText: 'text-[#F3E8FF]',
        accentColor: 'text-[#C084FC]',
        glow: 'shadow-[0_4px_30px_rgba(168,85,247,0.25)]',
        rivetColor: 'bg-[#A855F7]',
        hoverBorder: 'group-hover:border-[#A855F7]',
      };
    case 'hadal':
    default:
      return {
        cardBg: 'bg-[#08090D]/95 backdrop-blur-sm',
        borderColor: 'border-[#EF4444]/70',
        plateColor: 'text-[#F87171]',
        titleColor: 'text-[#FFFFFF]',
        subColor: 'text-[#94A3B8]',
        quoteColor: 'text-[#E2E8F0] border-[#EF4444]/60',
        badgeBg: 'bg-[#030406]',
        badgeBorder: 'border-[#EF4444]/50',
        badgeText: 'text-[#FEE2E2]',
        accentColor: 'text-[#EF4444]',
        glow: 'shadow-[0_4px_32px_rgba(239,68,68,0.25)]',
        rivetColor: 'bg-[#EF4444]',
        hoverBorder: 'group-hover:border-[#EF4444]',
      };
  }
};

export const SpecimenItem: React.FC<SpecimenItemProps> = ({
  specimen,
  zone,
  index,
  onSelect,
  isDiscovered = false,
}) => {
  const isEven = index % 2 === 0;
  const theme = getZoneTheme(zone.id);

  const handleMouseEnter = () => {
    pelagiaAudio.playWaterBubble();
  };

  const handleClick = () => {
    pelagiaAudio.playSpecimenChime();
    onSelect(specimen);
  };

  return (
    <div
      id={`specimen-${specimen.id}`}
      className="relative w-full max-w-5xl mx-auto my-20 sm:my-32 px-4 select-none"
    >
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
          title={`Inspect ${specimen.commonName} in Naturalist Journal`}
        >
          {/* Subtle water ripple ring on hover */}
          <div className="absolute inset-0 rounded-full border border-white/20 opacity-0 group-hover:opacity-40 transition-opacity scale-90 group-hover:scale-125 duration-500 pointer-events-none" />

          {/* Bioluminescent pulse halo for deep sea species */}
          {(zone.id === 'midnight' || zone.id === 'abyss' || zone.id === 'hadal') && (
            <div className="absolute inset-4 rounded-full bg-cyan-500/15 blur-xl opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />
          )}

          {/* SVG Specimen */}
          <SpecimenRenderer type={specimen.papercraftType} />

          {/* Quick Click Hint Tag on Hover */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#FAF6EE] text-[#1E252B] border border-[#1E252B] rounded-full text-[10px] font-mono font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-paper-sm whitespace-nowrap pointer-events-none">
            🔍 Inspect Specimen
          </div>
        </div>

        {/* Tactile Placard Adapted to Atmospheric Depth Colors */}
        <div
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          className={`cursor-pointer group relative w-full max-w-md ${theme.cardBg} border-2 ${theme.borderColor} ${theme.hoverBorder} rounded-xl p-5 sm:p-6 ${theme.glow} paper-grain transition-all duration-300 hover:-translate-y-1`}
        >
          {/* Top Metadata Rail */}
          <div className="flex items-center justify-between gap-2 border-b border-dashed border-current/20 pb-2.5 mb-3 font-mono text-[10px]">
            <div className={`flex items-center gap-1.5 ${theme.plateColor} font-bold tracking-widest uppercase`}>
              <Sparkles className="w-3 h-3" />
              <span>{specimen.plateNumber}</span>
              <span>·</span>
              <span>{specimen.tagCategory || 'Specimen'}</span>
            </div>

            {/* Discovered Stamp / Curiosity Pill */}
            {isDiscovered ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500 text-emerald-300 font-bold text-[9px] uppercase">
                <CheckCircle2 className="w-3 h-3" />
                <span>LOGGED</span>
              </span>
            ) : (
              <span className={`px-2 py-0.5 rounded ${theme.badgeBg} border ${theme.badgeBorder} ${theme.badgeText} font-semibold text-[9px] uppercase`}>
                {specimen.curiosityRating}
              </span>
            )}
          </div>

          {/* Common Name */}
          <h3 className={`text-2xl sm:text-3xl font-serif font-bold tracking-tight ${theme.titleColor} transition-colors`}>
            {specimen.commonName}
          </h3>

          {/* Binomial & Japanese Name */}
          <div className={`flex flex-wrap items-center gap-1.5 mt-1 font-mono text-xs ${theme.subColor}`}>
            <span className={`italic font-serif text-sm ${theme.accentColor}`}>
              {specimen.binomialName}
            </span>
            <span>·</span>
            <span>{specimen.japaneseName}</span>
          </div>

          {/* Observation Note Snippet */}
          <p className={`font-serif text-xs sm:text-sm mt-2.5 leading-relaxed line-clamp-2 italic border-l-2 ${theme.quoteColor} pl-2.5`}>
            "{specimen.observationNotes}"
          </p>

          {/* Bottom Depth & Dimension Badges */}
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-dashed border-current/20 font-mono text-[10px]">
            <div className={`inline-flex items-center gap-1 px-2 py-1 ${theme.badgeBg} rounded border ${theme.badgeBorder} ${theme.badgeText}`}>
              <Compass className="w-3 h-3 opacity-75" />
              <span className={`font-bold ${theme.accentColor}`}>
                {specimen.depthMeters <= 0 ? `+${Math.abs(specimen.depthMeters)}M SHORE` : `-${specimen.depthMeters}M DEPTH`}
              </span>
            </div>

            <div className={`inline-flex items-center gap-1 px-2 py-1 ${theme.badgeBg} rounded border ${theme.badgeBorder} ${theme.badgeText}`}>
              <Ruler className="w-3 h-3 opacity-75" />
              <span>SIZE: </span>
              <span className="font-bold">{specimen.lengthMeters} M</span>
            </div>

            <div className={`ml-auto inline-flex items-center gap-1 ${theme.accentColor} group-hover:translate-x-0.5 transition-transform font-bold text-[10px]`}>
              <BookOpen className="w-3 h-3" />
              <span>OPEN JOURNAL →</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
