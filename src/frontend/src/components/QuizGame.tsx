import { Progress } from "@/components/ui/progress";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { addStar } from "../utils/stars";

interface WordItem {
  emoji: string;
  en: string;
  hi: string;
}

const CATEGORIES: Record<string, WordItem[]> = {
  Animals: [
    { emoji: "🐶", en: "Dog", hi: "कुत्ता" },
    { emoji: "🐱", en: "Cat", hi: "बिल्ली" },
    { emoji: "🦆", en: "Duck", hi: "बत्तख" },
    { emoji: "🐮", en: "Cow", hi: "गाय" },
    { emoji: "🐘", en: "Elephant", hi: "हाथी" },
    { emoji: "🦁", en: "Lion", hi: "शेर" },
    { emoji: "🐒", en: "Monkey", hi: "बंदर" },
    { emoji: "🐸", en: "Frog", hi: "मेंढक" },
    { emoji: "🐦", en: "Bird", hi: "पक्षी" },
    { emoji: "🐟", en: "Fish", hi: "मछली" },
  ],
  Fruits: [
    { emoji: "🍎", en: "Apple", hi: "सेब" },
    { emoji: "🍌", en: "Banana", hi: "केला" },
    { emoji: "🍊", en: "Orange", hi: "संतरा" },
    { emoji: "🍇", en: "Grapes", hi: "अंगूर" },
    { emoji: "🍓", en: "Strawberry", hi: "स्ट्रॉबेरी" },
    { emoji: "🥭", en: "Mango", hi: "आम" },
    { emoji: "🍍", en: "Pineapple", hi: "अनानास" },
    { emoji: "🍉", en: "Watermelon", hi: "तरबूज" },
    { emoji: "🍋", en: "Lemon", hi: "नींबू" },
    { emoji: "🍑", en: "Peach", hi: "आड़ू" },
  ],
  Vegetables: [
    { emoji: "🥕", en: "Carrot", hi: "गाजर" },
    { emoji: "🥦", en: "Broccoli", hi: "ब्रोकली" },
    { emoji: "🍅", en: "Tomato", hi: "टमाटर" },
    { emoji: "🥔", en: "Potato", hi: "आलू" },
    { emoji: "🧅", en: "Onion", hi: "प्याज" },
    { emoji: "🌽", en: "Corn", hi: "मक्का" },
    { emoji: "🍆", en: "Eggplant", hi: "बैंगन" },
    { emoji: "🥒", en: "Cucumber", hi: "खीरा" },
    { emoji: "🫑", en: "Capsicum", hi: "शिमला मिर्च" },
    { emoji: "🧄", en: "Garlic", hi: "लहसुन" },
  ],
  Colors: [
    { emoji: "🔴", en: "Red", hi: "लाल" },
    { emoji: "🟠", en: "Orange", hi: "नारंगी" },
    { emoji: "🟡", en: "Yellow", hi: "पीला" },
    { emoji: "🟢", en: "Green", hi: "हरा" },
    { emoji: "🔵", en: "Blue", hi: "नीला" },
    { emoji: "🟣", en: "Purple", hi: "बैंगनी" },
    { emoji: "⚫", en: "Black", hi: "काला" },
    { emoji: "⚪", en: "White", hi: "सफेद" },
    { emoji: "🟤", en: "Brown", hi: "भूरा" },
    { emoji: "🥷", en: "Pink", hi: "गुलाबी" },
  ],
  Shapes: [
    { emoji: "⭕", en: "Circle", hi: "वृत्त" },
    { emoji: "⬛", en: "Square", hi: "वर्ग" },
    { emoji: "🔺", en: "Triangle", hi: "त्रिभुज" },
    { emoji: "🟦", en: "Rectangle", hi: "आयत" },
    { emoji: "⭐", en: "Star", hi: "तारा" },
    { emoji: "❤️", en: "Heart", hi: "दिल" },
    { emoji: "🔷", en: "Diamond", hi: "हीरा" },
    { emoji: "🔶", en: "Hexagon", hi: "षट्भुज" },
  ],
  Numbers: [
    { emoji: "1️⃣", en: "One", hi: "एक" },
    { emoji: "2️⃣", en: "Two", hi: "दो" },
    { emoji: "3️⃣", en: "Three", hi: "तीन" },
    { emoji: "4️⃣", en: "Four", hi: "चार" },
    { emoji: "5️⃣", en: "Five", hi: "पाँच" },
    { emoji: "6️⃣", en: "Six", hi: "छह" },
    { emoji: "7️⃣", en: "Seven", hi: "सात" },
    { emoji: "8️⃣", en: "Eight", hi: "आठ" },
    { emoji: "9️⃣", en: "Nine", hi: "नौ" },
    { emoji: "🔟", en: "Ten", hi: "दस" },
  ],
  Birds: [
    { emoji: "🦅", en: "Eagle", hi: "गरुड़" },
    { emoji: "🦜", en: "Parrot", hi: "तोता" },
    { emoji: "🦢", en: "Swan", hi: "हंस" },
    { emoji: "🦉", en: "Owl", hi: "उल्लू" },
    { emoji: "🐧", en: "Penguin", hi: "पेंगुइन" },
    { emoji: "🦚", en: "Peacock", hi: "मोर" },
    { emoji: "🦩", en: "Flamingo", hi: "फ्लेमिंगो" },
    { emoji: "🐦", en: "Sparrow", hi: "गौरैया" },
    { emoji: "🦆", en: "Duck", hi: "बत्तख" },
    { emoji: "🐓", en: "Rooster", hi: "मुर्गा" },
  ],
  Flowers: [
    { emoji: "🌸", en: "Cherry Blossom", hi: "चेरी फूल" },
    { emoji: "🌹", en: "Rose", hi: "गुलाब" },
    { emoji: "🌻", en: "Sunflower", hi: "सूरजमुखी" },
    { emoji: "🌺", en: "Hibiscus", hi: "हिबिस्कस" },
    { emoji: "🌼", en: "Daisy", hi: "डेज़ी" },
    { emoji: "💐", en: "Bouquet", hi: "गुलदस्ता" },
    { emoji: "🌷", en: "Tulip", hi: "ट्यूलिप" },
    { emoji: "🪷", en: "Lotus", hi: "कमल" },
    { emoji: "🌿", en: "Leaves", hi: "पत्ते" },
    { emoji: "🍀", en: "Clover", hi: "तिपतिया" },
  ],
  Vehicles: [
    { emoji: "🚗", en: "Car", hi: "कार" },
    { emoji: "🚌", en: "Bus", hi: "बस" },
    { emoji: "🚂", en: "Train", hi: "ट्रेन" },
    { emoji: "✈️", en: "Airplane", hi: "हवाई जहाज" },
    { emoji: "🚢", en: "Ship", hi: "जहाज" },
    { emoji: "🚲", en: "Bicycle", hi: "साइकिल" },
    { emoji: "🏍️", en: "Motorcycle", hi: "मोटरसाइकिल" },
    { emoji: "🚁", en: "Helicopter", hi: "हेलीकॉप्टर" },
    { emoji: "🚀", en: "Rocket", hi: "रॉकेट" },
    { emoji: "⛵", en: "Sailboat", hi: "नाव" },
  ],
  "Body Parts": [
    { emoji: "👁️", en: "Eye", hi: "आँख" },
    { emoji: "👃", en: "Nose", hi: "नाक" },
    { emoji: "👂", en: "Ear", hi: "कान" },
    { emoji: "👄", en: "Mouth", hi: "मुँह" },
    { emoji: "🦷", en: "Teeth", hi: "दाँत" },
    { emoji: "✋", en: "Hand", hi: "हाथ" },
    { emoji: "🦶", en: "Foot", hi: "पैर" },
    { emoji: "💪", en: "Arm", hi: "भुजा" },
    { emoji: "🧠", en: "Brain", hi: "दिमाग" },
    { emoji: "❤️", en: "Heart", hi: "दिल" },
  ],
};

