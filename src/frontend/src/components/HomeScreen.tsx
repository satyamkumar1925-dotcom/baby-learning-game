import { Settings } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { GameScreen } from "../App";
import { useSettings } from "../context/SettingsContext";
import {
  getAvatar,
  getStars,
  getStreak,
  updateStreak,
} from "../utils/localProgress";

interface HomeScreenProps {
  onNavigate: (screen: GameScreen) => void;
  onDashboard: () => void;
}

const games = [
  {
    id: "animals" as GameScreen,
    emoji: "🐶",
    title: "Animals",
    subtitle: "Janwar / जानवर",
    bg: "bg-[oklch(95%_0.12_27)]",
    border: "border-[oklch(65%_0.22_27)]",
    shadow: "shadow-[0_6px_0_0_oklch(55%_0.22_27)]",
    text: "text-[oklch(35%_0.22_27)]",
    ocid: "home.animals.button",
  },
  {
    id: "colors" as GameScreen,
    emoji: "🌈",
    title: "Colors",
    subtitle: "Rang / रंग",
    bg: "bg-[oklch(95%_0.12_250)]",
    border: "border-[oklch(60%_0.2_250)]",
    shadow: "shadow-[0_6px_0_0_oklch(50%_0.2_250)]",
    text: "text-[oklch(30%_0.2_250)]",
    ocid: "home.colors.button",
  },
  {
    id: "numbers" as GameScreen,
    emoji: "🔢",
    title: "Numbers",
    subtitle: "Ginti / गिनती",
    bg: "bg-[oklch(96%_0.12_145)]",
    border: "border-[oklch(60%_0.22_145)]",
    shadow: "shadow-[0_6px_0_0_oklch(50%_0.22_145)]",
    text: "text-[oklch(30%_0.22_145)]",
    ocid: "home.numbers.button",
  },
  {
    id: "letters" as GameScreen,
    emoji: "🔤",
    title: "Letters",
    subtitle: "Akshar / अक्षर",
    bg: "bg-[oklch(95%_0.12_300)]",
    border: "border-[oklch(58%_0.22_300)]",
    shadow: "shadow-[0_6px_0_0_oklch(48%_0.22_300)]",
    text: "text-[oklch(28%_0.22_300)]",
    ocid: "home.letters.button",
  },
  {
    id: "abcwords" as GameScreen,
    emoji: "📝",
    title: "ABC Words",
    subtitle: "Das Shabd / दस शब्द",
    bg: "bg-[oklch(95%_0.12_145)]",
    border: "border-[oklch(60%_0.22_145)]",
    shadow: "shadow-[0_6px_0_0_oklch(50%_0.22_145)]",
    text: "text-[oklch(30%_0.22_145)]",
    ocid: "home.abcwords.button",
  },
  {
    id: "fruits" as GameScreen,
    emoji: "🍎",
    title: "Fruits",
    subtitle: "Phal / फल",
    bg: "bg-[oklch(95%_0.12_27)]",
    border: "border-[oklch(65%_0.22_27)]",
    shadow: "shadow-[0_6px_0_0_oklch(55%_0.22_27)]",
    text: "text-[oklch(35%_0.22_27)]",
    ocid: "home.fruits.button",
  },
  {
    id: "vegetables" as GameScreen,
    emoji: "🥦",
    title: "Vegetables",
    subtitle: "Sabzi / सब्जी",
    bg: "bg-[oklch(96%_0.12_145)]",
    border: "border-[oklch(60%_0.22_145)]",
    shadow: "shadow-[0_6px_0_0_oklch(50%_0.22_145)]",
    text: "text-[oklch(30%_0.22_145)]",
    ocid: "home.vegetables.button",
  },
  {
    id: "shapes" as GameScreen,
    emoji: "⭐",
    title: "Shapes",
    subtitle: "Aakar / आकार",
    bg: "bg-[oklch(96%_0.12_50)]",
    border: "border-[oklch(68%_0.22_50)]",
    shadow: "shadow-[0_6px_0_0_oklch(58%_0.22_50)]",
    text: "text-[oklch(32%_0.22_50)]",
    ocid: "home.shapes.button",
  },
  {
    id: "cities" as GameScreen,
    emoji: "🌆",
    title: "Cities",
    subtitle: "Shahar / शहर",
    bg: "bg-[oklch(95%_0.12_250)]",
    border: "border-[oklch(60%_0.2_250)]",
    shadow: "shadow-[0_6px_0_0_oklch(50%_0.2_250)]",
    text: "text-[oklch(30%_0.2_250)]",
    ocid: "home.cities.button",
  },
  {
    id: "countries" as GameScreen,
    emoji: "🌍",
    title: "Countries",
    subtitle: "Desh / देश",
    bg: "bg-[oklch(95%_0.12_190)]",
    border: "border-[oklch(60%_0.18_190)]",
    shadow: "shadow-[0_6px_0_0_oklch(50%_0.18_190)]",
    text: "text-[oklch(28%_0.18_190)]",
    ocid: "home.countries.button",
  },
  {
    id: "states" as GameScreen,
    emoji: "🗺️",
    title: "US States",
    subtitle: "Rajya / राज्य",
    bg: "bg-[oklch(96%_0.12_340)]",
    border: "border-[oklch(65%_0.22_340)]",
    shadow: "shadow-[0_6px_0_0_oklch(55%_0.22_340)]",
    text: "text-[oklch(30%_0.22_340)]",
    ocid: "home.states.button",
  },
  {
    id: "birds" as GameScreen,
    emoji: "🦅",
    title: "Birds",
    subtitle: "Pakshi / पक्षी",
    bg: "bg-[oklch(95%_0.12_190)]",
    border: "border-[oklch(60%_0.18_190)]",
    shadow: "shadow-[0_6px_0_0_oklch(50%_0.18_190)]",
    text: "text-[oklch(28%_0.18_190)]",
    ocid: "home.birds.button",
  },
  {
    id: "flowers" as GameScreen,
    emoji: "🌸",
    title: "Flowers",
    subtitle: "Phool / फूल",
    bg: "bg-[oklch(96%_0.12_340)]",
    border: "border-[oklch(65%_0.22_340)]",
    shadow: "shadow-[0_6px_0_0_oklch(55%_0.22_340)]",
    text: "text-[oklch(30%_0.22_340)]",
    ocid: "home.flowers.button",
  },
  {
    id: "vehicles" as GameScreen,
    emoji: "🚗",
    title: "Vehicles",
    subtitle: "Vaahan / वाहन",
    bg: "bg-[oklch(95%_0.12_250)]",
    border: "border-[oklch(60%_0.2_250)]",
    shadow: "shadow-[0_6px_0_0_oklch(50%_0.2_250)]",
    text: "text-[oklch(30%_0.2_250)]",
    ocid: "home.vehicles.button",
  },
  {
    id: "bodyparts" as GameScreen,
    emoji: "💪",
    title: "Body Parts",
    subtitle: "Sharir / शरीर",
    bg: "bg-[oklch(95%_0.12_27)]",
    border: "border-[oklch(65%_0.22_27)]",
    shadow: "shadow-[0_6px_0_0_oklch(55%_0.22_27)]",
    text: "text-[oklch(35%_0.22_27)]",
    ocid: "home.bodyparts.button",
  },
  {
    id: "family" as GameScreen,
    emoji: "👨‍👩‍👧‍👦",
    title: "Family",
    subtitle: "Parivaar / परिवार",
    bg: "bg-[oklch(95%_0.12_300)]",
    border: "border-[oklch(60%_0.22_300)]",
    shadow: "shadow-[0_6px_0_0_oklch(50%_0.22_300)]",
    text: "text-[oklch(28%_0.22_300)]",
    ocid: "home.family.button",
  },
  {
    id: "drawing" as GameScreen,
    emoji: "🖍️",
    title: "Drawing",
    subtitle: "Chitra / चित्र",
    bg: "bg-[oklch(96%_0.12_145)]",
    border: "border-[oklch(60%_0.22_145)]",
    shadow: "shadow-[0_6px_0_0_oklch(50%_0.22_145)]",
    text: "text-[oklch(30%_0.22_145)]",
    ocid: "home.drawing.button",
  },
  {
    id: "rhymes" as GameScreen,
    emoji: "🎵",
    title: "Rhymes",
    subtitle: "Kavita / कविता",
    bg: "bg-[oklch(95%_0.12_300)]",
    border: "border-[oklch(58%_0.22_300)]",
    shadow: "shadow-[0_6px_0_0_oklch(48%_0.22_300)]",
    text: "text-[oklch(28%_0.22_300)]",
    ocid: "home.rhymes.button",
  },
  {
    id: "quiz" as GameScreen,
    emoji: "🧠",
    title: "Quiz",
    subtitle: "Test / क्विज़",
    bg: "bg-[oklch(95%_0.12_320)]",
    border: "border-[oklch(62%_0.22_320)]",
    shadow: "shadow-[0_6px_0_0_oklch(52%_0.22_320)]",
    text: "text-[oklch(30%_0.22_320)]",
    ocid: "home.quiz.button",
  },
  {
    id: "tables" as GameScreen,
    emoji: "📊",
    title: "Tables",
    subtitle: "Pahada / पहाड़ा",
    bg: "bg-[oklch(96%_0.12_50)]",
    border: "border-[oklch(68%_0.22_50)]",
    shadow: "shadow-[0_6px_0_0_oklch(58%_0.22_50)]",
    text: "text-[oklch(32%_0.22_50)]",
    ocid: "home.tables.button",
  },
  {
    id: "matching" as GameScreen,
    emoji: "🎯",
    title: "Matching",
    subtitle: "Milao / मिलाओ",
    bg: "bg-[oklch(95%_0.12_190)]",
    border: "border-[oklch(60%_0.18_190)]",
    shadow: "shadow-[0_6px_0_0_oklch(50%_0.18_190)]",
    text: "text-[oklch(28%_0.18_190)]",
    ocid: "home.matching.button",
  },
  {
    id: "counting" as GameScreen,
    emoji: "🔢",
    title: "Counting",
    subtitle: "Gino 1-100 / गिनो",
    bg: "bg-[oklch(95%_0.12_300)]",
    border: "border-[oklch(60%_0.22_300)]",
    shadow: "shadow-[0_6px_0_0_oklch(50%_0.22_300)]",
    text: "text-[oklch(28%_0.22_300)]",
    ocid: "home.counting.button",
  },
  {
    id: "matra" as GameScreen,
    emoji: "अ",
    title: "Matra",
    subtitle: "Matra / मात्रा",
    bg: "bg-[oklch(95%_0.12_27)]",
    border: "border-[oklch(65%_0.22_27)]",
    shadow: "shadow-[0_6px_0_0_oklch(55%_0.22_27)]",
    text: "text-[oklch(35%_0.22_27)]",
    ocid: "home.matra.button",
  },
  {
    id: "story" as GameScreen,
    emoji: "📖",
    title: "Stories",
    subtitle: "Kahani / कहानी",
    bg: "bg-[oklch(96%_0.12_145)]",
    border: "border-[oklch(60%_0.22_145)]",
    shadow: "shadow-[0_6px_0_0_oklch(50%_0.22_145)]",
    text: "text-[oklch(30%_0.22_145)]",
    ocid: "home.story.button",
  },
  {
    id: "puzzle" as GameScreen,
    emoji: "🧩",
    title: "Puzzle",
    subtitle: "Paheli / पहेली",
    bg: "bg-[oklch(96%_0.12_340)]",
    border: "border-[oklch(65%_0.22_340)]",
    shadow: "shadow-[0_6px_0_0_oklch(55%_0.22_340)]",
    text: "text-[oklch(30%_0.22_340)]",
    ocid: "home.puzzle.button",
  },
  {
    id: "videos" as GameScreen,
    emoji: "🎞️",
    title: "Videos",
    subtitle: "Video / वीडियो",
    bg: "bg-[oklch(95%_0.12_250)]",
    border: "border-[oklch(60%_0.2_250)]",
    shadow: "shadow-[0_6px_0_0_oklch(50%_0.2_250)]",
    text: "text-[oklch(30%_0.2_250)]",
    ocid: "home.videos.button",
  },
  {
    id: "balloon" as GameScreen,
    emoji: "🎈",
    title: "Balloon Pop",
    subtitle: "Gubbare / गुब्बारे",
    bg: "bg-[oklch(96%_0.12_340)]",
    border: "border-[oklch(65%_0.22_340)]",
    shadow: "shadow-[0_6px_0_0_oklch(55%_0.22_340)]",
    text: "text-[oklch(30%_0.22_340)]",
    ocid: "home.balloon.button",
  },
  {
    id: "colormix" as GameScreen,
    emoji: "🎨",
    title: "Color Mix",
    subtitle: "Rang Milao / रंग मिलाओ",
    bg: "bg-[oklch(96%_0.12_145)]",
    border: "border-[oklch(60%_0.22_145)]",
    shadow: "shadow-[0_6px_0_0_oklch(50%_0.22_145)]",
    text: "text-[oklch(30%_0.22_145)]",
    ocid: "home.colormix.button",
  },
  {
    id: "numbermatch" as GameScreen,
    emoji: "🔢",
    title: "Number Match",
    subtitle: "Sankhya Milao / संख्या मिलाओ",
    bg: "bg-[oklch(95%_0.12_145)]",
    border: "border-[oklch(60%_0.22_145)]",
    shadow: "shadow-[0_6px_0_0_oklch(50%_0.22_145)]",
    text: "text-[oklch(30%_0.22_145)]",
    ocid: "home.numbermatch.button",
  },
  {
    id: "animalsound" as GameScreen,
    emoji: "🔊",
    title: "Animal Sound",
    subtitle: "Aawaz / आवाज़",
    bg: "bg-[oklch(95%_0.12_50)]",
    border: "border-[oklch(68%_0.22_50)]",
    shadow: "shadow-[0_6px_0_0_oklch(58%_0.22_50)]",
    text: "text-[oklch(32%_0.22_50)]",
    ocid: "home.animalsound.button",
  },
  {
    id: "wordbuilder" as GameScreen,
    emoji: "🔤",
    title: "Word Builder",
    subtitle: "Shabd Banao / शब्द बनाओ",
    bg: "bg-[oklch(95%_0.12_300)]",
    border: "border-[oklch(60%_0.22_300)]",
    shadow: "shadow-[0_6px_0_0_oklch(50%_0.22_300)]",
    text: "text-[oklch(28%_0.22_300)]",
    ocid: "home.wordbuilder.button",
  },
  {
    id: "memorycards" as GameScreen,
    emoji: "🃏",
    title: "Memory Cards",
    subtitle: "Yaaddasht / याददाश्त",
    bg: "bg-[oklch(95%_0.12_250)]",
    border: "border-[oklch(60%_0.2_250)]",
    shadow: "shadow-[0_6px_0_0_oklch(50%_0.2_250)]",
    text: "text-[oklch(30%_0.2_250)]",
    ocid: "home.memorycards.button",
  },
  {
    id: "catchfruit" as GameScreen,
    emoji: "🍎",
    title: "Catch Fruit",
    subtitle: "Phal Pakdo / फल पकड़ो",
    bg: "bg-[oklch(96%_0.12_27)]",
    border: "border-[oklch(65%_0.22_27)]",
    shadow: "shadow-[0_6px_0_0_oklch(55%_0.22_27)]",
    text: "text-[oklch(35%_0.22_27)]",
    ocid: "home.catchfruit.button",
  },
];

