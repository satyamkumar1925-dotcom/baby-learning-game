import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import GameLayout from "./GameLayout";

function speak(text: string) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.85;
  utterance.pitch = 1.2;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

const BASE_COLORS = [
  { name: "Red", hindi: "लाल", hue: 27, emoji: "🔴", value: "red" },
  { name: "Blue", hindi: "नीला", hue: 250, emoji: "🔵", value: "blue" },
  { name: "Yellow", hindi: "पीला", hue: 85, emoji: "🟡", value: "yellow" },
  { name: "Green", hindi: "हरा", hue: 145, emoji: "🟢", value: "green" },
  { name: "Orange", hindi: "नारंगी", hue: 50, emoji: "🟠", value: "orange" },
  { name: "Purple", hindi: "बैंगनी", hue: 300, emoji: "🟣", value: "purple" },
];

type ColorValue =
  | "red"
  | "blue"
  | "yellow"
  | "green"
  | "orange"
  | "purple"
  | "brown";

const MIX_RESULTS: Record<
  string,
  { name: string; hindi: string; hue: number; emoji: string }
> = {
  "red+blue": { name: "Purple", hindi: "बैंगनी", hue: 300, emoji: "🟣" },
  "red+yellow": { name: "Orange", hindi: "नारंगी", hue: 50, emoji: "🟠" },
  "blue+yellow": { name: "Green", hindi: "हरा", hue: 145, emoji: "🟢" },
  "red+green": { name: "Brown", hindi: "भूरा", hue: 40, emoji: "🟤" },
  "blue+orange": { name: "Brown", hindi: "भूरा", hue: 40, emoji: "🟤" },
  "yellow+purple": { name: "Brown", hindi: "भूरा", hue: 40, emoji: "🟤" },
  "red+red": { name: "Red", hindi: "लाल", hue: 27, emoji: "🔴" },
  "blue+blue": { name: "Blue", hindi: "नीला", hue: 250, emoji: "🔵" },
  "yellow+yellow": { name: "Yellow", hindi: "पीला", hue: 85, emoji: "🟡" },
  "green+green": { name: "Green", hindi: "हरा", hue: 145, emoji: "🟢" },
  "orange+orange": { name: "Orange", hindi: "नारंगी", hue: 50, emoji: "🟠" },
  "purple+purple": { name: "Purple", hindi: "बैंगनी", hue: 300, emoji: "🟣" },
  "red+orange": {
    name: "Red-Orange",
    hindi: "लाल-नारंगी",
    hue: 35,
    emoji: "🔶",
  },
  "blue+green": { name: "Teal", hindi: "हरा-नीला", hue: 185, emoji: "🩵" },
  "blue+purple": { name: "Violet", hindi: "बैंगनी", hue: 280, emoji: "💜" },
  "yellow+green": { name: "Lime", hindi: "हल्का हरा", hue: 120, emoji: "💚" },
  "yellow+orange": { name: "Amber", hindi: "सुनहरा", hue: 60, emoji: "🟡" },
  "purple+red": { name: "Magenta", hindi: "गुलाबी", hue: 340, emoji: "🩷" },
};

function getMixResult(a: ColorValue, b: ColorValue) {
  const key1 = `${a}+${b}`;
  const key2 = `${b}+${a}`;
  return (
    MIX_RESULTS[key1] ||
    MIX_RESULTS[key2] || { name: "Brown", hindi: "भूरा", hue: 40, emoji: "🟤" }
  );
}