const CATEGORY_STYLES: Record<
  string,
  { bg: string; border: string; shadow: string; text: string; btnBg: string }
> = {
  Animals: {
    bg: "bg-[oklch(95%_0.12_27)]",
    border: "border-[oklch(65%_0.22_27)]",
    shadow: "shadow-[0_6px_0_0_oklch(55%_0.22_27)]",
    text: "text-[oklch(30%_0.22_27)]",
    btnBg: "oklch(55%_0.22_27)",
  },
  Fruits: {
    bg: "bg-[oklch(96%_0.14_90)]",
    border: "border-[oklch(70%_0.22_90)]",
    shadow: "shadow-[0_6px_0_0_oklch(60%_0.22_90)]",
    text: "text-[oklch(30%_0.22_90)]",
    btnBg: "oklch(60%_0.22_90)",
  },
  Vegetables: {
    bg: "bg-[oklch(96%_0.12_145)]",
    border: "border-[oklch(60%_0.22_145)]",
    shadow: "shadow-[0_6px_0_0_oklch(50%_0.22_145)]",
    text: "text-[oklch(28%_0.22_145)]",
    btnBg: "oklch(50%_0.22_145)",
  },
  Colors: {
    bg: "bg-[oklch(95%_0.12_250)]",
    border: "border-[oklch(60%_0.2_250)]",
    shadow: "shadow-[0_6px_0_0_oklch(50%_0.2_250)]",
    text: "text-[oklch(28%_0.2_250)]",
    btnBg: "oklch(50%_0.2_250)",
  },
  Shapes: {
    bg: "bg-[oklch(96%_0.12_50)]",
    border: "border-[oklch(68%_0.22_50)]",
    shadow: "shadow-[0_6px_0_0_oklch(58%_0.22_50)]",
    text: "text-[oklch(30%_0.22_50)]",
    btnBg: "oklch(58%_0.22_50)",
  },
  Numbers: {
    bg: "bg-[oklch(95%_0.12_300)]",
    border: "border-[oklch(58%_0.22_300)]",
    shadow: "shadow-[0_6px_0_0_oklch(48%_0.22_300)]",
    text: "text-[oklch(26%_0.22_300)]",
    btnBg: "oklch(48%_0.22_300)",
  },
  Birds: {
    bg: "bg-[oklch(95%_0.12_190)]",
    border: "border-[oklch(60%_0.18_190)]",
    shadow: "shadow-[0_6px_0_0_oklch(50%_0.18_190)]",
    text: "text-[oklch(28%_0.18_190)]",
    btnBg: "oklch(50%_0.18_190)",
  },
  Flowers: {
    bg: "bg-[oklch(96%_0.12_340)]",
    border: "border-[oklch(65%_0.22_340)]",
    shadow: "shadow-[0_6px_0_0_oklch(55%_0.22_340)]",
    text: "text-[oklch(30%_0.22_340)]",
    btnBg: "oklch(55%_0.22_340)",
  },
  Vehicles: {
    bg: "bg-[oklch(95%_0.12_250)]",
    border: "border-[oklch(60%_0.2_250)]",
    shadow: "shadow-[0_6px_0_0_oklch(50%_0.2_250)]",
    text: "text-[oklch(28%_0.2_250)]",
    btnBg: "oklch(50%_0.2_250)",
  },
  "Body Parts": {
    bg: "bg-[oklch(95%_0.12_27)]",
    border: "border-[oklch(65%_0.22_27)]",
    shadow: "shadow-[0_6px_0_0_oklch(55%_0.22_27)]",
    text: "text-[oklch(30%_0.22_27)]",
    btnBg: "oklch(55%_0.22_27)",
  },
};

