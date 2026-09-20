import React, { useEffect } from 'react';
import { BiotaSpecimen, ZoneData } from '../types';
import { SpecimenRenderer } from './papercraft/SpecimenRenderer';
import { DiverScaleSVG } from './papercraft/SpecimenSVGs';
import { X, Calendar, Compass, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';
import { pelagiaAudio } from '../lib/audioEngine';

interface FieldJournalModalProps {
  specimen: BiotaSpecimen | null;
  zone: ZoneData | null;
  onClose: () => void;
}

export const FieldJournalModal: React.FC<FieldJournalModalProps> = ({
  specimen,
  zone,
  onClose,
}) => {
  useEffect(() => {
    if (specimen) {
      pelagiaAudio.playSpecimenChime();
    }
  }, [specimen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!specimen || !zone) return null;

  const scaleRatio = (specimen.lengthMeters / 1.8).toFixed(1);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm select-none transition-all"
      onClick={onClose}
    >
      {/* Field Journal Notebook Unfold Animation */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-[#FAF6EE] text-[#1E252B] border-2 border-[#1E252B] shadow-paper-lg rounded-2xl overflow-hidden paper-grain animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 ease-out"
      >
        {/* Vintage Bookmark Tag Header */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-4 border-b-2 border-[#1E252B] bg-[#F4ECE1]">
          <div className="space-y-0.5 font-mono">
            <div className="text-[10px] tracking-widest text-[#D95A47] font-bold uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>NATURALIST ARCHIVE // {specimen.plateNumber}</span>
            </div>
            <div className="text-xs text-[#626863] flex items-center gap-2">
              <span>{zone.name}</span>
              <span>·</span>
              <span className="font-semibold text-[#1E252B]">
                {specimen.depthMeters <= 0 ? `+${Math.abs(specimen.depthMeters)}M SHORE` : `-${specimen.depthMeters}M DEPTH`}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border-2 border-[#1E252B] bg-[#FAF6EE] hover:bg-[#D95A47] hover:text-white transition-colors shadow-paper-sm active:translate-y-0.5"
            title="Close Field Note (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Journal Notebook Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          {/* Specimen Showcase Arena */}
          <div className="relative p-6 sm:p-10 rounded-xl border-2 border-[#1E252B] bg-[#FDFBF7] shadow-inner flex items-center justify-center min-h-[220px]">
            <div className="absolute inset-0 bg-[radial-gradient(#1E252B_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

            <div className="transform scale-110 sm:scale-125 transition-transform">
              <SpecimenRenderer type={specimen.papercraftType} />
            </div>

            <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-[#F4ECE1] border border-[#1E252B] rounded text-[10px] font-mono shadow-paper-sm">
              SPECIMEN LENGTH: <span className="font-bold text-[#D95A47]">{specimen.lengthMeters} M</span>
            </div>
          </div>

          {/* Titles & Taxonomy */}
          <div className="border-b-2 border-dashed border-[#1E252B]/20 pb-4">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#1E252B]">
              {specimen.commonName}
            </h2>
            <div className="flex flex-wrap items-center gap-2 mt-1.5 font-mono text-xs text-[#626863]">
              <span className="italic font-serif text-base text-[#D95A47]">
                {specimen.binomialName}
              </span>
              <span>·</span>
              <span>{specimen.japaneseName}</span>
              <span>·</span>
              <span className="px-2 py-0.5 rounded bg-[#EAA838]/20 border border-[#EAA838] text-[#9A6715] font-semibold text-[10px]">
                {specimen.curiosityRating}
              </span>
            </div>
          </div>

          {/* Field Log Entry */}
          <div className="space-y-1.5 bg-[#F4ECE1] p-4 sm:p-5 rounded-xl border border-[#1E252B]/20 shadow-paper-sm">
            <div className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#2F6D68] flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>FIELD OBSERVATION LOG</span>
            </div>
            <p className="font-serif text-base sm:text-lg leading-relaxed italic text-[#2D312E]">
              "{specimen.observationNotes}"
            </p>
          </div>

          {/* Scale Comparison with Human Diver */}
          <div className="space-y-2 p-4 sm:p-5 rounded-xl border-2 border-[#1E252B] bg-[#FDFBF7] shadow-paper-sm">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold uppercase tracking-wider text-[#1E252B]">
                SCALE // HUMAN DIVER (1.8M)
              </span>
              <span className="text-[#D95A47] font-bold">
                ≈ {scaleRatio}× Human Diver
              </span>
            </div>

            <div className="flex items-end gap-8 pt-4 pb-2 justify-center border-t border-dashed border-[#1E252B]/20">
              <div className="flex flex-col items-center gap-1">
                <DiverScaleSVG className="w-8 h-16 text-[#1E252B]" />
                <span className="text-[9px] font-mono opacity-60">1.8 M</span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <div 
                  className="transform origin-bottom" 
                  style={{ transform: `scale(${Math.min(1.8, Math.max(0.4, specimen.lengthMeters / 1.8))})` }}
                >
                  <SpecimenRenderer type={specimen.papercraftType} className="w-20 h-16" />
                </div>
                <span className="text-[9px] font-mono font-bold text-[#D95A47]">
                  {specimen.lengthMeters} M
                </span>
              </div>
            </div>
          </div>

          {/* Anatomical Key Features */}
          <div className="space-y-2">
            <div className="text-xs font-mono font-bold tracking-widest uppercase text-[#1E252B]">
              KEY ANATOMICAL ADAPTATIONS
            </div>
            <ul className="space-y-1.5 font-mono text-xs">
              {specimen.anatomicalFeatures.map((feat, i) => (
                <li key={i} className="flex items-start gap-2 text-[#444C44]">
                  <span className="text-[#D95A47] font-bold">▪</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Grid of Taxonomy Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-mono text-xs border-t-2 border-dashed border-[#1E252B]/20 pt-4">
            <div className="p-2.5 rounded bg-[#F4ECE1] border border-[#1E252B]/15">
              <div className="text-[9px] opacity-60 flex items-center gap-1">
                <Compass className="w-3 h-3" />
                ZONE
              </div>
              <div className="font-bold text-[11px] truncate">{zone.name.split('·')[0]}</div>
            </div>

            <div className="p-2.5 rounded bg-[#F4ECE1] border border-[#1E252B]/15">
              <div className="text-[9px] opacity-60 flex items-center gap-1">
                <ShieldAlert className="w-3 h-3" />
                DIET
              </div>
              <div className="font-bold text-[11px] truncate">{specimen.diet.split(',')[0]}</div>
            </div>

            <div className="p-2.5 rounded bg-[#F4ECE1] border border-[#1E252B]/15 col-span-2 sm:col-span-1">
              <div className="text-[9px] opacity-60 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                FIRST RECORDED
              </div>
              <div className="font-bold text-[11px]">{specimen.discoveryYear} A.D.</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 sm:px-8 py-3.5 border-t-2 border-[#1E252B] bg-[#F4ECE1] flex items-center justify-between text-[11px] font-mono text-[#626863]">
          <span>COLLECTED BY sm000ky × Zero Two</span>
          <button
            onClick={onClose}
            className="font-bold text-[#1E252B] hover:text-[#D95A47] underline cursor-pointer"
          >
            [CLOSE LOG]
          </button>
        </div>
      </div>
    </div>
  );
};
