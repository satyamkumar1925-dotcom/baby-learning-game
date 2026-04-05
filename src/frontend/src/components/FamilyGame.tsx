import { useState } from "react";
import { speakWithSpelling } from "../utils/speech";
import { addStar } from "../utils/stars";
import GameLayout from "./GameLayout";
import LearningCard from "./LearningCard";
import LevelSelector from "./LevelSelector";

const familyMembers = [
  { emoji: "👩", name: "Mom", hindi: "माँ" },
  { emoji: "👨", name: "Dad", hindi: "पिताजी" },
  { emoji: "👴", name: "Dada", hindi: "दादा" },
  { emoji: "👵", name: "Dadi", hindi: "दादी" },
  { emoji: "👴", name: "Nana", hindi: "नाना" },
  { emoji: "👵", name: "Nani", hindi: "नानी" },
  { emoji: "🧔", name: "Chacha", hindi: "चाचा" },
  { emoji: "👩", name: "Chachi", hindi: "चाची" },
  { emoji: "🧔", name: "Mama", hindi: "मामा" },
  { emoji: "👩", name: "Mami", hindi: "मामी" },
  { emoji: "👩", name: "Bua", hindi: "बुआ" },
  { emoji: "🧔", name: "Fufa", hindi: "फूफा" },
  { emoji: "👦", name: "Bhaiya", hindi: "भैया" },
  { emoji: "👧", name: "Didi", hindi: "दीदी" },
  { emoji: "👶", name: "Baby", hindi: "बेबी" },
  { emoji: "👨‍👩‍👧‍👦", name: "Family", hindi: "परिवार" },
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

export default function FamilyGame({ onBack }: { onBack: () => void }) {
  const [level, setLevel] = useState<Level | null>(null);
  const items =
    level === "easy"
      ? familyMembers.slice(0, 6)
      : level === "medium"
        ? familyMembers.slice(0, 12)
        : familyMembers;

  return (
    <GameLayout
      title="Family Members"
      emoji="👨‍👩‍👧‍👦"
      color="oklch(50% 0.22 300)"
      onBack={level ? () => setLevel(null) : onBack}
    >
      {!level ? (
        <LevelSelector
          onSelect={setLevel}
          title="Family Members"
          emoji="👨‍👩‍👧‍👦"
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map((item, i) => {
            const c = cardColors[i % cardColors.length];
            return (
              <LearningCard
                key={item.name}
                ocid={`family.item.${i + 1}`}
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
