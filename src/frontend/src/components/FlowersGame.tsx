import { useState } from "react";
import { speakWithSpelling } from "../utils/speech";
import { addStar } from "../utils/stars";
import GameLayout from "./GameLayout";
import LearningCard from "./LearningCard";
import LevelSelector from "./LevelSelector";

const flowers = [
  { emoji: "🌹", name: "Rose", hindi: "गुलाब" },
  { emoji: "🌻", name: "Sunflower", hindi: "सूरजमुखी" },
  { emoji: "🌷", name: "Tulip", hindi: "ट्यूलिप" },
  { emoji: "🪷", name: "Lotus", hindi: "कमल" },
  { emoji: "🌼", name: "Daisy", hindi: "गुलबहार" },
  { emoji: "🌸", name: "Cherry Blossom", hindi: "चेरी ब्लॉसम" },
  { emoji: "🌺", name: "Hibiscus", hindi: "गुड़हल" },
  { emoji: "🌼", name: "Marigold", hindi: "गेंदा" },
  { emoji: "🤍", name: "Jasmine", hindi: "चमेली" },
  { emoji: "💜", name: "Lavender", hindi: "लैवेंडर" },
  { emoji: "🌸", name: "Orchid", hindi: "ऑर्किड" },
  { emoji: "🌸", name: "Lily", hindi: "लिली" },
  { emoji: "🌼", name: "Daffodil", hindi: "डैफोडिल" },
  { emoji: "🌺", name: "Poppy", hindi: "पोस्त" },
  { emoji: "🌸", name: "Magnolia", hindi: "मैग्नोलिया" },
  { emoji: "🌼", name: "Chrysanthemum", hindi: "गुलदाउदी" },
  { emoji: "🌸", name: "Bougainvillea", hindi: "बोगनविलिया" },
  { emoji: "🌸", name: "Dahlia", hindi: "डहेलिया" },
  { emoji: "💜", name: "Violet", hindi: "वायलेट" },
  { emoji: "🌸", name: "Peony", hindi: "पिओनी" },
  { emoji: "🌸", name: "Pansy", hindi: "पैंसी" },
  { emoji: "🌸", name: "Iris", hindi: "आइरिस" },
  { emoji: "🌼", name: "Aster", hindi: "एस्टर" },
  { emoji: "🌸", name: "Zinnia", hindi: "जिनिया" },
  { emoji: "🌸", name: "Cosmos", hindi: "कॉसमॉस" },
];

const cardColors = [
  {
    bg: "bg-[oklch(96%_0.12_340)]",
    border: "border-[oklch(65%_0.22_340)]",
    shadow: "shadow-[0_5px_0_0_oklch(55%_0.22_340)]",
    text: "text-[oklch(30%_0.22_340)]",
  },
  {
    bg: "bg-[oklch(95%_0.12_300)]",
    border: "border-[oklch(60%_0.22_300)]",
    shadow: "shadow-[0_5px_0_0_oklch(50%_0.22_300)]",
    text: "text-[oklch(28%_0.22_300)]",
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
  {
    bg: "bg-[oklch(96%_0.12_145)]",
    border: "border-[oklch(60%_0.22_145)]",
    shadow: "shadow-[0_5px_0_0_oklch(50%_0.22_145)]",
    text: "text-[oklch(30%_0.22_145)]",
  },
  {
    bg: "bg-[oklch(96%_0.14_90)]",
    border: "border-[oklch(70%_0.22_90)]",
    shadow: "shadow-[0_5px_0_0_oklch(60%_0.22_90)]",
    text: "text-[oklch(35%_0.22_90)]",
  },
];

type Level = "easy" | "medium" | "hard";

export default function FlowersGame({ onBack }: { onBack: () => void }) {
  const [level, setLevel] = useState<Level | null>(null);
  const items =
    level === "easy"
      ? flowers.slice(0, 8)
      : level === "medium"
        ? flowers.slice(0, 16)
        : flowers;

  return (
    <GameLayout
      title="Flowers"
      emoji="🌸"
      color="oklch(55% 0.22 340)"
      onBack={level ? () => setLevel(null) : onBack}
    >
      {!level ? (
        <LevelSelector onSelect={setLevel} title="Flowers" emoji="🌸" />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map((item, i) => {
            const c = cardColors[i % cardColors.length];
            return (
              <LearningCard
                key={`${item.name}-${i}`}
                ocid={`flowers.item.${i + 1}`}
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