const CATEGORY_EMOJIS: Record<string, string> = {
  Animals: "🐶",
  Fruits: "🍎",
  Vegetables: "🥦",
  Colors: "🌈",
  Shapes: "⭐",
  Numbers: "🔢",
  Birds: "🦅",
  Flowers: "🌸",
  Vehicles: "🚗",
  "Body Parts": "💪",
};

function speak(text: string) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;
  utterance.pitch = 1.2;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQuiz(
  category: string,
): { question: WordItem; options: WordItem[] }[] {
  const items = CATEGORIES[category];
  const questions = shuffle(items).slice(0, Math.min(10, items.length));
  return questions.map((q) => {
    const pool = items.filter((x) => x.en !== q.en);
    const wrongs = shuffle(pool).slice(0, 3);
    const options = shuffle([q, ...wrongs]);
    return { question: q, options };
  });
}

type Phase = "category" | "quiz" | "result";

interface QuizState {
  category: string;
  questions: { question: WordItem; options: WordItem[] }[];
  currentIndex: number;
  score: number;
  answered: null | "correct" | "wrong";
  selectedIdx: null | number;
}

const cardColors = [
  {
    bg: "bg-[oklch(95%_0.12_27)]",
    border: "border-[oklch(65%_0.22_27)]",
    shadow: "shadow-[0_5px_0_0_oklch(55%_0.22_27)]",
    text: "text-[oklch(30%_0.22_27)]",
  },
  {
    bg: "bg-[oklch(95%_0.12_250)]",
    border: "border-[oklch(60%_0.2_250)]",
    shadow: "shadow-[0_5px_0_0_oklch(50%_0.2_250)]",
    text: "text-[oklch(25%_0.2_250)]",
  },
  {
    bg: "bg-[oklch(96%_0.14_90)]",
    border: "border-[oklch(70%_0.22_90)]",
    shadow: "shadow-[0_5px_0_0_oklch(60%_0.22_90)]",
    text: "text-[oklch(35%_0.22_90)]",
  },
  {
    bg: "bg-[oklch(95%_0.12_145)]",
    border: "border-[oklch(58%_0.22_145)]",
    shadow: "shadow-[0_5px_0_0_oklch(48%_0.22_145)]",
    text: "text-[oklch(28%_0.22_145)]",
  },
];

