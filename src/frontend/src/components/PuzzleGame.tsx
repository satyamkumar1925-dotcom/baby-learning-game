import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { addStar } from "../utils/stars";
import GameLayout from "./GameLayout";

function speak(text: string) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.85;
  utterance.pitch = 1.3;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

const emojiPairs = ["🐶", "🐱", "🦁", "🐸", "🐰", "🍎", "🍌", "🌸"];

function createBoard() {
  const cards = [...emojiPairs, ...emojiPairs]
    .map((emoji, i) => ({ id: i, emoji, matched: false }))
    .sort(() => Math.random() - 0.5);
  return cards;
}

type Card = { id: number; emoji: string; matched: boolean };

const cardColors = [
  {
    bg: "bg-[oklch(95%_0.12_27)]",
    border: "border-[oklch(65%_0.22_27)]",
    text: "text-[oklch(30%_0.22_27)]",
  },
  {
    bg: "bg-[oklch(95%_0.12_250)]",
    border: "border-[oklch(60%_0.2_250)]",
    text: "text-[oklch(25%_0.2_250)]",
  },
  {
    bg: "bg-[oklch(96%_0.12_145)]",
    border: "border-[oklch(58%_0.22_145)]",
    text: "text-[oklch(28%_0.22_145)]",
  },
  {
    bg: "bg-[oklch(95%_0.12_300)]",
    border: "border-[oklch(60%_0.22_300)]",
    text: "text-[oklch(28%_0.22_300)]",
  },
  {
    bg: "bg-[oklch(96%_0.12_50)]",
    border: "border-[oklch(68%_0.22_50)]",
    text: "text-[oklch(32%_0.22_50)]",
  },
  {
    bg: "bg-[oklch(95%_0.12_190)]",
    border: "border-[oklch(60%_0.18_190)]",
    text: "text-[oklch(28%_0.18_190)]",
  },
];

export default function PuzzleGame({ onBack }: { onBack: () => void }) {
  const [cards, setCards] = useState<Card[]>(createBoard);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [pairs, setPairs] = useState(0);
  const [locked, setLocked] = useState(false);
  const [done, setDone] = useState(false);

  const handleFlip = (idx: number) => {
    if (locked || flipped.includes(idx) || cards[idx].matched) return;
    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      setLocked(true);
      const [a, b] = newFlipped;
      if (cards[a].emoji === cards[b].emoji) {
        // Match!
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c, i) =>
              i === a || i === b ? { ...c, matched: true } : c,
            ),
          );
          const newPairs = pairs + 1;
          setPairs(newPairs);
          addStar();
          speak("Match!");
          setFlipped([]);
          setLocked(false);
          if (newPairs === emojiPairs.length) {
            setDone(true);
            speak("You won! Well done!");
          }
        }, 600);
      } else {
        // No match, flip back
        setTimeout(() => {
          setFlipped([]);
          setLocked(false);
        }, 1000);
      }
    }
  };

  const restart = () => {
    setCards(createBoard());
    setFlipped([]);
    setMoves(0);
    setPairs(0);
    setLocked(false);
    setDone(false);
  };

  // Confetti-like celebration
  useEffect(() => {
    if (done) speak("Shabaash! You found all the pairs!");
  }, [done]);

  return (
    <GameLayout
      title="Puzzle"
      emoji="🧩"
      color="oklch(55% 0.22_340)"
      onBack={onBack}
    >
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-6 py-8"
            data-ocid="puzzle.success_state"
          >
            <motion.span
              animate={{ rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: 2 }}
              className="text-8xl"
            >
              🏆
            </motion.span>
            <h2 className="font-display text-4xl font-extrabold text-[oklch(40%_0.22_340)]">
              You Won! 🎉
            </h2>
            <p className="font-body text-xl text-muted-foreground">
              Moves: {moves} — Stars earned: {pairs} ⭐
            </p>
            <motion.button
              data-ocid="puzzle.restart.button"
              whileTap={{ scale: 0.95 }}
              onClick={restart}
              className="bg-[oklch(96%_0.12_340)] border-4 border-[oklch(65%_0.22_340)] shadow-[0_5px_0_0_oklch(55%_0.22_340)] rounded-3xl px-8 py-4 font-display text-xl font-extrabold text-[oklch(30%_0.22_340)] active:shadow-none active:translate-y-1 transition-all"
            >
              Play Again 🔄
            </motion.button>
          </motion.div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="font-body text-lg text-muted-foreground font-semibold">
                Pairs: {pairs}/{emojiPairs.length}
              </span>
              <span className="font-body text-lg text-muted-foreground font-semibold">
                Moves: {moves}
              </span>
              <motion.button
                data-ocid="puzzle.restart.button"
                whileTap={{ scale: 0.9 }}
                onClick={restart}
                className="bg-[oklch(95%_0.12_27)] border-4 border-[oklch(65%_0.22_27)] shadow-[0_4px_0_0_oklch(55%_0.22_27)] rounded-2xl px-3 py-1 font-display font-bold text-sm text-[oklch(30%_0.22_27)] active:shadow-none active:translate-y-1 transition-all"
              >
                Reset
              </motion.button>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {cards.map((card, idx) => {
                const isFlipped = flipped.includes(idx) || card.matched;
                const c = cardColors[idx % cardColors.length];
                return (
                  <motion.button
                    key={card.id}
                    data-ocid={`puzzle.item.${idx + 1}`}
                    whileHover={!isFlipped ? { scale: 1.05 } : {}}
                    whileTap={!isFlipped ? { scale: 0.92 } : {}}
                    onClick={() => handleFlip(idx)}
                    className={`aspect-square rounded-2xl border-4 flex items-center justify-center text-4xl transition-all duration-300 ${
                      card.matched
                        ? "bg-[oklch(92%_0.15_145)] border-[oklch(55%_0.22_145)] shadow-[0_0_12px_oklch(65%_0.22_145)]"
                        : isFlipped
                          ? `${c.bg} ${c.border}`
                          : "bg-[oklch(60%_0.18_250)] border-[oklch(45%_0.2_250)] cursor-pointer"
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {isFlipped ? (
                        <motion.span
                          key="front"
                          initial={{ rotateY: 90, opacity: 0 }}
                          animate={{ rotateY: 0, opacity: 1 }}
                          exit={{ rotateY: -90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {card.emoji}
                        </motion.span>
                      ) : (
                        <motion.span
                          key="back"
                          initial={{ rotateY: 90, opacity: 0 }}
                          animate={{ rotateY: 0, opacity: 1 }}
                          exit={{ rotateY: -90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-3xl"
                        >
                          ❓
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}
      </AnimatePresence>
    </GameLayout>
  );
}
