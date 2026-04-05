import { useEffect, useRef, useState } from "react";
import { speakWord } from "../utils/speech";
import { addStar } from "../utils/stars";
import GameLayout from "./GameLayout";

const fruitList = [
  { emoji: "🍎", name: "Apple" },
  { emoji: "🍌", name: "Banana" },
  { emoji: "🥭", name: "Mango" },
  { emoji: "🍊", name: "Orange" },
  { emoji: "🍇", name: "Grapes" },
  { emoji: "🍓", name: "Strawberry" },
  { emoji: "🍉", name: "Watermelon" },
  { emoji: "🍍", name: "Pineapple" },
];

type FallingFruit = {
  id: number;
  emoji: string;
  name: string;
  x: number;
  y: number;
  speed: number;
};

export default function CatchFruitGame({ onBack }: { onBack: () => void }) {
  const [target, setTarget] = useState(
    () => fruitList[Math.floor(Math.random() * fruitList.length)],
  );
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [fruits, setFruits] = useState<FallingFruit[]>([]);
  const [done, setDone] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const nextId = useRef(0);

  useEffect(() => {
    speakWord(`Catch the ${target.name}!`);
  }, [target]);

  useEffect(() => {
    if (done) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setDone(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [done]);

  useEffect(() => {
    if (done) return;
    const spawn = setInterval(() => {
      const fruit = fruitList[Math.floor(Math.random() * fruitList.length)];
      setFruits((prev) => [
        ...prev.slice(-10),
        {
          id: nextId.current++,
          emoji: fruit.emoji,
          name: fruit.name,
          x: Math.random() * 80 + 5,
          y: 0,
          speed: 1.5 + Math.random() * 2,
        },
      ]);
    }, 800);
    return () => clearInterval(spawn);
  }, [done]);

  useEffect(() => {
    if (done) return;
    const move = setInterval(() => {
      setFruits((prev) =>
        prev.map((f) => ({ ...f, y: f.y + f.speed })).filter((f) => f.y < 110),
      );
    }, 100);
    return () => clearInterval(move);
  }, [done]);

  const catchFruit = (fruit: FallingFruit) => {
    setFruits((prev) => prev.filter((f) => f.id !== fruit.id));
    if (fruit.name === target.name) {
      setFeedback("correct");
      setScore((s) => s + 1);
      addStar();
      speakWord(`Great! ${fruit.name}!`);
      const newTarget = fruitList[Math.floor(Math.random() * fruitList.length)];
      setTarget(newTarget);
      setTimeout(() => setFeedback(null), 600);
    } else {
      setFeedback("wrong");
      speakWord("Wrong fruit!");
      setTimeout(() => setFeedback(null), 600);
    }
  };

  const restart = () => {
    setScore(0);
    setTimeLeft(30);
    setDone(false);
    setFruits([]);
    setTarget(fruitList[Math.floor(Math.random() * fruitList.length)]);
    setFeedback(null);
  };

  return (
    <GameLayout
      title="Catch Fruit"
      emoji="🍎"
      color="oklch(50% 0.22 27)"
      onBack={onBack}
    >
      {done ? (
        <div
          className="flex flex-col items-center gap-6 py-12"
          data-ocid="catchfruit.success_state"
        >
          <span className="text-8xl">🏆</span>
          <h2 className="font-display text-4xl font-extrabold text-[oklch(40%_0.22_27)]">
            Game Over!
          </h2>
          <p className="font-body text-2xl text-muted-foreground">
            Score: {score}
          </p>
          <button
            type="button"
            data-ocid="catchfruit.restart.button"
            onClick={restart}
            className="bg-[oklch(95%_0.12_27)] border-4 border-[oklch(65%_0.22_27)] shadow-[0_5px_0_0_oklch(55%_0.22_27)] rounded-3xl px-8 py-4 font-display text-xl font-extrabold text-[oklch(30%_0.22_27)] active:shadow-none active:translate-y-1 transition-all"
          >
            Play Again 🔄
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-6 items-center">
            <div
              className={`rounded-3xl border-4 border-[oklch(65%_0.22_27)] px-4 py-2 font-body text-lg font-bold ${feedback === "correct" ? "bg-[oklch(92%_0.15_145)]" : feedback === "wrong" ? "bg-[oklch(94%_0.12_27)]" : "bg-[oklch(95%_0.12_27)]"}`}
            >
              Catch: {target.emoji} {target.name}
            </div>
            <div className="rounded-3xl border-4 border-[oklch(60%_0.22_300)] bg-[oklch(95%_0.12_300)] px-4 py-2 font-body text-lg font-bold text-[oklch(28%_0.22_300)]">
              ⏱️ {timeLeft}s
            </div>
            <div className="rounded-3xl border-4 border-[oklch(68%_0.22_50)] bg-[oklch(95%_0.12_50)] px-4 py-2 font-body text-lg font-bold text-[oklch(32%_0.22_50)]">
              ⭐ {score}
            </div>
          </div>
          {/* Game area */}
          <div className="relative w-full max-w-sm h-80 bg-[oklch(97%_0.05_200)] rounded-3xl border-4 border-[oklch(70%_0.1_200)] overflow-hidden">
            {fruits.map((fruit) => (
              <button
                type="button"
                key={fruit.id}
                data-ocid={`catchfruit.fruit.${(fruit.id % 10) + 1}`}
                onClick={() => catchFruit(fruit)}
                style={{
                  position: "absolute",
                  left: `${fruit.x}%`,
                  top: `${fruit.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                className="text-4xl cursor-pointer hover:scale-110 transition-transform"
              >
                {fruit.emoji}
              </button>
            ))}
            {fruits.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-body">
                Fruits will fall here...
              </div>
            )}
          </div>
        </div>
      )}
    </GameLayout>
  );
}
