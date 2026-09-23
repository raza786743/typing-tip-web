export const ENGLISH_WORDS_BEGINNER = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "it",
  "for", "not", "on", "with", "he", "as", "you", "do", "at", "this",
  "but", "his", "by", "from", "they", "we", "say", "her", "she", "or",
  "an", "will", "my", "one", "all", "would", "there", "their", "what",
  "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
  "time", "make", "can", "like", "time", "just", "know", "take", "people",
  "into", "year", "your", "good", "some", "could", "them", "see", "other",
  "than", "then", "now", "look", "only", "come", "its", "over", "think",
  "also", "back", "after", "use", "two", "how", "our", "work", "first",
  "well", "way", "even", "new", "want", "because", "any", "these", "give",
  "day", "most", "us", "fast", "type", "hand", "mind", "light", "blue"
];

export const ENGLISH_WORDS_INTERMEDIATE = [
  "practice", "keyboard", "computer", "accuracy", "challenge", "improve",
  "language", "software", "internet", "learning", "exercise", "strength",
  "position", "finger", "rhythm", "discipline", "velocity", "progress",
  "frequency", "develop", "standard", "knowledge", "efficient", "mastery",
  "technique", "precision", "creative", "solution", "resource", "network",
  "balance", "reaction", "monitor", "strategy", "dynamic", "flexible",
  "constant", "discover", "reliable", "quality", "performance", "system",
  "movement", "duration", "average", "patience", "success", "journey"
];

export const ENGLISH_WORDS_ADVANCED = [
  "sophisticated", "extraordinary", "unprecedented", "quintessential",
  "phenomenon", "juxtaposition", "idiosyncratic", "comprehension",
  "synchronization", "differentiation", "procrastination", "electromagnetic",
  "counterintuitive", "disproportionate", "kaleidoscope", "ubiquitous",
  "epistemology", "metamorphosis", "interdisciplinary", "archaeological",
  "inconsequential", "circumlocution", "phosphorescent", "magnanimous",
  "benevolence", "anachronistic", "serendipity", "paraphernalia"
];

export const ENGLISH_SENTENCES_BEGINNER = [
  "The quick brown fox jumps over the lazy dog.",
  "Practice makes a typist faster and more accurate every single day.",
  "Keep your eyes on the screen and your fingers on the home row keys.",
  "Typing is a skill that helps you work quickly and efficiently.",
  "Take a deep breath and maintain a calm and steady typing rhythm.",
  "Learning to touch type saves countless hours every year.",
  "Clean posture and relaxed wrists protect your hands from fatigue."
];

export const ENGLISH_SENTENCES_INTERMEDIATE = [
  "Consistent daily practice of fifteen minutes yields remarkable improvements in typing velocity.",
  "Touch typing relies heavily on muscle memory rather than conscious visual scanning of the keyboard layout.",
  "Accuracy must always precede speed, because correct habits naturally produce superior velocity over time.",
  "The home row keys serve as an anchor point, allowing every finger to strike keys systematically.",
  "Digital fluency begins with the keyboard; swift typing lets ideas flow onto the screen without friction.",
  "Modern keyboards come in mechanical, membrane, and ergonomic designs to cater to different typing preferences."
];

export const ENGLISH_SENTENCES_ADVANCED = [
  "Mastering keyboard proficiency requires meticulous coordination between cognitive processing, visual feedback, and kinetic muscle memory.",
  "Stenographers and professional transcriptionists often exceed speeds of one hundred and forty words per minute through specialized chorded systems.",
  "Ergonomic workstations—featuring neutral wrist angles, monitor eye-level alignment, and frequent stretching intervals—substantially mitigate repetitive strain injuries.",
  "In an increasingly digitized global economy, typing prowess serves as an indispensable prerequisite for effortless human-computer communication."
];

export const ENGLISH_PARAGRAPHS = [
  {
    title: "The Art and Science of Touch Typing",
    text: "Touch typing is the art of typing without needing to glance down at the keyboard. It was invented in 1888 by Frank Edward McGurrin, a court stenographer from Salt Lake City, Utah. By assigning specific keys to each of the eight fingers and resting on the home row, typists utilize muscle memory to locate positions intuitively. When you master touch typing, your cognitive load is freed up from searching for letters, allowing your thoughts to transfer seamlessly to the digital page."
  },
  {
    title: "Why Accuracy Matters More Than Raw Speed",
    text: "Many beginners make the mistake of rushing to achieve high words per minute, only to discover that their error rate skyrockets. In reality, correcting an error requires stopping your flow, pressing the backspace key multiple times, and re-typing the correct sequence. This disruption wastes significantly more time than typing steadily with ninety-eight percent accuracy. Focus on clean, error-free typing first, and speed will follow naturally."
  },
  {
    title: "The Evolution of Written Communication",
    text: "From ancient clay tablets and quill pens to mechanical typewriters and touchscreens, human communication has continually adapted to new tools. The traditional QWERTY layout was patented in 1878 by Christopher Latham Sholes. Despite the emergence of alternative layouts like Dvorak and Colemak, QWERTY remains the global standard. Today, rapid typing is an indispensable super-power for programmers, writers, and students across the world."
  },
  {
    title: "Ergonomics and Long-Term Hand Health",
    text: "Typing efficiency is not solely about speed; it is equally about physical longevity and comfort. Maintaining a straight back, resting feet flat on the floor, and keeping wrists hovering in a neutral position prevents tendon irritation. Ergonomic experts recommend adopting the twenty-twenty-twenty rule: every twenty minutes, look at an object twenty feet away for twenty seconds, and gently shake out your hands to promote healthy circulation."
  }
];

export function getRandomWords(difficulty: 'beginner' | 'intermediate' | 'advanced', count: number = 30): string {
  let pool = ENGLISH_WORDS_BEGINNER;
  if (difficulty === 'intermediate') pool = [...ENGLISH_WORDS_BEGINNER, ...ENGLISH_WORDS_INTERMEDIATE];
  if (difficulty === 'advanced') pool = [...ENGLISH_WORDS_INTERMEDIATE, ...ENGLISH_WORDS_ADVANCED];
  
  const words: string[] = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * pool.length);
    words.push(pool[randomIndex]);
  }
  return words.join(' ');
}

export function getRandomSentence(difficulty: 'beginner' | 'intermediate' | 'advanced'): string {
  let list = ENGLISH_SENTENCES_BEGINNER;
  if (difficulty === 'intermediate') list = ENGLISH_SENTENCES_INTERMEDIATE;
  if (difficulty === 'advanced') list = ENGLISH_SENTENCES_ADVANCED;
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}

export function getRandomParagraph(): { title: string; text: string } {
  const index = Math.floor(Math.random() * ENGLISH_PARAGRAPHS.length);
  return ENGLISH_PARAGRAPHS[index];
}
