import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { speakWord } from "../utils/speech";
import { addStar } from "../utils/stars";
import GameLayout from "./GameLayout";

const emojis = ["🐶", "🐱", "🍎", "🍌", "⭐", "🌸", "🌵", "🦄", "🐢", "🐬"];
const OPTION_KEYS = ["opt-a", "opt-b", "opt-c", "opt-d"];

function generateQ() {
  const num = Math.floor(Math.random() * 10) + 1;
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  const wrongSet = new Set<number>();
  while (wrongSet.size < 3) {
    const w = Math.floor(Math.random() * 10) + 1;
    if (w !== num) wrongSet.add(w);
  }
  const options = [num, ...wrongSet].sort(() => Math.random() - 0.5);
  // Pre-generate stable emoji IDs for each option count
  const emojiKeys = options.map((opt) =>
    Array.from(
      { length: opt },
      (_, k) => `${Math.random().toString(36).slice(2)}-${k}`,
    ),
  );
  return { num, emoji, options, emojiKeys };
}

const optColors = [
  {
    bg: "bg-[oklch(95%_0.12_27)]",
    border: "border-[oklch(65%_0.22_27)]",
    shadow: "shadow-[0_5px_0_0_oklch(55%_0.22_27)]",
  },
  {
    bg: "bg-[oklch(95%_0.12_250)]",
    border: "border-[oklch(60%_0.2_250)]",
    shadow: "shadow-[0_5px_0_0_oklch(50%_0.2_250)]",
  },
  {
    bg: "bg-[oklch(96%_0.12_145)]",
    border: "border-[oklch(58%_0.22_145)]",
    shadow: "shadow-[0_5px_0_0_oklch(48%_0.22_145)]",
  },
  {
    bg: "bg-[oklch(95%_0.12_300)]",
    border: "border-[oklch(60%_0.22_300)]",
    shadow: "shadow-[0_5px_0_0_oklch(50%_0.22_300)]",
  },
];

export default function NumberMatchGame({ onBack }: { onBack: () => void }) {
  const [qNum, setQNum] = useState(0);
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(generateQ);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [done, setDone] = useState(false);

  const handleAnswer = (count: number) => {
    if (feedback) return;
    if (count === question.num) {
      setFeedback("correct");
      addStar();
      setScore((s) => s + 1);
      speakWord(`Yes! ${question.num}!`);
      setTimeout(() => {
        setFeedback(null);
        if (qNum + 1 >= 10) setDone(true);
        else {
          setQNum((q) => q + 1);
          setQuestion(generateQ());
        }
      }, 1200);
    } else {
      setFeedback("wrong");
      speakWord("Try again!");
      setTimeout(() => setFeedback(null), 900);
    }
  };

  const restart = () => {
    setQNum(0);
    setScore(0);
    setDone(false);
    setFeedback(null);
    setQuestion(generateQ());
  };

  return (
    <GameLayout
      title="Number Match"
      emoji="🔢"
      color="oklch(50% 0.22 145)"
      onBack={onBack}
    >
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-6 py-12"
            data-ocid="numbermatch.success_state"
          >
            <span className="text-8xl">🏆</span>
            <h2 className="font-display text-4xl font-extrabold text-[oklch(40%_0.22_145)]">
              Shabaash! 🎉
            </h2>
            <p className="font-body text-2xl text-muted-foreground">
              Score: {score} / 10
            </p>
            <motion.button
              data-ocid="numbermatch.restart.button"
              whileTap={{ scale: 0.95 }}
              onClick={restart}
              className="bg-[oklch(95%_0.12_145)] border-4 border-[oklch(60%_0.22_145)] shadow-[0_5px_0_0_oklch(50%_0.22_145)] rounded-3xl px-8 py-4 font-display text-xl font-extrabold text-[oklch(28%_0.22_145)] active:shadow-none active:translate-y-1 transition-all"
            >
              Play Again 🔄
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key={qNum}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center gap-6"
          >
            <p className="font-body text-xl text-muted-foreground font-semibold">
              Question {qNum + 1} / 10
            </p>
            <div className="rounded-3xl border-4 border-[oklch(60%_0.22_145)] bg-[oklch(96%_0.12_145)] p-8 flex flex-col items-center gap-3">
              <p className="font-body text-lg text-muted-foreground">
                Kitne {question.emoji} hain? / कितने हैं?
              </p>
              <span className="font-display text-8xl font-extrabold text-[oklch(35%_0.22_145)]">
                {question.num}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              {question.options.map((opt, i) => {
                const c = optColors[i % optColors.length];
                const optKey = OPTION_KEYS[i];
                return (
                  <motion.button
                    key={optKey}
                    data-ocid={`numbermatch.option.${i + 1}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => handleAnswer(opt)}
                    className={`border-4 rounded-3xl p-4 flex flex-wrap gap-1.5 justify-center items-center min-h-24 active:shadow-none active:translate-y-1 transition-all ${c.bg} ${c.border} ${c.shadow}`}
                  >
                    {question.emojiKeys[i].map((ek) => (
                      <span key={ek} className="text-3xl">
                        {question.emoji}
                      </span>
                    ))}
                  </motion.button>
                );
              })}
            </div>
            {feedback === "correct" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-5xl"
              >
                🎉
              </motion.div>
            )}
            {feedback === "wrong" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-5xl"
              >
                😢
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </GameLayout>
  );
}
