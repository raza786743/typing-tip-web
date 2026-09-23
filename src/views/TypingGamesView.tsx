import React, { useState, useEffect, useRef } from 'react';
import { 
  Gamepad2, 
  Zap, 
  Target, 
  Timer, 
  RotateCcw, 
  Trophy, 
  Flame, 
  CheckCircle, 
  AlertTriangle,
  Play
} from 'lucide-react';
import { PageId, TestResult } from '../types';
import { playKeySound } from '../utils/typingCalculations';
import { saveTestResult } from '../utils/storage';

interface TypingGamesViewProps {
  onNavigate: (page: PageId) => void;
  onSetCertificateData: (result: TestResult) => void;
  soundEnabled: boolean;
}

type ActiveGame = 'speed' | 'accuracy' | 'blitz';

const WORD_BANK = [
  "stream", "rapid", "typing", "focus", "velocity", "keyboard", "master",
  "screen", "action", "rhythm", "motion", "energy", "future", "signal",
  "charge", "blitz", "matrix", "smooth", "strike", "reflex", "hyper",
  "system", "pulse", "target", "vision", "impact", "power", "swift"
];

export const TypingGamesView: React.FC<TypingGamesViewProps> = ({
  onNavigate,
  onSetCertificateData,
  soundEnabled,
}) => {
  const [activeGame, setActiveGame] = useState<ActiveGame>('speed');

  // Game 1: Speed Challenge State
  const [speedCurrentWord, setSpeedCurrentWord] = useState<string>('');
  const [speedInput, setSpeedInput] = useState<string>('');
  const [speedScore, setSpeedScore] = useState<number>(0);
  const [speedWordsCompleted, setSpeedWordsCompleted] = useState<number>(0);
  const [speedTimeLeft, setSpeedTimeLeft] = useState<number>(45);
  const [speedIsRunning, setSpeedIsRunning] = useState<boolean>(false);
  const [speedStreak, setSpeedStreak] = useState<number>(0);

  // Game 2: Accuracy Challenge State
  const [accTargetText, setAccTargetText] = useState<string>(
    "Precision is the foundation of digital mastery. One clean stroke outshines ten rushed errors."
  );
  const [accTyped, setAccTyped] = useState<string>('');
  const [accErrors, setAccErrors] = useState<number>(0);
  const [accIsRunning, setAccIsRunning] = useState<boolean>(false);
  const [accFinished, setAccFinished] = useState<boolean>(false);
  const [accTimeElapsed, setAccTimeElapsed] = useState<number>(0);

  // Game 3: 60-Second Blitz State
  const [blitzText, setBlitzText] = useState<string>(
    "The lightning sprint begins now. Keep your fingers hovering gently over the home row. Breathe steadily and let muscle memory guide every single keystroke. Speed without control is chaos, but swift accuracy is pure art. Push past your previous limits and type until the final second expires."
  );
  const [blitzTyped, setBlitzTyped] = useState<string>('');
  const [blitzTimeLeft, setBlitzTimeLeft] = useState<number>(60);
  const [blitzIsRunning, setBlitzIsRunning] = useState<boolean>(false);
  const [blitzFinished, setBlitzFinished] = useState<boolean>(false);

  const speedInputRef = useRef<HTMLInputElement>(null);
  const accInputRef = useRef<HTMLTextAreaElement>(null);
  const blitzInputRef = useRef<HTMLTextAreaElement>(null);

  // --- Speed Rush Logic ---
  const getRandomGameWord = () => {
    return WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)];
  };

  const startSpeedGame = () => {
    setSpeedScore(0);
    setSpeedWordsCompleted(0);
    setSpeedStreak(0);
    setSpeedTimeLeft(45);
    setSpeedCurrentWord(getRandomGameWord());
    setSpeedInput('');
    setSpeedIsRunning(true);
    setTimeout(() => speedInputRef.current?.focus(), 100);
  };

  useEffect(() => {
    if (!speedIsRunning) return;
    const timer = setInterval(() => {
      setSpeedTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          setSpeedIsRunning(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [speedIsRunning]);

  const handleSpeedInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    setSpeedInput(e.target.value);

    if (val.toLowerCase() === speedCurrentWord.toLowerCase()) {
      playKeySound('correct', soundEnabled);
      const bonus = Math.floor(speedStreak / 3) * 50;
      setSpeedScore((s) => s + 100 + bonus);
      setSpeedStreak((str) => str + 1);
      setSpeedWordsCompleted((w) => w + 1);
      setSpeedCurrentWord(getRandomGameWord());
      setSpeedInput('');
    }
  };

  // --- Accuracy Precision Logic ---
  const startAccuracyGame = () => {
    setAccTyped('');
    setAccErrors(0);
    setAccTimeElapsed(0);
    setAccFinished(false);
    setAccIsRunning(true);
    setTimeout(() => accInputRef.current?.focus(), 100);
  };

  useEffect(() => {
    if (!accIsRunning || accFinished) return;
    const timer = setInterval(() => {
      setAccTimeElapsed((t) => t + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [accIsRunning, accFinished]);

  const handleAccInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.length > accTyped.length) {
      const lastIndex = val.length - 1;
      const isCorrect = val[lastIndex] === accTargetText[lastIndex];
      playKeySound(isCorrect ? 'correct' : 'error', soundEnabled);
      if (!isCorrect) {
        setAccErrors((err) => err + 1);
      }
    }
    setAccTyped(val);

    if (val.length >= accTargetText.length) {
      setAccFinished(true);
      setAccIsRunning(false);
    }
  };

  const accAccuracy = accTyped.length > 0
    ? Math.max(0, Math.round(((accTyped.length - accErrors) / accTyped.length) * 100))
    : 100;

  // --- 60-Second Blitz Logic ---
  const startBlitzGame = () => {
    setBlitzTyped('');
    setBlitzTimeLeft(60);
    setBlitzFinished(false);
    setBlitzIsRunning(true);
    setTimeout(() => blitzInputRef.current?.focus(), 100);
  };

  useEffect(() => {
    if (!blitzIsRunning || blitzFinished) return;
    const timer = setInterval(() => {
      setBlitzTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          setBlitzFinished(true);
          setBlitzIsRunning(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [blitzIsRunning, blitzFinished]);

  const handleBlitzChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.length > blitzTyped.length) {
      playKeySound('correct', soundEnabled);
    }
    setBlitzTyped(val);
  };

  const blitzWordsTyped = Math.round(blitzTyped.length / 5);

  return (
    <div className="space-y-6 py-2">
      {/* Game Header with Game Mode Tabs */}
      <div className="bg-[#0b1429] border border-blue-900/40 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
              <Gamepad2 className="w-6 h-6 text-purple-400" />
              <span>Typing Arcade Games</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Test your reflexes, accuracy, and endurance with high-intensity challenges.
            </p>
          </div>

          {/* Game Selectors */}
          <div className="flex items-center gap-2 bg-[#080e1e] p-1.5 rounded-2xl border border-blue-900/40">
            <button
              onClick={() => setActiveGame('speed')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeGame === 'speed'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-cyan-300" />
              <span>Speed Challenge</span>
            </button>
            <button
              onClick={() => setActiveGame('accuracy')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeGame === 'accuracy'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Target className="w-3.5 h-3.5 text-emerald-300" />
              <span>Accuracy Challenge</span>
            </button>
            <button
              onClick={() => setActiveGame('blitz')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeGame === 'blitz'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Timer className="w-3.5 h-3.5 text-amber-300" />
              <span>60s Challenge</span>
            </button>
          </div>
        </div>
      </div>

      {/* GAME 1: SPEED CHALLENGE */}
      {activeGame === 'speed' && (
        <div className="bg-[#0b1429] border border-blue-800/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                Mode 1 • Word Rush
              </span>
              <h2 className="text-2xl font-bold text-white">Speed Challenge</h2>
              <p className="text-xs text-slate-400">
                Type each word as quickly as you can before time expires. Maintain streaks for combo bonus points!
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-[#0f1d3d] px-4 py-2 rounded-xl border border-blue-800/40 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-400">Timer</div>
                <div className="text-2xl font-mono font-bold text-cyan-400">{speedTimeLeft}s</div>
              </div>
              <div className="bg-[#0f1d3d] px-4 py-2 rounded-xl border border-blue-800/40 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-400">Score</div>
                <div className="text-2xl font-mono font-bold text-amber-400">{speedScore}</div>
              </div>
              <div className="bg-[#0f1d3d] px-4 py-2 rounded-xl border border-blue-800/40 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-400">Streak</div>
                <div className="text-2xl font-mono font-bold text-emerald-400">{speedStreak}x</div>
              </div>
            </div>
          </div>

          {!speedIsRunning && speedTimeLeft === 45 && (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center mx-auto">
                <Zap className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Ready for the Speed Rush?</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                You will have 45 seconds to type as many words as possible. Type cleanly without errors to compound your combo streak.
              </p>
              <button
                onClick={startSpeedGame}
                className="px-8 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
              >
                Start Speed Challenge
              </button>
            </div>
          )}

          {speedIsRunning && (
            <div className="space-y-6 text-center py-6">
              <div className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                Type This Word:
              </div>
              <div className="text-5xl sm:text-6xl font-extrabold font-mono text-cyan-300 tracking-wider animate-pulse">
                {speedCurrentWord}
              </div>

              <div className="max-w-md mx-auto">
                <input
                  ref={speedInputRef}
                  type="text"
                  value={speedInput}
                  onChange={handleSpeedInputChange}
                  placeholder="Type word here..."
                  autoFocus
                  className="w-full text-center text-2xl font-mono px-4 py-3 rounded-xl bg-[#091022] border-2 border-blue-500 focus:border-cyan-400 text-white focus:outline-none shadow-lg shadow-blue-500/20"
                />
              </div>

              <div className="text-xs text-slate-400">
                Words Completed: <strong className="text-white">{speedWordsCompleted}</strong>
              </div>
            </div>
          )}

          {!speedIsRunning && speedTimeLeft === 0 && (
            <div className="text-center py-8 space-y-4 bg-slate-900/50 rounded-2xl border border-slate-800 p-6">
              <Trophy className="w-12 h-12 text-amber-400 mx-auto" />
              <h3 className="text-2xl font-bold text-white">Challenge Complete!</h3>
              <div className="text-4xl font-extrabold font-mono text-cyan-400">{speedScore} Points</div>
              <p className="text-xs text-slate-400">
                You successfully typed {speedWordsCompleted} words with a max streak of {speedStreak}x!
              </p>
              <button
                onClick={startSpeedGame}
                className="px-6 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500"
              >
                Play Again
              </button>
            </div>
          )}
        </div>
      )}

      {/* GAME 2: ACCURACY PRECISION CHALLENGE */}
      {activeGame === 'accuracy' && (
        <div className="bg-[#0b1429] border border-emerald-800/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Mode 2 • Precision Striker
              </span>
              <h2 className="text-2xl font-bold text-white">Accuracy Challenge</h2>
              <p className="text-xs text-slate-400">
                Maintain 95%+ accuracy. Every typo penalizes your precision score.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-[#0f1d3d] px-4 py-2 rounded-xl border border-emerald-800/40 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-400">Accuracy</div>
                <div className={`text-2xl font-mono font-bold ${accAccuracy >= 95 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {accAccuracy}%
                </div>
              </div>
              <div className="bg-[#0f1d3d] px-4 py-2 rounded-xl border border-emerald-800/40 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-400">Errors</div>
                <div className="text-2xl font-mono font-bold text-rose-400">{accErrors}</div>
              </div>
            </div>
          </div>

          {!accIsRunning && !accFinished && (
            <div className="text-center py-10 space-y-4">
              <Target className="w-14 h-14 text-emerald-400 mx-auto" />
              <h3 className="text-xl font-bold text-white">Test Your Precision</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Type the passage below with zero or minimal mistakes. Focus deeply on rhythm and correct fingers.
              </p>
              <button
                onClick={startAccuracyGame}
                className="px-8 py-3.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/30 transition-all hover:scale-105"
              >
                Start Precision Drill
              </button>
            </div>
          )}

          {accIsRunning && (
            <div className="space-y-4">
              <div className="bg-[#091022] p-5 rounded-2xl border border-emerald-900/40 text-lg sm:text-xl font-mono leading-relaxed">
                {accTargetText.split('').map((char, i) => {
                  let clr = 'text-slate-500';
                  if (i < accTyped.length) {
                    clr = accTyped[i] === char ? 'text-emerald-300 font-bold' : 'text-rose-400 bg-rose-950/80 underline';
                  } else if (i === accTyped.length) {
                    clr = 'text-white border-b-2 border-emerald-400 bg-emerald-500/20';
                  }
                  return <span key={i} className={clr}>{char}</span>;
                })}
              </div>

              <textarea
                ref={accInputRef}
                value={accTyped}
                onChange={handleAccInputChange}
                rows={3}
                placeholder="Type the passage above with precision..."
                className="w-full p-4 rounded-xl bg-[#091022] border-2 border-emerald-500/50 focus:border-emerald-400 font-mono text-white text-base focus:outline-none"
              />
            </div>
          )}

          {accFinished && (
            <div className="text-center py-6 space-y-3 bg-slate-900/60 rounded-2xl border border-slate-800 p-6">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-2xl font-bold text-white">Precision Test Finished</h3>
              <div className="text-4xl font-extrabold font-mono text-emerald-400">{accAccuracy}% Accuracy</div>
              <p className="text-xs text-slate-400">
                Completed in {accTimeElapsed} seconds with {accErrors} errors.
              </p>
              <button
                onClick={startAccuracyGame}
                className="px-6 py-2 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      )}

      {/* GAME 3: 60-SECOND CHALLENGE */}
      {activeGame === 'blitz' && (
        <div className="bg-[#0b1429] border border-purple-800/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                Mode 3 • High-Speed Sprint
              </span>
              <h2 className="text-2xl font-bold text-white">60-Second Blitz Challenge</h2>
              <p className="text-xs text-slate-400">
                One minute on the clock. Push your words per minute to the limit.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-[#0f1d3d] px-4 py-2 rounded-xl border border-purple-800/40 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-400">Time Left</div>
                <div className="text-2xl font-mono font-bold text-amber-400">{blitzTimeLeft}s</div>
              </div>
              <div className="bg-[#0f1d3d] px-4 py-2 rounded-xl border border-purple-800/40 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-400">Words Typed</div>
                <div className="text-2xl font-mono font-bold text-purple-400">{blitzWordsTyped}</div>
              </div>
            </div>
          </div>

          {!blitzIsRunning && !blitzFinished && (
            <div className="text-center py-10 space-y-4">
              <Timer className="w-14 h-14 text-purple-400 mx-auto" />
              <h3 className="text-xl font-bold text-white">60 Seconds of Maximum Focus</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                No pauses, no second thoughts. Unleash your full typing velocity across sixty seconds.
              </p>
              <button
                onClick={startBlitzGame}
                className="px-8 py-3.5 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-600/30 transition-all hover:scale-105"
              >
                Start 60s Challenge
              </button>
            </div>
          )}

          {blitzIsRunning && (
            <div className="space-y-4">
              <div className="bg-[#091022] p-5 rounded-2xl border border-purple-900/40 text-lg font-mono leading-relaxed max-h-[160px] overflow-y-auto">
                {blitzText.split('').map((char, i) => {
                  let clr = 'text-slate-500';
                  if (i < blitzTyped.length) {
                    clr = blitzTyped[i] === char ? 'text-purple-300 font-semibold' : 'text-rose-400 bg-rose-950/60';
                  } else if (i === blitzTyped.length) {
                    clr = 'text-white bg-purple-600/40 border-b-2 border-purple-400';
                  }
                  return <span key={i} className={clr}>{char}</span>;
                })}
              </div>

              <textarea
                ref={blitzInputRef}
                value={blitzTyped}
                onChange={handleBlitzChange}
                rows={3}
                placeholder="Type here as fast as you can..."
                className="w-full p-4 rounded-xl bg-[#091022] border-2 border-purple-500/50 focus:border-purple-400 font-mono text-white text-base focus:outline-none"
              />
            </div>
          )}

          {blitzFinished && (
            <div className="text-center py-6 space-y-3 bg-slate-900/60 rounded-2xl border border-slate-800 p-6">
              <Trophy className="w-12 h-12 text-amber-400 mx-auto" />
              <h3 className="text-2xl font-bold text-white">60 Seconds Finished!</h3>
              <div className="text-4xl font-extrabold font-mono text-purple-400">{blitzWordsTyped} WPM</div>
              <p className="text-xs text-slate-400">
                You typed {blitzTyped.length} total characters in 60 seconds!
              </p>
              <button
                onClick={startBlitzGame}
                className="px-6 py-2 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-500"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
