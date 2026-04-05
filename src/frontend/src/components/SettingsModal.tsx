import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useSettings } from "../context/SettingsContext";
import type { Difficulty, Language } from "../context/SettingsContext";

const LANGUAGES: { value: Language; label: string; sub: string }[] = [
  { value: "english", label: "English Only", sub: "Only English names" },
  { value: "hindi", label: "Hindi Only", sub: "Sirf Hindi naam" },
  { value: "both", label: "Both", sub: "English + Hindi" },
];

const DIFFICULTIES: {
  value: Difficulty;
  label: string;
  emoji: string;
  sub: string;
}[] = [
  {
    value: "easy",
    label: "Easy",
    emoji: "\u{1F60A}",
    sub: "Aasaan / \u0906\u0938\u093E\u0928",
  },
  {
    value: "medium",
    label: "Medium",
    emoji: "\u{1F642}",
    sub: "Madhyam / \u092E\u0927\u094D\u092F\u092E",
  },
  {
    value: "hard",
    label: "Hard",
    emoji: "\u{1F624}",
    sub: "Kathin / \u0915\u0920\u093F\u0928",
  },
];

export default function SettingsModal() {
  const { settings, updateSettings, isOpen, closeSettings } = useSettings();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="settings-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeSettings}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            key="settings-modal"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ pointerEvents: "none" }}
          >
            <div
              className="relative w-full max-w-sm rounded-3xl border-4 border-[oklch(70%_0.22_250)] bg-white shadow-[0_8px_0_0_oklch(55%_0.22_250)] p-6"
              style={{ pointerEvents: "auto" }}
            >
              <button
                type="button"
                onClick={closeSettings}
                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-[oklch(94%_0.08_250)] border-2 border-[oklch(70%_0.2_250)] hover:bg-[oklch(88%_0.12_250)] transition-colors"
              >
                <X className="w-4 h-4 text-[oklch(40%_0.2_250)]" />
              </button>

              <div className="flex items-center gap-2 mb-6">
                <span className="text-3xl">&#x2699;&#xFE0F;</span>
                <div>
                  <h2 className="font-display text-2xl font-extrabold text-[oklch(35%_0.22_250)]">
                    Settings
                  </h2>
                  <p className="text-xs text-muted-foreground font-body">
                    Settings / \u0938\u0947\u091F\u093F\u0902\u0917\u094D\u0938
                  </p>
                </div>
              </div>

              <div className="mb-5">
                <h3 className="font-display text-base font-bold text-[oklch(40%_0.18_250)] mb-2">
                  &#x1F310; Language / \u092D\u093E\u0937\u093E
                </h3>
                <div className="flex flex-col gap-2">
                  {LANGUAGES.map((lang) => (
                    <button
                      type="button"
                      key={lang.value}
                      onClick={() => updateSettings({ language: lang.value })}
                      className={`flex items-center justify-between px-4 py-2.5 rounded-2xl border-2 transition-all font-body text-sm font-semibold ${
                        settings.language === lang.value
                          ? "border-[oklch(60%_0.22_250)] bg-[oklch(93%_0.1_250)] shadow-[0_3px_0_0_oklch(55%_0.22_250)] text-[oklch(30%_0.22_250)]"
                          : "border-border bg-muted/40 text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <span>{lang.label}</span>
                      <span className="text-xs opacity-70">{lang.sub}</span>
                      {settings.language === lang.value && (
                        <span className="text-base">&#x2705;</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <h3 className="font-display text-base font-bold text-[oklch(40%_0.18_250)] mb-2">
                  &#x1F3AF; Difficulty / \u0915\u0920\u093F\u0928\u093E\u0908
                </h3>
                <div className="flex gap-2">
                  {DIFFICULTIES.map((d) => (
                    <button
                      type="button"
                      key={d.value}
                      onClick={() => updateSettings({ difficulty: d.value })}
                      className={`flex-1 flex flex-col items-center gap-1 px-2 py-3 rounded-2xl border-2 transition-all ${
                        settings.difficulty === d.value
                          ? "border-[oklch(60%_0.22_145)] bg-[oklch(94%_0.1_145)] shadow-[0_3px_0_0_oklch(50%_0.22_145)] text-[oklch(30%_0.22_145)]"
                          : "border-border bg-muted/40 text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <span className="text-2xl">{d.emoji}</span>
                      <span className="font-display text-xs font-bold">
                        {d.label}
                      </span>
                      <span className="font-body text-[10px] opacity-70">
                        {d.sub}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-display text-base font-bold text-[oklch(40%_0.18_250)] mb-2">
                  &#x1F50A; Sound / \u0906\u0935\u093E\u091C\u093C
                </h3>
                <button
                  type="button"
                  onClick={() =>
                    updateSettings({ soundEnabled: !settings.soundEnabled })
                  }
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-2xl border-2 transition-all font-body text-sm font-semibold ${
                    settings.soundEnabled
                      ? "border-[oklch(60%_0.22_27)] bg-[oklch(95%_0.1_27)] shadow-[0_3px_0_0_oklch(55%_0.22_27)] text-[oklch(30%_0.22_27)]"
                      : "border-border bg-muted/40 text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <span>
                    {settings.soundEnabled ? "Sound On" : "Sound Off"}
                  </span>
                  <span className="text-lg">
                    {settings.soundEnabled ? "\u{1F50A}" : "\u{1F507}"}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
