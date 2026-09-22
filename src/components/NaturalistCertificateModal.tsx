import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Printer,
  Download,
  Share2,
  Award,
  Compass,
  Check,
  Copy,
  Edit3,
  Sparkles,
  ShieldCheck,
  Waves,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { pelagiaAudio } from '../lib/audioEngine';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  discoveredCount: number;
  totalCount: number;
  terminalDepth?: number;
}

export const NaturalistCertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  discoveredCount,
  totalCount,
  terminalDepth = 10994,
}) => {
  const [explorerName, setExplorerName] = useState<string>(() => {
    try {
      return localStorage.getItem('pelagia_explorer_name') || 'Captain sm000ky';
    } catch {
      return 'Captain sm000ky';
    }
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [copiedToast, setCopiedToast] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      pelagiaAudio.playSpecimenChime();
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D95A47', '#EAA838', '#2F6D68', '#FAF6EE', '#38BDF8'],
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const percent = Math.round((discoveredCount / totalCount) * 100);

  // Dynamic Honorary Rank based on catalogued fauna
  const getExplorerRank = () => {
    if (discoveredCount >= 48) return 'Grand Sovereign of the Hadal Realm (Code: 002)';
    if (discoveredCount >= 35) return 'Grand Commander of the Abyssal Frontier';
    if (discoveredCount >= 20) return 'Distinguished Mesopelagic Bathynaut';
    if (discoveredCount >= 10) return 'Certified Sunlight Naturalist';
    return 'Apprentice Littoral Explorer';
  };

  const rankTitle = getExplorerRank();

  const handleNameChange = (val: string) => {
    setExplorerName(val);
    try {
      localStorage.setItem('pelagia_explorer_name', val);
    } catch {
      // ignore
    }
  };

  // Generate high-resolution 1200x820 Canvas representation of the diploma
  const renderCertificateToCanvas = (): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 820;
    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;

    // 1. Aged Vintage Parchment Background
    const bgGrad = ctx.createLinearGradient(0, 0, 1200, 820);
    bgGrad.addColorStop(0, '#FAF3E0');
    bgGrad.addColorStop(0.5, '#F5EDD6');
    bgGrad.addColorStop(1, '#EFE4C8');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1200, 820);

    // Subtle paper noise / grain
    ctx.fillStyle = 'rgba(30, 37, 43, 0.03)';
    for (let i = 0; i < 1200; i += 12) {
      for (let j = 0; j < 820; j += 12) {
        if ((i + j) % 24 === 0) {
          ctx.fillRect(i, j, 4, 4);
        }
      }
    }

    // 2. Ornate Double Victorian Border
    ctx.strokeStyle = '#1E252B';
    ctx.lineWidth = 6;
    ctx.strokeRect(30, 30, 1140, 760);

    ctx.strokeStyle = '#EAA838';
    ctx.lineWidth = 2;
    ctx.strokeRect(42, 42, 1116, 736);

    ctx.strokeStyle = '#1E252B';
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 4]);
    ctx.strokeRect(50, 50, 1100, 720);
    ctx.setLineDash([]);

    // Corner Ornaments
    const drawCorner = (x: number, y: number, rot: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.fillStyle = '#1E252B';
      ctx.fillRect(-15, -15, 30, 4);
      ctx.fillRect(-15, -15, 4, 30);
      ctx.fillStyle = '#D95A47';
      ctx.beginPath();
      ctx.arc(-8, -8, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };
    drawCorner(42, 42, 0);
    drawCorner(1158, 42, Math.PI / 2);
    drawCorner(1158, 778, Math.PI);
    drawCorner(42, 778, -Math.PI / 2);

    // 3. Society Header & Typography
    ctx.textAlign = 'center';
    ctx.fillStyle = '#D95A47';
    ctx.font = 'bold 16px "Courier New", monospace';
    ctx.fillText('THE ROYAL PACIFIC OCEANOGRAPHIC SOCIETY · EST. 2026', 600, 95);

    ctx.fillStyle = '#1E252B';
    ctx.font = 'bold 38px Georgia, "Times New Roman", serif';
    ctx.fillText('DIPLOMA OF BATHYMETRIC CONQUEST', 600, 145);

    ctx.fillStyle = '#626863';
    ctx.font = 'italic 16px Georgia, serif';
    ctx.fillText('This document solemnly attests and certifies that', 600, 185);

    // 4. Explorer Name (Engraved & Underlined)
    ctx.fillStyle = '#1E252B';
    ctx.font = 'bold 44px Georgia, "Times New Roman", serif';
    const displayExplorer = explorerName.trim() || 'Captain sm000ky';
    ctx.fillText(displayExplorer, 600, 245);

    // Calligraphic Underline Flourish
    ctx.strokeStyle = '#D95A47';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(380, 260);
    ctx.lineTo(820, 260);
    ctx.stroke();

    // Small Diamond Center
    ctx.fillStyle = '#D95A47';
    ctx.beginPath();
    ctx.moveTo(600, 255);
    ctx.lineTo(606, 260);
    ctx.lineTo(600, 265);
    ctx.lineTo(594, 260);
    ctx.fill();

    // 5. Formal Citation Body Text
    ctx.fillStyle = '#3E464F';
    ctx.font = 'italic 16px Georgia, serif';
    ctx.fillText(
      'having successfully navigated the bathyscaphe through the epipelagic, mesopelagic, and bathypelagic zones,',
      600,
      305
    );
    ctx.fillText(
      `has plunged down to -${terminalDepth.toLocaleString()} METERS into Challenger Deep, surviving 1,086 atmospheres of crushing pressure`,
      600,
      332
    );
    ctx.fillText(
      'and cataloguing the extraordinary living biodiversity of the Pacific Ocean basin.',
      600,
      359
    );

    // 6. Credentials Box
    ctx.fillStyle = '#F4ECE1';
    ctx.strokeStyle = '#DEC6AE';
    ctx.lineWidth = 1.5;
    ctx.fillRect(160, 400, 880, 140);
    ctx.strokeRect(160, 400, 880, 140);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#626863';
    ctx.font = 'bold 12px "Courier New", monospace';
    ctx.fillText('HONORARY RANK BESTOWED:', 190, 435);
    ctx.fillText('MAXIMUM DEPTH ATTAINED:', 190, 480);
    ctx.fillText('SPECIES CATALOGUED:', 190, 520);

    ctx.fillStyle = '#1E252B';
    ctx.font = 'bold 16px Georgia, serif';
    ctx.fillText(rankTitle, 385, 435);

    ctx.fillStyle = '#D95A47';
    ctx.font = 'bold 16px "Courier New", monospace';
    ctx.fillText(`-${terminalDepth.toLocaleString()} M (CHALLENGER DEEP)`, 385, 480);

    ctx.fillStyle = '#1E252B';
    ctx.font = 'bold 15px "Courier New", monospace';
    ctx.fillText(`${discoveredCount} of ${totalCount} Species (${percent}% Completed)`, 385, 520);

    // Right side of credentials
    ctx.fillStyle = '#626863';
    ctx.font = 'bold 12px "Courier New", monospace';
    ctx.fillText('HYDROSTATIC LOAD:', 680, 435);
    ctx.fillText('COORDINATES:', 680, 480);
    ctx.fillText('AUTHENTICATION:', 680, 520);

    ctx.fillStyle = '#1E252B';
    ctx.font = 'bold 14px "Courier New", monospace';
    ctx.fillText('1,086.0 ATM (15,960 PSI)', 835, 435);
    ctx.fillText("11°22'N · 142°35'E", 835, 480);
    ctx.fillStyle = '#2F6D68';
    ctx.fillText('VERIFIED // PASS', 835, 520);

    // 7. Seals & Signatures (Bottom Deck)
    // Left: sm000ky Signature
    ctx.textAlign = 'center';
    ctx.strokeStyle = '#1E252B';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(180, 680);
    ctx.lineTo(380, 680);
    ctx.stroke();

    ctx.fillStyle = '#1E252B';
    ctx.font = 'italic bold 22px "Brush Script MT", Georgia, cursive';
    ctx.fillText('sm000ky', 280, 668);
    ctx.fillStyle = '#626863';
    ctx.font = '11px "Courier New", monospace';
    ctx.fillText('sm000ky · Chief Expedition Architect', 280, 700);

    // Center: Crimson Wax Seal
    ctx.save();
    ctx.translate(600, 660);
    ctx.fillStyle = '#B91C1C';
    ctx.beginPath();
    ctx.arc(0, 0, 48, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#7F1D1D';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#FEF2F2';
    ctx.font = 'bold 9px "Courier New", monospace';
    ctx.fillText('OFFICIAL EXPEDITION', 0, -22);
    ctx.fillText('SEAL', 0, -10);

    // Anchor & Compass Emblem in Seal
    ctx.strokeStyle = '#FEF2F2';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(0, 8, 12, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, -4);
    ctx.lineTo(0, 20);
    ctx.moveTo(-10, 14);
    ctx.lineTo(10, 14);
    ctx.stroke();

    ctx.font = 'bold 8px "Courier New", monospace';
    ctx.fillText('-10,994M · 2026', 0, 32);
    ctx.restore();

    // Right: Zero Two Signature
    ctx.strokeStyle = '#1E252B';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(820, 680);
    ctx.lineTo(1020, 680);
    ctx.stroke();

    ctx.fillStyle = '#D95A47';
    ctx.font = 'italic bold 22px "Brush Script MT", Georgia, cursive';
    ctx.fillText('Zero Two (Code: 002)', 920, 668);
    ctx.fillStyle = '#626863';
    ctx.font = '11px "Courier New", monospace';
    ctx.fillText('Zero Two · Kokpit Imperial Co-Pilot', 920, 700);

    // Bottom Date & Serial
    ctx.fillStyle = '#8A968E';
    ctx.font = '10px "Courier New", monospace';
    ctx.fillText(
      `ISSUED: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} · CERTIFICATE ID: № PAC-10994-PELAGIA`,
      600,
      760
    );

    return canvas;
  };

  // Download high-resolution PNG image
  const handleDownloadPNG = () => {
    pelagiaAudio.playStampThud();
    setIsExporting(true);

    setTimeout(() => {
      try {
        const canvas = renderCertificateToCanvas();
        const dataUrl = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `pelagia-expedition-diploma-${explorerName.replace(/\s+/g, '_')}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (err) {
        console.error('Failed to export certificate:', err);
      } finally {
        setIsExporting(false);
      }
    }, 150);
  };

  // Share Progress via Native Web Share API or Clipboard Copy
  const handleShareProgress = async () => {
    pelagiaAudio.playWaterBubble();
    const shareText = `🌊 I dove -10,994M into the Mariana Trench and catalogued ${discoveredCount}/${totalCount} species on Pelagia! Here is my official expedition diploma:`;
    const shareUrl = 'https://pelagia.vercel.app';

    try {
      const canvas = renderCertificateToCanvas();
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], 'pelagia-expedition-diploma.png', { type: 'image/png' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: 'Pelagia · Official Bathymetric Expedition Diploma',
            text: shareText,
            url: shareUrl,
            files: [file],
          });
        } else if (navigator.share) {
          await navigator.share({
            title: 'Pelagia · Official Bathymetric Expedition Diploma',
            text: shareText,
            url: shareUrl,
          });
        } else {
          // Fallback to Clipboard
          await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
          setCopiedToast(true);
          setTimeout(() => setCopiedToast(false), 3000);
        }
      });
    } catch {
      // Fallback
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 3000);
    }
  };

  const handlePrint = () => {
    pelagiaAudio.playStampThud();
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-md select-none transition-all duration-300 overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl my-auto bg-[#FAF3E0] text-[#1E252B] border-4 border-[#1E252B] rounded-2xl p-5 sm:p-9 shadow-paper-lg paper-grain space-y-5 animate-in zoom-in-95 duration-300"
      >
        {/* Close Modal Button */}
        <button
          onClick={onClose}
          className="absolute top-3 sm:top-4 right-3 sm:right-4 p-1.5 rounded-lg border-2 border-[#1E252B] bg-[#FAF6EE] hover:bg-[#D95A47] hover:text-white transition-colors cursor-pointer shadow-paper-sm z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Name Input Bar (Live Certificate Customizer) */}
        <div className="p-3 sm:p-4 rounded-xl bg-[#F4ECE1] border-2 border-[#1E252B] shadow-paper-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#1E252B]">
            <Edit3 className="w-4 h-4 text-[#D95A47]" />
            <span>CUSTOMIZE EXPLORER NAME:</span>
          </div>

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={explorerName}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Enter your name / call-sign..."
              maxLength={36}
              className="w-full px-3.5 py-1.5 rounded-lg border-2 border-[#1E252B] bg-[#FAF6EE] font-serif font-bold text-[#1E252B] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#D95A47] shadow-inner"
            />
          </div>
        </div>

        {/* Certificate Parchment Frame */}
        <div className="relative border-4 border-[#1E252B] p-5 sm:p-8 rounded-xl space-y-5 text-center bg-[#FDFBF7] shadow-inner">
          {/* Inner Golden Trim & Dashed Line */}
          <div className="absolute inset-1.5 border-2 border-[#EAA838] pointer-events-none rounded-lg" />
          <div className="absolute inset-3 border border-dashed border-[#1E252B]/30 pointer-events-none rounded-lg" />

          {/* Society Emblem */}
          <div className="flex justify-center pt-2">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#EAA838] border-2 border-[#1E252B] flex items-center justify-center text-[#1E252B] shadow-paper-sm">
              <Award className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
          </div>

          {/* Header Lines */}
          <div className="space-y-1 font-mono">
            <div className="text-[10px] sm:text-xs font-bold tracking-widest text-[#D95A47] uppercase">
              THE ROYAL PACIFIC OCEANOGRAPHIC SOCIETY · EST. 2026
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1E252B] tracking-tight">
              Diploma of Bathymetric Conquest
            </h2>
            <div className="text-xs font-serif italic text-[#626863]">
              This document solemnly attests and certifies that
            </div>
          </div>

          {/* The Explorer Name on Parchment */}
          <div className="py-2">
            <div className="font-serif font-bold text-3xl sm:text-5xl text-[#1E252B] tracking-tight border-b-2 border-[#D95A47] pb-2 inline-block max-w-full px-4 break-words">
              {explorerName.trim() || 'Captain sm000ky'}
            </div>
          </div>

          {/* Formal Citation */}
          <p className="font-serif text-xs sm:text-sm leading-relaxed text-[#4B5563] italic max-w-xl mx-auto">
            "having successfully piloted the bathyscaphe through the epipelagic, mesopelagic, and bathypelagic zones, has plunged down to <strong className="text-[#1E252B] font-mono">-{terminalDepth.toLocaleString()} M</strong> into Challenger Deep, surviving 1,086 atmospheres of crushing hydrostatic load and cataloguing the living biodiversity of Earth's deepest frontier."
          </p>

          {/* Official Credentials Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5 font-mono text-xs text-left bg-[#F4ECE1] p-3.5 sm:p-5 rounded-xl border border-[#DEC6AE] shadow-paper-sm">
            <div>
              <div className="text-[9px] sm:text-[10px] text-[#626863] uppercase">HONORARY RANK BESTOWED:</div>
              <div className="font-bold text-[#1E252B] text-xs sm:text-sm font-serif">{rankTitle}</div>
            </div>

            <div>
              <div className="text-[9px] sm:text-[10px] text-[#626863] uppercase">TERMINAL DEPTH:</div>
              <div className="font-bold text-[#D95A47] text-xs sm:text-sm">-{terminalDepth.toLocaleString()} M (CHALLENGER DEEP)</div>
            </div>

            <div>
              <div className="text-[9px] sm:text-[10px] text-[#626863] uppercase">SPECIES CATALOGUED:</div>
              <div className="font-bold text-[#1E252B] text-xs sm:text-sm">{discoveredCount} of {totalCount} ({percent}%)</div>
            </div>

            <div>
              <div className="text-[9px] sm:text-[10px] text-[#626863] uppercase">HYDROSTATIC LOAD:</div>
              <div className="font-bold text-[#1E252B] text-xs sm:text-sm">1,086.0 ATMOSPHERES</div>
            </div>
          </div>

          {/* Signatures & Wax Seal Row */}
          <div className="pt-4 border-t border-dashed border-[#1E252B]/20 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            {/* sm000ky Signature */}
            <div className="text-center sm:text-left space-y-0.5">
              <div className="font-serif italic font-bold text-lg text-[#1E252B]">sm000ky</div>
              <div className="w-36 h-[1.5px] bg-[#1E252B] mx-auto sm:mx-0" />
              <div className="text-[9px] text-[#626863]">Chief Expedition Architect</div>
            </div>

            {/* Crimson Wax Seal Emblem */}
            <div className="w-14 h-14 rounded-full bg-[#B91C1C] text-[#FEF2F2] border-2 border-[#7F1D1D] shadow-paper-sm flex flex-col items-center justify-center font-bold text-[8px] rotate-[-6deg] flex-shrink-0">
              <span>OFFICIAL</span>
              <span>SEAL</span>
              <span className="text-[7px] opacity-80">-10,994M</span>
            </div>

            {/* Zero Two Signature */}
            <div className="text-center sm:text-right space-y-0.5">
              <div className="font-serif italic font-bold text-lg text-[#D95A47]">Zero Two (002)</div>
              <div className="w-36 h-[1.5px] bg-[#D95A47] mx-auto sm:ml-auto" />
              <div className="text-[9px] text-[#626863]">Kokpit Imperial Co-Pilot</div>
            </div>
          </div>
        </div>

        {/* Certificate Actions Bar (Download PNG, Share, Print) */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
          {/* Download Image (PNG) */}
          <button
            onClick={handleDownloadPNG}
            disabled={isExporting}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#D95A47] hover:bg-[#E06D53] text-white font-mono text-xs font-bold transition-all shadow-paper cursor-pointer active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'GENERATING DIPLOMA...' : 'DOWNLOAD CERTIFICATE (PNG)'}</span>
          </button>

          {/* Share Progress */}
          <button
            onClick={handleShareProgress}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#2F6D68] hover:bg-[#3D857F] text-white font-mono text-xs font-bold transition-all shadow-paper cursor-pointer active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            <span>SHARE PROGRESS</span>
          </button>

          {/* Print / PDF */}
          <button
            onClick={handlePrint}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#1E252B] hover:bg-black text-white font-mono text-xs font-bold transition-all shadow-paper cursor-pointer active:scale-95"
            title="Print or Save PDF"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">PRINT / PDF</span>
          </button>
        </div>

        {/* Copied Toast Notification */}
        {copiedToast && (
          <div className="text-center font-mono text-xs font-bold text-emerald-600 bg-emerald-100 border border-emerald-300 p-2 rounded-lg animate-in fade-in duration-200">
            ✓ Expedition link & progress copied to clipboard! Ready to share.
          </div>
        )}
      </div>
    </div>
  );
};
