import React, { useEffect } from 'react';
import { BiotaSpecimen, ZoneData } from '../types';
import { SpecimenRenderer } from './papercraft/SpecimenRenderer';
import { DiverScaleSVG } from './papercraft/SpecimenSVGs';
import { X, Calendar, Compass, ShieldAlert, Sparkles } from 'lucide-react';
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

  if (!specimen || !zone) return null;

  // Calculate comparative scale percentage vs 1.8m diver
  // 1.8m = reference 100% height (or width). If Whale Shark is 12m, it's ~6.6x human.
  const scaleRatio = (specimen.lengthMeters / 1.8).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 select-none">
      {/* Field Journal Paper Card (Wes Anderson / Naturalist Notebook Style) */}
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#FAF6EE] text-[#1E252B] border-2 border-[#1E252B] shadow-paper-lg rounded-xl overflow-hidden paper-grain">
        {/* Top Field Plate Header */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b-2 border-[#1E252B] bg-[#F4ECE1]">
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

        {/* Scrollable Journal Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {/* Specimen Showcase Box (Papercraft on display) */}
          <div className="relative p-6 sm:p-8 rounded-xl border-2 border-[#1E252B] bg-[#FDFBF7] shadow-inner flex items-center justify-center min-h-[220px]">
            {/* Watermark grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#1E252B_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

            {/* Specimen Render */}
            <div className="transform scale-110 sm:scale-125 transition-transform">
              <SpecimenRenderer type={specimen.papercraftType} />
            </div>

            {/* Scale stamp */}
            <div className="absolute bottom-3 right-3 px-2 py-1 bg-[#F4ECE1] border border-[#1E252B] rounded text-[10px] font-mono">
              SPECIMEN LENGTH: <span className="font-bold">{specimen.lengthMeters} M</span>
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

          {/* Naturalist Field Observation Note */}
          <div className="space-y-1.5 bg-[#F4ECE1] p-4 rounded-lg border border-[#1E252B]/20">
            <div className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#2F6D68]">
              EXPEDITION OBSERVATION // LOG ENTRY
            </div>
            <p className="font-serif text-base sm:text-lg leading-relaxed italic text-[#2D312E]">
              "{specimen.observationNotes}"
            </p>
          </div>

          {/* Scale Comparison Bar (Creature vs 1.8m Human Diver) */}
          <div className="space-y-2 p-4 rounded-lg border-2 border-[#1E252B] bg-[#FDFBF7]">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold uppercase tracking-wider text-[#1E252B]">
                SCALE COMPARISON // HUMAN DIVER (1.8M)
              </span>
              <span className="text-[#D95A47] font-semibold">
                ≈ {scaleRatio}× Human Scale
              </span>
            </div>

            <div className="flex items-end gap-6 pt-3 pb-2 justify-center border-t border-dashed border-[#1E252B]/20">
              {/* Diver */}
              <div className="flex flex-col items-center gap-1">
                <DiverScaleSVG className="w-8 h-16 text-[#1E252B]" />
                <span className="text-[9px] font-mono opacity-60">1.8 M</span>
              </div>

              {/* Specimen Representation */}
              <div className="flex flex-col items-center gap-1">
                <div className="transform origin-bottom" style={{ transform: `scale(${Math.min(1.8, Math.max(0.4, specimen.lengthMeters / 1.8))})` }}>
                  <SpecimenRenderer type={specimen.papercraftType} className="w-20 h-16" />
                </div>
                <span className="text-[9px] font-mono font-bold text-[#D95A47]">
                  {specimen.lengthMeters} M
                </span>
              </div>
            </div>
          </div>

          {/* Anatomical Key Features List */}
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

          {/* Specs Footer Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs border-t-2 border-dashed border-[#1E252B]/20 pt-4">
            <div className="p-2.5 rounded bg-[#F4ECE1] border border-[#1E252B]/15">
              <div className="text-[9px] opacity-60 flex items-center gap-1">
                <Compass className="w-3 h-3" />
                HABITAT ZONE
              </div>
              <div className="font-bold text-[11px] truncate">{zone.name.split('·')[0]}</div>
            </div>

            <div className="p-2.5 rounded bg-[#F4ECE1] border border-[#1E252B]/15">
              <div className="text-[9px] opacity-60 flex items-center gap-1">
                <ShieldAlert className="w-3 h-3" />
                PRIMARY DIET
              </div>
              <div className="font-bold text-[11px] truncate">{specimen.diet}</div>
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

        {/* Footer Ribbon */}
        <div className="px-5 sm:px-7 py-3 border-t-2 border-[#1E252B] bg-[#F4ECE1] flex items-center justify-between text-[11px] font-mono text-[#626863]">
          <span>COLLECTED BY sm000ky × Zero Two</span>
          <button
            onClick={onClose}
            className="font-bold text-[#1E252B] hover:text-[#D95A47] underline"
          >
            [CLOSE ENTRY]
          </button>
        </div>
      </div>
    </div>
  );
};
