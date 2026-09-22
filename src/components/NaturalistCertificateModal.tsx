import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Printer,
  Download,
  Share2,
  Award,
  Compass,
  Edit3,
  Sparkles,
  ShieldCheck,
  Check,
  Flame,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { pelagiaAudio } from '../lib/audioEngine';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  discoveredCount: number;
  totalCount: number;
  relicsCount?: number;
  totalRelics?: number;
  terminalDepth?: number;
}

export const NaturalistCertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  discoveredCount,
  totalCount,
  relicsCount = 0,
  totalRelics = 8,
  terminalDepth = 10994,
}) => {
  const [explorerName, setExplorerName] = useState<string>(() => {
    try {
      return localStorage.getItem('pelagia_explorer_name') || 'Captain sm000ky';
    } catch {
      return 'Captain sm000ky';
    }
  });

  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [copiedToast, setCopiedToast] = useState<boolean>(false);
  const [isWaxPressed, setIsWaxPressed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('pelagia_wax_pressed') === 'true';
    } catch {
      return false;
    }
  });

  const handlePressWax = () => {
    pelagiaAudio.playWaxSquash();
    setIsWaxPressed(true);
    try {
      localStorage.setItem('pelagia_wax_pressed', 'true');
    } catch {
      // ignore
    }
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#EF4444', '#DC2626', '#EAA838', '#B91C1C'],
    });
  };

  useEffect(() => {
    if (isOpen) {
      pelagiaAudio.playSpecimenChime();
      confetti({
        particleCount: 75,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#D95A47', '#EAA838', '#2F6D68', '#FAF6EE', '#B91C1C'],
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const percent = Math.round((discoveredCount / totalCount) * 100);

  // Dynamic Honorary Rank based on discovered species and relics
  const getExplorerRank = () => {
    if (relicsCount >= 8 && discoveredCount >= 45) return 'Grand Sovereign of the Hadal Realm (Code: 002)';
    if (relicsCount >= 5 || discoveredCount >= 35) return 'Grand Commander of the Abyssal Frontier';
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

  // High-Resolution 1200x840 Canvas Certificate Generator (Faithful to papercraft aesthetic)
  const renderCertificateToCanvas = (): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 840;
    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;

    // 1. Aged Vintage Parchment Background
    const bgGrad = ctx.createLinearGradient(0, 0, 1200, 840);
    bgGrad.addColorStop(0, '#FAF3E0');
    bgGrad.addColorStop(0.5, '#F5ECCE');
    bgGrad.addColorStop(1, '#EDE2C2');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1200, 840);

    // Stipple paper grain
    ctx.fillStyle = 'rgba(30, 37, 43, 0.035)';
    for (let i = 0; i < 1200; i += 10) {
      for (let j = 0; j < 840; j += 10) {
        if ((i + j) % 20 === 0) {
          ctx.fillRect(i, j, 4, 4);
        }
      }
    }

    // 2. Ornate Multi-Tier Victorian Certificate Border
    ctx.strokeStyle = '#1E252B';
    ctx.lineWidth = 6;
    ctx.strokeRect(32, 32, 1136, 776);

    ctx.strokeStyle = '#EAA838';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(44, 44, 1112, 752);

    ctx.strokeStyle = '#1E252B';
    ctx.lineWidth = 1;
    ctx.setLineDash([8, 5]);
    ctx.strokeRect(52, 52, 1096, 736);
    ctx.setLineDash([]);

    // Corner Filigree Brackets
    const drawCorner = (x: number, y: number, rot: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.fillStyle = '#1E252B';
      ctx.fillRect(-18, -18, 36, 4);
      ctx.fillRect(-18, -18, 4, 36);
      ctx.fillStyle = '#D95A47';
      ctx.beginPath();
      ctx.arc(-8, -8, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };
    drawCorner(44, 44, 0);
    drawCorner(1156, 44, Math.PI / 2);
    drawCorner(1156, 796, Math.PI);
    drawCorner(44, 796, -Math.PI / 2);

    // 3. Society Header & Official Inscriptions
    ctx.textAlign = 'center';
    ctx.fillStyle = '#D95A47';
    ctx.font = 'bold 15px "Courier New", monospace';
    ctx.fillText('THE ROYAL PACIFIC OCEANOGRAPHIC SOCIETY · EST. 2026', 600, 95);

    ctx.fillStyle = '#1E252B';
    ctx.font = 'bold 36px Georgia, "Times New Roman", serif';
    ctx.fillText('DIPLOMA OF BATHYMETRIC CONQUEST', 600, 142);

    ctx.fillStyle = '#626863';
    ctx.font = 'italic 16px Georgia, serif';
    ctx.fillText('This document solemnly attests and certifies that', 600, 180);

    // 4. Explorer Name in Large Engraved Script
    ctx.fillStyle = '#1E252B';
    ctx.font = 'bold 44px Georgia, "Times New Roman", serif';
    const displayExplorer = explorerName.trim() || 'Captain sm000ky';
    ctx.fillText(displayExplorer, 600, 240);

    // Calligraphic Underline Flourish with diamond center
    ctx.strokeStyle = '#D95A47';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(360, 255);
    ctx.lineTo(840, 255);
    ctx.stroke();

    ctx.fillStyle = '#D95A47';
    ctx.beginPath();
    ctx.moveTo(600, 249);
    ctx.lineTo(607, 255);
    ctx.lineTo(600, 261);
    ctx.lineTo(593, 255);
    ctx.fill();

    // 5. Formal Citation Narrative
    ctx.fillStyle = '#3E464F';
    ctx.font = 'italic 15px Georgia, serif';
    ctx.fillText(
      'having successfully piloted the bathyscaphe through the epipelagic, mesopelagic, and bathypelagic zones,',
      600,
      295
    );
    ctx.fillText(
      `has plunged down to -${terminalDepth.toLocaleString()} METERS into Challenger Deep, surviving 1,086 atmospheres of crushing pressure`,
      600,
      320
    );
    ctx.fillText(
      'and cataloguing the extraordinary living biodiversity of the Pacific Ocean basin.',
      600,
      345
    );

    // 6. Official Credentials Grid Box
    ctx.fillStyle = '#F4ECE1';
    ctx.strokeStyle = '#DEC6AE';
    ctx.lineWidth = 1.5;
    ctx.fillRect(150, 375, 900, 155);
    ctx.strokeRect(150, 375, 900, 155);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#626863';
    ctx.font = 'bold 11px "Courier New", monospace';
    ctx.fillText('HONORARY RANK BESTOWED:', 175, 410);
    ctx.fillText('TERMINAL DEPTH CONQUERED:', 175, 450);
    ctx.fillText('SPECIES CATALOGUED:', 175, 490);
    ctx.fillText('APOCRYPHAL RELICS UNCOVERED:', 175, 520);

    ctx.fillStyle = '#1E252B';
    ctx.font = 'bold 16px Georgia, serif';
    ctx.fillText(rankTitle, 395, 410);

    ctx.fillStyle = '#D95A47';
    ctx.font = 'bold 16px "Courier New", monospace';
    ctx.fillText(`-${terminalDepth.toLocaleString()} M (CHALLENGER DEEP)`, 395, 450);

    ctx.fillStyle = '#1E252B';
    ctx.font = 'bold 14px "Courier New", monospace';
    ctx.fillText(`${discoveredCount} of ${totalCount} Species (${percent}% Completed)`, 395, 490);

    ctx.fillStyle = '#B45309';
    ctx.font = 'bold 14px "Courier New", monospace';
    ctx.fillText(`${relicsCount} of ${totalRelics} Anomalies Classified`, 395, 520);

    // Right Column of Credentials
    ctx.fillStyle = '#626863';
    ctx.font = 'bold 11px "Courier New", monospace';
    ctx.fillText('HYDROSTATIC LOAD:', 680, 410);
    ctx.fillText('COORDINATES:', 680, 450);
    ctx.fillText('AUTHENTICATION:', 680, 490);
    ctx.fillText('VESSEL HULL:', 680, 520);

    ctx.fillStyle = '#1E252B';
    ctx.font = 'bold 14px "Courier New", monospace';
    ctx.fillText('1,086.0 ATM (15,960 PSI)', 825, 410);
    ctx.fillText("11°22'N · 142°35'E", 825, 450);
    ctx.fillStyle = '#2F6D68';
    ctx.fillText('VERIFIED // PASS', 825, 490);
    ctx.fillStyle = '#1E252B';
    ctx.fillText('DSV STRELIZIA (TI-GR23)', 825, 520);

    // 7. Authentic Rubber Ink Stamps in Corners
    // Stamp 1: Prussian Blue Survey Stamp (Tilted -12°)
    ctx.save();
    ctx.translate(130, 200);
    ctx.rotate(-0.21);
    ctx.strokeStyle = 'rgba(31, 78, 121, 0.85)';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(-65, -30, 130, 60);
    ctx.setLineDash([4, 2]);
    ctx.strokeRect(-60, -25, 120, 50);
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(31, 78, 121, 0.85)';
    ctx.textAlign = 'center';
    ctx.font = 'bold 9px "Courier New", monospace';
    ctx.fillText('★ PACIFIC OCEAN ★', 0, -8);
    ctx.font = 'bold 11px "Courier New", monospace';
    ctx.fillText('SURVEY VERIFIED', 0, 8);
    ctx.font = '8px "Courier New", monospace';
    ctx.fillText('-10,994M RECORD', 0, 20);
    ctx.restore();

    // Stamp 2: Vermilion Red Challenger Deep Stamp (Tilted +8°)
    ctx.save();
    ctx.translate(1070, 200);
    ctx.rotate(0.14);
    ctx.strokeStyle = 'rgba(185, 28, 28, 0.85)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(0, 0, 42, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([3, 2]);
    ctx.beginPath();
    ctx.arc(0, 0, 36, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(185, 28, 28, 0.85)';
    ctx.textAlign = 'center';
    ctx.font = 'bold 8px "Courier New", monospace';
    ctx.fillText('CHALLENGER DEEP', 0, -12);
    ctx.font = 'bold 13px Georgia, serif';
    ctx.fillText('10,994 M', 0, 5);
    ctx.font = '8px "Courier New", monospace';
    ctx.fillText('EXPEDITION 002', 0, 20);
    ctx.restore();

    // 8. Signatures & Real 3D Melted Wax Seal (Bottom Deck)
    // Left: sm000ky Signature
    ctx.textAlign = 'center';
    ctx.strokeStyle = '#1E252B';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(170, 710);
    ctx.lineTo(380, 710);
    ctx.stroke();

    ctx.fillStyle = '#1E252B';
    ctx.font = 'italic bold 24px "Brush Script MT", Georgia, cursive';
    ctx.fillText('sm000ky', 275, 698);
    ctx.fillStyle = '#626863';
    ctx.font = '11px "Courier New", monospace';
    ctx.fillText('sm000ky · Chief Expedition Architect', 275, 730);

    // Center: Authentic Embossed Crimson Wax Seal with Organic Melted Drips
    ctx.save();
    ctx.translate(600, 680);

    // Ribbon tails hanging down from seal
    ctx.fillStyle = '#991B1B';
    ctx.beginPath();
    ctx.moveTo(-18, 20);
    ctx.lineTo(-30, 85);
    ctx.lineTo(-14, 75);
    ctx.lineTo(-2, 85);
    ctx.lineTo(-6, 20);
    ctx.fill();

    ctx.fillStyle = '#B91C1C';
    ctx.beginPath();
    ctx.moveTo(6, 20);
    ctx.lineTo(2, 85);
    ctx.lineTo(14, 75);
    ctx.lineTo(30, 85);
    ctx.lineTo(18, 20);
    ctx.fill();

    // Organic Melted Wax Contour
    ctx.fillStyle = '#7F1D1D';
    ctx.beginPath();
    ctx.arc(0, 0, 50, 0, Math.PI * 2);
    ctx.fill();

    const waxGrad = ctx.createRadialGradient(-12, -12, 10, 0, 0, 48);
    waxGrad.addColorStop(0, '#EF4444');
    waxGrad.addColorStop(0.4, '#DC2626');
    waxGrad.addColorStop(0.85, '#B91C1C');
    waxGrad.addColorStop(1, '#991B1B');
    ctx.fillStyle = waxGrad;
    ctx.beginPath();
    ctx.arc(0, 0, 46, 0, Math.PI * 2);
    ctx.fill();

    // Inner Stamped Ring & Anchor Compass Emblem
    ctx.strokeStyle = '#FEE2E2';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 36, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#FEF2F2';
    ctx.font = 'bold 8px "Courier New", monospace';
    ctx.fillText('OFFICIAL EXPEDITION', 0, -22);
    ctx.fillText('SEAL', 0, -11);

    ctx.strokeStyle = '#FEF2F2';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(0, 8, 10, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, -2);
    ctx.lineTo(0, 18);
    ctx.moveTo(-8, 13);
    ctx.lineTo(8, 13);
    ctx.stroke();

    ctx.font = 'bold 8px "Courier New", monospace';
    ctx.fillText('-10,994M · 2026', 0, 29);
    ctx.restore();

    // Right: Zero Two Signature
    ctx.strokeStyle = '#1E252B';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(820, 710);
    ctx.lineTo(1030, 710);
    ctx.stroke();

    ctx.fillStyle = '#D95A47';
    ctx.font = 'italic bold 24px "Brush Script MT", Georgia, cursive';
    ctx.fillText('Zero Two (Code: 002)', 925, 698);
    ctx.fillStyle = '#626863';
    ctx.font = '11px "Courier New", monospace';
    ctx.fillText('Zero Two · Kokpit Imperial Co-Pilot', 925, 730);

    // Bottom Date & Serial
    ctx.fillStyle = '#8A968E';
    ctx.font = '10px "Courier New", monospace';
    ctx.fillText(
      `REGISTRATION: № PAC-10994-PELAGIA · ISSUED ON ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`,
      600,
      785
    );

    return canvas;
  };

  // High-Resolution PNG Download
  const handleDownloadPNG = () => {
    pelagiaAudio.playStampThud();
    setIsExporting(true);

    setTimeout(() => {
      try {
        const canvas = renderCertificateToCanvas();
        const dataUrl = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `pelagia-conquest-diploma-${explorerName.replace(/\s+/g, '_')}.png`;
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

  // Native Web Share API Progress Sharing
  const handleShareProgress = async () => {
    pelagiaAudio.playWaterBubble();
    const shareText = `🌊 I dove -10,994M into Challenger Deep, catalogued ${discoveredCount}/${totalCount} marine species and uncovered ${relicsCount}/${totalRelics} apocryphal relics on Pelagia! Here is my official expedition diploma:`;
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
          await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
          setCopiedToast(true);
          setTimeout(() => setCopiedToast(false), 3000);
        }
      });
    } catch {
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
        className="relative w-full max-w-4xl my-auto bg-[#FAF3E0] text-[#1E252B] border-4 border-[#1E252B] rounded-2xl p-4 sm:p-8 shadow-paper-lg paper-grain space-y-5 animate-in zoom-in-95 duration-300"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 sm:top-4 right-3 sm:right-4 p-1.5 rounded-lg border-2 border-[#1E252B] bg-[#FAF6EE] hover:bg-[#D95A47] hover:text-white transition-colors cursor-pointer shadow-paper-sm z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Custom Explorer Name Bar */}
        <div className="p-3 sm:p-4 rounded-xl bg-[#F4ECE1] border-2 border-[#1E252B] shadow-paper-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#1E252B]">
            <Edit3 className="w-4 h-4 text-[#D95A47]" />
            <span>CUSTOMIZE EXPLORER NAME:</span>
          </div>

          <div className="relative w-full sm:w-80">
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

        {/* The Physical Parchment Certificate Frame */}
        <div className="relative border-4 border-[#1E252B] p-5 sm:p-9 rounded-xl space-y-5 text-center bg-[#FDFBF7] shadow-inner overflow-hidden">
          {/* Inner Golden Trim & Dashed Line */}
          <div className="absolute inset-1.5 border-2 border-[#EAA838] pointer-events-none rounded-lg" />
          <div className="absolute inset-3 border border-dashed border-[#1E252B]/30 pointer-events-none rounded-lg" />

          {/* Rubber Stamps in Corners */}
          <div className="hidden sm:block absolute top-6 left-6 -rotate-12 pointer-events-none select-none">
            <div className="px-2.5 py-1.5 rounded border-2 border-[#1F4E79]/80 text-[#1F4E79]/80 font-mono text-[9px] font-bold tracking-widest text-center">
              <div>★ PACIFIC OCEAN ★</div>
              <div>SURVEY VERIFIED</div>
              <div className="text-[8px] font-normal">-10,994M RECORD</div>
            </div>
          </div>

          <div className="hidden sm:block absolute top-6 right-6 rotate-12 pointer-events-none select-none">
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#B91C1C]/80 text-[#B91C1C]/80 font-mono flex flex-col items-center justify-center text-[7.5px] font-bold">
              <span>CHALLENGER</span>
              <span className="font-serif text-[10px] font-bold text-[#B91C1C]">10,994M</span>
              <span>EXPEDITION</span>
            </div>
          </div>

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

          {/* Explorer Name Calligraphy on Parchment */}
          <div className="py-2">
            <div className="font-serif font-bold text-3xl sm:text-5xl text-[#1E252B] tracking-tight border-b-2 border-[#D95A47] pb-2 inline-block max-w-full px-4 break-words">
              {explorerName.trim() || 'Captain sm000ky'}
            </div>
          </div>

          {/* Formal Citation Body */}
          <p className="font-serif text-xs sm:text-sm leading-relaxed text-[#4B5563] italic max-w-xl mx-auto">
            "having successfully navigated the bathyscaphe through the epipelagic, mesopelagic, and bathypelagic zones, has plunged down to <strong className="text-[#1E252B] font-mono">-{terminalDepth.toLocaleString()} M</strong> into Challenger Deep, surviving 1,086 atmospheres of crushing hydrostatic load and cataloguing the living biodiversity of Earth's deepest frontier."
          </p>

          {/* Official Credentials Grid (Featuring Fauna + Apocryphal Relics!) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 font-mono text-xs text-left bg-[#F4ECE1] p-3.5 sm:p-5 rounded-xl border border-[#DEC6AE] shadow-paper-sm">
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
              <div className="text-[9px] sm:text-[10px] text-[#626863] uppercase">APOCRYPHAL RELICS:</div>
              <div className="font-bold text-[#B45309] text-xs sm:text-sm flex items-center gap-1.5">
                <span>{relicsCount} of {totalRelics} Uncovered</span>
                {relicsCount >= 8 && <span className="text-[10px] text-emerald-600 font-bold">★ ALL SECRETS SOLVED!</span>}
              </div>
            </div>
          </div>

          {/* Signatures & 3D Melted Wax Seal Row */}
          <div className="pt-4 border-t border-dashed border-[#1E252B]/20 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            {/* sm000ky Signature */}
            <div className="text-center sm:text-left space-y-0.5">
              <div className="font-serif italic font-bold text-lg text-[#1E252B]">sm000ky</div>
              <div className="w-36 h-[1.5px] bg-[#1E252B] mx-auto sm:mx-0" />
              <div className="text-[9px] text-[#626863]">Chief Expedition Architect</div>
            </div>

            {/* Interactive 3D Melted Wax Stamping Ceremony */}
            <div className="relative flex flex-col items-center">
              {/* Ribbon tails hanging down */}
              <div className="absolute top-8 flex gap-1 pointer-events-none">
                <div className="w-3.5 h-11 bg-[#B91C1C] -rotate-12 shadow-sm rounded-b" />
                <div className="w-3.5 h-11 bg-[#991B1B] rotate-12 shadow-sm rounded-b" />
              </div>

              {/* 3D Wax Seal Circle / Stamping Station */}
              <button
                onClick={handlePressWax}
                className={`relative z-10 w-16 h-16 rounded-full text-[#FEF2F2] border-2 shadow-md flex flex-col items-center justify-center font-bold text-[8px] transition-all cursor-pointer select-none active:scale-90 ${
                  isWaxPressed
                    ? relicsCount >= 8
                      ? 'bg-gradient-to-br from-[#FDE047] via-[#EAB308] to-[#A16207] border-[#78350F] text-[#78350F] shadow-[0_0_20px_rgba(234,179,8,0.5)] rotate-[-4deg]'
                      : 'bg-gradient-to-br from-[#EF4444] via-[#DC2626] to-[#7F1D1D] border-[#7F1D1D] rotate-[-4deg]'
                    : 'bg-[#991B1B]/80 border-dashed border-[#FCA5A5] animate-bounce shadow-lg'
                }`}
                title={isWaxPressed ? 'Click to re-stamp official wax seal' : 'Tap to press heavy brass stamp into molten wax!'}
              >
                {isWaxPressed ? (
                  <>
                    <span className="tracking-tighter">{relicsCount >= 8 ? 'SOVEREIGN' : 'OFFICIAL'}</span>
                    <span className="text-[10px]">{relicsCount >= 8 ? 'GOLD SEAL' : 'SEAL'}</span>
                    <span className="text-[7px] opacity-90">-10,994M</span>
                  </>
                ) : (
                  <>
                    <span className="text-xs">♨️</span>
                    <span className="text-[7px] font-mono tracking-tighter">PRESS STAMP</span>
                  </>
                )}
              </button>

              {!isWaxPressed && (
                <div className="mt-2 font-mono text-[9px] font-bold text-[#DC2626] animate-pulse">
                  TAP TO SEAL DIPLOMA
                </div>
              )}
            </div>

            {/* Zero Two Signature */}
            <div className="text-center sm:text-right space-y-0.5">
              <div className="font-serif italic font-bold text-lg text-[#D95A47]">Zero Two (002)</div>
              <div className="w-36 h-[1.5px] bg-[#D95A47] mx-auto sm:ml-auto" />
              <div className="text-[9px] text-[#626863]">Kokpit Imperial Co-Pilot</div>
            </div>
          </div>
        </div>

        {/* Certificate Actions Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
          <button
            onClick={handleDownloadPNG}
            disabled={isExporting}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#D95A47] hover:bg-[#E06D53] text-white font-mono text-xs font-bold transition-all shadow-paper cursor-pointer active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'GENERATING DIPLOMA...' : 'DOWNLOAD CERTIFICATE (PNG)'}</span>
          </button>

          <button
            onClick={handleShareProgress}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#2F6D68] hover:bg-[#3D857F] text-white font-mono text-xs font-bold transition-all shadow-paper cursor-pointer active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            <span>SHARE PROGRESS</span>
          </button>

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
          <div className="text-center font-mono text-xs font-bold text-emerald-700 bg-emerald-100 border border-emerald-300 p-2 rounded-lg animate-in fade-in duration-200">
            ✓ Expedition link & progress copied to clipboard! Ready to share.
          </div>
        )}
      </div>
    </div>
  );
};
