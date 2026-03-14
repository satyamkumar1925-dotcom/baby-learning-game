import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { addStar } from "../utils/stars";
import GameLayout from "./GameLayout";

const colors = [
  {
    name: "Red",
    hindi: "लाल",
    bg: "#ef4444",
    border: "#b91c1c",
    textDark: false,
  },
  {
    name: "Blue",
    hindi: "नीला",
    bg: "#3b82f6",
    border: "#1d4ed8",
    textDark: false,
  },
  {
    name: "Yellow",
    hindi: "पीला",
    bg: "#fbbf24",
    border: "#d97706",
    textDark: true,
  },
  {
    name: "Green",
    hindi: "हरा",
    bg: "#22c55e",
    border: "#15803d",
    textDark: false,
  },
  {
    name: "Orange",
    hindi: "नारंगी",
    bg: "#f97316",
    border: "#c2410c",
    textDark: false,
  },
  {
    name: "Purple",
    hindi: "बैंगनी",
    bg: "#a855f7",
    border: "#7e22ce",
    textDark: false,
  },
  {
    name: "Pink",
    hindi: "गुलाबी",
    bg: "#ec4899",
    border: "#be185d",
    textDark: false,
  },
  {
    name: "White",
    hindi: "सफेद",
    bg: "#f8fafc",
    border: "#94a3b8",
    textDark: true,
  },
  {
    name: "Black",
    hindi: "काला",
    bg: "#1e293b",
    border: "#0f172a",
    textDark: false,
  },
  {
    name: "Brown",
    hindi: "भूरा",
    bg: "#92400e",
    border: "#6b2c04",
    textDark: false,
  },
];

function speak(text: string) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;
  utterance.pitch = 1.2;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function ColorCard({
  color,
  index,
}: { color: (typeof colors)[0]; index: number }) {
  const [bouncing, setBouncing] = useState(false);
  const [stars, setStars] = useState<number[]>([]);

  const handleTap = () => {
    speak(color.name);
    addStar();
    setBouncing(true);
    setStars(Array.from({ length: 5 }, (_, i) => i));
    setTimeout(() => setBouncing(false), 600);
    setTimeout(() => setStars([]), 1000);
  };

  return (
    <div className="relative">
      <motion.button
        data-ocid={`colors.item.${index + 1}`}
        animate={bouncing ? { scale: [1, 1.18, 0.95, 1.06, 1] } : {}}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleTap}
        className="relative w-full flex flex-col items-center justify-center gap-2 rounded-3xl border-4 p-5 cursor-pointer overflow-hidden"
        style={{
          backgroundColor: color.bg,
          borderColor: color.border,
          boxShadow: `0 5px 0 0 ${color.border}`,
        }}
      >
        <div
          className="w-14 h-14 rounded-full border-4 shadow-inner"
          style={{
            backgroundColor: color.bg === "#f8fafc" ? "#cbd5e1" : color.bg,
            borderColor: "rgba(255,255,255,0.5)",
          }}
        />
        <span
          className="font-display text-xl font-extrabold leading-tight"
          style={{ color: color.textDark ? "#1e293b" : "#ffffff" }}
        >
          {color.name}
        </span>
        <span
          className="font-body text-sm font-semibold"
          style={{
            color: color.textDark ? "#475569" : "rgba(255,255,255,0.8)",
          }}
        >
          {color.hindi}
        </span>
      </motion.button>
      <AnimatePresence>
        {stars.map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
            animate={{
              opacity: 0,
              scale: 1.5,
              x: Math.cos((i * 2 * Math.PI) / 5) * 50,
              y: Math.sin((i * 2 * Math.PI) / 5) * 50 - 20,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl pointer-events-none"
          >
            ⭐
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default function ColorsGame({ onBack }: { onBack: () => void }) {
  return (
    <GameLayout
      title="Colors"
      emoji="🎨"
      color="oklch(55% 0.2 250)"
      onBack={onBack}
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {colors.map((color, i) => (
          <ColorCard key={color.name} color={color} index={i} />
        ))}
      </div>
    </GameLayout>
  );
}