export default function ColorMixGame({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState<ColorValue[]>([]);
  const [result, setResult] = useState<ReturnType<typeof getMixResult> | null>(
    null,
  );
  const [celebrate, setCelebrate] = useState(false);

  const selectColor = (val: ColorValue) => {
    if (selected.includes(val) && selected.length === 1) {
      // Allow same+same
    }
    if (selected.length === 0) {
      setSelected([val]);
      setResult(null);
    } else if (selected.length === 1) {
      setSelected([selected[0], val]);
      setResult(null);
    } else {
      setSelected([val]);
      setResult(null);
    }
  };

  const mix = () => {
    if (selected.length < 2) return;
    const r = getMixResult(selected[0], selected[1] as ColorValue);
    setResult(r);
    speak(`${r.name}! ${r.hindi}`);
    setCelebrate(true);
    setTimeout(() => setCelebrate(false), 1500);
  };

  const reset = () => {
    setSelected([]);
    setResult(null);
  };

  return (
    <GameLayout
      title="Color Mix"
      emoji="🎨"
      color="oklch(50% 0.22 145)"
      onBack={onBack}
    >
      <p className="font-body text-center text-lg text-muted-foreground mb-6 font-semibold">
        Pick 2 colors and mix! / 2 रंग चुनो और मिलाओ!
      </p>

      {/* Color picker */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {BASE_COLORS.map((c) => {
          const isSelected = selected.includes(c.value as ColorValue);
          const selIdx = selected.indexOf(c.value as ColorValue);
          return (
            <motion.button
              key={c.value}
              data-ocid={`colormix.${c.value}.button`}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => selectColor(c.value as ColorValue)}
              className={`flex flex-col items-center gap-2 rounded-3xl border-4 p-4 transition-all duration-150
                bg-[oklch(95%_0.12_${c.hue})] border-[oklch(62%_0.22_${c.hue})]
                shadow-[0_6px_0_0_oklch(52%_0.22_${c.hue})]
                ${isSelected ? "ring-4 ring-offset-2 ring-[oklch(55%_0.22_50)] scale-105" : ""}
              `}
            >
              {isSelected && (
                <div className="absolute top-1 right-1 bg-[oklch(68%_0.22_50)] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  {selIdx + 1}
                </div>
              )}
              <div
                className="w-14 h-14 rounded-full border-4 shadow-lg"
                style={{
                  background: `oklch(62% 0.25 ${c.hue})`,
                  borderColor: `oklch(48% 0.25 ${c.hue})`,
                }}
              />
              <span
                className={`font-display text-lg font-extrabold text-[oklch(28%_0.22_${c.hue})]`}
              >
                {c.name}
              </span>
              <span className="font-body text-sm font-semibold text-muted-foreground">
                {c.hindi}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Selected preview */}
      {selected.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-4 mb-5"
        >
          {selected[0] &&
            (() => {
              const c0 = BASE_COLORS.find((b) => b.value === selected[0]);
              return c0 ? (
                <div key="sel-0" className="flex flex-col items-center gap-1">
                  <div
                    className="w-14 h-14 rounded-full border-4"
                    style={{
                      background: `oklch(62% 0.25 ${c0.hue})`,
                      borderColor: `oklch(48% 0.25 ${c0.hue})`,
                    }}
                  />
                  <span className="font-body text-sm font-semibold">
                    {c0.name}
                  </span>
                </div>
              ) : null;
            })()}
          {selected[1] &&
            (() => {
              const c1 = BASE_COLORS.find((b) => b.value === selected[1]);
              return c1 ? (
                <div key="sel-1" className="flex flex-col items-center gap-1">
                  <div
                    className="w-14 h-14 rounded-full border-4"
                    style={{
                      background: `oklch(62% 0.25 ${c1.hue})`,
                      borderColor: `oklch(48% 0.25 ${c1.hue})`,
                    }}
                  />
                  <span className="font-body text-sm font-semibold">
                    {c1.name}
                  </span>
                </div>
              ) : null;
            })()}
          {selected.length === 2 && (
            <span className="font-display text-2xl font-extrabold text-muted-foreground">
              =?
            </span>
          )}
        </motion.div>
      )}

      {/* Mix button */}
      <div className="flex gap-3 justify-center mb-6">
        {selected.length === 2 && !result && (
          <motion.button
            data-ocid="colormix.mix.primary_button"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={mix}
            className="bg-[oklch(62%_0.25_145)] hover:bg-[oklch(57%_0.25_145)] text-white font-display text-2xl font-extrabold rounded-3xl py-4 px-10 shadow-[0_6px_0_0_oklch(48%_0.22_145)] active:shadow-none active:translate-y-1 transition-all duration-150"
          >
            🎨 Mix! / मिलाओ!
          </motion.button>
        )}
        {(result || selected.length > 0) && (
          <motion.button
            data-ocid="colormix.reset.button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={reset}
            className="bg-[oklch(95%_0.08_27)] border-4 border-[oklch(65%_0.22_27)] shadow-[0_4px_0_0_oklch(55%_0.22_27)] text-[oklch(30%_0.22_27)] font-display text-xl font-extrabold rounded-3xl py-3 px-6 active:shadow-none active:translate-y-1 transition-all duration-150"
          >
            ↺ Reset
          </motion.button>
        )}
      </div>

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            key="result"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ ease: [0.34, 1.56, 0.64, 1] }}
            data-ocid="colormix.result.panel"
            className={`bg-[oklch(95%_0.14_${result.hue})] border-4 border-[oklch(62%_0.22_${result.hue})] shadow-[0_6px_0_0_oklch(52%_0.22_${result.hue})] rounded-3xl p-8 flex flex-col items-center gap-4`}
          >
            {celebrate && (
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-4xl"
              >
                🎉✨🎊
              </motion.div>
            )}
            <div
              className="w-24 h-24 rounded-full border-4 shadow-2xl"
              style={{
                background: `oklch(62% 0.28 ${result.hue})`,
                borderColor: `oklch(48% 0.28 ${result.hue})`,
              }}
            />
            <span className="text-4xl">{result.emoji}</span>
            <div className="text-center">
              <p
                className={`font-display text-3xl font-extrabold text-[oklch(28%_0.22_${result.hue})]`}
              >
                {result.name}!
              </p>
              <p className="font-body text-xl font-semibold text-[oklch(38%_0.18_40)] mt-1">
                {result.hindi}!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GameLayout>
  );
}
