import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { addStar } from "../utils/stars";
import GameLayout from "./GameLayout";

function speak(text: string) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.85;
  utterance.pitch = 1.2;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

const numberWords = [
  "",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
  "twenty",
];

const tableColors = [
  {
    bg: "bg-[oklch(95%_0.12_27)]",
    border: "border-[oklch(65%_0.22_27)]",
    shadow: "shadow-[0_5px_0_0_oklch(55%_0.22_27)]",
    text: "text-[oklch(30%_0.22_27)]",
  },
  {
    bg: "bg-[oklch(95%_0.12_250)]",
    border: "border-[oklch(60%_0.2_250)]",
    shadow: "shadow-[0_5px_0_0_oklch(50%_0.2_250)]",
    text: "text-[oklch(25%_0.2_250)]",
  },
  {
    bg: "bg-[oklch(96%_0.12_145)]",
    border: "border-[oklch(58%_0.22_145)]",
    shadow: "shadow-[0_5px_0_0_oklch(48%_0.22_145)]",
    text: "text-[oklch(28%_0.22_145)]",
  },
  {
    bg: "bg-[oklch(95%_0.12_300)]",
    border: "border-[oklch(60%_0.22_300)]",
    shadow: "shadow-[0_5px_0_0_oklch(50%_0.22_300)]",
    text: "text-[oklch(28%_0.22_300)]",
  },
  {
    bg: "bg-[oklch(96%_0.12_50)]",
    border: "border-[oklch(68%_0.22_50)]",
    shadow: "shadow-[0_5px_0_0_oklch(58%_0.22_50)]",
    text: "text-[oklch(32%_0.22_50)]",
  },
  {
    bg: "bg-[oklch(95%_0.12_190)]",
    border: "border-[oklch(60%_0.18_190)]",
    shadow: "shadow-[0_5px_0_0_oklch(50%_0.18_190)]",
    text: "text-[oklch(28%_0.18_190)]",
  },
];

export default function TablesGame({ onBack }: { onBack: () => void }) {
  const [selectedNum, setSelectedNum] = useState<number | null>(null);

  const handleRowTap = (n: number, m: number) => {
    const result = n * m;
    speak(
      `${numberWords[n]} times ${numberWords[m]} equals ${numberWords[result]}`,
    );
    addStar();
  };

  return (
    <GameLayout
      title="Tables"
      emoji="📊"
      color="oklch(55% 0.22 50)"
      onBack={onBack}
    >
      <AnimatePresence mode="wait">
        {selectedNum === null ? (
          <motion.div
            key="selector"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <p className="font-body text-center text-lg text-muted-foreground mb-6 font-semibold">
              Choose a number / संख्या चुनें
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
              {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => {
                const c = tableColors[(n - 1) % tableColors.length];
                return (
                  <motion.button
                    key={n}
                    data-ocid={`tables.item.${n}`}
                    whileHover={{ scale: 1.08, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedNum(n)}
                    className={`${c.bg} ${c.border} ${c.shadow} border-4 rounded-3xl py-4 px-2 flex flex-col items-center gap-1 active:shadow-none active:translate-y-1 transition-all duration-150`}
                  >
                    <span
                      className={`font-display text-3xl font-extrabold ${c.text}`}
                    >
                      {n}
                    </span>
                    <span className="font-body text-xs text-muted-foreground">
                      {numberWords[n]}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="table"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.button
                data-ocid="tables.back.button"
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedNum(null)}
                className="bg-[oklch(95%_0.12_50)] border-4 border-[oklch(68%_0.22_50)] shadow-[0_4px_0_0_oklch(58%_0.22_50)] rounded-2xl px-4 py-2 font-display font-bold text-[oklch(32%_0.22_50)] active:shadow-none active:translate-y-1 transition-all"
              >
                ← Back
              </motion.button>
              <h2 className="font-display text-3xl font-extrabold text-[oklch(40%_0.22_50)]">
                Table of {selectedNum} — पहाड़ा {selectedNum}
              </h2>
            </div>
            <div className="flex flex-col gap-3">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((m) => {
                const result = selectedNum * m;
                const c = tableColors[(m - 1) % tableColors.length];
                return (
                  <motion.button
                    key={m}
                    data-ocid={`tables.row.${m}`}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: m * 0.06,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleRowTap(selectedNum, m)}
                    className={`${c.bg} ${c.border} ${c.shadow} border-4 rounded-2xl p-4 flex items-center justify-between active:shadow-none active:translate-y-1 transition-all duration-150`}
                  >
                    <span
                      className={`font-display text-2xl font-extrabold ${c.text}`}
                    >
                      {selectedNum} × {m}
                    </span>
                    <span className="font-body text-xl text-muted-foreground">
                      =
                    </span>
                    <span
                      className={`font-display text-3xl font-extrabold ${c.text}`}
                    >
                      {result}
                    </span>
                    <span className="text-xl">🔊</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GameLayout>
  );
}
