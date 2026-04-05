import { motion } from "motion/react";

type Level = "easy" | "medium" | "hard";

interface LevelSelectorProps {
  onSelect: (level: Level) => void;
  title: string;
  emoji: string;
}

const levels = [
  {
    id: "easy" as Level,
    label: "Easy",
    hindi: "आसान",
    stars: "🌟",
    desc: "8 cards",
    bg: "bg-[oklch(95%_0.12_145)]",
    border: "border-[oklch(60%_0.22_145)]",
    shadow: "shadow-[0_6px_0_0_oklch(50%_0.22_145)]",
    text: "text-[oklch(28%_0.22_145)]",
  },
  {
    id: "medium" as Level,
    label: "Medium",
    hindi: "मध्यम",
    stars: "⭐⭐",
    desc: "16 cards",
    bg: "bg-[oklch(95%_0.12_50)]",
    border: "border-[oklch(68%_0.22_50)]",
    shadow: "shadow-[0_6px_0_0_oklch(58%_0.22_50)]",
    text: "text-[oklch(32%_0.22_50)]",
  },
  {
    id: "hard" as Level,
    label: "Hard",
    hindi: "कठिन",
    stars: "🏆",
    desc: "All cards",
    bg: "bg-[oklch(95%_0.12_27)]",
    border: "border-[oklch(65%_0.22_27)]",
    shadow: "shadow-[0_6px_0_0_oklch(55%_0.22_27)]",
    text: "text-[oklch(30%_0.22_27)]",
  },
];

export default function LevelSelector({
  onSelect,
  title,
  emoji,
}: LevelSelectorProps) {
  return (
    <div className="flex flex-col items-center gap-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-2"
      >
        <span className="text-7xl">{emoji}</span>
        <h2 className="font-display text-4xl font-extrabold text-[oklch(35%_0.18_250)]">
          {title}
        </h2>
        <p className="font-body text-lg text-muted-foreground font-medium">
          Level chuno / स्तर चुनें
        </p>
      </motion.div>
      <div className="flex flex-col gap-4 w-full max-w-xs">
        {levels.map((level, i) => (
          <motion.button
            key={level.id}
            data-ocid={`level.${level.id}.button`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
            whileHover={{ scale: 1.04, x: 4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(level.id)}
            className={`flex items-center justify-between rounded-3xl border-4 px-6 py-4 cursor-pointer active:shadow-none active:translate-y-1 transition-all ${level.bg} ${level.border} ${level.shadow}`}
          >
            <div className="flex flex-col items-start gap-0.5">
              <span
                className={`font-display text-2xl font-extrabold ${level.text}`}
              >
                {level.label}
              </span>
              <span className="font-body text-sm text-muted-foreground">
                {level.hindi} • {level.desc}
              </span>
            </div>
            <span className="text-3xl">{level.stars}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
