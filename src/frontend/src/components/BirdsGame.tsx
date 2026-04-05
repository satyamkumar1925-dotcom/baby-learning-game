import { useState } from "react";
import { speakWithSpelling } from "../utils/speech";
import { addStar } from "../utils/stars";
import GameLayout from "./GameLayout";
import LearningCard from "./LearningCard";
import LevelSelector from "./LevelSelector";

const birds = [
  { emoji: "🦜", name: "Parrot", hindi: "तोता" },
  { emoji: "🦚", name: "Peacock", hindi: "मोर" },
  { emoji: "🦉", name: "Owl", hindi: "उल्लू" },
  { emoji: "🦅", name: "Eagle", hindi: "बाज" },
  { emoji: "🐦", name: "Sparrow", hindi: "गौरैया" },
  { emoji: "🕊️", name: "Pigeon", hindi: "कबूतर" },
  { emoji: "🐦‍⬛", name: "Crow", hindi: "कौवा" },
  { emoji: "🦢", name: "Swan", hindi: "हंस" },
  { emoji: "🦩", name: "Flamingo", hindi: "फ्लेमिंगो" },
  { emoji: "🐧", name: "Penguin", hindi: "पेंगुइन" },
  { emoji: "🦤", name: "Ostrich", hindi: "शुतुरमुर्ग" },
  { emoji: "🦆", name: "Duck", hindi: "बत्तख" },
  { emoji: "🐔", name: "Hen", hindi: "मुर्गी" },
  { emoji: "🐓", name: "Rooster", hindi: "मुर्गा" },
  { emoji: "🦅", name: "Hawk", hindi: "शिकरा" },
  { emoji: "🦅", name: "Vulture", hindi: "गिद्ध" },
  { emoji: "🦢", name: "Crane", hindi: "सारस" },
  { emoji: "🦜", name: "Macaw", hindi: "मकाऊ" },
  { emoji: "🐦", name: "Robin", hindi: "रॉबिन" },
  { emoji: "🐦", name: "Finch", hindi: "फिंच" },
  { emoji: "🐦", name: "Kingfisher", hindi: "किंगफिशर" },
  { emoji: "🐦", name: "Woodpecker", hindi: "कठफोड़वा" },
  { emoji: "🐦", name: "Hummingbird", hindi: "हमिंगबर्ड" },
  { emoji: "🦩", name: "Stork", hindi: "सारस" },
  { emoji: "🐦", name: "Swallow", hindi: "अबाबील" },
];

const cardColors = [
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
    bg: "bg-[oklch(95%_0.12_27)]",
    border: "border-[oklch(65%_0.22_27)]",
    shadow: "shadow-[0_5px_0_0_oklch(55%_0.22_27)]",
    text: "text-[oklch(30%_0.22_27)]",
  },
  {
    bg: "bg-[oklch(96%_0.12_145)]",
    border: "border-[oklch(60%_0.22_145)]",
    shadow: "shadow-[0_5px_0_0_oklch(50%_0.22_145)]",
    text: "text-[oklch(30%_0.22_145)]",
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
    bg: "bg-[oklch(96%_0.14_90)]",
    border: "border-[oklch(70%_0.22_90)]",
    shadow: "shadow-[0_5px_0_0_oklch(60%_0.22_90)]",
    text: "text-[oklch(35%_0.22_90)]",
  },
];

type Level = "easy" | "medium" | "hard";

export default function BirdsGame({ onBack }: { onBack: () => void }) {
  const [level, setLevel] = useState<Level | null>(null);
  const items =
    level === "easy"
      ? birds.slice(0, 8)
      : level === "medium"
        ? birds.slice(0, 16)
        : birds;

  return (
    <GameLayout
      title="Birds"
      emoji="🦅"
      color="oklch(50% 0.18 190)"
      onBack={level ? () => setLevel(null) : onBack}
    >
      {!level ? (
        <LevelSelector onSelect={setLevel} title="Birds" emoji="🦅" />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map((item, i) => {
            const c = cardColors[i % cardColors.length];
            return (
              <LearningCard
                key={`${item.name}-${i}`}
                ocid={`birds.item.${i + 1}`}
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
