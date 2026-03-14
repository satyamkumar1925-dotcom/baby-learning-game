import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import GameLayout from "./GameLayout";

function speak(text: string) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;
  utterance.pitch = 1.3;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

const BALLOON_COLORS = [
  { bg: "oklch(65% 0.25 27)", border: "oklch(50% 0.25 27)" },
  { bg: "oklch(65% 0.2 250)", border: "oklch(50% 0.2 250)" },
  { bg: "oklch(68% 0.22 145)", border: "oklch(52% 0.22 145)" },
  { bg: "oklch(62% 0.25 340)", border: "oklch(48% 0.25 340)" },
  { bg: "oklch(70% 0.22 50)", border: "oklch(55% 0.22 50)" },
  { bg: "oklch(62% 0.2 190)", border: "oklch(48% 0.2 190)" },
  { bg: "oklch(65% 0.22 300)", border: "oklch(50% 0.22 300)" },
];

const SIZES = [70, 85, 100, 115];

interface Balloon {
  id: number;
  x: number;
  size: number;
  speed: number;
  color: (typeof BALLOON_COLORS)[0];
  popped: boolean;
}

let nextId = 1;

export default function BalloonGame({ onBack }: { onBack: () => void }) {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [score, setScore] = useState(0);
  const [burst, setBurst] = useState<{
    id: number;
    x: number;
    y: number;
  } | null>(null);

  // Spawn balloons
  useEffect(() => {
    const interval = setInterval(() => {
      setBalloons((prev) => {
        // max 8 balloons on screen
        if (prev.filter((b) => !b.popped).length >= 8) return prev;
        return [
          ...prev.slice(-20),
          {
            id: nextId++,
            x: 5 + Math.random() * 80,
            size: SIZES[Math.floor(Math.random() * SIZES.length)],
            speed: 4 + Math.random() * 6,
            color:
              BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
            popped: false,
          },
        ];
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const popBalloon = (id: number, e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setBurst({ id, x: cx, y: cy });
    setTimeout(() => setBurst(null), 600);
    speak("Pop!");
    setBalloons((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b)),
    );
    setScore((s) => s + 1);
  };

  const celebration = score > 0 && score % 10 === 0;

  return (
    <GameLayout
      title="Balloon Pop"
      emoji="🎈"
      color="oklch(52% 0.25 340)"
      onBack={onBack}
    >
      {/* Score */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <div
          data-ocid="balloon.score.panel"
          className="bg-[oklch(95%_0.12_340)] border-4 border-[oklch(62%_0.25_340)] shadow-[0_4px_0_0_oklch(48%_0.25_340)] rounded-2xl px-6 py-3 flex items-center gap-2"
        >
          <span className="text-3xl">🎈</span>
          <span className="font-display text-3xl font-extrabold text-[oklch(30%_0.25_340)]">
            {score}
          </span>
          <span className="font-body text-sm font-semibold text-muted-foreground">
            popped!
          </span>
        </div>
      </div>

      {celebration && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center mb-4 bg-[oklch(95%_0.14_50)] border-4 border-[oklch(68%_0.22_50)] rounded-3xl px-6 py-3"
        >
          <p className="font-display text-2xl font-extrabold text-[oklch(32%_0.22_50)]">
            🎉 Great! / शाबाश!
          </p>
        </motion.div>
      )}

      <p className="font-body text-center text-muted-foreground font-semibold mb-4">
        Tap the balloons! / गुब्बारे फोड़ो!
      </p>

      {/* Play area */}
      <div
        className="relative bg-gradient-to-b from-[oklch(95%_0.08_250)] to-[oklch(90%_0.12_300)] border-4 border-[oklch(72%_0.15_250)] rounded-3xl overflow-hidden"
        style={{ height: 420 }}
      >
        <AnimatePresence>
          {balloons
            .filter((b) => !b.popped)
            .map((b) => (
              <motion.button
                key={b.id}
                data-ocid="balloon.canvas_target"
                initial={{ bottom: -120, opacity: 1 }}
                animate={{ bottom: "110%", opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: b.speed, ease: "linear" }}
                onAnimationComplete={() =>
                  setBalloons((prev) =>
                    prev.map((bl) =>
                      bl.id === b.id ? { ...bl, popped: true } : bl,
                    ),
                  )
                }
                onClick={(e) => popBalloon(b.id, e)}
                style={{
                  position: "absolute",
                  left: `${b.x}%`,
                  width: b.size,
                  height: b.size * 1.2,
                  background: b.color.bg,
                  border: `4px solid ${b.color.border}`,
                  borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: b.size * 0.4,
                  boxShadow: `0 4px 16px 0 ${b.color.border}55`,
                }}
              >
                🎈
              </motion.button>
            ))}
        </AnimatePresence>

        {/* Burst effect */}
        <AnimatePresence>
          {burst && (
            <motion.div
              key={burst.id}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                position: "fixed",
                left: burst.x - 30,
                top: burst.y - 30,
                width: 60,
                height: 60,
                pointerEvents: "none",
                fontSize: 40,
                zIndex: 100,
              }}
            >
              ✨
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </GameLayout>
  );
}
