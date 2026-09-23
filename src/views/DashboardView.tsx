import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  Globe2, 
  Languages, 
  Flame, 
  Timer, 
  RotateCcw,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { PageId, UserStats, TestResult } from '../types';
import { clearStoredStats } from '../utils/storage';
import { formatTime } from '../utils/typingCalculations';

interface DashboardViewProps {
  stats: UserStats;
  onRefreshStats: () => void;
  onNavigate: (page: PageId) => void;
  onSetCertificateData: (result: TestResult) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  stats,
  onRefreshStats,
  onNavigate,
  onSetCertificateData,
}) => {
  const [filterLang, setFilterLang] = useState<'all' | 'english' | 'urdu'>('all');
  const [confirmClear, setConfirmClear] = useState<boolean>(false);

  const filteredHistory = stats.history.filter((item) => {
    if (filterLang === 'all') return true;
    return item.language === filterLang;
  });

  const handleClearHistory = () => {
    clearStoredStats();
    onRefreshStats();
    setConfirmClear(false);
  };

  // Typing Level Tier
  const getSpeedTier = (wpm: number) => {
    if (wpm >= 90) return { title: 'Grandmaster Typist', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' };
    if (wpm >= 70) return { title: 'Pro Typist', color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/30' };
    if (wpm >= 50) return { title: 'Fluent Typist', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30' };
    if (wpm >= 30) return { title: 'Competent Typist', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' };
    return { title: 'Novice Typist', color: 'text-slate-400', bg: 'bg-slate-800 border-slate-700' };
  };

  const currentTier = getSpeedTier(stats.bestWpm);

  return (
    <div className="space-y-8 py-2">
      {/* Header Banner */}
      <div className="bg-[#0b1429] border border-blue-900/40 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${currentTier.bg} ${currentTier.color}`}>
                Rank: {currentTier.title}
              </span>
              <span className="text-xs text-slate-400">Stored locally in your browser</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
              <BarChart3 className="w-7 h-7 text-cyan-400" />
              <span>Typing Progress & Analytics</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Track your speed gains, precision consistency, and complete historical test logs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('test')}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30 flex items-center gap-2 transition-all hover:scale-105"
            >
              <Timer className="w-4 h-4" />
              <span>Take New Test</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Best WPM */}
        <div className="bg-[#0b1428] border border-blue-900/40 rounded-2xl p-5 space-y-2 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Best Speed</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono text-cyan-400">
            {stats.bestWpm} <span className="text-sm font-sans font-normal text-slate-400">WPM</span>
          </div>
          <p className="text-[11px] text-slate-400">Highest Net Speed recorded</p>
        </div>

        {/* Average WPM */}
        <div className="bg-[#0b1428] border border-blue-900/40 rounded-2xl p-5 space-y-2 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Average Speed</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono text-blue-400">
            {stats.averageWpm} <span className="text-sm font-sans font-normal text-slate-400">WPM</span>
          </div>
          <p className="text-[11px] text-slate-400">Across all completed tests</p>
        </div>

        {/* Best Accuracy */}
        <div className="bg-[#0b1428] border border-blue-900/40 rounded-2xl p-5 space-y-2 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Best Accuracy</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400">
            {stats.bestAccuracy}%
          </div>
          <p className="text-[11px] text-slate-400">Peak typing precision</p>
        </div>

        {/* Total Tests */}
        <div className="bg-[#0b1428] border border-blue-900/40 rounded-2xl p-5 space-y-2 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Tests</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono text-purple-400">
            {stats.totalTests}
          </div>
          <p className="text-[11px] text-slate-400">Total time: {formatTime(stats.totalTimeSeconds)}</p>
        </div>
      </div>

      {/* Recent Scores Log */}
      <div className="bg-[#0b1429] border border-blue-900/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white">Recent Test Scores & History</h3>
            <p className="text-xs text-slate-400">Review your past scores, error counts, and languages.</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Filter pills */}
            <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setFilterLang('all')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  filterLang === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterLang('english')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  filterLang === 'english' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setFilterLang('urdu')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  filterLang === 'urdu' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                اردو
              </button>
            </div>

            {/* Clear History Button */}
            {stats.history.length > 0 && (
              <div>
                {!confirmClear ? (
                  <button
                    onClick={() => setConfirmClear(true)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                    title="Clear typing history"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handleClearHistory}
                      className="px-2.5 py-1 text-[11px] font-bold text-white bg-rose-600 rounded-lg hover:bg-rose-500"
                    >
                      Confirm Clear
                    </button>
                    <button
                      onClick={() => setConfirmClear(false)}
                      className="px-2 py-1 text-[11px] text-slate-400 hover:text-slate-200"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* History Table */}
        {filteredHistory.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <Timer className="w-12 h-12 text-slate-600 mx-auto" />
            <div className="text-base font-bold text-slate-300">No test results recorded yet</div>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Take your first typing test to see your speed analytics and unlock downloadable certificates!
            </p>
            <button
              onClick={() => onNavigate('test')}
              className="mt-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 inline-flex items-center gap-2"
            >
              <span>Take a 1-Minute Test</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Language</th>
                  <th className="py-3 px-4">Mode</th>
                  <th className="py-3 px-4">Net WPM</th>
                  <th className="py-3 px-4">Accuracy</th>
                  <th className="py-3 px-4">Errors</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4 text-right">Certificate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 text-slate-400 font-mono">{item.date}</td>
                    <td className="py-3 px-4">
                      {item.language === 'urdu' ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                          <Languages className="w-3 h-3" /> اردو
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-blue-400 font-medium">
                          <Globe2 className="w-3 h-3" /> English
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 capitalize text-slate-400">{item.mode}</td>
                    <td className="py-3 px-4 font-mono font-bold text-cyan-400 text-sm">
                      {item.wpm} WPM
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                      {item.accuracy}%
                    </td>
                    <td className="py-3 px-4 font-mono text-rose-400">{item.errorCount}</td>
                    <td className="py-3 px-4 text-slate-400">{item.elapsedSeconds}s</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          onSetCertificateData(item);
                          onNavigate('certificate');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-blue-900/40 text-blue-300 hover:bg-blue-800/60 font-medium transition-colors"
                      >
                        Certificate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
