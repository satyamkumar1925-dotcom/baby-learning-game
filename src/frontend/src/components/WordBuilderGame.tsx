import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { speakWord } from "../utils/speech";
import { addStar } from "../utils/stars";
import GameLayout from "./GameLayout";

const words = [
  { emoji: "🐱", word: "CAT", hindi: "बिल्ली" },
  { emoji: "🐶", word: "DOG", hindi: "कुत्ता" },
  { emoji: "🐄", word: "COW", hindi: "गाय" },
  { emoji: "☀️", word: "SUN", hindi: "सूरज" },
  { emoji: "🐟", word: "FISH", hindi: "मछली" },
  { emoji: "🐦", word: "BIRD", hindi: "पक्षी" },
  { emoji: "🐸", word: "FROG", hindi: "मेंढक" },
  { emoji: "🦆", word: "DUCK", hindi: "बत्तख" },
  { emoji: "🦁", word: "LION", hindi: "शेर" },
  { emoji: "🐻", word: "BEAR", hindi: "भालू" },
  { emoji: "🌳", word: "TREE", hindi: "पेड़" },
  { emoji: "🌱", word: "LEAF", hindi: "पत्ता" },
  { emoji: "🌙", word: "MOON", hindi: "चाँद" },
  { emoji: "⭐", word: "STAR", hindi: "तारा" },
  { emoji: "🐔", word: "HEN", hindi: "मुर्गी" },
];

type LetterTile = { letter: string; id: number };

function shuffleWord(word: string): string[] {
  const arr = word.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  if (arr.join("") === word) return shuffleWord(word);
  return arr;
}

function makePool(word: string): LetterTile[] {
  return shuffleWord(word).map((l, i) => ({ letter: l, id: i }));
}

export default function WordBuilderGame({ onBack }: { onBack: () => void }) {
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [letterPool, setLetterPool] = useState<LetterTile[]>(() =>
    makePool(words[0].word),
  );
  const [built, setBuilt] = useState<LetterTile[]>([]);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  const current = words[qIdx % words.length];

  const goNext = (nextIdx: number) => {
    if (nextIdx >= 10) {
      setDone(true);
      return;
    }
    setQIdx(nextIdx);
    setLetterPool(makePool(words[nextIdx % words.length].word));
    setBuilt([]);
    setFeedback(null);
  };

  const resetCurrent = () => {
    setLetterPool(makePool(current.word));
    setBuilt([]);
    setFeedback(null);
  };

  const tapLetter = (item: LetterTile) => {
    if (feedback) return;
    const newBuilt = [...built, item];
    setBuilt(newBuilt);
    setLetterPool((pool) => pool.filter((p) => p.id !== item.id));
    if (newBuilt.length === current.word.length) {
      const builtWord = newBuilt.map((b) => b.letter).join("");
      if (builtWord === current.word) {
        setFeedback("correct");
        addStar();
        setScore((s) => s + 1);
        speakWord(current.word);
        setTimeout(() => goNext(qIdx + 1), 1500);
      } else {
        setFeedback("wrong");
        speakWord("Try again!");
        setTimeout(() => resetCurrent(), 1000);
      }
    }
  };

  const tapBuilt = (item: LetterTile) => {
    if (feedback) return;
    setBuilt((b) => b.filter((x) => x.id !== item.id));
    setLetterPool((pool) => [...pool, item]);
  };

  if (done) {
    return (
      <GameLayout
        title="Word Builder"
        emoji="🔤"
        color="oklch(50% 0.22 300)"
        onBack={onBack}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-6 py-12"
          data-ocid="wordbuilder.success_state"
        >
          <span className="text-8xl">🏆</span>
          <h2 className="font-display text-4xl font-extrabold text-[oklch(40%_0.22_300)]">
            Shabaash! 🎉
          </h2>
          <p className="font-body text-2xl text-muted-foreground">
            Score: {score} / 10
          </p>
          <motion.button
            data-ocid="wordbuilder.restart.button"
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setQIdx(0);
              setScore(0);
              setDone(false);
              setLetterPool(makePool(words[0].word));
              setBuilt([]);
              setFeedback(null);
            }}
            className="bg-[oklch(95%_0.12_300)] border-4 border-[oklch(60%_0.22_300)] shadow-[0_5px_0_0_oklch(50%_0.22_300)] rounded-3xl px-8 py-4 font-display text-xl font-extrabold text-[oklch(28%_0.22_300)] active:shadow-none active:translate-y-1 transition-all"
          >
            Play Again 🔄
          </motion.button>
        </motion.div>
      </GameLayout>
    );
  }

  return (
    <GameLayout
      title="Word Builder"
      emoji="🔤"
      color="oklch(50% 0.22 300)"
      onBack={onBack}
    >
      <div className="flex flex-col items-center gap-6">
        <p className="font-body text-xl text-muted-foreground font-semibold">
          Word {qIdx + 1} / 10
        </p>
        <div className="flex flex-col items-center gap-2">
          <span className="text-8xl">{current.emoji}</span>
          <p className="font-body text-sm text-muted-foreground">
            {current.hindi}
          </p>
        </div>
        {/* Built word area */}
        <div className="flex gap-2 min-h-16 items-center justify-center flex-wrap">
          <AnimatePresence>
            {built.map((item) => (
              <motion.button
                key={item.id}
                data-ocid={`wordbuilder.built.${item.id + 1}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => tapBuilt(item)}
                className={`w-12 h-12 rounded-2xl border-4 flex items-center justify-center font-display text-2xl font-extrabold transition-all ${
                  feedback === "correct"
                    ? "bg-[oklch(92%_0.15_145)] border-[oklch(58%_0.22_145)] text-[oklch(28%_0.22_145)]"
                    : feedback === "wrong"
                      ? "bg-[oklch(94%_0.12_27)] border-[oklch(65%_0.22_27)] text-[oklch(30%_0.22_27)]"
                      : "bg-[oklch(95%_0.12_300)] border-[oklch(60%_0.22_300)] shadow-[0_3px_0_0_oklch(50%_0.22_300)] text-[oklch(28%_0.22_300)]"
                }`}
              >
                {item.letter}
              </motion.button>
            ))}
            {Array.from({ length: current.word.length - built.length }).map(
              (_, i) => (
                <div
                  key={`empty-slot-${i}-${current.word}`}
                  className="w-12 h-12 rounded-2xl border-4 border-dashed border-[oklch(75%_0.1_250)] bg-[oklch(96%_0.05_250)]"
                />
              ),
            )}
          </AnimatePresence>
        </div>
        {/* Letter pool */}
        <div className="flex gap-3 flex-wrap justify-center">
          {letterPool.map((item) => (
            <motion.button
              key={item.id}
              data-ocid={`wordbuilder.letter.${item.id + 1}`}
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => tapLetter(item)}
              className="w-14 h-14 rounded-2xl border-4 bg-[oklch(95%_0.12_50)] border-[oklch(68%_0.22_50)] shadow-[0_5px_0_0_oklch(58%_0.22_50)] flex items-center justify-center font-display text-2xl font-extrabold text-[oklch(32%_0.22_50)] active:shadow-none active:translate-y-1 transition-all"
            >
              {item.letter}
            </motion.button>
          ))}
        </div>
      </div>
    </GameLayout>
  );
}
