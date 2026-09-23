import React, { useState, useMemo } from 'react';
import { Timer, Globe2, Languages, RotateCcw, Shuffle, Sparkles, Award } from 'lucide-react';
import { Language, TestDuration, TestResult, PageId } from '../types';
import { TypingEngine } from '../components/TypingEngine';
import { getRandomParagraph, getRandomSentence, getRandomWords } from '../data/englishTexts';
import { getRandomUrduParagraph, getRandomUrduSentence, getRandomUrduWords } from '../data/urduTexts';
import { UrduKeyboardGuide } from '../components/UrduKeyboardGuide';

interface TypingTestViewProps {
  onNavigate: (page: PageId) => void;
  onSetCertificateData: (result: TestResult) => void;
  soundEnabled: boolean;
}

export const TypingTestView: React.FC<TypingTestViewProps> = ({
  onNavigate,
  onSetCertificateData,
  soundEnabled,
}) => {
  const [duration, setDuration] = useState<TestDuration>(60);
  const [language, setLanguage] = useState<Language>('english');
  const [textType, setTextType] = useState<'paragraph' | 'sentence' | 'words'>('paragraph');
  const [seed, setSeed] = useState<number>(0);
  const [showUrduKeymap, setShowUrduKeymap] = useState<boolean>(false);

  // Generate target text dynamically based on duration, language, and type
  const targetText = useMemo(() => {
    // Seed dependency ensures refresh
    void seed;

    if (language === 'english') {
      if (textType === 'paragraph') {
        const p = getRandomParagraph();
        return p.text;
      } else if (textType === 'sentence') {
        return `${getRandomSentence('intermediate')} ${getRandomSentence('advanced')} ${getRandomSentence('beginner')}`;
      } else {
        const wordCount = duration <= 30 ? 40 : duration <= 60 ? 70 : 150;
        return getRandomWords('intermediate', wordCount);
      }
    } else {
      // Urdu
      if (textType === 'paragraph') {
        const p = getRandomUrduParagraph();
        return p.text;
      } else if (textType === 'sentence') {
        return `${getRandomUrduSentence('intermediate')} ${getRandomUrduSentence('advanced')} ${getRandomUrduSentence('beginner')}`;
      } else {
        const wordCount = duration <= 30 ? 30 : duration <= 60 ? 55 : 120;
        return getRandomUrduWords('intermediate', wordCount);
      }
    }
  }, [language, textType, duration, seed]);

  const handleRefreshText = () => {
    setSeed((prev) => prev + 1);
  };

  const handleCompleteTest = (result: TestResult) => {
    // Test completed, stats automatically stored
  };

  const handleGenerateCertificate = (result: TestResult) => {
    onSetCertificateData(result);
    onNavigate('certificate');
  };

  return (
    <div className="space-y-6 py-2">
      {/* Test Controls Header */}
      <div className="bg-[#0b1429] border border-blue-900/40 rounded-3xl p-5 sm:p-6 shadow-xl space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
              <Timer className="w-6 h-6 text-cyan-400" />
              <span>Official Typing Speed Test</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Select your time limit and language. Timer begins automatically upon your first keystroke.
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-[#091022] p-1.5 rounded-2xl border border-blue-900/40 self-start md:self-auto">
            <button
              id="lang-english-btn"
              onClick={() => {
                setLanguage('english');
                setShowUrduKeymap(false);
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
              id="lang-urdu-btn"
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

        {/* Duration Pills and Content Type Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Durations */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Test Duration
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {[
                { sec: 30, label: '30 Seconds' },
                { sec: 60, label: '1 Minute' },
                { sec: 180, label: '3 Minutes' },
                { sec: 300, label: '5 Minutes' },
              ].map((item) => (
                <button
                  key={item.sec}
                  id={`duration-${item.sec}`}
                  onClick={() => setDuration(item.sec as TestDuration)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    duration === item.sec
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-blue-500/25 scale-105'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white border border-slate-700/50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Text Style Filter */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Text Format
            </div>
            <div className="flex items-center gap-2">
              {[
                { type: 'paragraph', label: 'Paragraphs' },
                { type: 'sentence', label: 'Sentences' },
                { type: 'words', label: 'Random Words' },
              ].map((style) => (
                <button
                  key={style.type}
                  onClick={() => setTextType(style.type as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    textType === style.type
                      ? 'bg-blue-900/60 text-cyan-300 border border-blue-500/40'
                      : 'bg-slate-900/50 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {style.label}
                </button>
              ))}

              <button
                onClick={handleRefreshText}
                title="Shuffle new text sample"
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                aria-label="Refresh text"
              >
                <Shuffle className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Toggle Urdu Keymap if Urdu selected */}
        {language === 'urdu' && (
          <div className="pt-2">
            <button
              onClick={() => setShowUrduKeymap(!showUrduKeymap)}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 underline underline-offset-4"
            >
              <span>{showUrduKeymap ? 'Hide Urdu Keyboard Guide' : 'Show Urdu Phonetic Keyboard Layout (رہنمائی)'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Urdu Keyboard Guide Accordion */}
      {language === 'urdu' && showUrduKeymap && (
        <UrduKeyboardGuide />
      )}

      {/* Interactive Typing Engine */}
      <TypingEngine
        key={`engine-${language}-${duration}-${seed}`}
        targetText={targetText}
        language={language}
        durationSeconds={duration}
        mode="test"
        onComplete={handleCompleteTest}
        onRequestNewText={handleRefreshText}
        onNavigateToCertificate={handleGenerateCertificate}
        soundEnabled={soundEnabled}
      />
    </div>
  );
};
