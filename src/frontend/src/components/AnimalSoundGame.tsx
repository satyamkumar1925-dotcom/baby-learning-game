import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { speakWord } from "../utils/speech";
import { addStar } from "../utils/stars";
import GameLayout from "./GameLayout";

const animalSounds = [
  {
    emoji: "🐶",
    name: "Dog",
    clue: "I say Woof Woof! Who am I?",
    hindi: "कुत्ता",
  },
  {
    emoji: "🐱",
    name: "Cat",
    clue: "I say Meow Meow! Who am I?",
    hindi: "बिल्ली",
  },
  { emoji: "🐄", name: "Cow", clue: "I say Moo Moo! Who am I?", hindi: "गाय" },
  {
    emoji: "🦆",
    name: "Duck",
    clue: "I say Quack Quack! Who am I?",
    hindi: "बत्तख",
  },
  { emoji: "🦁", name: "Lion", clue: "I ROAR loudly! Who am I?", hindi: "शेर" },
  {
    emoji: "🐘",
    name: "Elephant",
    clue: "I trumpet with my trunk! Who am I?",
    hindi: "हाथी",
  },
  {
    emoji: "🐴",
    name: "Horse",
    clue: "I say Neigh Neigh! Who am I?",
    hindi: "घोड़ा",
  },
  {
    emoji: "🐸",
    name: "Frog",
    clue: "I say Ribbit Ribbit! Who am I?",
    hindi: "मेंढक",
  },
  {
    emoji: "🦉",
    name: "Owl",
    clue: "I say Hoot Hoot at night! Who am I?",
    hindi: "उल्लू",
  },
  { emoji: "🐑", name: "Sheep", clue: "I say Baa Baa! Who am I?", hindi: "भेड़" },
];

function generateQ(allAnimals: typeof animalSounds) {
  const shuffled = [...allAnimals].sort(() => Math.random() - 0.5);
  const correct = shuffled[0];
  const choices = shuffled.slice(0, 4).sort(() => Math.random() - 0.5);
  if (!choices.find((c) => c.name === correct.name)) {
    choices[Math.floor(Math.random() * 4)] = correct;
  }
  return { correct, choices };
}

export default function AnimalSoundGame({ onBack }: { onBack: () => void }) {
  const [qNum, setQNum] = useState(0);
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(() => generateQ(animalSounds));
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => speakWord(question.correct.clue), 500);
    return () => clearTimeout(timer);
  }, [question]);

  const handleAnswer = (name: string) => {
    if (feedback) return;
    if (name === question.correct.name) {
      setFeedback("correct");
      addStar();
      setScore((s) => s + 1);
      speakWord(`Correct! It is a ${question.correct.name}!`);
      setTimeout(() => {
        setFeedback(null);
        if (qNum + 1 >= 10) setDone(true);
        else {
          setQNum((q) => q + 1);
          setQuestion(generateQ(animalSounds));
        }
      }, 1500);
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
    setQuestion(generateQ(animalSounds));
  };

  return (
    <GameLayout
      title="Animal Sound"
      emoji="🔊"
      color="oklch(50% 0.22 50)"
      onBack={onBack}
    >
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-6 py-12"
            data-ocid="animalsound.success_state"
          >
            <span className="text-8xl">🏆</span>
            <h2 className="font-display text-4xl font-extrabold text-[oklch(40%_0.22_50)]">
              Shabaash! 🎉
            </h2>
            <p className="font-body text-2xl text-muted-foreground">
              Score: {score} / 10
            </p>
            <motion.button
              data-ocid="animalsound.restart.button"
              whileTap={{ scale: 0.95 }}
              onClick={restart}
              className="bg-[oklch(95%_0.12_50)] border-4 border-[oklch(68%_0.22_50)] shadow-[0_5px_0_0_oklch(58%_0.22_50)] rounded-3xl px-8 py-4 font-display text-xl font-extrabold text-[oklch(32%_0.22_50)] active:shadow-none active:translate-y-1 transition-all"
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
            <motion.div
              className="rounded-3xl border-4 border-[oklch(68%_0.22_50)] bg-[oklch(96%_0.12_50)] p-6 flex flex-col items-center gap-4 w-full max-w-sm cursor-pointer"
              whileTap={{ scale: 0.97 }}
              onClick={() => speakWord(question.correct.clue)}
              data-ocid="animalsound.clue.button"
            >
              <span className="text-5xl">🔊</span>
              <p className="font-body text-lg font-bold text-[oklch(32%_0.22_50)] text-center">
                {question.correct.clue}
              </p>
              <p className="font-body text-xs text-muted-foreground">
                (Tap to hear again)
              </p>
            </motion.div>
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              {question.choices.map((animal, i) => (
                <motion.button
                  key={animal.name}
                  data-ocid={`animalsound.option.${i + 1}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => handleAnswer(animal.name)}
                  className={`flex flex-col items-center gap-2 rounded-3xl border-4 p-5 active:shadow-none active:translate-y-1 transition-all ${
                    feedback === "correct" &&
                    animal.name === question.correct.name
                      ? "bg-[oklch(92%_0.15_145)] border-[oklch(58%_0.22_145)] shadow-[0_5px_0_0_oklch(48%_0.22_145)]"
                      : "bg-[oklch(95%_0.12_50)] border-[oklch(68%_0.22_50)] shadow-[0_5px_0_0_oklch(58%_0.22_50)]"
                  }`}
                >
                  <span className="text-5xl">{animal.emoji}</span>
                  <span className="font-display text-sm font-extrabold text-[oklch(32%_0.22_50)]">
                    {animal.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GameLayout>
  );
}
