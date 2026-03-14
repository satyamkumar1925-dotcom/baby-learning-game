import { addStar } from "../utils/stars";
import GameLayout from "./GameLayout";
import LearningCard from "./LearningCard";

const alphabet = [
  { letter: "A", word: "Apple", emoji: "🍎", hindi: "सेब" },
  { letter: "B", word: "Ball", emoji: "⚽", hindi: "गेंद" },
  { letter: "C", word: "Cat", emoji: "🐱", hindi: "बिल्ली" },
  { letter: "D", word: "Dog", emoji: "🐶", hindi: "कुत्ता" },
  { letter: "E", word: "Egg", emoji: "🥚", hindi: "अंडा" },
  { letter: "F", word: "Fish", emoji: "🐟", hindi: "मछली" },
  { letter: "G", word: "Grapes", emoji: "🍇", hindi: "अंगूर" },
  { letter: "H", word: "Hat", emoji: "🎩", hindi: "टोपी" },
  { letter: "I", word: "Ice Cream", emoji: "🍦", hindi: "आइसक्रीम" },
  { letter: "J", word: "Juice", emoji: "🧃", hindi: "जूस" },
  { letter: "K", word: "Kite", emoji: "🪁", hindi: "पतंग" },
  { letter: "L", word: "Lion", emoji: "🦁", hindi: "शेर" },
  { letter: "M", word: "Moon", emoji: "🌙", hindi: "चाँद" },
  { letter: "N", word: "Nest", emoji: "🪺", hindi: "घोंसला" },
  { letter: "O", word: "Orange", emoji: "🍊", hindi: "संतरा" },
  { letter: "P", word: "Pig", emoji: "🐷", hindi: "सूअर" },
  { letter: "Q", word: "Queen", emoji: "👑", hindi: "रानी" },
  { letter: "R", word: "Rainbow", emoji: "🌈", hindi: "इंद्रधनुष" },
  { letter: "S", word: "Sun", emoji: "☀️", hindi: "सूरज" },
  { letter: "T", word: "Tree", emoji: "🌳", hindi: "पेड़" },
  { letter: "U", word: "Umbrella", emoji: "☂️", hindi: "छाता" },
  { letter: "V", word: "Violin", emoji: "🎻", hindi: "वायलिन" },
  { letter: "W", word: "Whale", emoji: "🐳", hindi: "व्हेल" },
  { letter: "X", word: "Xylophone", emoji: "🎵", hindi: "जाइलोफोन" },
  { letter: "Y", word: "Yarn", emoji: "🧶", hindi: "धागा" },
  { letter: "Z", word: "Zebra", emoji: "🦓", hindi: "ज़ेब्रा" },
];

const palette = [
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
    bg: "bg-[oklch(96%_0.14_90)]",
    border: "border-[oklch(70%_0.22_90)]",
    shadow: "shadow-[0_5px_0_0_oklch(60%_0.22_90)]",
    text: "text-[oklch(35%_0.22_90)]",
  },
  {
    bg: "bg-[oklch(95%_0.12_145)]",
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
    bg: "bg-[oklch(96%_0.12_340)]",
    border: "border-[oklch(65%_0.22_340)]",
    shadow: "shadow-[0_5px_0_0_oklch(55%_0.22_340)]",
    text: "text-[oklch(30%_0.22_340)]",
  },
  {
    bg: "bg-[oklch(95%_0.12_50)]",
    border: "border-[oklch(68%_0.22_50)]",
    shadow: "shadow-[0_5px_0_0_oklch(58%_0.22_50)]",
    text: "text-[oklch(32%_0.22_50)]",
  },
];

function speak(text: string) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;
  utterance.pitch = 1.2;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

export default function LettersGame({ onBack }: { onBack: () => void }) {
  return (
    <GameLayout
      title="Letters"
      emoji="🔤"
      color="oklch(45% 0.22 300)"
      onBack={onBack}
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {alphabet.map((item, i) => {
          const c = palette[i % palette.length];
          return (
            <LearningCard
              key={item.letter}
              ocid={`letters.item.${i + 1}`}
              mainContent={
                <div className="flex flex-col items-center gap-1">
                  <span className="text-5xl font-display font-extrabold leading-none">
                    {item.letter}
                  </span>
                  <span className="text-3xl">{item.emoji}</span>
                </div>
              }
              label={item.word}
              labelHindi={item.hindi}
              bg={c.bg}
              border={c.border}
              shadow={c.shadow}
              textColor={c.text}
              onTap={() => {
                speak(`${item.letter}. ${item.word}`);
                addStar();
              }}
            />
          );
        })}
      </div>
    </GameLayout>
  );
}
