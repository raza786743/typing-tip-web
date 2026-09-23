import React, { useState } from 'react';
import { Keyboard, Info, Check, Copy } from 'lucide-react';
import { URDU_PHONETIC_MAP } from '../data/urduTexts';

export const UrduKeyboardGuide: React.FC = () => {
  const [showShift, setShowShift] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <div className="bg-[#0b1428] rounded-2xl border border-blue-900/40 p-4 sm:p-5 space-y-4 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <Keyboard className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Urdu Phonetic Keyboard Reference</span>
              <span className="text-[10px] font-normal px-2 py-0.5 rounded bg-blue-900/40 text-blue-300">
                فونوٹک کی بورڈ رہنمائی
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Each Latin QWERTY key is mapped to its closest sounding Urdu character.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => setShowShift(!showShift)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              showShift 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {showShift ? 'Shift Keys Active' : 'Show Shift Keys (Shift + Key)'}
          </button>
        </div>
      </div>

      {/* Grid of keys */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 gap-2">
        {URDU_PHONETIC_MAP.map((key) => {
          const displayedChar = showShift ? (key.shiftUrdu || key.urdu) : key.urdu;
          const isCopied = copiedKey === key.latin;

          return (
            <div
              key={key.latin}
              onClick={() => handleCopy(displayedChar, key.latin)}
              title={`Click to copy '${displayedChar}' (Latin: ${key.latin})`}
              className="bg-[#0f1d3d]/80 hover:bg-blue-900/40 border border-blue-800/30 hover:border-blue-500/50 rounded-xl p-2.5 text-center cursor-pointer transition-all hover:scale-105 active:scale-95 group relative"
            >
              <div className="text-2xl font-urdu font-bold text-white group-hover:text-cyan-400 mb-0.5">
                {displayedChar}
              </div>
              <div className="text-[10px] font-mono text-slate-400 group-hover:text-slate-200 uppercase font-semibold">
                {showShift ? `Shift+${key.latin}` : key.latin}
              </div>
              {isCopied && (
                <span className="absolute -top-2 -right-2 p-1 bg-emerald-500 text-white rounded-full text-[9px]">
                  <Check className="w-2.5 h-2.5" />
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-slate-900/60 rounded-xl p-3 text-[11px] text-slate-400 flex items-start gap-2 border border-slate-800">
        <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-300">How to type in Urdu:</span> On Windows or Mac, add the standard "Urdu Phonetic" keyboard from language settings. On Android and iPhone, switch your Gboard or iOS keyboard to Urdu. You can also click any character above to copy it directly!
        </div>
      </div>
    </div>
  );
};
