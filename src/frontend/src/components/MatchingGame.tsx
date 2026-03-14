import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { addStar } from "../utils/stars";
import GameLayout from "./GameLayout";

function speak(text: string, lang = "en-US") {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.85;
  utterance.pitch = 1.2;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

const allItems = [
  { emoji: "🐶", name: "Dog", hindi: "कुत्ता" },
  { emoji: "🐱", name: "Cat", hindi: "बिल्ली" },
  { emoji: "🐮", name: "Cow", hindi: "गाय" },
  { emoji: "🦁", name: "Lion", hindi: "शेर" },
  { emoji: "🐘", name: "Elephant", hindi: "हाथी" },
  { emoji: "🐒", name: "Monkey", hindi: "बंदर" },
  { emoji: "🐯", name: "Tiger", hindi: "बाघ" },
  { emoji: "🦜", name: "Parrot", hindi: "तोता" },
  { emoji: "🐟", name: "Fish", hindi: "मछली" },
  { emoji: "🐰", name: "Rabbit", hindi: "खरगोश" },
  { emoji: "🐸", name: "Frog", hindi: "मेंढक" },
  { emoji: "🦊", name: "Fox", hindi: "लोमड़ी" },
  { emoji: "🐻", name: "Bear", hindi: "भालू" },
  { emoji: "🦋", name: "Butterfly", hindi: "तितली" },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function generateQuestion(items: typeof allItems, usedIndices: number[]) {
  const available = items.filter((_, i) => !usedIndices.includes(i));
  const correct = available[Math.floor(Math.random() * available.length)];
  const correctIdx = items.indexOf(correct);
  const wrongs = shuffle(
    items.filter((it) => it.hindi !== correct.hindi),
  ).slice(0, 3);
  const options = shuffle([correct, ...wrongs]);
  return { correct, correctIdx, options };
}

export default function MatchingGame({ onBack }: { onBack: () => void }) {
  const [qNum, setQNum] = useState(0);
  const [score, setScore] = useState(0);
  const [usedIndices, setUsedIndices] = useState<number[]>([]);
  const [question, setQuestion] = useState(() =>
    generateQuestion(allItems, []),
  );
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [done, setDone] = useState(false);

  const handleAnswer = (hindi: string) => {
    if (feedback) return;
    if (hindi === question.correct.hindi) {
      setFeedback("correct");
      addStar();
      setScore((s) => s + 1);
      speak("Sahi! Correct!");
      setTimeout(() => {
        const newUsed = [...usedIndices, question.correctIdx];
        setUsedIndices(newUsed);
        setFeedback(null);
        if (qNum + 1 >= 10) {
          setDone(true);
        } else {
          setQNum((q) => q + 1);
          setQuestion(generateQuestion(allItems, newUsed));
        }
      }, 1200);
    } else {
      setFeedback("wrong");
      speak("Try again!");
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  const restart = () => {
    setQNum(0);
    setScore(0);
    setUsedIndices([]);
    setDone(false);
    setFeedback(null);
    setQuestion(generateQuestion(allItems, []));
  };

  const optionColors = [
    "bg-[oklch(95%_0.12_27)] border-[oklch(65%_0.22_27)] shadow-[0_5px_0_0_oklch(55%_0.22_27)] text-[oklch(30%_0.22_27)]",
    "bg-[oklch(95%_0.12_250)] border-[oklch(60%_0.2_250)] shadow-[0_5px_0_0_oklch(50%_0.2_250)] text-[oklch(25%_0.2_250)]",
    "bg-[oklch(96%_0.12_145)] border-[oklch(58%_0.22_145)] shadow-[0_5px_0_0_oklch(48%_0.22_145)] text-[oklch(28%_0.22_145)]",
    "bg-[oklch(95%_0.12_300)] border-[oklch(60%_0.22_300)] shadow-[0_5px_0_0_oklch(50%_0.22_300)] text-[oklch(28%_0.22_300)]",
  ];

  return (
    <GameLayout
      title="Matching"
      emoji="🎯"
      color="oklch(55% 0.18 190)"
      onBack={onBack}
    >
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-6 py-12"
          >
            <span className="text-8xl">🎉</span>
            <h2 className="font-display text-4xl font-extrabold text-[oklch(40%_0.22_27)]">
              Shabaash!
            </h2>
            <p className="font-body text-2xl text-muted-foreground">
              Score: {score} / 10
            </p>
            <motion.button
              data-ocid="matching.restart.button"
              whileTap={{ scale: 0.95 }}
              onClick={restart}
              className="bg-[oklch(95%_0.12_145)] border-4 border-[oklch(58%_0.22_145)] shadow-[0_5px_0_0_oklch(48%_0.22_145)] rounded-3xl px-8 py-4 font-display text-xl font-extrabold text-[oklch(28%_0.22_145)] active:shadow-none active:translate-y-1 transition-all"
            >
              Play Again 🔄
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key={qNum}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="flex flex-col items-center gap-6"
          >
            {/* Progress */}
            <div className="flex gap-2 mb-2">
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
                  className={`w-4 h-4 rounded-full border-2 ${
                    i < qNum
                      ? "bg-[oklch(65%_0.22_145)] border-[oklch(50%_0.22_145)]"
                      : i === qNum
                        ? "bg-[oklch(75%_0.22_50)] border-[oklch(60%_0.22_50)] scale-125"
                        : "bg-[oklch(92%_0.04_250)] border-[oklch(70%_0.08_250)]"
                  } transition-all`}
                />
              ))}
            </div>

            {/* Question Card */}
            <motion.div
              animate={
                feedback === "wrong"
                  ? { x: [0, -15, 15, -10, 10, 0] }
                  : feedback === "correct"
                    ? { scale: [1, 1.1, 1] }
                    : {}
              }
              transition={{ duration: 0.4 }}
              className={`flex flex-col items-center gap-3 rounded-3xl border-4 p-8 w-full max-w-sm transition-colors duration-300 ${
                feedback === "correct"
                  ? "bg-[oklch(92%_0.15_145)] border-[oklch(58%_0.22_145)]"
                  : feedback === "wrong"
                    ? "bg-[oklch(94%_0.12_27)] border-[oklch(65%_0.22_27)]"
                    : "bg-[oklch(96%_0.1_250)] border-[oklch(60%_0.2_250)]"
              }`}
            >
              <span className="text-9xl">{question.correct.emoji}</span>
              <span className="font-display text-3xl font-extrabold text-[oklch(30%_0.2_250)]">
                {question.correct.name}
              </span>
              {feedback === "correct" && (
                <span className="font-body text-xl text-[oklch(28%_0.22_145)] font-bold">
                  ✅ सही!
                </span>
              )}
            </motion.div>

            <p className="font-body text-lg text-muted-foreground font-semibold">
              Hindi mein kya hota hai? / हिंदी में क्या है?
            </p>

            {/* Options */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              {question.options.map((opt, i) => (
                <motion.button
                  key={opt.hindi}
                  data-ocid={`matching.option.${i + 1}`}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => handleAnswer(opt.hindi)}
                  className={`border-4 rounded-3xl py-5 px-3 font-display text-2xl font-extrabold active:shadow-none active:translate-y-1 transition-all duration-150 ${optionColors[i]}`}
                >
                  {opt.hindi}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GameLayout>
  );
}
