import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface LearningCardProps {
  mainContent: React.ReactNode;
  label: string;
  labelHindi?: string;
  sublabel?: string;
  bg: string;
  border: string;
  shadow: string;
  textColor: string;
  onTap: () => void;
  ocid: string;
  size?: "md" | "lg";
}

export default function LearningCard({
  mainContent,
  label,
  labelHindi,
  sublabel,
  bg,
  border,
  shadow,
  textColor,
  onTap,
  ocid,
  size = "md",
}: LearningCardProps) {
  const [bouncing, setBouncing] = useState(false);
  const [stars, setStars] = useState<number[]>([]);

  const handleTap = () => {
    onTap();
    setBouncing(true);
    setStars(Array.from({ length: 5 }, (_, i) => i));
    setTimeout(() => setBouncing(false), 600);
    setTimeout(() => setStars([]), 1000);
  };

  return (
    <div className="relative">
      <motion.button
        data-ocid={ocid}
        animate={bouncing ? { scale: [1, 1.18, 0.95, 1.06, 1] } : {}}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleTap}
        className={`
          relative w-full flex flex-col items-center justify-center gap-2
          rounded-3xl border-4 cursor-pointer
          transition-shadow duration-150
          ${bg} ${border} ${shadow}
          ${size === "lg" ? "p-6" : "p-4"}
          active:shadow-none
          overflow-hidden
        `}
      >
        <div className={size === "lg" ? "text-7xl" : "text-5xl"}>
          {mainContent}
        </div>
        <span
          className={`font-display font-extrabold leading-tight text-center ${textColor} ${
            size === "lg" ? "text-2xl" : "text-xl"
          }`}
        >
          {label}
        </span>
        {labelHindi && (
          <span
            className={`font-body text-sm font-semibold text-center ${textColor} opacity-75`}
          >
            {labelHindi}
          </span>
        )}
        {sublabel && (
          <span className="font-body text-xs font-medium text-muted-foreground text-center">
            {sublabel}
          </span>
        )}
      </motion.button>

      {/* Star burst effect */}
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
