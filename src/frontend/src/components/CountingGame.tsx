import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { addStar } from "../utils/stars";
import GameLayout from "./GameLayout";

function speak(text: string) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.85;
  utterance.pitch = 1.3;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

const emojis = ["🐶", "🐱", "🦁", "🐸", "🐰", "🍎", "🍌", "🍓", "⭐", "🌸"];

function generateQ() {
  const count = Math.floor(Math.random() * 10) + 1;
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  const correct = count;
  const wrongSet = new Set<number>();
  while (wrongSet.size < 3) {
    const w = Math.floor(Math.random() * 10) + 1;
    if (w !== correct) wrongSet.add(w);
  }
  const options = [correct, ...wrongSet].sort(() => Math.random() - 0.5);
  return { count, emoji, options };
}

const optColors = [
  "bg-[oklch(95%_0.12_27)] border-[oklch(65%_0.22_27)] shadow-[0_5px_0_0_oklch(55%_0.22_27)] text-[oklch(30%_0.22_27)]",
  "bg-[oklch(95%_0.12_250)] border-[oklch(60%_0.2_250)] shadow-[0_5px_0_0_oklch(50%_0.2_250)] text-[oklch(25%_0.2_250)]",
  "bg-[oklch(96%_0.12_145)] border-[oklch(58%_0.22_145)] shadow-[0_5px_0_0_oklch(48%_0.22_145)] text-[oklch(28%_0.22_145)]",
  "bg-[oklch(95%_0.12_300)] border-[oklch(60%_0.22_300)] shadow-[0_5px_0_0_oklch(50%_0.22_300)] text-[oklch(28%_0.22_300)]",
];

export default function CountingGame({ onBack }: { onBack: () => void }) {
  const [qNum, setQNum] = useState(0);
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(generateQ);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [done, setDone] = useState(false);
  const [celebrating, setCelebrating] = useState(false);

  const handleAnswer = (n: number) => {
    if (feedback) return;
    if (n === question.count) {
      setFeedback("correct");
      setCelebrating(true);
      addStar();
      setScore((s) => s + 1);
      speak(`Yes! ${n}!`);
      setTimeout(() => {
        setCelebrating(false);
        setFeedback(null);
        if (qNum + 1 >= 10) {
          setDone(true);
        } else {
          setQNum((q) => q + 1);
          setQuestion(generateQ());
        }
      }, 1200);
    } else {
      setFeedback("wrong");
      speak("Try again!");
      setTimeout(() => setFeedback(null), 900);
    }
  };

  const restart = () => {
    setQNum(0);
    setScore(0);
    setDone(false);
    setFeedback(null);
    setCelebrating(false);
    setQuestion(generateQ());
  };

  return (
    <GameLayout
      title="Counting"
      emoji="🔢"
      color="oklch(50% 0.22 300)"
      onBack={onBack}
    >
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-6 py-12"
            data-ocid="counting.success_state"
          >
            <span className="text-8xl">🏆</span>
            <h2 className="font-display text-4xl font-extrabold text-[oklch(40%_0.22_300)]">
              Shabaash! 🎉
            </h2>
            <p className="font-body text-2xl text-muted-foreground">
              Score: {score} / 10
            </p>
            <motion.button
              data-ocid="counting.restart.button"
              whileTap={{ scale: 0.95 }}
              onClick={restart}
              className="bg-[oklch(95%_0.12_300)] border-4 border-[oklch(60%_0.22_300)] shadow-[0_5px_0_0_oklch(50%_0.22_300)] rounded-3xl px-8 py-4 font-display text-xl font-extrabold text-[oklch(28%_0.22_300)] active:shadow-none active:translate-y-1 transition-all"
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
            {/* Progress dots */}
            <div className="flex gap-2">
              {[
                "q1",
                "q2",
                "q3",
                "q4",
                "q5",
                "q6",
                "q7",
                "q8",
                "q9",
                "q10",
              ].map((dotKey, i) => (
                <div
                  key={dotKey}
                  className={`w-4 h-4 rounded-full border-2 transition-all ${
                    i < qNum
                      ? "bg-[oklch(65%_0.22_300)] border-[oklch(50%_0.22_300)]"
                      : i === qNum
                        ? "bg-[oklch(75%_0.22_50)] border-[oklch(60%_0.22_50)] scale-125"
                        : "bg-[oklch(92%_0.04_250)] border-[oklch(70%_0.08_250)]"
                  }`}
                />
              ))}
            </div>

            <p className="font-body text-xl text-muted-foreground font-semibold">
              Kitne hain? / कितने हैं?
            </p>

            {/* Emoji grid to count */}
            <motion.div
              animate={celebrating ? { scale: [1, 1.1, 0.95, 1.05, 1] } : {}}
              transition={{ duration: 0.5 }}
              className={`rounded-3xl border-4 p-6 flex flex-wrap gap-3 justify-center items-center max-w-xs transition-colors duration-300 ${
                feedback === "correct"
                  ? "bg-[oklch(92%_0.15_145)] border-[oklch(58%_0.22_145)]"
                  : feedback === "wrong"
                    ? "bg-[oklch(94%_0.12_27)] border-[oklch(65%_0.22_27)]"
                    : "bg-[oklch(96%_0.1_300)] border-[oklch(60%_0.22_300)]"
              }`}
            >
              {[...Array(question.count)]
                .map((_, rawIdx) => rawIdx)
                .map((eidx) => (
                  <motion.span
                    key={eidx}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: eidx * 0.05,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                    className="text-5xl"
                  >
                    {question.emoji}
                  </motion.span>
                ))}
            </motion.div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              {question.options.map((opt, i) => (
                <motion.button
                  key={opt}
                  data-ocid={`counting.option.${i + 1}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.92 }}
                  animate={
                    feedback === "wrong" && opt === question.options[i]
                      ? { x: [0, -8, 8, -5, 5, 0] }
                      : {}
                  }
                  onClick={() => handleAnswer(opt)}
                  className={`border-4 rounded-3xl py-6 font-display text-4xl font-extrabold active:shadow-none active:translate-y-1 transition-all duration-150 ${optColors[i]}`}
                >
                  {opt}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GameLayout>
  );
}