export default function QuizGame({ onBack }: { onBack: () => void }) {
  const [phase, setPhase] = useState<Phase>("category");
  const [quiz, setQuiz] = useState<QuizState | null>(null);

  function startQuiz(category: string) {
    setQuiz({
      category,
      questions: buildQuiz(category),
      currentIndex: 0,
      score: 0,
      answered: null,
      selectedIdx: null,
    });
    setPhase("quiz");
  }

  function handleAnswer(item: WordItem, idx: number) {
    if (!quiz || quiz.answered !== null) return;
    const correct = item.en === quiz.questions[quiz.currentIndex].question.en;
    if (correct) {
      speak(quiz.questions[quiz.currentIndex].question.en);
      addStar(1);
    }
    const newQuiz = {
      ...quiz,
      score: correct ? quiz.score + 1 : quiz.score,
      answered: correct ? ("correct" as const) : ("wrong" as const),
      selectedIdx: idx,
    };
    setQuiz(newQuiz);
    setTimeout(() => {
      const nextIndex = quiz.currentIndex + 1;
      if (nextIndex >= quiz.questions.length) {
        setPhase("result");
      } else {
        setQuiz({
          ...newQuiz,
          currentIndex: nextIndex,
          answered: null,
          selectedIdx: null,
        });
      }
    }, 1500);
  }

  function playAgain() {
    if (!quiz) return;
    startQuiz(quiz.category);
  }
  function goToCategories() {
    setPhase("category");
    setQuiz(null);
  }

  const encouragement = (score: number, total: number) => {
    const pct = score / total;
    if (pct === 1) return { en: "Perfect! 🌟", hi: "एकदम सही! 🌟" };
    if (pct >= 0.8) return { en: "Excellent!", hi: "बहुत बढ़िया!" };
    if (pct >= 0.6) return { en: "Good job!", hi: "अच्छा किया!" };
    if (pct >= 0.4) return { en: "Keep trying!", hi: "कोशिश करते रहो!" };
    return { en: "Practice more!", hi: "और अभ्यास करो!" };
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          data-ocid="quiz.back.button"
          className="text-3xl leading-none px-2 py-1 rounded-xl hover:bg-muted transition-colors"
        >
          ←
        </motion.button>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧠</span>
          <span className="font-display text-xl font-bold text-[oklch(35%_0.22_320)]">
            Quiz / क्विज़
          </span>
        </div>
        {quiz && phase === "quiz" ? (
          <div className="font-display text-lg font-bold text-[oklch(35%_0.22_320)] bg-[oklch(95%_0.12_320)] px-3 py-1 rounded-full border-2 border-[oklch(62%_0.22_320)]">
            {quiz.score}/{quiz.questions.length}
          </div>
        ) : (
          <div className="w-12" />
        )}
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-6">
        <AnimatePresence mode="wait">
          {phase === "category" && (
            <motion.div
              key="category"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-2xl"
            >
              <div className="text-center mb-8">
                <h2 className="font-display text-3xl font-extrabold text-foreground">
                  Choose a Category
                </h2>
                <p className="font-body text-muted-foreground mt-1">
                  एक विषय चुनें
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Object.keys(CATEGORIES).map((cat, i) => {
                  const s = CATEGORY_STYLES[cat];
                  return (
                    <motion.button
                      key={cat}
                      data-ocid="quiz.category.button"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: i * 0.05,
                        duration: 0.4,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                      whileHover={{ scale: 1.04, y: -3 }}
                      whileTap={{ scale: 0.93, y: 3 }}
                      onClick={() => startQuiz(cat)}
                      className={`flex flex-col items-center gap-2 rounded-3xl border-4 p-4 ${s.bg} ${s.border} ${s.shadow} cursor-pointer active:shadow-none active:translate-y-1 transition-all duration-150`}
                    >
                      <span className="text-4xl">{CATEGORY_EMOJIS[cat]}</span>
                      <span
                        className={`font-display text-lg font-extrabold ${s.text}`}
                      >
                        {cat}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {phase === "quiz" &&
            quiz &&
            (() => {
              const q = quiz.questions[quiz.currentIndex];
              const progress =
                (quiz.currentIndex / quiz.questions.length) * 100;
              return (
                <motion.div
                  key={`quiz-${quiz.currentIndex}`}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.35 }}
                  className="w-full max-w-lg flex flex-col gap-5"
                >
                  <div className="flex items-center gap-3">
                    <Progress
                      value={progress}
                      className="flex-1 h-3 rounded-full"
                    />
                    <span className="font-body text-sm font-semibold text-muted-foreground whitespace-nowrap">
                      {quiz.currentIndex + 1} / {quiz.questions.length}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-3 bg-white rounded-3xl border-4 border-[oklch(62%_0.22_320)] shadow-[0_8px_0_0_oklch(52%_0.22_320)] p-8">
                    <motion.div
                      key={q.question.emoji}
                      initial={{ scale: 0.5, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                      className="text-9xl leading-none select-none"
                    >
                      {q.question.emoji}
                    </motion.div>
                    <div className="text-center">
                      <p className="font-display text-2xl font-bold text-foreground">
                        What is this?
                      </p>
                      <p className="font-body text-lg text-muted-foreground">
                        यह क्या है?
                      </p>
                    </div>
                    <AnimatePresence>
                      {quiz.answered !== null && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className={`text-center px-6 py-2 rounded-2xl font-display text-xl font-extrabold ${quiz.answered === "correct" ? "bg-[oklch(90%_0.15_145)] text-[oklch(28%_0.22_145)]" : "bg-[oklch(93%_0.15_25)] text-[oklch(35%_0.25_25)]"}`}
                        >
                          {quiz.answered === "correct"
                            ? "✅ Correct! / सही!"
                            : "❌ Try again! / फिर कोशिश करो!"}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {q.options.map((opt, idx) => {
                      const c = cardColors[idx % cardColors.length];
                      let overrideClass = "";
                      if (quiz.answered !== null) {
                        if (opt.en === q.question.en)
                          overrideClass =
                            "!bg-[oklch(88%_0.18_145)] !border-[oklch(55%_0.25_145)] !shadow-[0_4px_0_0_oklch(45%_0.25_145)]";
                        else if (
                          quiz.selectedIdx === idx &&
                          quiz.answered === "wrong"
                        )
                          overrideClass =
                            "!bg-[oklch(93%_0.15_25)] !border-[oklch(60%_0.25_25)] !shadow-[0_4px_0_0_oklch(50%_0.25_25)]";
                      }
                      return (
                        <motion.button
                          key={opt.en}
                          data-ocid={`quiz.answer.button.${idx + 1}`}
                          whileHover={
                            quiz.answered === null ? { scale: 1.03, y: -2 } : {}
                          }
                          whileTap={
                            quiz.answered === null ? { scale: 0.95, y: 2 } : {}
                          }
                          animate={
                            quiz.answered === "wrong" &&
                            quiz.selectedIdx === idx
                              ? { x: [0, -8, 8, -6, 6, 0] }
                              : {}
                          }
                          transition={{ duration: 0.35 }}
                          onClick={() => handleAnswer(opt, idx)}
                          disabled={quiz.answered !== null}
                          className={`flex flex-col items-center justify-center gap-1 rounded-2xl border-4 p-4 cursor-pointer active:shadow-none active:translate-y-1 transition-all duration-150 disabled:cursor-default ${c.bg} ${c.border} ${c.shadow} ${overrideClass}`}
                        >
                          <span
                            className={`font-display text-xl font-extrabold ${c.text}`}
                          >
                            {opt.en}
                          </span>
                          <span
                            className={`font-body text-base font-semibold ${c.text} opacity-80`}
                          >
                            {opt.hi}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })()}

          {phase === "result" &&
            quiz &&
            (() => {
              const msg = encouragement(quiz.score, quiz.questions.length);
              return (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                  className="w-full max-w-md flex flex-col items-center gap-6 text-center"
                >
                  <motion.div
                    animate={{ rotate: [0, -15, 15, -10, 10, 0] }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-8xl"
                  >
                    🎉
                  </motion.div>
                  <div className="bg-white rounded-3xl border-4 border-[oklch(62%_0.22_320)] shadow-[0_8px_0_0_oklch(52%_0.22_320)] p-8 w-full flex flex-col items-center gap-4">
                    <h2 className="font-display text-3xl font-extrabold text-[oklch(35%_0.22_320)]">
                      Quiz Complete! / क्विज़ खत्म!
                    </h2>
                    <div className="font-display text-6xl font-extrabold text-foreground">
                      {quiz.score}
                      <span className="text-muted-foreground text-3xl">
                        /{quiz.questions.length}
                      </span>
                    </div>
                    <div className="font-body text-lg font-semibold text-muted-foreground">
                      <p>{msg.en}</p>
                      <p>{msg.hi}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 w-full">
                    <motion.button
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.94, y: 2 }}
                      onClick={playAgain}
                      data-ocid="quiz.play_again.button"
                      className="flex-1 rounded-2xl border-4 border-[oklch(62%_0.22_145)] bg-[oklch(96%_0.12_145)] shadow-[0_6px_0_0_oklch(52%_0.22_145)] py-4 font-display text-xl font-extrabold text-[oklch(28%_0.22_145)] active:shadow-none active:translate-y-1 transition-all"
                    >
                      🔄 Play Again
                      <br />
                      <span className="text-sm font-body font-medium opacity-70">
                        फिर खेलो
                      </span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.94, y: 2 }}
                      onClick={goToCategories}
                      data-ocid="quiz.back.button"
                      className="flex-1 rounded-2xl border-4 border-[oklch(62%_0.22_320)] bg-[oklch(95%_0.12_320)] shadow-[0_6px_0_0_oklch(52%_0.22_320)] py-4 font-display text-xl font-extrabold text-[oklch(30%_0.22_320)] active:shadow-none active:translate-y-1 transition-all"
                    >
                      🏠 Menu
                      <br />
                      <span className="text-sm font-body font-medium opacity-70">
                        मेनू
                      </span>
                    </motion.button>
                  </div>
                </motion.div>
              );
            })()}
        </AnimatePresence>
      </main>
    </div>
  );
}
