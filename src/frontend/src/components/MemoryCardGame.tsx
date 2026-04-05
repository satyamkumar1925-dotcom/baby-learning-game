import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { speakWord } from "../utils/speech";
import { addStar } from "../utils/stars";
import GameLayout from "./GameLayout";

const pairs = [
  { emoji: "🐶", word: "DOG" },
  { emoji: "🐱", word: "CAT" },
  { emoji: "🐟", word: "FISH" },
  { emoji: "🐦", word: "BIRD" },
  { emoji: "🐸", word: "FROG" },
  { emoji: "🦁", word: "LION" },
  { emoji: "🐻", word: "BEAR" },
  { emoji: "🦆", word: "DUCK" },
];

type Card = {
  id: number;
  content: string;
  pairId: number;
  type: "emoji" | "word";
  matched: boolean;
  flipped: boolean;
};

function buildDeck(): Card[] {
  const deck: Card[] = [];
  pairs.forEach((pair, i) => {
    deck.push({
      id: i * 2,
      content: pair.emoji,
      pairId: i,
      type: "emoji",
      matched: false,
      flipped: false,
    });
    deck.push({
      id: i * 2 + 1,
      content: pair.word,
      pairId: i,
      type: "word",
      matched: false,
      flipped: false,
    });
  });
  return deck.sort(() => Math.random() - 0.5);
}

export default function MemoryCardGame({ onBack }: { onBack: () => void }) {
  const [cards, setCards] = useState(buildDeck);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matched, setMatched] = useState(0);
  const [locked, setLocked] = useState(false);

  const allDone = matched === pairs.length;

  const flip = (id: number) => {
    if (locked) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.matched || card.flipped) return;
    const newFlipped = [...flipped, id];
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, flipped: true } : c)),
    );
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      setLocked(true);
      const [a, b] = newFlipped.map((fid) => cards.find((c) => c.id === fid)!);
      if (a.pairId === b.pairId) {
        const word = pairs[a.pairId].word;
        speakWord(word);
        addStar();
        setCards((prev) =>
          prev.map((c) =>
            c.pairId === a.pairId ? { ...c, matched: true } : c,
          ),
        );
        setMatched((m) => m + 1);
        setFlipped([]);
        setLocked(false);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              newFlipped.includes(c.id) ? { ...c, flipped: false } : c,
            ),
          );
          setFlipped([]);
          setLocked(false);
        }, 1000);
      }
    }
  };

  const restart = () => {
    setCards(buildDeck());
    setFlipped([]);
    setMoves(0);
    setMatched(0);
    setLocked(false);
  };

  return (
    <GameLayout
      title="Memory Cards"
      emoji="🃏"
      color="oklch(50% 0.2 250)"
      onBack={onBack}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-6 font-body text-muted-foreground font-semibold">
          <span>Moves: {moves}</span>
          <span>
            Matched: {matched}/{pairs.length}
          </span>
        </div>
        {allDone ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-6 py-8"
            data-ocid="memorycards.success_state"
          >
            <span className="text-7xl">🏆</span>
            <h2 className="font-display text-3xl font-extrabold text-[oklch(40%_0.2_250)]">
              Shabash! {moves} moves!
            </h2>
            <motion.button
              data-ocid="memorycards.restart.button"
              whileTap={{ scale: 0.95 }}
              onClick={restart}
              className="bg-[oklch(95%_0.12_250)] border-4 border-[oklch(60%_0.2_250)] shadow-[0_5px_0_0_oklch(50%_0.2_250)] rounded-3xl px-8 py-4 font-display text-xl font-extrabold text-[oklch(28%_0.2_250)] active:shadow-none active:translate-y-1 transition-all"
            >
              Play Again 🔄
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-4 gap-3">
            {cards.map((card, i) => (
              <motion.button
                key={card.id}
                data-ocid={`memorycards.card.${i + 1}`}
                whileHover={
                  !card.flipped && !card.matched ? { scale: 1.05 } : {}
                }
                whileTap={!card.flipped && !card.matched ? { scale: 0.95 } : {}}
                onClick={() => flip(card.id)}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-4 flex items-center justify-center transition-all duration-300 ${
                  card.matched
                    ? "bg-[oklch(92%_0.15_145)] border-[oklch(58%_0.22_145)]"
                    : card.flipped
                      ? "bg-[oklch(95%_0.12_250)] border-[oklch(60%_0.2_250)] shadow-[0_4px_0_0_oklch(50%_0.2_250)]"
                      : "bg-[oklch(60%_0.2_250)] border-[oklch(50%_0.2_250)] shadow-[0_4px_0_0_oklch(40%_0.2_250)]"
                }`}
              >
                <AnimatePresence mode="wait">
                  {card.flipped || card.matched ? (
                    <motion.span
                      key="front"
                      initial={{ rotateY: 90 }}
                      animate={{ rotateY: 0 }}
                      className={
                        card.type === "emoji"
                          ? "text-3xl"
                          : "font-display text-sm font-extrabold text-[oklch(28%_0.2_250)]"
                      }
                    >
                      {card.content}
                    </motion.span>
                  ) : (
                    <motion.span key="back" className="text-2xl">
                      ❓
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </GameLayout>
  );
}
