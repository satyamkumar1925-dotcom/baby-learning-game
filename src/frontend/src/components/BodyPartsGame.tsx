import { useState } from "react";
import { speakWithSpelling } from "../utils/speech";
import { addStar } from "../utils/stars";
import GameLayout from "./GameLayout";
import LearningCard from "./LearningCard";
import LevelSelector from "./LevelSelector";

const bodyParts = [
  { emoji: "🤷", name: "Head", hindi: "सिर" },
  { emoji: "💇", name: "Hair", hindi: "बाल" },
  { emoji: "👁️", name: "Eye", hindi: "आँख" },
  { emoji: "👂", name: "Ear", hindi: "कान" },
  { emoji: "👃", name: "Nose", hindi: "नाक" },
  { emoji: "👄", name: "Mouth", hindi: "मुँह" },
  { emoji: "🦷", name: "Teeth", hindi: "दाँत" },
  { emoji: "👅", name: "Tongue", hindi: "जीभ" },
  { emoji: "💪", name: "Arm", hindi: "बाँह" },
  { emoji: "✋", name: "Hand", hindi: "हाथ" },
  { emoji: "👆", name: "Finger", hindi: "उँगली" },
  { emoji: "💅", name: "Nail", hindi: "नाखून" },
  { emoji: "🦵", name: "Leg", hindi: "टाँग" },
  { emoji: "👣", name: "Foot", hindi: "पाँव" },
  { emoji: "❤️", name: "Heart", hindi: "दिल" },
  { emoji: "🧠", name: "Brain", hindi: "दिमाग" },
  { emoji: "🫁", name: "Lungs", hindi: "फेफड़े" },
  { emoji: "🦴", name: "Bone", hindi: "हड्डी" },
  { emoji: "🫀", name: "Stomach", hindi: "पेट" },
  { emoji: "🙁", name: "Face", hindi: "चेहरा" },
  { emoji: "💪", name: "Shoulder", hindi: "कंधा" },
  { emoji: "💪", name: "Elbow", hindi: "कोहनी" },
  { emoji: "🦶", name: "Toe", hindi: "पैर की उँगली" },
  { emoji: "🦵", name: "Knee", hindi: "घुटना" },
  { emoji: "🫸", name: "Palm", hindi: "हथेली" },
];

const cardColors = [
  {
    bg: "bg-[oklch(95%_0.12_27)]",
    border: "border-[oklch(65%_0.22_27)]",
    shadow: "shadow-[0_5px_0_0_oklch(55%_0.22_27)]",
    text: "text-[oklch(30%_0.22_27)]",
  },
  {
    bg: "bg-[oklch(95%_0.12_300)]",
    border: "border-[oklch(60%_0.22_300)]",
    shadow: "shadow-[0_5px_0_0_oklch(50%_0.22_300)]",
    text: "text-[oklch(28%_0.22_300)]",
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
    bg: "bg-[oklch(96%_0.14_90)]",
    border: "border-[oklch(70%_0.22_90)]",
    shadow: "shadow-[0_5px_0_0_oklch(60%_0.22_90)]",
    text: "text-[oklch(35%_0.22_90)]",
  },
];

type Level = "easy" | "medium" | "hard";

export default function BodyPartsGame({ onBack }: { onBack: () => void }) {
  const [level, setLevel] = useState<Level | null>(null);
  const items =
    level === "easy"
      ? bodyParts.slice(0, 8)
      : level === "medium"
        ? bodyParts.slice(0, 16)
        : bodyParts;

  return (
    <GameLayout
      title="Body Parts"
      emoji="💪"
      color="oklch(50% 0.22 27)"
      onBack={level ? () => setLevel(null) : onBack}
    >
      {!level ? (
        <LevelSelector onSelect={setLevel} title="Body Parts" emoji="💪" />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map((item, i) => {
            const c = cardColors[i % cardColors.length];
            return (
              <LearningCard
                key={`${item.name}-${i}`}
                ocid={`bodyparts.item.${i + 1}`}
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
