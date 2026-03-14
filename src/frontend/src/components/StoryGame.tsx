import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import GameLayout from "./GameLayout";

function speak(text: string) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.8;
  utterance.pitch = 1.1;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

const stories = [
  {
    id: 1,
    title: "The Little Lion",
    emoji: "🦁",
    pages: [
      {
        emoji: "🦁",
        text: "Once upon a time, a little lion named Leo lived in a big jungle.",
        hindiText: "एक बार एक छोटा शेर लियो बड़े जंगल में रहता था।",
      },
      {
        emoji: "🌳",
        text: "Leo was small but brave. He walked through tall trees every day.",
        hindiText: "लियो छोटा था पर बहादुर था। वह हर दिन ऊँचे पेड़ों से गुजरता था।",
      },
      {
        emoji: "🐰",
        text: "One day, Leo met a little rabbit. The rabbit was lost and scared.",
        hindiText:
          "एक दिन लियो को एक छोटा खरगोश मिला। खरगोश खो गया था और डरा हुआ था।",
      },
      {
        emoji: "🤝",
        text: "Leo helped the rabbit find its home. They became best friends!",
        hindiText: "लियो ने खरगोश को उसका घर ढूंढने में मदद की। वे पक्के दोस्त बन गए!",
      },
      {
        emoji: "🌟",
        text: "Leo learned that kindness makes us truly brave. The End! 🎉",
        hindiText: "लियो ने सीखा कि दयालुता ही असली बहादुरी है। समाप्त! 🎉",
      },
    ],
  },
  {
    id: 2,
    title: "Mango Tree",
    emoji: "🥭",
    pages: [
      {
        emoji: "👦",
        text: "Raju loved the big mango tree in his garden. It was very tall.",
        hindiText: "राजू को अपने बाग के बड़े आम के पेड़ से बहुत प्यार था। वह बहुत ऊँचा था।",
      },
      {
        emoji: "🌳",
        text: "Every summer, the tree gave sweet yellow mangoes. Yummy!",
        hindiText: "हर गर्मियों में पेड़ मीठे पीले आम देता था। कितने स्वादिष्ट!",
      },
      {
        emoji: "🐦",
        text: "Birds came to sing in the tree. Raju loved to listen to them.",
        hindiText: "पेड़ पर पक्षी आकर गाते थे। राजू उन्हें सुनना बहुत पसंद करता था।",
      },
      {
        emoji: "🥭",
        text: "Raju shared mangoes with his friends. Everyone was happy.",
        hindiText: "राजू ने अपने दोस्तों के साथ आम बाँटे। सब बहुत खुश हुए।",
      },
      {
        emoji: "❤️",
        text: "The mango tree was Raju's best friend. The End! 🎉",
        hindiText: "वह आम का पेड़ राजू का सबसे अच्छा दोस्त था। समाप्त! 🎉",
      },
    ],
  },
  {
    id: 3,
    title: "The Red Ball",
    emoji: "🔴",
    pages: [
      {
        emoji: "🔴",
        text: "Meera had a bright red ball. It was her favourite toy.",
        hindiText:
          "मीरा के पास एक चमकदार लाल गेंद थी। वह उसका सबसे पसंदीदा खिलौना था।",
      },
      {
        emoji: "🏃",
        text: "One day, the ball rolled away fast. It went down the hill!",
        hindiText: "एक दिन गेंद तेजी से लुढ़क गई। वह पहाड़ी से नीचे चली गई!",
      },
      {
        emoji: "🌸",
        text: "The ball stopped near a garden of flowers. How pretty!",
        hindiText: "गेंद फूलों के बाग के पास रुक गई। कितना सुंदर!",
      },
      {
        emoji: "🐝",
        text: "A little bee sat on the ball. Buzz buzz! It tickled Meera!",
        hindiText: "एक छोटी मधुमक्खी गेंद पर बैठ गई। भिनभिन! मीरा को गुदगुदी हुई!",
      },
      {
        emoji: "😄",
        text: "Meera laughed and took her ball home. The End! 🎉",
        hindiText: "मीरा हँसी और अपनी गेंद घर ले गई। समाप्त! 🎉",
      },
    ],
  },
  {
    id: 4,
    title: "Bunny's Carrot",
    emoji: "🐰",
    pages: [
      {
        emoji: "🐰",
        text: "Bunny the rabbit was very hungry one morning.",
        hindiText: "एक सुबह खरगोश बनी को बहुत भूख लगी थी।",
      },
      {
        emoji: "🥕",
        text: "Bunny hopped through the field looking for a big orange carrot.",
        hindiText: "बनी बड़े नारंगी गाजर की तलाश में मैदान में उछलता गया।",
      },
      {
        emoji: "🌱",
        text: "Bunny found a small carrot under the ground. It was tiny.",
        hindiText: "बनी को जमीन के नीचे एक छोटी गाजर मिली। वह बहुत छोटी थी।",
      },
      {
        emoji: "🥕🥕",
        text: "But next to it were many more carrots! What a treasure!",
        hindiText: "लेकिन उसके पास और भी बहुत सारी गाजरें थीं! क्या खजाना!",
      },
      {
        emoji: "😊",
        text: "Bunny shared carrots with all friends. The End! 🎉",
        hindiText: "बनी ने सभी दोस्तों के साथ गाजरें बाँटीं। समाप्त! 🎉",
      },
    ],
  },
  {
    id: 5,
    title: "Rain and Rainbow",
    emoji: "🌈",
    pages: [
      {
        emoji: "🌧️",
        text: "One day, dark clouds came and rain began to fall.",
        hindiText: "एक दिन काले बादल आए और बारिश शुरू हो गई।",
      },
      {
        emoji: "🏠",
        text: "All the children went inside. They watched rain from the window.",
        hindiText: "सभी बच्चे अंदर चले गए। वे खिड़की से बारिश देखने लगे।",
      },
      {
        emoji: "☀️",
        text: "Soon the rain stopped and the sun came out shining bright.",
        hindiText: "जल्दी ही बारिश रुक गई और सूरज चमकने लगा।",
      },
      {
        emoji: "🌈",
        text: "A beautiful rainbow appeared in the sky! Seven colours!",
        hindiText: "आसमान में एक सुंदर इंद्रधनुष आया! सात रंग!",
      },
      {
        emoji: "🎨",
        text: "The children ran out to see it. The sky was magical. The End! 🎉",
        hindiText: "बच्चे उसे देखने दौड़ पड़े। आसमान जादुई था। समाप्त! 🎉",
      },
    ],
  },
];

