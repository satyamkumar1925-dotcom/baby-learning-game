import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { speakWithSpelling } from "../utils/speech";
import { addStar } from "../utils/stars";
import GameLayout from "./GameLayout";

function speakQuiz(text: string) {
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.85;
  u.pitch = 1.3;
  window.speechSynthesis.speak(u);
}

const hindiNumbers: Record<number, string> = {
  1: "एक",
  2: "दो",
  3: "तीन",
  4: "चार",
  5: "पाँच",
  6: "छह",
  7: "सात",
  8: "आठ",
  9: "नौ",
  10: "दस",
  11: "ग्यारह",
  12: "बारह",
  13: "तेरह",
  14: "चौदह",
  15: "पंद्रह",
  16: "सोलह",
  17: "सत्रह",
  18: "अठारह",
  19: "उन्नीस",
  20: "बीस",
  21: "इक्कीस",
  22: "बाईस",
  23: "तेईस",
  24: "चौबीस",
  25: "पच्चीस",
  26: "छब्बीस",
  27: "सत्ताईस",
  28: "अठ्ठाईस",
  29: "उनतीस",
  30: "तीस",
  31: "इकतीस",
  32: "बत्तीस",
  33: "तैंतीस",
  34: "चौंतीस",
  35: "पेंतीस",
  36: "छत्तीस",
  37: "सैंतीस",
  38: "अड़तीस",
  39: "उनतालीस",
  40: "चालीस",
  41: "इकतालीस",
  42: "बयालीस",
  43: "तेतालीस",
  44: "चौतालीस",
  45: "पेतालीस",
  46: "छियालीस",
  47: "सैतालीस",
  48: "अड़तालीस",
  49: "उनचास",
  50: "पचास",
  51: "इकयावन",
  52: "बावन",
  53: "तिरयावन",
  54: "चौवन",
  55: "पचपन",
  56: "छपन",
  57: "सतावन",
  58: "अठावन",
  59: "उनसठ",
  60: "साठ",
  61: "इकसठ",
  62: "बासठ",
  63: "तिरसठ",
  64: "चौसठ",
  65: "पेंसठ",
  66: "छियासठ",
  67: "सरसठ",
  68: "अड़सठ",
  69: "उनहत्तर",
  70: "सत्तर",
  71: "इकहत्तर",
  72: "बाहत्तर",
  73: "तिरहत्तर",
  74: "चौहत्तर",
  75: "पचहत्तर",
  76: "छियहत्तर",
  77: "सत्तर",
  78: "अठ्तर",
  79: "उनतासी",
  80: "असी",
  81: "इकासी",
  82: "बयासी",
  83: "तिरासी",
  84: "चौरासी",
  85: "पचासी",
  86: "छियासी",
  87: "सतासी",
  88: "अठासी",
  89: "नवासी",
  90: "नब्बे",
  91: "इकानबे",
  92: "बानबे",
  93: "तिरानबे",
  94: "चौरानबे",
  95: "पचानबे",
  96: "छियानबे",
  97: "सतानबे",
  98: "अठानबे",
  99: "निन्यानबे",
  100: "सौ",
};

const emojis = ["🐶", "🐱", "🦁", "🐸", "🐰", "🍎", "🍌", "🍓", "⭐", "🌸"];

function generateQ() {
  const count = Math.floor(Math.random() * 20) + 1;
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  const wrongSet = new Set<number>();
  while (wrongSet.size < 3) {
    const w = Math.floor(Math.random() * 20) + 1;
    if (w !== count) wrongSet.add(w);
  }
  const options = [count, ...wrongSet].sort(() => Math.random() - 0.5);
  const emojiIds = Array.from({ length: count }, () =>
    Math.random().toString(36).slice(2),
  );
  return { count, emoji, options, emojiIds };
}

const PROGRESS_DOTS = [
  "p0",
  "p1",
  "p2",
  "p3",
  "p4",
  "p5",
  "p6",
  "p7",
  "p8",
  "p9",
];

