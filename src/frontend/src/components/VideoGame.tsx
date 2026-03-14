import { motion } from "motion/react";
import GameLayout from "./GameLayout";

const videos = [
  {
    emoji: "🔤",
    title: "ABC Song",
    hindi: "अक्षर सीखो",
    description: "Learn A to Z with fun music!",
    url: "https://www.youtube.com/watch?v=75p-N9YKqNo",
    hue: 250,
  },
  {
    emoji: "अ",
    title: "Hindi Varnamala",
    hindi: "हिंदी वर्णमाला",
    description: "Learn Hindi alphabets",
    url: "https://www.youtube.com/watch?v=P0VOZ_VTNRY",
    hue: 27,
  },
  {
    emoji: "🎵",
    title: "Phonics Song",
    hindi: "ध्वनि सीखो",
    description: "Letter sounds for babies",
    url: "https://www.youtube.com/watch?v=hq3yfQnllfQ",
    hue: 145,
  },
  {
    emoji: "🔢",
    title: "Number Song 1-20",
    hindi: "1 से 20 गिनो",
    description: "Count 1 to 20 with song",
    url: "https://www.youtube.com/watch?v=DR-cfDsHCGA",
    hue: 300,
  },
  {
    emoji: "🎶",
    title: "Nursery Rhymes",
    hindi: "बच्चों के गाने",
    description: "Classic baby songs collection",
    url: "https://www.youtube.com/watch?v=HbQ5GkNHdN8",
    hue: 50,
  },
  {
    emoji: "🦈",
    title: "Baby Shark",
    hindi: "मज़ेदार गाना",
    description: "Fun song for babies!",
    url: "https://www.youtube.com/watch?v=XqZsoesa55w",
    hue: 190,
  },
  {
    emoji: "🌈",
    title: "Color Song",
    hindi: "रंग सीखो",
    description: "Learn all colors with fun!",
    url: "https://www.youtube.com/watch?v=zKMOdQoIYuE",
    hue: 340,
  },
  {
    emoji: "🐄",
    title: "Animal Sounds",
    hindi: "जानवरों की आवाज़",
    description: "What do animals say?",
    url: "https://www.youtube.com/watch?v=jOfMbAMFBaM",
    hue: 27,
  },
  {
    emoji: "⭐",
    title: "Shape Song",
    hindi: "आकार सीखो",
    description: "Learn shapes with music",
    url: "https://www.youtube.com/watch?v=OEbRDtCAFdU",
    hue: 145,
  },
  {
    emoji: "✨",
    title: "Twinkle Twinkle",
    hindi: "क्लासिक गाना",
    description: "Classic nursery rhyme for babies",
    url: "https://www.youtube.com/watch?v=yCjJyiqpAuU",
    hue: 250,
  },
];

export default function VideoGame({ onBack }: { onBack: () => void }) {
  return (
    <GameLayout
      title="Videos"
      emoji="🎬"
      color="oklch(50% 0.2 250)"
      onBack={onBack}
    >
      <p className="font-body text-center text-lg text-muted-foreground mb-6 font-semibold">
        Baby learning videos / बच्चों के वीडियो
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {videos.map((v, i) => (
          <motion.div
            key={v.title}
            data-ocid={`videos.item.${i + 1}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, ease: [0.34, 1.56, 0.64, 1] }}
            className={`bg-[oklch(95%_0.12_${v.hue})] border-4 border-[oklch(62%_0.2_${v.hue})] shadow-[0_6px_0_0_oklch(52%_0.2_${v.hue})] rounded-3xl p-5 flex flex-col gap-3`}
          >
            <div className="flex items-center gap-3">
              <span className="text-4xl">{v.emoji}</span>
              <div className="flex flex-col">
                <span
                  className={`font-display text-xl font-extrabold text-[oklch(28%_0.2_${v.hue})]`}
                >
                  {v.title}
                </span>
                <span className="font-body text-sm font-semibold text-[oklch(45%_0.15_50)]">
                  {v.hindi}
                </span>
              </div>
            </div>
            <p className="font-body text-sm text-muted-foreground">
              {v.description}
            </p>
            <motion.a
              data-ocid={`videos.button.${i + 1}`}
              href={v.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              className={`mt-auto bg-[oklch(60%_0.22_${v.hue})] hover:bg-[oklch(55%_0.22_${v.hue})] text-white font-display font-extrabold text-lg rounded-2xl py-3 px-5 text-center shadow-[0_4px_0_0_oklch(45%_0.2_${v.hue})] active:shadow-none active:translate-y-1 transition-all duration-150 block`}
            >
              ▶ Watch / देखो
            </motion.a>
          </motion.div>
        ))}
      </div>
    </GameLayout>
  );
}
