import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

interface GameLayoutProps {
  title: string;
  emoji: string;
  color: string;
  onBack: () => void;
  children: React.ReactNode;
}

export default function GameLayout({
  title,
  emoji,
  color,
  onBack,
  children,
}: GameLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 backdrop-blur-sm bg-background/80 border-b border-border">
        <div className="max-w-5xl mx-auto flex items-center gap-4 px-4 py-3">
          <motion.button
            data-ocid="game.back.button"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl border-2 border-border bg-card font-body font-semibold text-foreground hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Home</span>
          </motion.button>
          <div className="flex items-center gap-2 flex-1 justify-center">
            <span className="text-3xl">{emoji}</span>
            <h2
              className="font-display text-2xl sm:text-3xl font-extrabold"
              style={{ color }}
            >
              {title}
            </h2>
          </div>
          <div className="w-20" />
          {/* spacer */}
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
        {children}
      </main>
    </div>
  );
}
