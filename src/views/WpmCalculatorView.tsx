import React, { useState } from 'react';
import { Calculator, Zap, CheckCircle2, AlertCircle, Info, ArrowRight, RotateCcw } from 'lucide-react';
import { PageId } from '../types';

interface WpmCalculatorViewProps {
  onNavigate: (page: PageId) => void;
}

export const WpmCalculatorView: React.FC<WpmCalculatorViewProps> = ({ onNavigate }) => {
  const [wordsTyped, setWordsTyped] = useState<string>('60');
  const [timeValue, setTimeValue] = useState<string>('60');
  const [timeUnit, setTimeUnit] = useState<'seconds' | 'minutes'>('seconds');
  const [errors, setErrors] = useState<string>('2');

  const words = Math.max(0, parseFloat(wordsTyped) || 0);
  const timeInput = Math.max(0, parseFloat(timeValue) || 0);
  const uncorrectedErrors = Math.max(0, parseFloat(errors) || 0);

  // Convert time to minutes
  const timeInMinutes = timeUnit === 'seconds' ? (timeInput > 0 ? timeInput / 60 : 0) : timeInput;

  // Standard typing calculation
  // Gross WPM = Words / Minutes
  const grossWpm = timeInMinutes > 0 ? Math.round(words / timeInMinutes) : 0;
  // Net WPM = Gross WPM - (Errors / Minutes)
  const errorPenalty = timeInMinutes > 0 ? uncorrectedErrors / timeInMinutes : 0;
  const netWpm = Math.max(0, Math.round(grossWpm - errorPenalty));
  // Accuracy = ((Words - Errors) / Words) * 100
  const accuracy = words > 0 ? Math.max(0, Math.min(100, Math.round(((words - uncorrectedErrors) / words) * 100))) : 100;

  const handleReset = () => {
    setWordsTyped('60');
    setTimeValue('60');
    setTimeUnit('seconds');
    setErrors('0');
  };

  return (
    <div className="space-y-8 py-2 max-w-4xl mx-auto">
      {/* Title */}
      <div className="bg-[#0b1429] border border-blue-900/40 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
              <Calculator className="w-7 h-7 text-cyan-400" />
              <span>Words Per Minute (WPM) Calculator</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Calculate exact Gross and Net typing speed, error penalty, and accuracy using international standardized formulas.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
            Reset
          </button>
        </div>

        {/* Interactive Calculator Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {/* Input 1: Words Typed */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
              Words Typed
            </label>
            <input
              id="calc-words-input"
              type="number"
              min="0"
              value={wordsTyped}
              onChange={(e) => setWordsTyped(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#091022] border border-blue-800/50 focus:border-cyan-400 font-mono text-xl text-white focus:outline-none"
              placeholder="e.g. 75"
            />
            <span className="text-[11px] text-slate-400 block">
              Standard: 1 word = 5 characters
            </span>
          </div>

          {/* Input 2: Time Taken */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                Time Taken
              </label>
              <div className="flex items-center gap-1 text-[11px]">
                <button
                  onClick={() => setTimeUnit('seconds')}
                  className={`px-2 py-0.5 rounded font-bold ${timeUnit === 'seconds' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
                >
                  Sec
                </button>
                <button
                  onClick={() => setTimeUnit('minutes')}
                  className={`px-2 py-0.5 rounded font-bold ${timeUnit === 'minutes' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
                >
                  Min
                </button>
              </div>
            </div>
            <input
              id="calc-time-input"
              type="number"
              min="1"
              value={timeValue}
              onChange={(e) => setTimeValue(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#091022] border border-blue-800/50 focus:border-cyan-400 font-mono text-xl text-white focus:outline-none"
              placeholder={timeUnit === 'seconds' ? 'e.g. 60' : 'e.g. 1'}
            />
            <span className="text-[11px] text-slate-400 block">
              {timeUnit === 'seconds' ? `${timeInput} seconds (${(timeInput / 60).toFixed(2)} mins)` : `${timeInput} minutes`}
            </span>
          </div>

          {/* Input 3: Uncorrected Errors */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
              Errors / Typos
            </label>
            <input
              id="calc-errors-input"
              type="number"
              min="0"
              value={errors}
              onChange={(e) => setErrors(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#091022] border border-blue-800/50 focus:border-rose-400 font-mono text-xl text-white focus:outline-none"
              placeholder="e.g. 2"
            />
            <span className="text-[11px] text-slate-400 block">
              Uncorrected mistakes
            </span>
          </div>
        </div>

        {/* Results Card */}
        <div className="mt-8 pt-8 border-t border-slate-800">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Net WPM */}
            <div className="bg-[#0f1d3d] border-2 border-cyan-500/30 rounded-2xl p-5 text-center shadow-lg">
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300">
                Official Net WPM
              </span>
              <div className="text-4xl sm:text-5xl font-extrabold font-mono text-cyan-400 my-1">
                {netWpm}
              </div>
              <p className="text-[11px] text-slate-400">Net Words Per Minute</p>
            </div>

            {/* Gross WPM */}
            <div className="bg-[#0f1d3d] border border-blue-800/40 rounded-2xl p-5 text-center shadow-lg">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300">
                Gross Speed
              </span>
              <div className="text-4xl sm:text-5xl font-extrabold font-mono text-blue-400 my-1">
                {grossWpm}
              </div>
              <p className="text-[11px] text-slate-400">Raw Words Per Minute</p>
            </div>

            {/* Accuracy */}
            <div className="bg-[#0f1d3d] border border-emerald-800/40 rounded-2xl p-5 text-center shadow-lg">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                Accuracy
              </span>
              <div className="text-4xl sm:text-5xl font-extrabold font-mono text-emerald-400 my-1">
                {accuracy}%
              </div>
              <p className="text-[11px] text-slate-400">Precision Ratio</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mathematical Formula Explanation */}
      <div className="bg-[#0a1226] border border-blue-900/40 rounded-3xl p-6 sm:p-8 space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-400" />
          <span>How Typing Speed is Officially Calculated</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300 leading-relaxed">
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-white text-sm">1. Gross WPM Formula</h4>
            <p className="text-slate-400 font-mono bg-slate-950 p-2 rounded text-cyan-300">
              Gross WPM = (Words Typed) / (Time in Minutes)
            </p>
            <p>
              Measures raw finger velocity regardless of mistakes made. For character-based tests, 5 characters equal 1 standardized word.
            </p>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-white text-sm">2. Net WPM Formula</h4>
            <p className="text-slate-400 font-mono bg-slate-950 p-2 rounded text-emerald-300">
              Net WPM = Gross WPM - (Errors / Time in Minutes)
            </p>
            <p>
              The industry gold-standard metric used by typing speed certification authorities, government civil service exams, and legal transcription agencies.
            </p>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-between">
          <span className="text-xs text-slate-400">Want to test your real typing speed live?</span>
          <button
            onClick={() => onNavigate('test')}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 flex items-center gap-2 shadow-md shadow-blue-600/25"
          >
            <span>Launch Live Test</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
