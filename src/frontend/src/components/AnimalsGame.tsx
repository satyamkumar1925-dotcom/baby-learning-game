import { addStar } from "../utils/stars";
import GameLayout from "./GameLayout";
import LearningCard from "./LearningCard";

const animals = [
  { emoji: "🐶", name: "Dog", hindi: "कुत्ता" },
  { emoji: "🐱", name: "Cat", hindi: "बिल्ली" },
  { emoji: "🦆", name: "Duck", hindi: "बत्तख" },
  { emoji: "🐮", name: "Cow", hindi: "गाय" },
  { emoji: "🐘", name: "Elephant", hindi: "हाथी" },
  { emoji: "🦁", name: "Lion", hindi: "शेर" },
  { emoji: "🐒", name: "Monkey", hindi: "बंदर" },
  { emoji: "🐸", name: "Frog", hindi: "मेंढक" },
  { emoji: "🐦", name: "Bird", hindi: "पक्षी" },
  { emoji: "🐟", name: "Fish", hindi: "मछली" },
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
  {
    bg: "bg-[oklch(96%_0.12_27)]",
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
];

function speak(text: string) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;
  utterance.pitch = 1.2;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

export default function AnimalsGame({ onBack }: { onBack: () => void }) {
  return (
    <GameLayout
      title="Animals"
      emoji="🐾"
      color="oklch(50% 0.22 27)"
      onBack={onBack}
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {animals.map((animal, i) => {
          const c = cardColors[i % cardColors.length];
          return (
            <LearningCard
              key={animal.name}
              ocid={`animals.item.${i + 1}`}
              mainContent={animal.emoji}
              label={animal.name}
              labelHindi={animal.hindi}
              bg={c.bg}
              border={c.border}
              shadow={c.shadow}
              textColor={c.text}
              onTap={() => {
                speak(animal.name);
                addStar();
              }}
            />
          );
        })}
      </div>
    </GameLayout>
  );
}
