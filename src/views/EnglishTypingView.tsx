import React, { useState, useMemo } from 'react';
import { Globe2, AlignLeft, FileText, Shuffle, CheckCircle, Award } from 'lucide-react';
import { PageId, TestResult } from '../types';
import { TypingEngine } from '../components/TypingEngine';
import { 
  ENGLISH_PARAGRAPHS, 
  getRandomParagraph, 
  getRandomSentence, 
  getRandomWords 
} from '../data/englishTexts';

interface EnglishTypingViewProps {
  onNavigate: (page: PageId) => void;
  onSetCertificateData: (result: TestResult) => void;
  soundEnabled: boolean;
}

export const EnglishTypingView: React.FC<EnglishTypingViewProps> = ({
  onNavigate,
  onSetCertificateData,
  soundEnabled,
}) => {
  const [subMode, setSubMode] = useState<'words' | 'sentences' | 'paragraphs'>('words');
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [timedMode, setTimedMode] = useState<number | null>(60);
  const [seed, setSeed] = useState<number>(0);

  const targetText = useMemo(() => {
    void seed;
    if (subMode === 'words') {
      return getRandomWords(difficulty, 45);
    } else if (subMode === 'sentences') {
      return `${getRandomSentence(difficulty)} ${getRandomSentence(difficulty)} ${getRandomSentence('beginner')}`;
    } else {
      return getRandomParagraph().text;
    }
  }, [subMode, difficulty, seed]);

  const handleRefresh = () => {
    setSeed((s) => s + 1);
  };

  return (
    <div className="space-y-6 py-2">
      {/* Header */}
      <div className="bg-[#0b1429] border border-blue-900/40 rounded-3xl p-5 sm:p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
              <Globe2 className="w-6 h-6 text-blue-400" />
              <span>English Typing Lab</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Master English typography, high-frequency N-grams, punctuation, and prose.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {[
              { id: 'words', label: 'Words' },
              { id: 'sentences', label: 'Sentences' },
              { id: 'paragraphs', label: 'Paragraphs' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setSubMode(m.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  subMode === m.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Options Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider">Level:</span>
            {(['beginner', 'intermediate', 'advanced'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setDifficulty(lvl)}
                className={`px-3 py-1 rounded-lg capitalize font-medium transition-all ${
                  difficulty === lvl
                    ? 'bg-blue-500/20 text-cyan-300 border border-blue-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider">Pacing:</span>
            {[
              { val: null, label: 'Untimed' },
              { val: 60, label: '60s Sprint' },
              { val: 180, label: '3m Endurance' },
            ].map((t) => (
              <button
                key={String(t.val)}
                onClick={() => setTimedMode(t.val)}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  timedMode === t.val
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}

            <button
              onClick={handleRefresh}
              title="New random excerpt"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 ml-2"
            >
              <Shuffle className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Typing Engine */}
      <TypingEngine
        key={`eng-${subMode}-${difficulty}-${timedMode}-${seed}`}
        targetText={targetText}
        language="english"
        durationSeconds={timedMode}
        mode="test"
        onRequestNewText={handleRefresh}
        onNavigateToCertificate={(res) => {
          onSetCertificateData(res);
          onNavigate('certificate');
        }}
        soundEnabled={soundEnabled}
      />
    </div>
  );
};