const optColors = [
  "bg-[oklch(95%_0.12_27)] border-[oklch(65%_0.22_27)] shadow-[0_5px_0_0_oklch(55%_0.22_27)] text-[oklch(30%_0.22_27)]",
  "bg-[oklch(95%_0.12_250)] border-[oklch(60%_0.2_250)] shadow-[0_5px_0_0_oklch(50%_0.2_250)] text-[oklch(25%_0.2_250)]",
  "bg-[oklch(96%_0.12_145)] border-[oklch(58%_0.22_145)] shadow-[0_5px_0_0_oklch(48%_0.22_145)] text-[oklch(28%_0.22_145)]",
  "bg-[oklch(95%_0.12_300)] border-[oklch(60%_0.22_300)] shadow-[0_5px_0_0_oklch(50%_0.22_300)] text-[oklch(28%_0.22_300)]",
];

export default function CountingGame({ onBack }: { onBack: () => void }) {
  const [mode, setMode] = useState<"select" | "learn" | "quiz">("select");
  const [qNum, setQNum] = useState(0);
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(generateQ);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [done, setDone] = useState(false);
  const [celebrating, setCelebrating] = useState(false);

  const handleAnswer = (n: number) => {
    if (feedback) return;
    if (n === question.count) {
      setFeedback("correct");
      setCelebrating(true);
      addStar();
      setScore((s) => s + 1);
      speakQuiz(`Yes! ${n}!`);
      setTimeout(() => {
        setCelebrating(false);
        setFeedback(null);
        if (qNum + 1 >= 10) setDone(true);
        else {
          setQNum((q) => q + 1);
          setQuestion(generateQ());
        }
      }, 1200);
    } else {
      setFeedback("wrong");
      speakQuiz("Try again!");
      setTimeout(() => setFeedback(null), 900);
    }
  };

  const restart = () => {
    setQNum(0);
    setScore(0);
    setDone(false);
    setFeedback(null);
    setCelebrating(false);
    setQuestion(generateQ());
  };

  if (mode === "select") {
    return (
      <GameLayout
        title="Counting"
        emoji="🔢"
        color="oklch(50% 0.22 300)"
        onBack={onBack}
      >
        <div className="flex flex-col items-center gap-6 py-4">
          <h2 className="font-display text-2xl font-extrabold text-[oklch(35%_0.22_300)]">
            Mode chuno / मोड चुनें
          </h2>
          <motion.button
            data-ocid="counting.learn.button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMode("learn")}
            className="w-full max-w-xs flex items-center justify-between rounded-3xl border-4 px-6 py-5 bg-[oklch(96%_0.12_145)] border-[oklch(60%_0.22_145)] shadow-[0_6px_0_0_oklch(50%_0.22_145)] active:shadow-none active:translate-y-1 transition-all"
          >
            <div>
              <p className="font-display text-2xl font-extrabold text-[oklch(28%_0.22_145)]">
                Learn 1-100
              </p>
              <p className="font-body text-sm text-muted-foreground">
                सीखो • All numbers
              </p>
            </div>
            <span className="text-4xl">📖</span>
          </motion.button>
          <motion.button
            data-ocid="counting.quiz.button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMode("quiz")}
            className="w-full max-w-xs flex items-center justify-between rounded-3xl border-4 px-6 py-5 bg-[oklch(95%_0.12_300)] border-[oklch(60%_0.22_300)] shadow-[0_6px_0_0_oklch(50%_0.22_300)] active:shadow-none active:translate-y-1 transition-all"
          >
            <div>
              <p className="font-display text-2xl font-extrabold text-[oklch(28%_0.22_300)]">
                Quiz 1-20
              </p>
              <p className="font-body text-sm text-muted-foreground">
                क्विज़ • Count & answer
              </p>
            </div>
            <span className="text-4xl">🧠</span>
          </motion.button>
        </div>
      </GameLayout>
    );
  }

  if (mode === "learn") {
    return (
      <GameLayout
        title="Numbers 1-100"
        emoji="🔢"
        color="oklch(50% 0.22 145)"
        onBack={() => setMode("select")}
      >
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
          {Array.from({ length: 100 }, (_, i) => i + 1).map((n) => (
            <motion.button
              key={n}
              data-ocid={`counting.number.${n}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9, y: 2 }}
              onClick={() => {
                speakWithSpelling(String(n), hindiNumbers[n] ?? String(n));
                addStar();
              }}
              className="flex flex-col items-center justify-center gap-1 rounded-2xl border-4 border-[oklch(60%_0.22_145)] bg-[oklch(95%_0.12_145)] shadow-[0_4px_0_0_oklch(50%_0.22_145)] py-3 active:shadow-none active:translate-y-1 transition-all"
            >
              <span className="font-display text-2xl font-extrabold text-[oklch(28%_0.22_145)]">
                {n}
              </span>
              <span className="font-body text-xs text-muted-foreground">
                {hindiNumbers[n]}
              </span>
            </motion.button>
          ))}
        </div>
      </GameLayout>
    );
  }

  return (
    <GameLayout
      title="Counting Quiz"
      emoji="🔢"
      color="oklch(50% 0.22 300)"
      onBack={() => setMode("select")}
    >
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-6 py-12"
            data-ocid="counting.success_state"
          >
            <span className="text-8xl">🏆</span>
            <h2 className="font-display text-4xl font-extrabold text-[oklch(40%_0.22_300)]">
              Shabaash! 🎉
            </h2>
            <p className="font-body text-2xl text-muted-foreground">
              Score: {score} / 10
            </p>
            <motion.button
              data-ocid="counting.restart.button"
              whileTap={{ scale: 0.95 }}
              onClick={restart}
              className="bg-[oklch(95%_0.12_300)] border-4 border-[oklch(60%_0.22_300)] shadow-[0_5px_0_0_oklch(50%_0.22_300)] rounded-3xl px-8 py-4 font-display text-xl font-extrabold text-[oklch(28%_0.22_300)] active:shadow-none active:translate-y-1 transition-all"
            >
              Play Again 🔄
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key={qNum}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="flex gap-2">
              {PROGRESS_DOTS.map((dotKey, i) => (
                <div
                  key={dotKey}
                  className={`w-4 h-4 rounded-full border-2 transition-all ${i < qNum ? "bg-[oklch(65%_0.22_300)] border-[oklch(50%_0.22_300)]" : i === qNum ? "bg-[oklch(75%_0.22_50)] border-[oklch(60%_0.22_50)] scale-125" : "bg-[oklch(92%_0.04_250)] border-[oklch(70%_0.08_250)]"}`}
                />
              ))}
            </div>
            <p className="font-body text-xl text-muted-foreground font-semibold">
              Kitne hain? / कितने हैं?
            </p>
            <motion.div
              animate={celebrating ? { scale: [1, 1.1, 0.95, 1.05, 1] } : {}}
              transition={{ duration: 0.5 }}
              className={`rounded-3xl border-4 p-6 flex flex-wrap gap-3 justify-center items-center max-w-xs transition-colors duration-300 ${feedback === "correct" ? "bg-[oklch(92%_0.15_145)] border-[oklch(58%_0.22_145)]" : feedback === "wrong" ? "bg-[oklch(94%_0.12_27)] border-[oklch(65%_0.22_27)]" : "bg-[oklch(96%_0.1_300)] border-[oklch(60%_0.22_300)]"}`}
            >
              {question.emojiIds.map((eid, eidx) => (
                <motion.span
                  key={eid}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: eidx * 0.05,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className="text-4xl"
                >
                  {question.emoji}
                </motion.span>
              ))}
            </motion.div>
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              {question.options.map((opt, i) => (
                <motion.button
                  key={opt}
                  data-ocid={`counting.option.${i + 1}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => handleAnswer(opt)}
                  className={`border-4 rounded-3xl py-6 font-display text-4xl font-extrabold active:shadow-none active:translate-y-1 transition-all duration-150 ${optColors[i]}`}
                >
                  {opt}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GameLayout>
  );
}
