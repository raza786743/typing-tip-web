import React from 'react';
import { ShieldCheck, Lock, EyeOff, HardDrive, CheckCircle2 } from 'lucide-react';
import { PageId } from '../types';

interface PrivacyViewProps {
  onNavigate: (page: PageId) => void;
}

export const PrivacyView: React.FC<PrivacyViewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8 py-2 max-w-4xl mx-auto text-slate-300 text-xs sm:text-sm leading-relaxed">
      <div className="bg-[#0b1429] border border-blue-900/40 rounded-3xl p-6 sm:p-10 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase text-xs tracking-wider">
          <ShieldCheck className="w-5 h-5" />
          <span>Commitment to User Privacy</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Privacy Policy</h1>
        <p className="text-xs text-slate-400">Effective Date: September 2026</p>
      </div>

      <div className="bg-[#0a1226] border border-blue-900/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <section className="space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-cyan-400" />
            <span>1. Local Storage Only Architecture</span>
          </h2>
          <p>
            Typing Tip is designed from the ground up as an offline-first, client-side static web application. We do not operate remote databases, user tracking servers, or telemetry collectors.
          </p>
          <p>
            All test history, Words Per Minute records, accuracy scores, settings, and daily challenge streaks are stored exclusively on your own machine using your browser's <code className="bg-slate-900 px-2 py-0.5 rounded text-cyan-300 font-mono">localStorage</code>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-emerald-400" />
            <span>2. No Cookies or Third-Party Analytics Trackers</span>
          </h2>
          <p>
            We do not use advertising cookies, marketing pixels, or third-party behavioral profiling services. Your typing keystrokes are never transmitted across the network.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-400" />
            <span>3. Certificate Generation Security</span>
          </h2>
          <p>
            When you enter your name to generate a typing proficiency certificate, the certificate image is drawn directly on an HTML5 canvas inside your local browser tab. No names or test results are transmitted to external servers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">4. User Control & Data Deletion</h2>
          <p>
            You retain absolute ownership and control of your records. You can permanently wipe all stored history at any time by visiting the <strong className="text-white">Progress Dashboard</strong> and clicking the "Clear History" button, or by clearing your browser cache.
          </p>
        </section>
      </div>
    </div>
  );
};
