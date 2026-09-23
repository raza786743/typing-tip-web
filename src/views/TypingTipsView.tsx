import React, { useState } from 'react';
import { BookOpen, Search, ArrowRight, Clock, Tag, CheckCircle2, Keyboard } from 'lucide-react';
import { TYPING_ARTICLES } from '../data/articles';
import { TipArticle, PageId } from '../types';

interface TypingTipsViewProps {
  onNavigate: (page: PageId) => void;
}

export const TypingTipsView: React.FC<TypingTipsViewProps> = ({ onNavigate }) => {
  const [selectedArticleId, setSelectedArticleId] = useState<string>(TYPING_ARTICLES[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredArticles = TYPING_ARTICLES.filter((art) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      art.title.toLowerCase().includes(q) ||
      art.summary.toLowerCase().includes(q) ||
      art.category.toLowerCase().includes(q)
    );
  });

  const activeArticle = TYPING_ARTICLES.find((a) => a.id === selectedArticleId) || TYPING_ARTICLES[0];

  return (
    <div className="space-y-8 py-2">
      {/* Hero Header */}
      <div className="bg-[#0b1429] border border-blue-900/40 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4" />
              <span>Typing Mastery Knowledgebase</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Typing Tips, Guides & Biomechanics
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Comprehensive articles and scientifically verified ergonomics to break speed barriers.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides & tips..."
              className="w-full px-4 py-2 pl-9 rounded-xl bg-[#091022] border border-blue-800/50 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          </div>
        </div>
      </div>

      {/* Interactive Finger Placement Diagram */}
      <div className="bg-[#0a1226] border border-blue-800/40 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Keyboard className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">Interactive Finger Placement Map (Home Row & Beyond)</h2>
          </div>
          <span className="text-xs text-cyan-300 font-semibold">Touch Typing Ergonomics</span>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Rest your fingers gently on the Home Row: Left hand on <strong className="text-white">A, S, D, F</strong> and right hand on <strong className="text-white">J, K, L, ;</strong>. Both index fingers rest on the tactile bumps of F and J.
        </p>

        {/* Finger Key Mapping Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-2 text-xs">
          <div className="bg-[#0f1d3d] p-3 rounded-xl border border-rose-500/30 text-center">
            <span className="text-[10px] uppercase font-bold text-rose-400">Left Pinky</span>
            <div className="text-base font-mono font-bold text-white mt-1">A, Q, Z</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Shift, Tab, Caps</div>
          </div>
          <div className="bg-[#0f1d3d] p-3 rounded-xl border border-amber-500/30 text-center">
            <span className="text-[10px] uppercase font-bold text-amber-400">Left Ring</span>
            <div className="text-base font-mono font-bold text-white mt-1">S, W, X</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Ring finger zone</div>
          </div>
          <div className="bg-[#0f1d3d] p-3 rounded-xl border border-emerald-500/30 text-center">
            <span className="text-[10px] uppercase font-bold text-emerald-400">Left Middle</span>
            <div className="text-base font-mono font-bold text-white mt-1">D, E, C</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Middle column</div>
          </div>
          <div className="bg-[#0f1d3d] p-3 rounded-xl border border-cyan-500/30 text-center">
            <span className="text-[10px] uppercase font-bold text-cyan-400">Left Index</span>
            <div className="text-base font-mono font-bold text-white mt-1">F, G, R, T, V, B</div>
            <div className="text-[10px] text-slate-400 mt-0.5">F Tactile Bump</div>
          </div>
          <div className="bg-[#0f1d3d] p-3 rounded-xl border border-cyan-500/30 text-center">
            <span className="text-[10px] uppercase font-bold text-cyan-400">Right Index</span>
            <div className="text-base font-mono font-bold text-white mt-1">J, H, U, Y, M, N</div>
            <div className="text-[10px] text-slate-400 mt-0.5">J Tactile Bump</div>
          </div>
          <div className="bg-[#0f1d3d] p-3 rounded-xl border border-emerald-500/30 text-center">
            <span className="text-[10px] uppercase font-bold text-emerald-400">Right Middle</span>
            <div className="text-base font-mono font-bold text-white mt-1">K, I, ,</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Middle column</div>
          </div>
          <div className="bg-[#0f1d3d] p-3 rounded-xl border border-amber-500/30 text-center">
            <span className="text-[10px] uppercase font-bold text-amber-400">Right Ring</span>
            <div className="text-base font-mono font-bold text-white mt-1">L, O, .</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Ring finger zone</div>
          </div>
          <div className="bg-[#0f1d3d] p-3 rounded-xl border border-rose-500/30 text-center">
            <span className="text-[10px] uppercase font-bold text-rose-400">Right Pinky</span>
            <div className="text-base font-mono font-bold text-white mt-1">;, P, /</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Enter, Backspace</div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout: Sidebar of Articles + Active Article Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Article Nav List */}
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 mb-2">
            All Guides ({filteredArticles.length})
          </div>

          <div className="space-y-1.5">
            {filteredArticles.map((art) => {
              const isSelected = art.id === activeArticle.id;
              return (
                <div
                  key={art.id}
                  onClick={() => setSelectedArticleId(art.id)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg'
                      : 'bg-[#0b1428] border-blue-900/30 text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-semibold text-blue-400">{art.category}</span>
                    <span className="text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {art.readTime}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold leading-snug">{art.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{art.summary}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Article Full Content */}
        <div className="lg:col-span-2 bg-[#0b1429] border border-blue-900/40 rounded-3xl p-6 sm:p-10 space-y-6 shadow-xl">
          <div className="space-y-3 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 text-xs font-bold border border-blue-500/30">
                {activeArticle.category}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {activeArticle.readTime}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {activeArticle.title}
            </h2>

            <p className="text-sm text-slate-300 italic border-l-2 border-cyan-400 pl-3">
              {activeArticle.summary}
            </p>
          </div>

          {/* Article Body Paragraphs */}
          <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-normal">
            {activeArticle.content.map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Callout action at bottom of article */}
          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-white">Put this technique into practice:</div>
              <p className="text-xs text-slate-400">Experience real-time biometric speed tracking.</p>
            </div>
            <button
              onClick={() => onNavigate('test')}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30 flex items-center gap-2"
            >
              <span>Take a Speed Test</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
