import { createContext, useContext, useEffect, useState } from "react";

export type Language = "english" | "hindi" | "both";
export type Difficulty = "easy" | "medium" | "hard";

export interface AppSettings {
  language: Language;
  difficulty: Difficulty;
  soundEnabled: boolean;
}

const DEFAULT_SETTINGS: AppSettings = {
  language: "both",
  difficulty: "easy",
  soundEnabled: true,
};

interface SettingsContextType {
  settings: AppSettings;
  updateSettings: (partial: Partial<AppSettings>) => void;
  openSettings: () => void;
  closeSettings: () => void;
  isOpen: boolean;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem("babyapp_settings");
      return saved
        ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) }
        : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("babyapp_settings", JSON.stringify(settings));
    } catch {
      // ignore
    }
  }, [settings]);

  const updateSettings = (partial: Partial<AppSettings>) =>
    setSettings((prev) => ({ ...prev, ...partial }));

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
        openSettings: () => setIsOpen(true),
        closeSettings: () => setIsOpen(false),
        isOpen,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
