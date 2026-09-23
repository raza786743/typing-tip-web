import React, { useState, useEffect, useRef } from 'react';
import { Award, Download, Printer, CheckCircle, RefreshCw, User, Sparkles, ArrowRight } from 'lucide-react';
import { PageId, TestResult } from '../types';
import { downloadCertificate, generateCertificateCanvas } from '../utils/certificateGenerator';
import { getStoredSettings, saveStoredSettings } from '../utils/storage';

interface CertificateViewProps {
  initialResult?: TestResult | null;
  onNavigate: (page: PageId) => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  initialResult,
  onNavigate,
}) => {
  const settings = getStoredSettings();
  const [recipientName, setRecipientName] = useState<string>(settings.userName || 'Master Typist');
  const [wpm, setWpm] = useState<number>(initialResult?.wpm || 65);
  const [accuracy, setAccuracy] = useState<number>(initialResult?.accuracy || 98);
  const [dateStr, setDateStr] = useState<string>(
    initialResult?.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  // Re-draw canvas whenever state changes
  useEffect(() => {
    const canvas = generateCertificateCanvas({
      name: recipientName,
      wpm,
      accuracy,
      date: dateStr,
      certificateId: `TM-${Math.abs(wpm * 1337 + accuracy * 42).toString(36).toUpperCase()}`,
    });

    if (canvasRef.current) {
      const displayCtx = canvasRef.current.getContext('2d');
      if (displayCtx) {
        canvasRef.current.width = canvas.width;
        canvasRef.current.height = canvas.height;
        displayCtx.drawImage(canvas, 0, 0);
      }
    }
  }, [recipientName, wpm, accuracy, dateStr]);

  const handleNameChange = (name: string) => {
    setRecipientName(name);
    saveStoredSettings({ userName: name });
  };

  const handleDownload = () => {
    downloadCertificate({
      name: recipientName,
      wpm,
      accuracy,
      date: dateStr,
    });
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handlePrint = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL();
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Typing Tip Certificate - ${recipientName}</title>
            <style>
              body { margin: 0; display: flex; align-items: center; justify-content: center; background: #000; height: 100vh; }
              img { max-width: 100%; max-height: 100vh; object-fit: contain; }
            </style>
          </head>
          <body>
            <img src="${dataUrl}" onload="window.print();window.close();" />
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="space-y-8 py-2 max-w-5xl mx-auto">
      {/* Title & Customization Box */}
      <div className="bg-[#0b1429] border border-blue-900/40 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Typing Tip Official Certification</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Official Typing Proficiency Certificate
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Personalize your recipient name and instantly generate a verified, high-resolution PNG certificate.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              id="download-cert-btn"
              onClick={handleDownload}
              className="px-6 py-3 rounded-xl text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-blue-500/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>{downloadSuccess ? 'Downloaded!' : 'Download Certificate (PNG)'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 flex items-center gap-2 transition-colors"
            >
              <Printer className="w-4 h-4 text-slate-400" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Customization Inputs Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          {/* Recipient Name */}
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-bold uppercase text-slate-300 block">
              Recipient Name on Certificate
            </label>
            <div className="relative">
              <input
                id="cert-name-input"
                type="text"
                value={recipientName}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-2.5 rounded-xl bg-[#091022] border border-blue-800/50 focus:border-cyan-400 text-white font-semibold text-sm focus:outline-none"
              />
              <User className="w-4 h-4 text-slate-500 absolute right-3 top-3" />
            </div>
          </div>

          {/* WPM */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-slate-300 block">
              Net Speed (WPM)
            </label>
            <input
              type="number"
              min="1"
              max="250"
              value={wpm}
              onChange={(e) => setWpm(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#091022] border border-blue-800/50 focus:border-cyan-400 text-white font-mono font-bold text-sm focus:outline-none"
            />
          </div>

          {/* Accuracy */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-slate-300 block">
              Accuracy (%)
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={accuracy}
              onChange={(e) => setAccuracy(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#091022] border border-blue-800/50 focus:border-emerald-400 text-white font-mono font-bold text-sm focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Live Certificate Canvas Preview */}
      <div className="bg-[#080d1a] border border-blue-900/40 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col items-center">
        <div className="text-xs text-slate-400 mb-3 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>High-Definition Live Preview (1600 x 1100 px Print-Ready Resolution)</span>
        </div>

        <div className="w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl border border-blue-950">
          <canvas
            ref={canvasRef}
            className="w-full h-auto object-contain block bg-[#0a1226]"
          />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleDownload}
            className="px-8 py-3.5 rounded-xl font-extrabold text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/30 flex items-center gap-2 transition-all hover:scale-105"
          >
            <Download className="w-4 h-4" />
            <span>Download High-Resolution PNG</span>
          </button>
          <button
            onClick={() => onNavigate('test')}
            className="px-6 py-3.5 rounded-xl font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 flex items-center gap-2 transition-colors"
          >
            <span>Take Another Test to Boost Score</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
