import { useState } from "react";
import { speakWithSpelling } from "../utils/speech";
import { addStar } from "../utils/stars";
import GameLayout from "./GameLayout";
import LearningCard from "./LearningCard";
import LevelSelector from "./LevelSelector";

const vegetables = [
  { emoji: "🥔", name: "Potato", hindi: "आलू" },
  { emoji: "🍅", name: "Tomato", hindi: "टमाटर" },
  { emoji: "🧅", name: "Onion", hindi: "प्याज" },
  { emoji: "🧄", name: "Garlic", hindi: "लहसुन" },
  { emoji: "🥕", name: "Carrot", hindi: "गाजर" },
  { emoji: "🫛", name: "Peas", hindi: "मटर" },
  { emoji: "🥬", name: "Spinach", hindi: "पालक" },
  { emoji: "🥦", name: "Broccoli", hindi: "ब्रोकली" },
  { emoji: "🥦", name: "Cauliflower", hindi: "फूलगोभी" },
  { emoji: "🍆", name: "Brinjal", hindi: "बैंगन" },
  { emoji: "🎃", name: "Pumpkin", hindi: "कद्दू" },
  { emoji: "🌽", name: "Corn", hindi: "मक्का" },
  { emoji: "🍄", name: "Mushroom", hindi: "मशरूम" },
  { emoji: "🥒", name: "Cucumber", hindi: "खीरा" },
  { emoji: "🌶️", name: "Chilli", hindi: "मिर्च" },
  { emoji: "🫑", name: "Capsicum", hindi: "शिमला मिर्च" },
  { emoji: "🍠", name: "Sweet Potato", hindi: "शकरकंद" },
  { emoji: "🌿", name: "Ginger", hindi: "अदरक" },
  { emoji: "🌿", name: "Turmeric", hindi: "हल्दी" },
  { emoji: "🫘", name: "Beans", hindi: "सेम" },
  { emoji: "🥒", name: "Bottle Gourd", hindi: "लौकी" },
  { emoji: "🥒", name: "Bitter Gourd", hindi: "करेला" },
  { emoji: "🌿", name: "Lady Finger", hindi: "भिंडी" },
  { emoji: "🥬", name: "Cabbage", hindi: "पत्तागोभी" },
  { emoji: "🌿", name: "Radish", hindi: "मूली" },
];

const cardColors = [
  {
    bg: "bg-[oklch(96%_0.12_145)]",
    border: "border-[oklch(60%_0.22_145)]",
    shadow: "shadow-[0_5px_0_0_oklch(50%_0.22_145)]",
    text: "text-[oklch(30%_0.22_145)]",
  },
  {
    bg: "bg-[oklch(95%_0.12_27)]",
    border: "border-[oklch(65%_0.22_27)]",
    shadow: "shadow-[0_5px_0_0_oklch(55%_0.22_27)]",
    text: "text-[oklch(30%_0.22_27)]",
  },
  {
    bg: "bg-[oklch(95%_0.12_50)]",
    border: "border-[oklch(68%_0.22_50)]",
    shadow: "shadow-[0_5px_0_0_oklch(58%_0.22_50)]",
    text: "text-[oklch(32%_0.22_50)]",
  },
  {
    bg: "bg-[oklch(96%_0.14_90)]",
    border: "border-[oklch(70%_0.22_90)]",
    shadow: "shadow-[0_5px_0_0_oklch(60%_0.22_90)]",
    text: "text-[oklch(35%_0.22_90)]",
  },
  {
    bg: "bg-[oklch(95%_0.12_190)]",
    border: "border-[oklch(60%_0.18_190)]",
    shadow: "shadow-[0_5px_0_0_oklch(50%_0.18_190)]",
    text: "text-[oklch(28%_0.18_190)]",
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
    bg: "bg-[oklch(95%_0.12_250)]",
    border: "border-[oklch(60%_0.2_250)]",
    shadow: "shadow-[0_5px_0_0_oklch(50%_0.2_250)]",
    text: "text-[oklch(25%_0.2_250)]",
  },
];

type Level = "easy" | "medium" | "hard";

export default function VegetablesGame({ onBack }: { onBack: () => void }) {
  const [level, setLevel] = useState<Level | null>(null);
  const items =
    level === "easy"
      ? vegetables.slice(0, 8)
      : level === "medium"
        ? vegetables.slice(0, 16)
        : vegetables;

  return (
    <GameLayout
      title="Vegetables"
      emoji="🥦"
      color="oklch(50% 0.22 145)"
      onBack={level ? () => setLevel(null) : onBack}
    >
      {!level ? (
        <LevelSelector onSelect={setLevel} title="Vegetables" emoji="🥦" />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map((item, i) => {
            const c = cardColors[i % cardColors.length];
            return (
              <LearningCard
                key={`${item.name}-${i}`}
                ocid={`vegetables.item.${i + 1}`}
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
