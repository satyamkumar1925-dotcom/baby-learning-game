import { motion } from "motion/react";
import { addStar } from "../utils/stars";
import GameLayout from "./GameLayout";

function speak(text: string, lang = "hi-IN") {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.8;
  utterance.pitch = 1.2;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

const matras = [
  {
    char: "अ",
    roman: "A",
    example: "अनार",
    meaning: "Pomegranate",
    speech: "अ, अनार",
  },
  { char: "आ", roman: "Aa", example: "आम", meaning: "Mango", speech: "आ, आम" },
  {
    char: "इ",
    roman: "I",
    example: "इमली",
    meaning: "Tamarind",
    speech: "इ, इमली",
  },
  {
    char: "ई",
    roman: "Ee",
    example: "ईख",
    meaning: "Sugarcane",
    speech: "ई, ईख",
  },
  { char: "उ", roman: "U", example: "उल्लू", meaning: "Owl", speech: "उ, उल्लू" },
  { char: "ऊ", roman: "Oo", example: "ऊन", meaning: "Wool", speech: "ऊ, ऊन" },
  { char: "ए", roman: "E", example: "एड़ी", meaning: "Heel", speech: "ए, एड़ी" },
  {
    char: "ऐ",
    roman: "Ai",
    example: "ऐनक",
    meaning: "Glasses",
    speech: "ऐ, ऐनक",
  },
  { char: "ओ", roman: "O", example: "ओस", meaning: "Dew", speech: "ओ, ओस" },
  {
    char: "औ",
    roman: "Au",
    example: "औजार",
    meaning: "Tool",
    speech: "औ, औजार",
  },
  {
    char: "अं",
    roman: "An",
    example: "अंगूर",
    meaning: "Grapes",
    speech: "अं, अंगूर",
  },
  {
    char: "अः",
    roman: "Ah",
    example: "प्रातः",
    meaning: "Morning",
    speech: "अः, प्रातः",
  },
];

const cardColors = [
  {
    bg: "bg-[oklch(95%_0.12_27)]",
    border: "border-[oklch(65%_0.22_27)]",
    shadow: "shadow-[0_6px_0_0_oklch(55%_0.22_27)]",
    text: "text-[oklch(30%_0.22_27)]",
  },
  {
    bg: "bg-[oklch(95%_0.12_250)]",
    border: "border-[oklch(60%_0.2_250)]",
    shadow: "shadow-[0_6px_0_0_oklch(50%_0.2_250)]",
    text: "text-[oklch(25%_0.2_250)]",
  },
  {
    bg: "bg-[oklch(96%_0.12_145)]",
    border: "border-[oklch(58%_0.22_145)]",
    shadow: "shadow-[0_6px_0_0_oklch(48%_0.22_145)]",
    text: "text-[oklch(28%_0.22_145)]",
  },
  {
    bg: "bg-[oklch(95%_0.12_300)]",
    border: "border-[oklch(60%_0.22_300)]",
    shadow: "shadow-[0_6px_0_0_oklch(50%_0.22_300)]",
    text: "text-[oklch(28%_0.22_300)]",
  },
  {
    bg: "bg-[oklch(96%_0.12_50)]",
    border: "border-[oklch(68%_0.22_50)]",
    shadow: "shadow-[0_6px_0_0_oklch(58%_0.22_50)]",
    text: "text-[oklch(32%_0.22_50)]",
  },
  {
    bg: "bg-[oklch(95%_0.12_190)]",
    border: "border-[oklch(60%_0.18_190)]",
    shadow: "shadow-[0_6px_0_0_oklch(50%_0.18_190)]",
    text: "text-[oklch(28%_0.18_190)]",
  },
];

export default function MatraGame({ onBack }: { onBack: () => void }) {
  return (
    <GameLayout
      title="Matra"
      emoji="अ"
      color="oklch(55% 0.22 27)"
      onBack={onBack}
    >
      <p className="font-body text-center text-lg text-muted-foreground mb-6 font-semibold">
        Tap a matra to hear it! / मात्रा टैप करें!
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {matras.map((m, i) => {
          const c = cardColors[i % cardColors.length];
          return (
            <motion.button
              key={m.char}
              data-ocid={`matra.item.${i + 1}`}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, ease: [0.34, 1.56, 0.64, 1] }}
              whileHover={{ scale: 1.06, y: -4 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => {
                speak(m.speech);
                addStar();
              }}
              className={`${c.bg} ${c.border} ${c.shadow} border-4 rounded-3xl p-5 flex flex-col items-center gap-2 active:shadow-none active:translate-y-1 transition-all duration-150`}
            >
              <span
                className={`font-display text-6xl font-extrabold leading-none ${c.text}`}
              >
                {m.char}
              </span>
              <span className="font-body text-sm font-bold text-muted-foreground">
                {m.roman}
              </span>
              <div className="flex flex-col items-center">
                <span
                  className={`font-display text-xl font-extrabold ${c.text}`}
                >
                  {m.example}
                </span>
                <span className="font-body text-xs text-muted-foreground">
                  {m.meaning}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </GameLayout>
  );
}
