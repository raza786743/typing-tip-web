import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  Shuffle, 
  Globe2, 
  Languages, 
  Layers, 
  FileText, 
  AlignLeft, 
  BookOpenCheck 
} from 'lucide-react';
import { Language, PracticeDifficulty, PracticeFormat, PageId, TestResult } from '../types';
import { TypingEngine } from '../components/TypingEngine';
import { 
  ENGLISH_PARAGRAPHS, 
  getRandomParagraph, 
  getRandomSentence, 
  getRandomWords 
} from '../data/englishTexts';
import { 
  getRandomUrduParagraph, 
  getRandomUrduSentence, 
  getRandomUrduWords 
} from '../data/urduTexts';
import { UrduKeyboardGuide } from '../components/UrduKeyboardGuide';

interface PracticeViewProps {
  onNavigate: (page: PageId) => void;
  soundEnabled: boolean;
}

export const PracticeView: React.FC<PracticeViewProps> = ({ onNavigate, soundEnabled }) => {
  const [language, setLanguage] = useState<Language>('english');
  const [difficulty, setDifficulty] = useState<PracticeDifficulty>('beginner');
  const [format, setFormat] = useState<PracticeFormat>('words');
  const [seed, setSeed] = useState<number>(0);
  const [showUrduGuide, setShowUrduGuide] = useState<boolean>(false);

  const targetText = useMemo(() => {
    void seed;

    if (language === 'english') {
      if (format === 'words') {
        const count = difficulty === 'beginner' ? 25 : difficulty === 'intermediate' ? 35 : 50;
        return getRandomWords(difficulty, count);
      } else if (format === 'sentences') {
        return `${getRandomSentence(difficulty)} ${getRandomSentence(difficulty)}`;
      } else {
        return getRandomParagraph().text;
      }
    } else {
      // Urdu
      if (format === 'words') {
        const count = difficulty === 'beginner' ? 20 : difficulty === 'intermediate' ? 30 : 40;
        return getRandomUrduWords(difficulty, count);
      } else if (format === 'sentences') {
        return `${getRandomUrduSentence(difficulty)} ${getRandomUrduSentence(difficulty)}`;
      } else {
        return getRandomUrduParagraph().text;
      }
    }
  }, [language, difficulty, format, seed]);

  const handleRefresh = () => {
    setSeed((s) => s + 1);
  };

  return (
    <div className="space-y-6 py-2">
      {/* Configuration Header */}
      <div className="bg-[#0b1429] border border-blue-900/40 rounded-3xl p-5 sm:p-6 shadow-xl space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-cyan-400" />
              <span>Adaptive Typing Practice</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Untimed relaxed environment to build kinetic muscle memory and master difficult letter patterns.
            </p>
          </div>

          {/* Language Switch */}
          <div className="flex items-center gap-2 bg-[#091022] p-1.5 rounded-2xl border border-blue-900/40 self-start md:self-auto">
            <button
              onClick={() => {
                setLanguage('english');
                setShowUrduGuide(false);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                language === 'english'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>English</span>
            </button>
            <button
              onClick={() => setLanguage('urdu')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                language === 'urdu'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              <span>اردو (Urdu)</span>
            </button>
          </div>
        </div>

        {/* Difficulty and Format Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Difficulty Level */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              Difficulty Level
            </div>
            <div className="flex items-center gap-2">
              {[
                { id: 'beginner', label: 'Beginner', desc: 'Home row & short words' },
                { id: 'intermediate', label: 'Intermediate', desc: 'Everyday vocabulary' },
                { id: 'advanced', label: 'Advanced', desc: 'Complex terms & syntax' },
              ].map((lvl) => (
                <button
                  key={lvl.id}
                  onClick={() => setDifficulty(lvl.id as PracticeDifficulty)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                    difficulty === lvl.id
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/50'
                  }`}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
          </div>

          {/* Format (Words, Sentences, Paragraphs) */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              Practice Format
            </div>
            <div className="flex items-center gap-2">
              {[
                { id: 'words', label: 'Random Words' },
                { id: 'sentences', label: 'Sentences' },
                { id: 'paragraphs', label: 'Paragraphs' },
              ].map((fmt) => (
                <button
                  key={fmt.id}
                  onClick={() => setFormat(fmt.id as PracticeFormat)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                    format === fmt.id
                      ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/50'
                  }`}
                >
                  {fmt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {language === 'urdu' && (
          <div className="pt-2">
            <button
              onClick={() => setShowUrduGuide(!showUrduGuide)}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
            >
              {showUrduGuide ? 'Hide Urdu Keyboard Guide' : 'Open Urdu Phonetic Keyboard Reference'}
            </button>
          </div>
        )}
      </div>

      {language === 'urdu' && showUrduGuide && (
        <UrduKeyboardGuide />
      )}

      {/* Typing Engine in Untimed Practice Mode */}
      <TypingEngine
        key={`practice-${language}-${difficulty}-${format}-${seed}`}
        targetText={targetText}
        language={language}
        durationSeconds={null}
        mode="practice"
        onRequestNewText={handleRefresh}
        soundEnabled={soundEnabled}
        title={`${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} ${format.charAt(0).toUpperCase() + format.slice(1)} Practice`}
        subtitle="Take your time to type cleanly. Keep accuracy above 96%."
      />
    </div>
  );
};
