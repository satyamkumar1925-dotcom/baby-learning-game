import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useActor } from "../hooks/useActor";
import {
  getAvatar,
  getBadges,
  getStars,
  getStreak,
} from "../utils/localProgress";

const BADGE_META: Record<string, { emoji: string; label: string }> = {
  first_star: { emoji: "⭐", label: "First Star" },
  streak_3: { emoji: "🔥", label: "3 Day Streak" },
  streak_7: { emoji: "🏆", label: "7 Day Streak" },
  stars_50: { emoji: "💎", label: "50 Stars" },
  stars_100: { emoji: "👑", label: "100 Stars" },
  all_rounder: { emoji: "🌈", label: "All Rounder" },
};

interface ParentDashboardProps {
  onBack: () => void;
}

export default function ParentDashboard({ onBack }: ParentDashboardProps) {
  const { actor, isFetching } = useActor();

  const { data: profile } = useQuery({
    queryKey: ["currentUserProfile"],
    queryFn: async () => {
      if (!actor) return null;
      const res = await actor.getCallerUserProfile();
      return res ?? null;
    },
    enabled: !!actor && !isFetching,
  });

  const totalStars = getStars();
  const { current: currentStreak, max: maxStreak } = getStreak();
  const badges = getBadges();
  const avatar = getAvatar();

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8 bg-dots">
      <motion.div
        data-ocid="dashboard.panel"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        className="w-full max-w-md flex flex-col gap-5"
      >
        <div className="flex items-center gap-3">
          <motion.button
            data-ocid="dashboard.back.button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.93 }}
            onClick={onBack}
            className="text-2xl bg-white rounded-2xl border-4 border-[oklch(80%_0.1_250)] shadow-[0_4px_0_0_oklch(65%_0.15_250)] px-4 py-2 font-display font-bold text-[oklch(45%_0.2_250)] active:shadow-none active:translate-y-1 transition-all"
          >
            ← Back
          </motion.button>
          <h2 className="font-display text-3xl font-extrabold text-[oklch(40%_0.2_250)]">
            📊 Parent Dashboard
          </h2>
        </div>

        <div className="bg-white rounded-3xl border-4 border-[oklch(80%_0.15_50)] shadow-[0_8px_0_0_oklch(65%_0.2_50)] p-6 flex items-center gap-5">
          <div className="text-6xl">{avatar}</div>
          <div>
            <div className="font-display text-2xl font-extrabold text-[oklch(35%_0.2_50)]">
              {profile?.name ?? "Little Learner"}
            </div>
            <div className="font-body text-sm text-muted-foreground mt-0.5">
              सुपर स्टार बच्चा! 🌟
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            {
              label: "Total Stars",
              value: totalStars,
              emoji: "⭐",
              color: "50",
            },
            { label: "Streak", value: currentStreak, emoji: "🔥", color: "27" },
            {
              label: "Best Streak",
              value: maxStreak,
              emoji: "🏆",
              color: "145",
            },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="bg-white rounded-2xl border-4 p-4 text-center flex flex-col gap-1"
              style={{
                borderColor: `oklch(75% 0.18 ${stat.color})`,
                boxShadow: `0 5px 0 0 oklch(60% 0.2 ${stat.color})`,
              }}
            >
              <div className="text-3xl">{stat.emoji}</div>
              <div
                className="font-display text-2xl font-extrabold"
                style={{ color: `oklch(35% 0.22 ${stat.color})` }}
              >
                {stat.value}
              </div>
              <div className="font-body text-xs text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-white rounded-3xl border-4 border-[oklch(80%_0.15_300)] shadow-[0_8px_0_0_oklch(65%_0.2_300)] p-6">
          <h3 className="font-display text-xl font-extrabold text-[oklch(45%_0.2_300)] mb-4">
            🏅 Badges / बैज
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(BADGE_META).map(([key, meta]) => {
              const earned = badges.includes(key);
              return (
                <div
                  key={key}
                  className={`flex flex-col items-center gap-1 rounded-2xl border-4 p-3 transition-all ${
                    earned
                      ? "border-[oklch(75%_0.2_50)] bg-[oklch(95%_0.1_50)]"
                      : "border-[oklch(88%_0.04_80)] bg-[oklch(96%_0.01_80)] opacity-40"
                  }`}
                >
                  <div className="text-2xl">{meta.emoji}</div>
                  <div className="font-display text-xs font-bold text-center text-foreground leading-tight">
                    {meta.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