const storyColors = [
  {
    bg: "bg-[oklch(95%_0.12_27)]",
    border: "border-[oklch(65%_0.22_27)]",
    shadow: "shadow-[0_6px_0_0_oklch(55%_0.22_27)]",
    text: "text-[oklch(30%_0.22_27)]",
  },
  {
    bg: "bg-[oklch(95%_0.12_250)]",
    border: "border-[oklch(60%_0.2_250)]",
    shadow: "shadow-[0_6px_0_0_oklch(50%_0.2_250)]",
    text: "text-[oklch(25%_0.2_250)]",
  },
  {
    bg: "bg-[oklch(96%_0.12_145)]",
    border: "border-[oklch(58%_0.22_145)]",
    shadow: "shadow-[0_6px_0_0_oklch(48%_0.22_145)]",
    text: "text-[oklch(28%_0.22_145)]",
  },
  {
    bg: "bg-[oklch(95%_0.12_300)]",
    border: "border-[oklch(60%_0.22_300)]",
    shadow: "shadow-[0_6px_0_0_oklch(50%_0.22_300)]",
    text: "text-[oklch(28%_0.22_300)]",
  },
  {
    bg: "bg-[oklch(96%_0.12_50)]",
    border: "border-[oklch(68%_0.22_50)]",
    shadow: "shadow-[0_6px_0_0_oklch(58%_0.22_50)]",
    text: "text-[oklch(32%_0.22_50)]",
  },
];

