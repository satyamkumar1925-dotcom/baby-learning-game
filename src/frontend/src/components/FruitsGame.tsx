import { useState } from "react";
import { speakWithSpelling } from "../utils/speech";
import { addStar } from "../utils/stars";
import GameLayout from "./GameLayout";
import LearningCard from "./LearningCard";
import LevelSelector from "./LevelSelector";

const fruits = [
  { emoji: "🍎", name: "Apple", hindi: "सेब" },
  { emoji: "🍌", name: "Banana", hindi: "केला" },
  { emoji: "🥭", name: "Mango", hindi: "आम" },
  { emoji: "🍊", name: "Orange", hindi: "संतरा" },
  { emoji: "🍇", name: "Grapes", hindi: "अंगूर" },
  { emoji: "🍓", name: "Strawberry", hindi: "स्ट्रॉबेरी" },
  { emoji: "🍉", name: "Watermelon", hindi: "तरबूज" },
  { emoji: "🍍", name: "Pineapple", hindi: "अनानास" },
  { emoji: "🍈", name: "Papaya", hindi: "पपीता" },
  { emoji: "🍐", name: "Guava", hindi: "अमरूद" },
  { emoji: "🍋", name: "Lemon", hindi: "नींबू" },
  { emoji: "🍒", name: "Cherry", hindi: "चेरी" },
  { emoji: "🍑", name: "Peach", hindi: "आड़ू" },
  { emoji: "🥝", name: "Kiwi", hindi: "कीवी" },
  { emoji: "🥥", name: "Coconut", hindi: "नारियल" },
  { emoji: "🫐", name: "Blueberry", hindi: "ब्लूबेरी" },
  { emoji: "🍏", name: "Custard Apple", hindi: "सीताफल" },
  { emoji: "🍅", name: "Pomegranate", hindi: "अनार" },
  { emoji: "🌴", name: "Date", hindi: "खजूर" },
  { emoji: "🍇", name: "Mulberry", hindi: "शहतूत" },
  { emoji: "🍈", name: "Melon", hindi: "खरबूजा" },
  { emoji: "🍊", name: "Lychee", hindi: "लीची" },
  { emoji: "🍐", name: "Pear", hindi: "नाशपाती" },
  { emoji: "🍑", name: "Plum", hindi: "बेर" },
  { emoji: "🫘", name: "Tamarind", hindi: "इमली" },
  { emoji: "⭐", name: "Starfruit", hindi: "करमबोला" },
  { emoji: "🌵", name: "Dragonfruit", hindi: "ड्रैगनफ्रूट" },
  { emoji: "🍈", name: "Jackfruit", hindi: "कटहल" },
  { emoji: "🫐", name: "Raspberry", hindi: "रसभरी" },
  { emoji: "🍋", name: "Lime", hindi: "चूना" },
];

const cardColors = [
  {
    bg: "bg-[oklch(95%_0.12_27)]",
    border: "border-[oklch(65%_0.22_27)]",
    shadow: "shadow-[0_5px_0_0_oklch(55%_0.22_27)]",
    text: "text-[oklch(30%_0.22_27)]",
  },
  {
    bg: "bg-[oklch(96%_0.14_90)]",
    border: "border-[oklch(70%_0.22_90)]",
    shadow: "shadow-[0_5px_0_0_oklch(60%_0.22_90)]",
    text: "text-[oklch(35%_0.22_90)]",
  },
  {
    bg: "bg-[oklch(95%_0.12_300)]",
    border: "border-[oklch(60%_0.22_300)]",
    shadow: "shadow-[0_5px_0_0_oklch(50%_0.22_300)]",
    text: "text-[oklch(28%_0.22_300)]",
  },
  {
    bg: "bg-[oklch(95%_0.12_145)]",
    border: "border-[oklch(58%_0.22_145)]",
    shadow: "shadow-[0_5px_0_0_oklch(48%_0.22_145)]",
    text: "text-[oklch(28%_0.22_145)]",
  },
  {
    bg: "bg-[oklch(95%_0.12_50)]",
    border: "border-[oklch(68%_0.22_50)]",
    shadow: "shadow-[0_5px_0_0_oklch(58%_0.22_50)]",
    text: "text-[oklch(32%_0.22_50)]",
  },
  {
    bg: "bg-[oklch(96%_0.12_340)]",
    border: "border-[oklch(65%_0.22_340)]",
    shadow: "shadow-[0_5px_0_0_oklch(55%_0.22_340)]",
    text: "text-[oklch(30%_0.22_340)]",
  },
  {
    bg: "bg-[oklch(95%_0.12_190)]",
    border: "border-[oklch(60%_0.18_190)]",
    shadow: "shadow-[0_5px_0_0_oklch(50%_0.18_190)]",
    text: "text-[oklch(28%_0.18_190)]",
  },
  {
    bg: "bg-[oklch(95%_0.12_250)]",
    border: "border-[oklch(60%_0.2_250)]",
    shadow: "shadow-[0_5px_0_0_oklch(50%_0.2_250)]",
    text: "text-[oklch(25%_0.2_250)]",
  },
];

type Level = "easy" | "medium" | "hard";

export default function FruitsGame({ onBack }: { onBack: () => void }) {
  const [level, setLevel] = useState<Level | null>(null);
  const items =
    level === "easy"
      ? fruits.slice(0, 8)
      : level === "medium"
        ? fruits.slice(0, 16)
        : fruits;

  return (
    <GameLayout
      title="Fruits"
      emoji="🍎"
      color="oklch(50% 0.22 27)"
      onBack={level ? () => setLevel(null) : onBack}
    >
      {!level ? (
        <LevelSelector onSelect={setLevel} title="Fruits" emoji="🍎" />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map((item, i) => {
            const c = cardColors[i % cardColors.length];
            return (
              <LearningCard
                key={`${item.name}-${i}`}
                ocid={`fruits.item.${i + 1}`}
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
