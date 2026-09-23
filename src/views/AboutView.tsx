import React from 'react';
import { Keyboard, Zap, ShieldCheck, Heart, Award, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PageId } from '../types';

interface AboutViewProps {
  onNavigate: (page: PageId) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12 py-2 max-w-4xl mx-auto">
      {/* Title */}
      <div className="bg-[#0b1429] border border-blue-900/40 rounded-3xl p-6 sm:p-10 shadow-xl space-y-4 text-center">
        <div className="w-14 h-14 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center mx-auto mb-2">
          <Keyboard className="w-7 h-7 text-cyan-400" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">About Typing Tip</h1>
        <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Typing Tip is an open, high-performance, 100% free static typing proficiency application designed to help learners and professionals reach peak keyboard velocity.
        </p>
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0a1226] border border-blue-900/40 rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Lightning Fast & Static</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Built as a modern, zero-backend static single-page application. Ready for global edge deployment on Cloudflare Pages with near-instant cold loads.
          </p>
        </div>

        <div className="bg-[#0a1226] border border-blue-900/40 rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">100% Client-Side Privacy</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            No remote trackers, no paid databases, and no cloud loggers. All typing history and personal records stay strictly inside your browser's local storage.
          </p>
        </div>

        <div className="bg-[#0a1226] border border-blue-900/40 rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Dual English & Urdu RTL</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Dedicated dual engine with native support for English and Urdu with authentic RTL font ligatures and phonetic keyboard mappings.
          </p>
        </div>
      </div>

      {/* Speed Philosophy */}
      <div className="bg-[#0b1429] border border-blue-900/40 rounded-3xl p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-bold text-white">The Touch Typing Philosophy</h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Typing is not merely about pressing keys; it is the bridge between human intention and digital creation. Whether you are coding software, writing essays, drafting legal briefs, or messaging loved ones, typing speed removes cognitive friction.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Standardized 5-character word metrics</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Certified downloadable PNG badges</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Daily deterministic challenge engine</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Responsive touch input for Android & iOS</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <button
          onClick={() => onNavigate('test')}
          className="px-8 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/30 inline-flex items-center gap-2"
        >
          <span>Begin Your Typing Journey</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
