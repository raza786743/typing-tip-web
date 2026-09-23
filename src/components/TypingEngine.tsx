import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { 
  RotateCcw, 
  Play, 
  Award, 
  Timer as TimerIcon, 
  CheckCircle2, 
  AlertCircle, 
  Zap, 
  ArrowRight,
  Maximize2,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { Language, TestResult, TestDuration } from '../types';
import { calculateAccuracy, calculateWpm, formatTime, playKeySound } from '../utils/typingCalculations';
import { saveTestResult } from '../utils/storage';

interface TypingEngineProps {
  targetText: string;
  language: Language;
  durationSeconds?: number | null; // null for untimed practice
  mode?: 'test' | 'practice' | 'daily' | 'game';
  onComplete?: (result: TestResult) => void;
  onRequestNewText?: () => void;
  onNavigateToCertificate?: (result: TestResult) => void;
  soundEnabled?: boolean;
  title?: string;
  subtitle?: string;
}

export const TypingEngine: React.FC<TypingEngineProps> = ({
  targetText,
  language,
  durationSeconds = 60,
  mode = 'test',
  onComplete,
  onRequestNewText,
  onNavigateToCertificate,
  soundEnabled = true,
  title,
  subtitle,
}) => {
  const [typed, setTyped] = useState<string>('');
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(durationSeconds || 60);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const activeCharRef = useRef<HTMLSpanElement>(null);

  const isRtl = language === 'urdu';
  const isTimed = durationSeconds !== null && durationSeconds > 0;

  // Reset state when target text changes
  const resetEngine = useCallback(() => {
    setTyped('');
    setIsStarted(false);
    setIsFinished(false);
    setTimeRemaining(durationSeconds || 60);
    setElapsedSeconds(0);
    setTestResult(null);
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  }, [durationSeconds]);

  useEffect(() => {
    resetEngine();
  }, [targetText, durationSeconds, resetEngine]);

  // Focus input automatically on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Scroll cursor smoothly into view
  useEffect(() => {
    if (activeCharRef.current && textContainerRef.current) {
      const container = textContainerRef.current;
      const charElem = activeCharRef.current;
      const containerRect = container.getBoundingClientRect();
      const charRect = charElem.getBoundingClientRect();

      if (charRect.bottom > containerRect.bottom - 20 || charRect.top < containerRect.top + 20) {
        charElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [typed.length]);

  // Real-time character classification
  const { correctChars, incorrectChars, totalChars } = useMemo(() => {
    let correct = 0;
    let incorrect = 0;
    const len = typed.length;
    for (let i = 0; i < len; i++) {
      if (i < targetText.length) {
        if (typed[i] === targetText[i]) {
          correct++;
        } else {
          incorrect++;
        }
      } else {
        incorrect++;
      }
    }
    return {
      correctChars: correct,
      incorrectChars: incorrect,
      totalChars: len,
    };
  }, [typed, targetText]);

  // Accuracy calculation
  const accuracy = useMemo(() => {
    return calculateAccuracy(correctChars, totalChars);
  }, [correctChars, totalChars]);

  // Live WPM calculation
  const { grossWpm, netWpm } = useMemo(() => {
    const timeToUse = isTimed 
      ? Math.max(1, elapsedSeconds) 
      : Math.max(1, elapsedSeconds);
    return calculateWpm(totalChars, incorrectChars, timeToUse);
  }, [totalChars, incorrectChars, elapsedSeconds, isTimed]);

  // Finish test callback
  const handleFinish = useCallback(() => {
    setIsFinished(true);
    setIsStarted(false);

    const totalTimeUsed = isTimed ? (durationSeconds! - timeRemaining) || 1 : Math.max(1, elapsedSeconds);
    const { grossWpm: finalGross, netWpm: finalNet } = calculateWpm(totalChars, incorrectChars, totalTimeUsed);
    const finalAccuracy = calculateAccuracy(correctChars, totalChars);

    const result: TestResult = {
      id: 'res-' + Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      timestamp: Date.now(),
      language,
      mode: (mode || 'test') as 'test' | 'practice' | 'daily' | 'game',
      durationSeconds: durationSeconds || totalTimeUsed,
      elapsedSeconds: totalTimeUsed,
      wpm: finalNet,
      grossWpm: finalGross,
      accuracy: finalAccuracy,
      totalKeystrokes: totalChars,
      correctCharacters: correctChars,
      incorrectCharacters: incorrectChars,
      errorCount: incorrectChars,
    };

    setTestResult(result);
    saveTestResult(result);
    if (onComplete) {
      onComplete(result);
    }
  }, [
    isTimed, 
    durationSeconds, 
    timeRemaining, 
    elapsedSeconds, 
    totalChars, 
    incorrectChars, 
    correctChars, 
    language, 
    mode, 
    onComplete
  ]);

  // Timer Tick Hook
  useEffect(() => {
    if (!isStarted || isFinished) return;

    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);

      if (isTimed) {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            handleFinish();
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isStarted, isFinished, isTimed, handleFinish]);

  // Handle typing input
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isFinished) return;

    const val = e.target.value;
    
    // Start test on first key stroke
    if (!isStarted && val.length > 0) {
      setIsStarted(true);
    }

    // Play tactile sound
    if (val.length > typed.length) {
      const lastTypedChar = val[val.length - 1];
      const targetChar = targetText[val.length - 1];
      const isCorrect = lastTypedChar === targetChar;
      playKeySound(isCorrect ? 'correct' : 'error', soundEnabled);
    }

    setTyped(val);

    // If typed reaches or exceeds target text in practice or untimed mode
    if (val.length >= targetText.length) {
      handleFinish();
    }
  };

  const handleContainerClick = () => {
    if (inputRef.current && !isFinished) {
      inputRef.current.focus();
    }
  };

  // Progress percentage
  const progressPercent = Math.min(100, Math.round((typed.length / targetText.length) * 100));

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Header Info (Optional) */}
      {(title || subtitle) && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            {title && <h2 className="text-lg sm:text-xl font-bold text-white">{title}</h2>}
            {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
          </div>
          {isRtl && (
            <span className="self-start sm:self-auto px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Urdu RTL Active
            </span>
          )}
        </div>
      )}

      {/* Live Stats HUD Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#0a1329] p-3 sm:p-4 rounded-2xl border border-blue-900/40 shadow-lg">
        {/* Timer */}
        <div className="flex items-center gap-3 bg-[#0f1d3d]/70 px-3 py-2.5 rounded-xl border border-blue-800/30">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
            <TimerIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              {isTimed ? 'Time Remaining' : 'Elapsed Time'}
            </div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-white">
              {isTimed ? formatTime(timeRemaining) : formatTime(elapsedSeconds)}
            </div>
          </div>
        </div>

        {/* Live Net WPM */}
        <div className="flex items-center gap-3 bg-[#0f1d3d]/70 px-3 py-2.5 rounded-xl border border-blue-800/30">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Live Net WPM
            </div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-cyan-400">
              {netWpm}
            </div>
          </div>
        </div>

        {/* Accuracy */}
        <div className="flex items-center gap-3 bg-[#0f1d3d]/70 px-3 py-2.5 rounded-xl border border-blue-800/30">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Accuracy
            </div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-emerald-400">
              {accuracy}%
            </div>
          </div>
        </div>

        {/* Errors */}
        <div className="flex items-center gap-3 bg-[#0f1d3d]/70 px-3 py-2.5 rounded-xl border border-blue-800/30">
          <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Errors
            </div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-rose-400">
              {incorrectChars}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-150"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Interactive Text Display & Hidden Input Box */}
      <div 
        id="typing-container"
        onClick={handleContainerClick}
        className={`relative cursor-text rounded-2xl p-5 sm:p-7 min-h-[200px] sm:min-h-[240px] max-h-[380px] overflow-y-auto transition-all duration-200 ${
          isFocused 
            ? 'bg-[#0a1226] border-2 border-blue-500 shadow-xl shadow-blue-500/10 ring-4 ring-blue-500/10' 
            : 'bg-[#091022] border border-blue-900/40 hover:border-blue-700/50'
        }`}
        ref={textContainerRef}
      >
        {/* Helper Badge when not focused */}
        {!isFocused && !isFinished && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-900/40 text-[11px] text-blue-300 font-medium border border-blue-700/30 animate-pulse pointer-events-none">
            <Play className="w-3 h-3 text-cyan-400" />
            Click or tap here to type
          </div>
        )}

        {/* Hidden Input field capturing hardware and virtual Android/iOS keyboards */}
        <textarea
          ref={inputRef}
          value={typed}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={isFinished}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          dir={isRtl ? 'rtl' : 'ltr'}
          aria-label="Typing input field"
          className="absolute opacity-0 w-full h-full top-0 left-0 cursor-text resize-none pointer-events-auto"
        />

        {/* Rendered Text Characters with precision coloring */}
        <div 
          dir={isRtl ? 'rtl' : 'ltr'}
          className={`select-none leading-relaxed tracking-wide text-lg sm:text-2xl ${
            isRtl ? 'font-urdu leading-[2.6rem]' : 'font-mono'
          }`}
        >
          {targetText.split('').map((char, index) => {
            const isTyped = index < typed.length;
            const isCurrent = index === typed.length;
            let statusColor = 'text-slate-500'; // pending/untyped

            if (isTyped) {
              if (typed[index] === char) {
                statusColor = 'text-cyan-300 font-semibold';
              } else {
                statusColor = 'text-rose-400 bg-rose-950/60 rounded px-0.5 underline decoration-rose-500 decoration-2';
              }
            }

            return (
              <span
                key={index}
                ref={isCurrent ? activeCharRef : null}
                className={`relative inline-block transition-colors duration-75 ${statusColor} ${
                  isCurrent ? 'bg-blue-600/30 text-white rounded px-0.5 border-b-2 border-cyan-400 animate-pulse' : ''
                }`}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            );
          })}
        </div>
      </div>

      {/* Control Buttons (Restart, New Text, Sound) */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2">
          <button
            id="restart-test-btn"
            onClick={resetEngine}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700/60 transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4 text-cyan-400" />
            Restart Test
          </button>

          {onRequestNewText && (
            <button
              id="new-prompt-btn"
              onClick={onRequestNewText}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 bg-blue-950/50 hover:bg-blue-900/60 hover:text-white border border-blue-800/40 transition-all active:scale-95"
            >
              <ArrowRight className="w-4 h-4 text-blue-400" />
              New Text
            </button>
          )}
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-2">
          <span className="hidden sm:inline">Press</span>
          <kbd className="px-2 py-0.5 text-[10px] font-mono bg-slate-800 border border-slate-700 rounded text-slate-300">
            Esc
          </kbd>
          <span className="hidden sm:inline">or Restart button to reset</span>
        </div>
      </div>

      {/* Test Completion Modal */}
      {isFinished && testResult && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#0b1429] border border-blue-700/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
            {/* Ambient decorative glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-600/20 rounded-full blur-3xl pointer-events-none" />

            {/* Modal Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-[2px] shadow-lg shadow-blue-500/30">
                <div className="w-full h-full bg-[#0b1429] rounded-[14px] flex items-center justify-center">
                  <Award className="w-7 h-7 text-cyan-400" />
                </div>
              </div>
              <h3 className="text-2xl font-extrabold text-white">Test Completed!</h3>
              <p className="text-xs text-slate-400">
                Fantastic effort! Here is your official typing performance breakdown:
              </p>
            </div>

            {/* Main Score Highlights */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0f1d3d] border border-blue-800/40 rounded-2xl p-4 text-center">
                <div className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                  Net Speed
                </div>
                <div className="text-4xl font-extrabold font-mono text-cyan-400 mt-1">
                  {testResult.wpm}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">Words Per Minute</div>
              </div>

              <div className="bg-[#0f1d3d] border border-blue-800/40 rounded-2xl p-4 text-center">
                <div className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                  Accuracy
                </div>
                <div className="text-4xl font-extrabold font-mono text-emerald-400 mt-1">
                  {testResult.accuracy}%
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">Target: 95%+</div>
              </div>
            </div>

            {/* Detailed Stats Breakdown */}
            <div className="bg-slate-900/60 rounded-xl p-3.5 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Gross WPM (Raw Speed):</span>
                <span className="font-mono font-bold text-white">{testResult.grossWpm} WPM</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Time Taken:</span>
                <span className="font-mono font-bold text-white">{testResult.elapsedSeconds}s</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Total Keystrokes:</span>
                <span className="font-mono font-bold text-white">{testResult.totalKeystrokes}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Correct Characters:</span>
                <span className="font-mono font-bold text-emerald-400">{testResult.correctCharacters}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Incorrect Characters / Errors:</span>
                <span className="font-mono font-bold text-rose-400">{testResult.errorCount}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              {onNavigateToCertificate && (
                <button
                  id="modal-certificate-btn"
                  onClick={() => onNavigateToCertificate(testResult)}
                  className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Award className="w-4 h-4 text-amber-300" />
                  Generate Downloadable Certificate
                </button>
              )}

              <div className="flex gap-3">
                <button
                  id="modal-retry-btn"
                  onClick={resetEngine}
                  className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 transition-all"
                >
                  Try Again
                </button>

                {onRequestNewText && (
                  <button
                    id="modal-next-btn"
                    onClick={() => {
                      onRequestNewText();
                      resetEngine();
                    }}
                    className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-all"
                  >
                    Next Prompt
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
