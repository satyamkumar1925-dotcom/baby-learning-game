import { useState } from "react";
import { speakWithSpelling } from "../utils/speech";
import { addStar } from "../utils/stars";
import GameLayout from "./GameLayout";
import LearningCard from "./LearningCard";
import LevelSelector from "./LevelSelector";

const animals = [
  { emoji: "🐶", name: "Dog", hindi: "कुत्ता" },
  { emoji: "🐱", name: "Cat", hindi: "बिल्ली" },
  { emoji: "🐘", name: "Elephant", hindi: "हाथी" },
  { emoji: "🦁", name: "Lion", hindi: "शेर" },
  { emoji: "🐯", name: "Tiger", hindi: "बाघ" },
  { emoji: "🐒", name: "Monkey", hindi: "बंदर" },
  { emoji: "🐄", name: "Cow", hindi: "गाय" },
  { emoji: "🦬", name: "Buffalo", hindi: "भैंस" },
  { emoji: "🐴", name: "Horse", hindi: "घोड़ा" },
  { emoji: "🐐", name: "Goat", hindi: "बकरी" },
  { emoji: "🐑", name: "Sheep", hindi: "भेड़" },
  { emoji: "🐷", name: "Pig", hindi: "सूअर" },
  { emoji: "🐰", name: "Rabbit", hindi: "खरगोश" },
  { emoji: "🦆", name: "Duck", hindi: "बत्तख" },
  { emoji: "🐔", name: "Hen", hindi: "मुर्गी" },
  { emoji: "🦜", name: "Parrot", hindi: "तोता" },
  { emoji: "🦚", name: "Peacock", hindi: "मोर" },
  { emoji: "🐸", name: "Frog", hindi: "मेंढक" },
  { emoji: "🐟", name: "Fish", hindi: "मछली" },
  { emoji: "🐬", name: "Dolphin", hindi: "डॉल्फिन" },
  { emoji: "🐳", name: "Whale", hindi: "व्हेल" },
  { emoji: "🐻", name: "Bear", hindi: "भालू" },
  { emoji: "🦊", name: "Fox", hindi: "लोमड़ी" },
  { emoji: "🦌", name: "Deer", hindi: "हिरण" },
  { emoji: "🐪", name: "Camel", hindi: "ऊँट" },
  { emoji: "🦒", name: "Giraffe", hindi: "जिराफ" },
  { emoji: "🦓", name: "Zebra", hindi: "ज़ेबरा" },
  { emoji: "🦏", name: "Rhino", hindi: "गैंडा" },
];

const cardColors = [
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
  {
    bg: "bg-[oklch(95%_0.12_190)]",
    border: "border-[oklch(60%_0.18_190)]",
    shadow: "shadow-[0_5px_0_0_oklch(50%_0.18_190)]",
    text: "text-[oklch(28%_0.18_190)]",
  },
];

type Level = "easy" | "medium" | "hard";

export default function AnimalsGame({ onBack }: { onBack: () => void }) {
  const [level, setLevel] = useState<Level | null>(null);
  const items =
    level === "easy"
      ? animals.slice(0, 8)
      : level === "medium"
        ? animals.slice(0, 16)
        : animals;

  return (
    <GameLayout
      title="Animals"
      emoji="🐾"
      color="oklch(50% 0.22 27)"
      onBack={level ? () => setLevel(null) : onBack}
    >
      {!level ? (
        <LevelSelector onSelect={setLevel} title="Animals" emoji="🐾" />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map((item, i) => {
            const c = cardColors[i % cardColors.length];
            return (
              <LearningCard
                key={item.name}
                ocid={`animals.item.${i + 1}`}
                mainContent={item.emoji}
                label={item.name}
                labelHindi={item.hindi}
                bg={c.bg}
                border={c.border}
                shadow={c.shadow}
                textColor={c.text}
                onTap={() => {
                  speakWithSpelling(item.name, item.hindi);
                  addStar();
                }}
              />
            );
          })}
        </div>
      )}
    </GameLayout>
  );
}