function StoryReader({
  story,
  onClose,
}: {
  story: (typeof stories)[0];
  onClose: () => void;
}) {
  const [page, setPage] = useState(0);
  const current = story.pages[page];

  useEffect(() => {
    speak(current.text);
  }, [current.text]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-3 w-full">
        <motion.button
          data-ocid="story.back.button"
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="bg-[oklch(95%_0.12_250)] border-4 border-[oklch(60%_0.2_250)] shadow-[0_4px_0_0_oklch(50%_0.2_250)] rounded-2xl px-4 py-2 font-display font-bold text-[oklch(25%_0.2_250)] active:shadow-none active:translate-y-1 transition-all"
        >
          ← Back
        </motion.button>
        <h2 className="font-display text-2xl font-extrabold text-[oklch(35%_0.2_250)]">
          {story.title}
        </h2>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="bg-[oklch(96%_0.1_250)] border-4 border-[oklch(60%_0.2_250)] shadow-[0_6px_0_0_oklch(50%_0.2_250)] rounded-3xl p-8 flex flex-col items-center gap-5 w-full max-w-md"
        >
          <span className="text-9xl">{current.emoji}</span>
          <p className="font-body text-xl text-center text-[oklch(30%_0.2_250)] font-semibold leading-relaxed">
            {current.text}
          </p>
          <div className="bg-[oklch(92%_0.1_50)] border-2 border-[oklch(72%_0.18_50)] rounded-2xl px-5 py-3 w-full">
            <p className="font-body text-lg text-center text-[oklch(35%_0.2_40)] font-semibold leading-relaxed">
              {current.hindiText}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress dots */}
      <div className="flex gap-3">
        {story.pages.map((pg, i) => (
          <div
            key={pg.text.slice(0, 12)}
            className={`w-5 h-5 rounded-full border-2 transition-all ${
              i === page
                ? "bg-[oklch(65%_0.2_250)] border-[oklch(50%_0.2_250)] scale-125"
                : i < page
                  ? "bg-[oklch(75%_0.15_145)] border-[oklch(55%_0.15_145)]"
                  : "bg-[oklch(92%_0.04_250)] border-[oklch(70%_0.08_250)]"
            }`}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex gap-4 w-full max-w-md">
        {page > 0 && (
          <motion.button
            data-ocid="story.pagination_prev"
            whileTap={{ scale: 0.95 }}
            onClick={() => setPage((p) => p - 1)}
            className="flex-1 bg-[oklch(95%_0.12_27)] border-4 border-[oklch(65%_0.22_27)] shadow-[0_5px_0_0_oklch(55%_0.22_27)] rounded-3xl py-4 font-display text-xl font-extrabold text-[oklch(30%_0.22_27)] active:shadow-none active:translate-y-1 transition-all"
          >
            ← Prev
          </motion.button>
        )}
        {page < story.pages.length - 1 ? (
          <motion.button
            data-ocid="story.pagination_next"
            whileTap={{ scale: 0.95 }}
            onClick={() => setPage((p) => p + 1)}
            className="flex-1 bg-[oklch(96%_0.12_145)] border-4 border-[oklch(58%_0.22_145)] shadow-[0_5px_0_0_oklch(48%_0.22_145)] rounded-3xl py-4 font-display text-xl font-extrabold text-[oklch(28%_0.22_145)] active:shadow-none active:translate-y-1 transition-all"
          >
            Next →
          </motion.button>
        ) : (
          <motion.button
            data-ocid="story.close.button"
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="flex-1 bg-[oklch(96%_0.12_50)] border-4 border-[oklch(68%_0.22_50)] shadow-[0_5px_0_0_oklch(58%_0.22_50)] rounded-3xl py-4 font-display text-xl font-extrabold text-[oklch(32%_0.22_50)] active:shadow-none active:translate-y-1 transition-all"
          >
            🎉 The End!
          </motion.button>
        )}
      </div>
    </div>
  );
}

export default function StoryGame({ onBack }: { onBack: () => void }) {
  const [activeStory, setActiveStory] = useState<(typeof stories)[0] | null>(
    null,
  );

  return (
    <GameLayout
      title="Stories"
      emoji="📖"
      color="oklch(50% 0.22 145)"
      onBack={onBack}
    >
      <AnimatePresence mode="wait">
        {activeStory ? (
          <motion.div
            key="reader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <StoryReader
              story={activeStory}
              onClose={() => setActiveStory(null)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="selector"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="font-body text-center text-lg text-muted-foreground mb-6 font-semibold">
              Choose a story / कहानी चुनें
            </p>
            <div className="flex flex-col gap-4">
              {stories.map((story, i) => {
                const c = storyColors[i];
                return (
                  <motion.button
                    key={story.id}
                    data-ocid={`story.item.${i + 1}`}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveStory(story)}
                    className={`${c.bg} ${c.border} ${c.shadow} border-4 rounded-3xl p-5 flex items-center gap-5 active:shadow-none active:translate-y-1 transition-all duration-150`}
                  >
                    <span className="text-5xl">{story.emoji}</span>
                    <div className="flex flex-col items-start">
                      <span
                        className={`font-display text-2xl font-extrabold ${c.text}`}
                      >
                        {story.title}
                      </span>
                      <span className="font-body text-sm text-muted-foreground">
                        {story.pages.length} pages · Tap to read!
                      </span>
                    </div>
                    <span className="ml-auto text-2xl">→</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GameLayout>
  );
}
