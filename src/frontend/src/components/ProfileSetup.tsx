import { useQueryClient } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useState } from "react";
import { useActor } from "../hooks/useActor";
import { setAvatar, updateStreak } from "../utils/localProgress";

const AVATARS = [
  "🐶",
  "🐱",
  "🐸",
  "🦁",
  "🐯",
  "🐻",
  "🦊",
  "🐼",
  "🦄",
  "🐧",
  "🦋",
  "🌸",
];

export default function ProfileSetup() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [avatarEmoji, setAvatarEmoji] = useState(AVATARS[0]);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!actor || !name.trim()) return;
    setSaving(true);
    try {
      await actor.saveCallerUserProfile({ name: name.trim() });
      setAvatar(avatarEmoji);
      updateStreak();
      await queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
    } catch (e) {
      console.error("Failed to save profile", e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-dots">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className="bg-white rounded-[2.5rem] border-4 border-[oklch(80%_0.15_145)] shadow-[0_12px_0_0_oklch(65%_0.2_145)] p-8 max-w-sm w-full flex flex-col gap-6"
      >
        <div className="text-center">
          <div className="text-5xl mb-3">{avatarEmoji}</div>
          <h2 className="font-display text-3xl font-extrabold text-[oklch(40%_0.2_250)]">
            Who's learning?
          </h2>
          <p className="font-body text-sm text-muted-foreground mt-1">
            बच्चे का नाम बताओ! 🎈
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-display font-bold text-[oklch(45%_0.18_250)] text-sm">
            Child's Name / नाम
          </span>
          <input
            data-ocid="profile.name.input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name..."
            maxLength={20}
            className="w-full border-4 border-[oklch(80%_0.12_250)] rounded-2xl px-4 py-3 font-display text-lg font-bold text-foreground bg-[oklch(97%_0.02_250)] focus:outline-none focus:border-[oklch(60%_0.2_250)] transition-colors"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-display font-bold text-[oklch(45%_0.18_250)] text-sm">
            Pick an Avatar / अवतार चुनो
          </span>
          <div className="grid grid-cols-6 gap-2">
            {AVATARS.map((emoji) => (
              <motion.button
                key={emoji}
                data-ocid="profile.avatar.button"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setAvatarEmoji(emoji)}
                className={`text-2xl p-2 rounded-xl transition-all duration-150 ${
                  avatarEmoji === emoji
                    ? "border-4 border-[oklch(60%_0.22_50)] bg-[oklch(94%_0.12_50)] shadow-[0_3px_0_0_oklch(55%_0.22_50)]"
                    : "border-4 border-transparent bg-[oklch(95%_0.03_80)] hover:bg-[oklch(92%_0.06_80)]"
                }`}
              >
                {emoji}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.button
          data-ocid="profile.save.button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95, y: 3 }}
          onClick={handleSave}
          disabled={!name.trim() || saving}
          className="w-full flex items-center justify-center gap-2 bg-[oklch(65%_0.22_145)] hover:bg-[oklch(60%_0.22_145)] disabled:opacity-50 disabled:cursor-not-allowed text-white font-display text-xl font-bold rounded-2xl border-4 border-[oklch(55%_0.22_145)] shadow-[0_6px_0_0_oklch(45%_0.22_145)] active:shadow-none active:translate-y-1.5 px-6 py-3 transition-all duration-150"
        >
          {saving ? "Saving... ⏳" : "Let's Go! 🚀"}
        </motion.button>
      </motion.div>
    </div>
  );
}
