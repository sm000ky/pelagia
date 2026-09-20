import React from 'react';
import { BiotaSpecimen, ZoneData } from '../types';
import { SpecimenRenderer } from './papercraft/SpecimenRenderer';
import { BookOpen } from 'lucide-react';

interface SpecimenItemProps {
  specimen: BiotaSpecimen;
  zone: ZoneData;
  index: number;
  onSelect: (specimen: BiotaSpecimen) => void;
}

export const SpecimenItem: React.FC<SpecimenItemProps> = ({
  specimen,
  zone,
  index,
  onSelect,
}) => {
  const isDarkZone = zone.id === 'midnight' || zone.id === 'abyss' || zone.id === 'hadal';
  const isEven = index % 2 === 0;

  return (
    <div className="relative w-full max-w-5xl mx-auto my-24 sm:my-36 px-4 select-none">
      {/* Free-Floating Habitat Layout (No Boxed Cards!) */}
      <div 
        className={`flex flex-col ${
          isEven ? 'md:flex-row' : 'md:flex-row-reverse'
        } items-center justify-between gap-6 sm:gap-12`}
      >
        {/* The Living Papercraft Specimen (Direct in the open water) */}
        <div
          onClick={() => onSelect(specimen)}
          className="cursor-pointer group relative p-4 flex items-center justify-center transition-transform duration-200 hover:scale-105 active:scale-95"
          title={`Click to inspect ${specimen.commonName}`}
        >
          {/* Subtle water ripple ring on hover */}
          <div className="absolute inset-0 rounded-full border border-current opacity-0 group-hover:opacity-20 transition-opacity scale-90 group-hover:scale-110 duration-300 pointer-events-none" />

          {/* The Specimen SVG */}
          <SpecimenRenderer type={specimen.papercraftType} />
        </div>

        {/* Minimal Floating Paper Identification Tag */}
        <div 
          onClick={() => onSelect(specimen)}
          className={`cursor-pointer group flex flex-col ${
            isEven ? 'md:items-start text-left' : 'md:items-end text-right'
          } max-w-xs sm:max-w-sm`}
        >
          {/* Depth Pill */}
          <div 
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold tracking-widest uppercase mb-1.5 border shadow-paper-sm transition-colors ${
              isDarkZone
                ? 'bg-[#101E2B] border-[#EAA838]/40 text-[#EAA838]'
                : 'bg-[#FAF6EE] border-[#1E252B]/30 text-[#D95A47]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
            <span>{specimen.depthMeters <= 0 ? `+${Math.abs(specimen.depthMeters)}M SHORE` : `-${specimen.depthMeters} METERS`}</span>
          </div>

          {/* Common Name */}
          <h3 className={`text-2xl sm:text-3xl font-serif font-bold tracking-tight transition-colors group-hover:text-[#EAA838] ${
            isDarkZone ? 'text-[#F9F7F1]' : 'text-[#1E252B]'
          }`}>
            {specimen.commonName}
          </h3>

          {/* Binomial & Scale Tag (Clean & Minimal) */}
          <div className={`flex flex-wrap items-center gap-2 mt-1 font-mono text-xs ${
            isDarkZone ? 'text-[#94A3B8]' : 'text-[#556058]'
          }`}>
            <span className="italic font-serif text-sm">{specimen.binomialName}</span>
            <span>·</span>
            <span className="font-bold">Length: {specimen.lengthMeters}m</span>
          </div>

          {/* Subtle click hint */}
          <div className={`mt-2 flex items-center gap-1.5 text-[11px] font-mono opacity-60 group-hover:opacity-100 transition-opacity ${
            isDarkZone ? 'text-[#EAA838]' : 'text-[#2F6D68]'
          }`}>
            <BookOpen className="w-3.5 h-3.5" />
            <span>[Tap to inspect notes]</span>
          </div>
        </div>
      </div>
    </div>
  );
};
