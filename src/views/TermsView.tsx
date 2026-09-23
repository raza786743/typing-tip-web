import React from 'react';
import { FileText, CheckCircle2, ShieldAlert } from 'lucide-react';
import { PageId } from '../types';

interface TermsViewProps {
  onNavigate: (page: PageId) => void;
}

export const TermsView: React.FC<TermsViewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8 py-2 max-w-4xl mx-auto text-slate-300 text-xs sm:text-sm leading-relaxed">
      <div className="bg-[#0b1429] border border-blue-900/40 rounded-3xl p-6 sm:p-10 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-blue-400 font-bold uppercase text-xs tracking-wider">
          <FileText className="w-5 h-5" />
          <span>Platform Terms</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Terms of Service</h1>
        <p className="text-xs text-slate-400">Last Revised: September 2026</p>
      </div>

      <div className="bg-[#0a1226] border border-blue-900/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing or using Typing Tip, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please discontinue using the service.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">2. Free & Educational Purpose</h2>
          <p>
            Typing Tip is provided free of charge for educational, personal, and professional skill enhancement. The typing tests, practice modules, calculations, and certificates are designed to provide accurate metrics following international 5-character typing formulas.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">3. Certificate Usage</h2>
          <p>
            Typing certificates generated via the Typing Tip certificate tool are provided for self-assessment, personal achievement, and educational demonstration. While tests adhere to standard WPM calculations, Typing Tip is not a government agency.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">4. Disclaimer of Warranties</h2>
          <p>
            Typing Tip is provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied.
          </p>
        </section>
      </div>
    </div>
  );
};
