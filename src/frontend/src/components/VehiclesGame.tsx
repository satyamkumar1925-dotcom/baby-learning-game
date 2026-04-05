import { useState } from "react";
import { speakWithSpelling } from "../utils/speech";
import { addStar } from "../utils/stars";
import GameLayout from "./GameLayout";
import LearningCard from "./LearningCard";
import LevelSelector from "./LevelSelector";

const vehicles = [
  { emoji: "🚗", name: "Car", hindi: "कार" },
  { emoji: "🚌", name: "Bus", hindi: "बस" },
  { emoji: "🚛", name: "Truck", hindi: "ट्रक" },
  { emoji: "🚲", name: "Bicycle", hindi: "साइकिल" },
  { emoji: "🏍️", name: "Motorcycle", hindi: "मोटरसाइकिल" },
  { emoji: "🚂", name: "Train", hindi: "रेलगाड़ी" },
  { emoji: "✈️", name: "Airplane", hindi: "हवाई जहाज" },
  { emoji: "🚁", name: "Helicopter", hindi: "हेलीकॉप्टर" },
  { emoji: "🚢", name: "Ship", hindi: "जहाज" },
  { emoji: "⛵", name: "Boat", hindi: "नाव" },
  { emoji: "🚜", name: "Tractor", hindi: "ट्रैक्टर" },
  { emoji: "🛺", name: "Auto Rickshaw", hindi: "ऑटो रिक्शा" },
  { emoji: "🛵", name: "Scooter", hindi: "स्कूटर" },
  { emoji: "🚑", name: "Ambulance", hindi: "एम्बुलेंस" },
  { emoji: "🚒", name: "Fire Truck", hindi: "दमकल" },
  { emoji: "🚔", name: "Police Car", hindi: "पुलिस कार" },
  { emoji: "🚕", name: "Taxi", hindi: "टैक्सी" },
  { emoji: "🚐", name: "Van", hindi: "वैन" },
  { emoji: "🚀", name: "Rocket", hindi: "रॉकेट" },
  { emoji: "🛥️", name: "Ferry", hindi: "फेरी" },
  { emoji: "🚡", name: "Cable Car", hindi: "केबल कार" },
  { emoji: "🚝", name: "Monorail", hindi: "मोनोरेल" },
  { emoji: "🎈", name: "Hot Air Balloon", hindi: "गर्म हवा का गुब्बारा" },
  { emoji: "🛸", name: "UFO", hindi: "यूएफओ" },
  { emoji: "🚠", name: "Mountain Rail", hindi: "पहाड़ी रेल" },
];

const cardColors = [
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

export default function VehiclesGame({ onBack }: { onBack: () => void }) {
  const [level, setLevel] = useState<Level | null>(null);
  const items =
    level === "easy"
      ? vehicles.slice(0, 8)
      : level === "medium"
        ? vehicles.slice(0, 16)
        : vehicles;

  return (
    <GameLayout
      title="Vehicles"
      emoji="🚗"
      color="oklch(50% 0.2 250)"
      onBack={level ? () => setLevel(null) : onBack}
    >
      {!level ? (
        <LevelSelector onSelect={setLevel} title="Vehicles" emoji="🚗" />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map((item, i) => {
            const c = cardColors[i % cardColors.length];
            return (
              <LearningCard
                key={`${item.name}-${i}`}
                ocid={`vehicles.item.${i + 1}`}
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