export default function HomeScreen({
  onNavigate,
  onDashboard,
}: HomeScreenProps) {
  const [stars, setStars] = useState(getStars);
  const [streak, setStreak] = useState(() => getStreak().current);
  const avatar = getAvatar();
  const { openSettings } = useSettings();

  useEffect(() => {
    const newStreak = updateStreak();
    setStreak(newStreak);
  }, []);

  useEffect(() => {
    const update = () => setStars(getStars());
    window.addEventListener("starsUpdated", update);
    return () => window.removeEventListener("starsUpdated", update);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className="flex flex-col items-center mb-10 w-full max-w-3xl"
      >
        <div className="flex items-center justify-between w-full mb-2">
          <div className="flex items-center gap-2">
            <span className="text-3xl">{avatar}</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              data-ocid="home.stars.panel"
              className="flex items-center gap-1 bg-[oklch(96%_0.14_50)] border-4 border-[oklch(70%_0.22_50)] shadow-[0_4px_0_0_oklch(58%_0.22_50)] rounded-2xl px-3 py-1"
            >
              <span className="text-xl">⭐</span>
              <span className="font-display text-lg font-extrabold text-[oklch(32%_0.22_50)]">
                {stars}
              </span>
            </div>
            <motion.button
              data-ocid="home.settings.button"
              whileHover={{ scale: 1.08, rotate: 30 }}
              whileTap={{ scale: 0.92 }}
              onClick={openSettings}
              className="w-10 h-10 flex items-center justify-center rounded-2xl border-2 border-border bg-card hover:bg-muted transition-colors"
            >
              <Settings className="w-5 h-5 text-muted-foreground" />
            </motion.button>
          </div>
        </div>
        {streak > 0 && (
          <div className="flex items-center gap-1 text-sm font-bold text-[oklch(55%_0.22_27)] self-end mb-1">
            <span>🔥</span>
            <span className="font-display">{streak} day streak!</span>
          </div>
        )}
        <div className="flex items-center gap-2 self-end mb-2">
          <motion.button
            data-ocid="home.dashboard.button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.93 }}
            onClick={onDashboard}
            className="flex items-center gap-1.5 text-sm bg-[oklch(94%_0.1_300)] border-4 border-[oklch(72%_0.2_300)] shadow-[0_3px_0_0_oklch(60%_0.2_300)] rounded-xl px-3 py-1.5 font-display font-bold text-[oklch(38%_0.22_300)] active:shadow-none active:translate-y-0.5 transition-all"
          >
            📊 Dashboard
          </motion.button>
        </div>
        <h1 className="font-display text-5xl sm:text-6xl font-extrabold text-center leading-tight">
          <span className="text-[oklch(60%_0.22_27)]">Baby </span>
          <span className="text-[oklch(55%_0.22_250)]">Learning</span>
        </h1>
        <p className="font-body text-xl text-muted-foreground mt-2 font-medium">
          Tap a card to start learning! 🎉
        </p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 w-full max-w-3xl">
        {games.map((game, i) => (
          <motion.button
            key={game.id}
            data-ocid={game.ocid}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: i * 0.04,
              duration: 0.5,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.93, y: 3 }}
            onClick={() => onNavigate(game.id)}
            className={`flex flex-col items-center justify-center gap-3 rounded-3xl border-4 p-5 ${game.bg} ${game.border} ${game.shadow} cursor-pointer active:shadow-none active:translate-y-1 transition-all duration-150`}
          >
            <span className="text-5xl">{game.emoji}</span>
            <div className="flex flex-col items-center gap-0.5">
              <span
                className={`font-display text-xl font-extrabold ${game.text}`}
              >
                {game.title}
              </span>
              <span className="font-body text-xs font-medium text-muted-foreground">
                {game.subtitle}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      <footer className="mt-auto pt-12 text-center text-sm text-muted-foreground">
        Created by{" "}
        <span className="font-bold text-[oklch(45%_0.2_250)]">
          Satyam Kumar
        </span>
      </footer>
    </div>
  );
}
