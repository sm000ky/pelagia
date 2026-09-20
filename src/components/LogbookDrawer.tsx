import React, { useState } from 'react';
import { BiotaSpecimen, ZoneData } from '../types';
import { SPECIMENS, ZONES } from '../data/oceanData';
import { X, BookOpen, Sparkles, CheckCircle2, Compass, Filter } from 'lucide-react';
import { pelagiaAudio } from '../lib/audioEngine';

interface LogbookDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  discoveredIds: Set<string>;
  onSelectSpecimen: (specimen: BiotaSpecimen) => void;
  onJumpToSpecimenDepth: (depthMeters: number) => void;
}

export const LogbookDrawer: React.FC<LogbookDrawerProps> = ({
  isOpen,
  onClose,
  discoveredIds,
  onSelectSpecimen,
  onJumpToSpecimenDepth,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isOpen) return null;

  const categories = ['all', 'Fish', 'Cephalopod', 'Crustacean', 'Mammal', 'Jelly', 'Bioluminescent'];

  const filteredSpecimens = SPECIMENS.filter((s) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'Bioluminescent') {
      return (
        s.tagCategory === 'Bioluminescent' ||
        s.zoneId === 'midnight' ||
        s.zoneId === 'abyss' ||
        s.zoneId === 'hadal'
      );
    }
    return s.tagCategory === selectedCategory;
  });

  const discoveredCount = SPECIMENS.filter((s) => discoveredIds.has(s.id)).length;
  const progressPercent = ((discoveredCount / SPECIMENS.length) * 100).toFixed(0);

  const handleCardClick = (specimen: BiotaSpecimen) => {
    pelagiaAudio.playWaterBubble();
    onSelectSpecimen(specimen);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm select-none transition-all duration-300"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl h-full bg-[#FAF6EE] text-[#1E252B] border-l-2 border-[#1E252B] shadow-paper-lg flex flex-col paper-grain animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b-2 border-[#1E252B] bg-[#F4ECE1] flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-mono text-[10px] text-[#D95A47] font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>NATURALIST EXPEDITION LOGBOOK</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#1E252B]">
              Pacific Bathymetric Roster
            </h2>
            <div className="text-xs font-mono text-[#626863] flex items-center gap-2">
              <span>{discoveredCount} of {SPECIMENS.length} Species Stamped ({progressPercent}%)</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg border-2 border-[#1E252B] bg-[#FAF6EE] hover:bg-[#D95A47] hover:text-white transition-colors shadow-paper-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#DEC6AE] h-2">
          <div
            className="bg-[#D95A47] h-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Category Filter Pills */}
        <div className="p-3 border-b border-[#1E252B]/15 bg-[#FDFBF7] flex items-center gap-1.5 overflow-x-auto no-scrollbar font-mono text-[10px]">
          <Filter className="w-3.5 h-3.5 text-[#626863] ml-1 mr-1 flex-shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                pelagiaAudio.playWaterBubble();
                setSelectedCategory(cat);
              }}
              className={`px-2.5 py-1 rounded-full border whitespace-nowrap transition-colors uppercase font-bold ${
                selectedCategory === cat
                  ? 'bg-[#1E252B] text-white border-[#1E252B]'
                  : 'bg-[#FAF6EE] text-[#626863] border-[#DEC6AE] hover:bg-[#EBDDCB]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Specimen List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {filteredSpecimens.map((specimen) => {
            const isLogged = discoveredIds.has(specimen.id);
            const zone = ZONES.find((z) => z.id === specimen.zoneId);

            return (
              <div
                key={specimen.id}
                onClick={() => handleCardClick(specimen)}
                className="group cursor-pointer p-3.5 rounded-xl border border-[#DEC6AE] bg-[#FDFBF7] hover:border-[#1E252B] hover:shadow-paper-sm transition-all duration-200 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#F4ECE1] border border-[#DEC6AE] flex items-center justify-center font-mono text-xs font-bold text-[#D95A47] group-hover:scale-105 transition-transform">
                    {specimen.plateNumber.replace('PL-', '')}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-base text-[#1E252B] group-hover:text-[#D95A47] transition-colors">
                        {specimen.commonName}
                      </span>
                      {isLogged && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      )}
                    </div>
                    <div className="text-[11px] font-mono text-[#626863] italic">
                      {specimen.binomialName} · {zone?.name.split('·')[0].trim()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs text-right">
                  <span className="font-bold text-[#D95A47]">
                    {specimen.depthMeters <= 0 ? `+${Math.abs(specimen.depthMeters)}m` : `-${specimen.depthMeters}m`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
