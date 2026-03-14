import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { addStar } from "../utils/stars";

const rhymes = [
  {
    emoji: "⭐",
    title: "Twinkle Twinkle",
    en: "Twinkle twinkle little star,\nHow I wonder what you are!\nUp above the world so high,\nLike a diamond in the sky!",
    hi: "टिमटिम टिमटिम तारे,\nकितने प्यारे हो तुम!\nआसमान में ऊपर,\nहीरे जैसे चमकते!",
  },
  {
    emoji: "🐑",
    title: "Baa Baa Black Sheep",
    en: "Baa baa black sheep,\nhave you any wool?\nYes sir yes sir,\nthree bags full!",
    hi: "माई माई काली भेड़,\nक्या तेरे पास ऊन है?\nहाँ जी हाँ जी,\nतीन थैले भरे!",
  },
  {
    emoji: "👦",
    title: "Johny Johny",
    en: "Johny Johny, Yes papa!\nEating sugar? No papa!\nTelling lies? No papa!\nOpen your mouth! Ha ha ha!",
    hi: "जॉनी जॉनी, हाँ पापा!\nचीनी खाना? नहीं पापा!\nझूठ बोलना? नहीं पापा!\nहा हा हा!",
  },
  {
    emoji: "🚌",
    title: "Wheels on the Bus",
    en: "The wheels on the bus go round and round,\nRound and round, round and round!\nAll through the town!",
    hi: "बस के पहिए घूमते हैं,\nघूमते हैं!\nपूरे शहर में!",
  },
  {
    emoji: "⛵",
    title: "Row Row Row",
    en: "Row row row your boat,\nGently down the stream!\nMerrily merrily merrily merrily,\nLife is but a dream!",
    hi: "चलाओ चलाओ नाव को,\nधीरे धीरे नदी में!\nखुशी खुशी जीवन चलता!",
  },
];

const cardThemes = [
  {
    bg: "bg-[oklch(95%_0.12_50)]",
    border: "border-[oklch(68%_0.22_50)]",
    shadow: "shadow-[0_6px_0_0_oklch(58%_0.22_50)]",
    text: "text-[oklch(32%_0.22_50)]",
    btnBg: "oklch(58% 0.22 50)",
  },
  {
    bg: "bg-[oklch(96%_0.12_340)]",
    border: "border-[oklch(65%_0.22_340)]",
    shadow: "shadow-[0_6px_0_0_oklch(55%_0.22_340)]",
    text: "text-[oklch(30%_0.22_340)]",
    btnBg: "oklch(55% 0.22 340)",
  },
  {
    bg: "bg-[oklch(95%_0.12_250)]",
    border: "border-[oklch(60%_0.2_250)]",
    shadow: "shadow-[0_6px_0_0_oklch(50%_0.2_250)]",
    text: "text-[oklch(25%_0.2_250)]",
    btnBg: "oklch(50% 0.2 250)",
  },
  {
    bg: "bg-[oklch(95%_0.12_145)]",
    border: "border-[oklch(58%_0.22_145)]",
    shadow: "shadow-[0_6px_0_0_oklch(48%_0.22_145)]",
    text: "text-[oklch(28%_0.22_145)]",
    btnBg: "oklch(48% 0.22 145)",
  },
  {
    bg: "bg-[oklch(95%_0.12_300)]",
    border: "border-[oklch(60%_0.22_300)]",
    shadow: "shadow-[0_6px_0_0_oklch(50%_0.22_300)]",
    text: "text-[oklch(28%_0.22_300)]",
    btnBg: "oklch(50% 0.22 300)",
  },
];

function speak(text: string) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.85;
  utterance.pitch = 1.2;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

export default function RhymesGame({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-10 backdrop-blur-sm bg-background/80 border-b border-border">
        <div className="max-w-5xl mx-auto flex items-center gap-4 px-4 py-3">
          <motion.button
            data-ocid="rhymes.back.button"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl border-2 border-border bg-card font-body font-semibold text-foreground hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Home</span>
          </motion.button>
          <div className="flex items-center gap-2 flex-1 justify-center">
            <span className="text-3xl">🎵</span>
            <h2
              className="font-display text-2xl sm:text-3xl font-extrabold"
              style={{ color: "oklch(45% 0.22 300)" }}
            >
              Rhymes / कविताएँ
            </h2>
          </div>
          <div className="w-20" />
        </div>
      </div>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6 flex flex-col gap-6">
        {rhymes.map((rhyme, i) => {
          const t = cardThemes[i % cardThemes.length];
          return (
            <motion.div
              key={rhyme.title}
              data-ocid={`rhymes.item.${i + 1}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className={`rounded-3xl border-4 p-6 flex flex-col gap-4 ${t.bg} ${t.border} ${t.shadow}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-5xl">{rhyme.emoji}</span>
                <h3
                  className={`font-display text-2xl font-extrabold ${t.text}`}
                >
                  {rhyme.title}
                </h3>
              </div>
              <p
                className={`font-display text-lg font-bold whitespace-pre-line ${t.text}`}
              >
                {rhyme.en}
              </p>
              <p className="font-body text-base text-muted-foreground whitespace-pre-line leading-relaxed">
                {rhyme.hi}
              </p>
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.95, y: 2 }}
                data-ocid={`rhymes.item.${i + 1}`}
                onClick={() => {
                  speak(rhyme.en);
                  addStar(1);
                }}
                className="self-start px-6 py-3 rounded-2xl border-4 font-display text-lg font-extrabold text-white active:shadow-none active:translate-y-1 transition-all"
                style={{
                  backgroundColor: t.btnBg,
                  borderColor: t.btnBg,
                  boxShadow: `0 4px 0 0 color-mix(in oklch, ${t.btnBg} 70%, black)`,
                }}
              >
                🎵 Gaao! / गाओ!
              </motion.button>
            </motion.div>
          );
        })}
      </main>
    </div>
  );
}
