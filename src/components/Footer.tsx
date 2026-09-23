import React from 'react';
import { Keyboard, Heart, ShieldCheck, Zap, Globe, Github } from 'lucide-react';
import { PageId } from '../types';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#060b18] border-t border-blue-900/30 text-slate-400 text-sm mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => handleNav('home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-[2px] shadow-lg shadow-blue-500/20">
                <div className="w-full h-full bg-[#0b1329] rounded-[10px] flex items-center justify-center">
                  <Keyboard className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Typing <span className="text-blue-500">Tip</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The premier, 100% free, static typing speed and accuracy mastery platform. Designed for both desktop and mobile users with dedicated English and Urdu typing engines, certifications, and real-time biometric analytics.
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-950/70 border border-blue-800/40 text-blue-300 font-medium">
                <Zap className="w-3 h-3 text-cyan-400" />
                Cloudflare Pages Ready
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-800/40 text-emerald-300 font-medium">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                100% Client-Side Privacy
              </span>
            </div>
          </div>

          {/* Column 1: Core Testing */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Tests & Practice
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('test')} className="hover:text-blue-400 transition-colors">
                  Typing Speed Test (30s - 5m)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('practice')} className="hover:text-blue-400 transition-colors">
                  Adaptive Practice Mode
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('english')} className="hover:text-blue-400 transition-colors">
                  English Words & Sentences
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('urdu')} className="hover:text-blue-400 transition-colors flex items-center gap-1">
                  <span>اردو ٹائپنگ (Urdu RTL)</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('daily')} className="hover:text-blue-400 transition-colors">
                  Daily Typing Challenge
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('games')} className="hover:text-blue-400 transition-colors">
                  Typing Arcade Games
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Tools & Certs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Tools & Features
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('wpm-calculator')} className="hover:text-blue-400 transition-colors">
                  WPM Calculator Tool
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('certificate')} className="hover:text-blue-400 transition-colors">
                  Generate Typing Certificate
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('dashboard')} className="hover:text-blue-400 transition-colors">
                  Progress Analytics Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('tips')} className="hover:text-blue-400 transition-colors">
                  Touch Typing Guides
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('urdu')} className="hover:text-blue-400 transition-colors">
                  Urdu Phonetic Keymap
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Guides & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Company & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-blue-400 transition-colors">
                  About Typing Tip
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-blue-400 transition-colors">
                  Contact & Support
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('privacy')} className="hover:text-blue-400 transition-colors">
                  Privacy Policy (No Cookies/DB)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('terms')} className="hover:text-blue-400 transition-colors">
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-1 text-slate-500">
            <span>© {currentYear} Typing Tip. All rights reserved. Free & Open.</span>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span className="flex items-center gap-1">
              Crafted for fast fingers <Heart className="w-3 h-3 text-rose-500 inline fill-rose-500" />
            </span>
            <span>•</span>
            <span>Zero paid backend required</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
