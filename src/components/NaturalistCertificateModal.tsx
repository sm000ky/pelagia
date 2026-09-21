import React from 'react';
import { X, Printer, Award, Compass, ShieldCheck } from 'lucide-react';
import { pelagiaAudio } from '../lib/audioEngine';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  discoveredCount: number;
  totalCount: number;
}

export const NaturalistCertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  discoveredCount,
  totalCount,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    pelagiaAudio.playStampThud();
    window.print();
  };

  const percent = Math.round((discoveredCount / totalCount) * 100);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md select-none transition-all duration-300"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#FAF6EE] text-[#1E252B] border-4 border-[#1E252B] rounded-2xl p-6 sm:p-10 shadow-paper-lg paper-grain space-y-6 animate-in zoom-in-95 duration-300"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg border-2 border-[#1E252B] hover:bg-[#D95A47] hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Decorative Border */}
        <div className="border-2 border-dashed border-[#1E252B]/40 p-6 sm:p-8 rounded-xl space-y-6 text-center">
          {/* Insignia */}
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-[#EAA838] border-2 border-[#1E252B] flex items-center justify-center text-[#1E252B] shadow-paper-sm">
              <Award className="w-8 h-8" />
            </div>
          </div>

          {/* Titles */}
          <div className="space-y-1 font-mono">
            <div className="text-xs font-bold tracking-widest text-[#D95A47] uppercase">
              PACIFIC OCEANOGRAPHIC SOCIETY // EXPEDITION 002
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E252B] tracking-tight">
              Certificate of Bathymetric Conquest
            </h2>
          </div>

          <p className="font-serif text-sm sm:text-base leading-relaxed text-[#4B5563] italic max-w-md mx-auto">
            "This document certifies that the explorer has completed the vertical descent from +10 meters on the Pacific Shore, piercing the water threshold down to the geological basement of planet Earth."
          </p>

          {/* Expedition Data Grid */}
          <div className="grid grid-cols-2 gap-3 font-mono text-xs text-left bg-[#F4ECE1] p-4 rounded-xl border border-[#DEC6AE]">
            <div>
              <div className="text-[10px] text-[#626863] uppercase">TERMINAL DEPTH:</div>
              <div className="font-bold text-[#D95A47] text-sm">-10,994.0 M (CHALLENGER DEEP)</div>
            </div>
            <div>
              <div className="text-[10px] text-[#626863] uppercase">SPECIES CATALOGUED:</div>
              <div className="font-bold text-[#1E252B] text-sm">{discoveredCount} of {totalCount} ({percent}%)</div>
            </div>
            <div>
              <div className="text-[10px] text-[#626863] uppercase">PRESSURE OVERCOME:</div>
              <div className="font-bold text-[#1E252B]">1,086.0 ATMOSPHERES</div>
            </div>
            <div>
              <div className="text-[10px] text-[#626863] uppercase">SURVEY COMMISSION:</div>
              <div className="font-bold text-[#2F6D68]">sm000ky × Zero Two</div>
            </div>
          </div>

          {/* Wax Seal & Signatures */}
          <div className="pt-4 border-t border-dashed border-[#1E252B]/20 flex items-center justify-between font-mono text-xs">
            <div className="text-left space-y-0.5">
              <div className="text-[10px] text-[#626863]">AUTHENTICATION</div>
              <div className="font-bold text-xs text-[#1E252B]">OFFICIALLY RECORDED</div>
            </div>

            <div className="w-12 h-12 rounded-full bg-[#D95A47] text-white border-2 border-[#1E252B] flex items-center justify-center font-bold text-[10px] shadow-paper-sm rotate-[-8deg]">
              SEAL
            </div>

            <div className="text-right space-y-0.5">
              <div className="text-[10px] text-[#626863]">COCKPIT EXPEDITION</div>
              <div className="font-bold text-xs text-[#D95A47]">STRELIZIA 002</div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[#1E252B] hover:bg-black text-white font-mono text-xs font-bold transition-all shadow-paper cursor-pointer active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>PRINT / SAVE EXPEDITION DIPLOMA (PDF)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
