/**
 * Typing speed and accuracy calculation utilities
 * Follows international standards (1 word = 5 keystrokes/characters)
 */

export interface CalculationResult {
  grossWpm: number;
  netWpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
}

export function calculateWpm(
  totalCharactersTyped: number,
  uncorrectedErrors: number,
  timeInSeconds: number
): { grossWpm: number; netWpm: number } {
  if (timeInSeconds <= 0) return { grossWpm: 0, netWpm: 0 };
  const timeInMinutes = timeInSeconds / 60;
  const wordsTyped = totalCharactersTyped / 5;
  const grossWpm = Math.round(wordsTyped / timeInMinutes);
  const errorPenalty = uncorrectedErrors / timeInMinutes;
  const netWpm = Math.max(0, Math.round(grossWpm - errorPenalty));
  return { grossWpm, netWpm };
}

export function calculateAccuracy(
  correctCharacters: number,
  totalCharacters: number
): number {
  if (totalCharacters <= 0) return 100;
  const acc = (correctCharacters / totalCharacters) * 100;
  return Math.min(100, Math.max(0, Math.round(acc * 10) / 10));
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function playKeySound(type: 'correct' | 'error' = 'correct', enabled: boolean = true) {
  if (!enabled || typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'correct') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(540, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.04);
    } else {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.08);
    }
  } catch {
    // AudioContext autoplay might be blocked before first user gesture
  }
}
