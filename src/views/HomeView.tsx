import React from 'react';
import { 
  Timer, 
  Flame, 
  Gamepad2, 
  Globe2, 
  Languages, 
  Award, 
  BarChart3, 
  BookOpen, 
  Calculator, 
  CheckCircle2, 
  ArrowRight,
  Zap,
  TrendingUp,
  ShieldCheck,
  Smartphone
} from 'lucide-react';
import { PageId, UserStats } from '../types';

interface HomeViewProps {
  onNavigate: (page: PageId) => void;
  stats: UserStats;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, stats }) => {
  return (
    <div className="space-y-16 py-4">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#0e1b38] via-[#0b152d] to-[#080e1e] border border-blue-900/50 p-6 sm:p-12 lg:p-16 text-center shadow-2xl">
        {/* Ambient Glows */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/80 border border-blue-700/40 text-blue-300 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Fast, Free & 100% Client-Side Typing Mastery</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Master Keyboard Velocity with <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-300 bg-clip-text text-transparent">Typing Tip</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Test your speed, master touch typing in both English and Urdu, tackle daily challenges, play typing games, and generate verified downloadable typing certificates.
          </p>

          {/* Primary CTA - Start Typing Test */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="hero-start-test-btn"
              onClick={() => onNavigate('test')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-extrabold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-xl shadow-blue-500/30 flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 group"
            >
              <Timer className="w-5 h-5 text-cyan-200 group-hover:animate-spin" />
              <span>Start Typing Test</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="hero-urdu-btn"
              onClick={() => onNavigate('urdu')}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl text-sm font-bold text-slate-200 bg-[#0f1d3d] hover:bg-blue-900/40 border border-blue-800/40 hover:border-blue-600/60 flex items-center justify-center gap-2.5 transition-all active:scale-95"
            >
              <Languages className="w-4 h-4 text-emerald-400" />
              <span>اردو ٹائپنگ ٹیسٹ (Urdu RTL)</span>
            </button>
          </div>

          {/* Quick Stats Banner if user has taken tests */}
          {stats.totalTests > 0 && (
            <div className="pt-6">
              <div className="inline-flex flex-wrap items-center justify-center gap-6 px-6 py-3 rounded-2xl bg-blue-950/40 border border-blue-800/30 text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                  Your Best: <strong className="text-white font-mono">{stats.bestWpm} WPM</strong>
                </span>
                <span className="hidden sm:inline text-slate-600">•</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Accuracy: <strong className="text-white font-mono">{stats.bestAccuracy}%</strong>
                </span>
                <span className="hidden sm:inline text-slate-600">•</span>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="text-blue-400 hover:text-cyan-300 underline underline-offset-4 font-semibold"
                >
                  View Full Analytics ({stats.totalTests} tests)
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Quick Test Duration Selectors */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Timer className="w-5 h-5 text-blue-400" />
              Quick Speed Tests
            </h2>
            <p className="text-xs text-slate-400">Choose your preferred assessment duration</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { duration: '30s', label: '30 Seconds', desc: 'Fast sprint test', icon: '⚡' },
            { duration: '1m', label: '1 Minute', desc: 'Standard benchmark', icon: '⏱️' },
            { duration: '3m', label: '3 Minutes', desc: 'Endurance test', icon: '🎯' },
            { duration: '5m', label: '5 Minutes', desc: 'Professional certification', icon: '🏆' },
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => onNavigate('test')}
              className="bg-[#0b1428] hover:bg-[#0f1d3d] border border-blue-900/40 hover:border-blue-500/60 rounded-2xl p-5 cursor-pointer transition-all duration-200 hover:-translate-y-1 group shadow-lg"
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                {item.label}
              </div>
              <div className="text-xs text-slate-400 mt-1">{item.desc}</div>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-blue-400 group-hover:translate-x-1 transition-transform">
                <span>Start Now</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Feature Cards Grid */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Everything You Need to Master Typing
          </h2>
          <p className="text-sm text-slate-400">
            A comprehensive, all-in-one suite designed for students, developers, and professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1: Typing Practice */}
          <div
            onClick={() => onNavigate('practice')}
            className="bg-[#0a1226] border border-blue-900/40 hover:border-blue-500/60 rounded-2xl p-6 cursor-pointer group transition-all duration-200 hover:-translate-y-1 shadow-lg"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
              Adaptive Practice Mode
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Drill beginner, intermediate, and advanced levels with random words, real sentences, and paragraphs.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-blue-400">
              <span>Open Practice</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Urdu Typing */}
          <div
            onClick={() => onNavigate('urdu')}
            className="bg-[#0a1226] border border-blue-900/40 hover:border-emerald-500/60 rounded-2xl p-6 cursor-pointer group transition-all duration-200 hover:-translate-y-1 shadow-lg"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Languages className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center gap-2">
              <span>اردو ٹائپنگ (Urdu RTL)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed font-urdu text-[13px]">
              اردو الفاظ، جملے، پیراگراف اور فونوٹک کی بورڈ کے ساتھ اپنی اردو ٹائپنگ کی رفتار کو جانچیں۔
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
              <span>Start Urdu Test</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Daily Challenge */}
          <div
            onClick={() => onNavigate('daily')}
            className="bg-[#0a1226] border border-blue-900/40 hover:border-amber-500/60 rounded-2xl p-6 cursor-pointer group transition-all duration-200 hover:-translate-y-1 shadow-lg"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center mb-4 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
              Daily Typing Challenge
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              A fresh, inspiring quote or passage every calendar day. Build your daily streak and earn top rank.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-amber-400">
              <span>Take Today's Challenge</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4: Typing Games */}
          <div
            onClick={() => onNavigate('games')}
            className="bg-[#0a1226] border border-blue-900/40 hover:border-purple-500/60 rounded-2xl p-6 cursor-pointer group transition-all duration-200 hover:-translate-y-1 shadow-lg"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
              Typing Arcade Games
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Speed Challenge, 100% Accuracy Precision Sprint, and the high-octane 60-Second Blitz with combo multipliers.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-purple-400">
              <span>Play Games</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 5: Certificate */}
          <div
            onClick={() => onNavigate('certificate')}
            className="bg-[#0a1226] border border-blue-900/40 hover:border-cyan-500/60 rounded-2xl p-6 cursor-pointer group transition-all duration-200 hover:-translate-y-1 shadow-lg"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center mb-4 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
              Downloadable Certificates
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Receive an official high-resolution, print-ready certificate showing your verified WPM, accuracy, and name.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-cyan-400">
              <span>Create Certificate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 6: WPM Calculator */}
          <div
            onClick={() => onNavigate('wpm-calculator')}
            className="bg-[#0a1226] border border-blue-900/40 hover:border-indigo-500/60 rounded-2xl p-6 cursor-pointer group transition-all duration-200 hover:-translate-y-1 shadow-lg"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Calculator className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
              WPM Speed Calculator
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Enter words typed and time taken to calculate Gross WPM, Net WPM, and accuracy using international standard formulas.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-indigo-400">
              <span>Use Calculator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* Typing Speed Benchmarks Table */}
      <section className="bg-[#0a1329] border border-blue-900/40 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white">Typing Speed Standards & Percentiles</h3>
            <p className="text-xs text-slate-400">How do your Words Per Minute compare globally?</p>
          </div>
          <button
            onClick={() => onNavigate('tips')}
            className="text-xs text-blue-400 hover:text-cyan-300 font-semibold self-start sm:self-auto flex items-center gap-1"
          >
            <span>Read Touch Typing Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#0f1d3d] p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Beginner</span>
            <div className="text-2xl font-bold font-mono text-slate-300 mt-1">10 - 25 WPM</div>
            <p className="text-xs text-slate-400 mt-1.5">Sight typist (hunt-and-peck). Typical for beginners.</p>
          </div>
          <div className="bg-[#0f1d3d] p-4 rounded-xl border border-blue-900/40">
            <span className="text-[10px] font-bold uppercase text-blue-400 tracking-wider">Average</span>
            <div className="text-2xl font-bold font-mono text-blue-300 mt-1">35 - 45 WPM</div>
            <p className="text-xs text-slate-400 mt-1.5">Standard typist. Sufficient for everyday office work.</p>
          </div>
          <div className="bg-[#0f1d3d] p-4 rounded-xl border border-cyan-900/40">
            <span className="text-[10px] font-bold uppercase text-cyan-400 tracking-wider">Advanced</span>
            <div className="text-2xl font-bold font-mono text-cyan-300 mt-1">60 - 80 WPM</div>
            <p className="text-xs text-slate-400 mt-1.5">Fluent touch typist. Well above average productivity.</p>
          </div>
          <div className="bg-[#0f1d3d] p-4 rounded-xl border border-emerald-900/40">
            <span className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider">Master</span>
            <div className="text-2xl font-bold font-mono text-emerald-300 mt-1">90 - 120+ WPM</div>
            <p className="text-xs text-slate-400 mt-1.5">Top 1% elite keyboard speed. Competitive level.</p>
          </div>
        </div>
      </section>

      {/* Trust & Cloudflare Ready Callout */}
      <section className="bg-gradient-to-r from-blue-950/40 via-[#0b1428] to-indigo-950/40 border border-blue-800/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Zero Tracking • 100% Free • Private</span>
          </div>
          <h3 className="text-xl font-bold text-white">Ready for Cloudflare Pages Deployment</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Typing Tip runs completely in your browser with zero external databases or subscription fees. All your test progress is stored securely on your device using localStorage.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigate('tips')}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            Typing Tips & Drills
          </button>
          <button
            onClick={() => onNavigate('test')}
            className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30 transition-all"
          >
            Start Test Now
          </button>
        </div>
      </section>
    </div>
  );
};
