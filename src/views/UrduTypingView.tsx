import React, { useState, useMemo } from 'react';
import { Languages, BookOpen, Shuffle, HelpCircle, Award, Check } from 'lucide-react';
import { PageId, TestResult } from '../types';
import { TypingEngine } from '../components/TypingEngine';
import { 
  getRandomUrduParagraph, 
  getRandomUrduSentence, 
  getRandomUrduWords, 
  URDU_PARAGRAPHS 
} from '../data/urduTexts';
import { UrduKeyboardGuide } from '../components/UrduKeyboardGuide';

interface UrduTypingViewProps {
  onNavigate: (page: PageId) => void;
  onSetCertificateData: (result: TestResult) => void;
  soundEnabled: boolean;
}

export const UrduTypingView: React.FC<UrduTypingViewProps> = ({
  onNavigate,
  onSetCertificateData,
  soundEnabled,
}) => {
  const [subMode, setSubMode] = useState<'words' | 'sentences' | 'paragraphs'>('sentences');
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [timedMode, setTimedMode] = useState<number | null>(60);
  const [seed, setSeed] = useState<number>(0);
  const [showKeyGuide, setShowKeyGuide] = useState<boolean>(true);

  const targetText = useMemo(() => {
    void seed;
    if (subMode === 'words') {
      return getRandomUrduWords(difficulty, 30);
    } else if (subMode === 'sentences') {
      return `${getRandomUrduSentence(difficulty)} ${getRandomUrduSentence(difficulty)}`;
    } else {
      return getRandomUrduParagraph().text;
    }
  }, [subMode, difficulty, seed]);

  const handleRefresh = () => {
    setSeed((s) => s + 1);
  };

  return (
    <div className="space-y-6 py-2">
      {/* Urdu Section Header */}
      <div className="bg-[#0b1429] border border-emerald-900/40 rounded-3xl p-5 sm:p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
              <Languages className="w-6 h-6 text-emerald-400" />
              <span>اردو ٹائپنگ ٹیسٹ اور مشق (Urdu Typing)</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Test and elevate your Urdu typing speed with native RTL font rendering and phonetic key mapping.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {[
              { id: 'words', label: 'الفاظ (Words)' },
              { id: 'sentences', label: 'جملے (Sentences)' },
              { id: 'paragraphs', label: 'پیراگراف (Paragraphs)' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setSubMode(m.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  subMode === m.id
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
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
            {[
              { id: 'beginner', label: 'ابتدائی (Beginner)' },
              { id: 'intermediate', label: 'درمیانہ (Intermediate)' },
              { id: 'advanced', label: 'اعلیٰ (Advanced)' },
            ].map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => setDifficulty(lvl.id as any)}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  difficulty === lvl.id
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lvl.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider">Timer:</span>
            {[
              { val: null, label: 'بے وقت (Untimed)' },
              { val: 60, label: '1 منٹ (60s)' },
              { val: 180, label: '3 منٹ (180s)' },
            ].map((t) => (
              <button
                key={String(t.val)}
                onClick={() => setTimedMode(t.val)}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  timedMode === t.val
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}

            <button
              onClick={handleRefresh}
              title="نیا متن لوڈ کریں (New text)"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 ml-2"
            >
              <Shuffle className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Toggle guide button */}
        <div className="pt-2 flex justify-between items-center text-xs">
          <button
            onClick={() => setShowKeyGuide(!showKeyGuide)}
            className="text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-4"
          >
            {showKeyGuide ? 'فونوٹک کی بورڈ رہنمائی چھپائیں (Hide Guide)' : 'فونوٹک کی بورڈ رہنمائی دکھائیں (Show Keymap Guide)'}
          </button>
          <span className="text-slate-500 text-[11px]">
            اردو میں ٹائپ کرنے کے لیے اپنے کی بورڈ کو اردو پر سیٹ کریں
          </span>
        </div>
      </div>

      {/* Urdu Keymap Guide */}
      {showKeyGuide && (
        <UrduKeyboardGuide />
      )}

      {/* Interactive RTL Typing Engine */}
      <TypingEngine
        key={`urdu-${subMode}-${difficulty}-${timedMode}-${seed}`}
        targetText={targetText}
        language="urdu"
        durationSeconds={timedMode}
        mode="test"
        onRequestNewText={handleRefresh}
        onNavigateToCertificate={(res) => {
          onSetCertificateData(res);
          onNavigate('certificate');
        }}
        soundEnabled={soundEnabled}
        title="اردو ٹائپنگ سکرین"
        subtitle="آرام سے ٹائپ کرنا شروع کریں۔ پہلا حرف دبانے پر ٹائمر شروع ہو جائے گا۔"
      />
    </div>
  );
};
