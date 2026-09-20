import React from 'react';
import { BiotaSpecimen, ZoneData } from '../types';
import { SpecimenRenderer } from './papercraft/SpecimenRenderer';
import { BookOpen, Sparkles } from 'lucide-react';

interface SpecimenCardProps {
  specimen: BiotaSpecimen;
  zone: ZoneData;
  index: number;
  onSelect: (specimen: BiotaSpecimen) => void;
}

export const SpecimenCard: React.FC<SpecimenCardProps> = ({
  specimen,
  zone,
  index,
  onSelect,
}) => {
  const isDarkZone = zone.id === 'midnight' || zone.id === 'abyss' || zone.id === 'hadal';
  const isEven = index % 2 === 0;

  return (
    <div 
      className={`relative w-full max-w-4xl mx-auto my-12 sm:my-20 p-5 sm:p-8 rounded-2xl border-2 transition-all duration-300 select-none ${
        isDarkZone
          ? 'bg-[#141C24]/80 border-[#3B5366] text-[#F9F7F1] shadow-paper-dark hover:border-[#EAA838]'
          : 'bg-[#FDFBF7] border-[#1E252B] text-[#1E252B] shadow-paper hover:border-[#D95A47]'
      }`}
    >
      {/* Pinned Depth Bookmark Stamp */}
      <div 
        className={`absolute -top-4 ${isEven ? 'left-6 sm:left-10' : 'right-6 sm:right-10'} px-3 py-1 rounded-md border-2 font-mono text-xs font-bold shadow-paper-sm flex items-center gap-1.5 ${
          isDarkZone
            ? 'bg-[#0B0F14] border-[#EAA838] text-[#EAA838]'
            : 'bg-[#FAF6EE] border-[#1E252B] text-[#D95A47]'
        }`}
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>{specimen.depthMeters <= 0 ? `+${Math.abs(specimen.depthMeters)}M SHORE` : `-${specimen.depthMeters} METERS`}</span>
      </div>

      {/* Grid: Papercraft Art & Naturalist Description */}
      <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6 sm:gap-10`}>
        {/* Papercraft Model Display Stage */}
        <div 
          onClick={() => onSelect(specimen)}
          className={`w-full md:w-1/2 p-6 sm:p-8 rounded-xl border-2 flex items-center justify-center cursor-pointer group transition-all duration-200 ${
            isDarkZone
              ? 'bg-[#0B0F14] border-[#2C4251] hover:border-[#EAA838]'
              : 'bg-[#F4ECE1] border-[#1E252B] hover:border-[#D95A47]'
          }`}
        >
          <div className="transform group-hover:scale-105 group-active:scale-95 transition-transform duration-200">
            <SpecimenRenderer type={specimen.papercraftType} />
          </div>
        </div>

        {/* Text & Specimen Overview */}
        <div className="w-full md:w-1/2 space-y-3">
          {/* Taxonomy & Plate */}
          <div className="font-mono text-xs space-y-0.5">
            <div className={`text-[10px] tracking-widest uppercase font-bold ${isDarkZone ? 'text-[#EAA838]' : 'text-[#D95A47]'}`}>
              {specimen.plateNumber}
            </div>
            <div className="opacity-60 flex items-center gap-2">
              <span className="italic font-serif">{specimen.binomialName}</span>
              <span>·</span>
              <span>{specimen.japaneseName}</span>
            </div>
          </div>

          {/* Common Name */}
          <h3 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
            {specimen.commonName}
          </h3>

          {/* 1-2 sentence observation */}
          <p className="font-serif text-sm sm:text-base leading-relaxed opacity-85 italic">
            "{specimen.observationNotes}"
          </p>

          {/* Key tags & length */}
          <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[11px]">
            <span className={`px-2 py-0.5 rounded border ${isDarkZone ? 'bg-[#192430] border-[#3B5366]' : 'bg-[#EBDDCB] border-[#1E252B]/30'}`}>
              LENGTH: {specimen.lengthMeters} M
            </span>
            <span className={`px-2 py-0.5 rounded border ${isDarkZone ? 'bg-[#192430] border-[#3B5366]' : 'bg-[#EBDDCB] border-[#1E252B]/30'}`}>
              DIET: {specimen.diet.split(',')[0]}
            </span>
          </div>

          {/* Inspect Button */}
          <div className="pt-2">
            <button
              onClick={() => onSelect(specimen)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-mono text-xs font-bold transition-all shadow-paper-sm active:translate-y-0.5 ${
                isDarkZone
                  ? 'bg-[#EAA838] border-[#1E252B] text-[#1E252B] hover:bg-[#F2C063]'
                  : 'bg-[#D95A47] border-[#1E252B] text-white hover:bg-[#E06D53]'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>INSPECT FIELD JOURNAL</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
