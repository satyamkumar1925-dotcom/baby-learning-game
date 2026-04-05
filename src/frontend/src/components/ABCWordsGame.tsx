import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { addStar } from "../utils/stars";
import GameLayout from "./GameLayout";

interface WordEntry {
  emoji: string;
  word: string;
  hindi: string;
}

const ABC_DATA: Record<string, WordEntry[]> = {
  A: [
    { emoji: "🍎", word: "Apple", hindi: "सेब" },
    { emoji: "🐜", word: "Ant", hindi: "चींटी" },
    { emoji: "✈️", word: "Airplane", hindi: "हवाई जहाज" },
    { emoji: "🏹", word: "Arrow", hindi: "तीर" },
    { emoji: "🪓", word: "Axe", hindi: "कुल्हाड़ी" },
    { emoji: "🐊", word: "Alligator", hindi: "मगरमच्छ" },
    { emoji: "🥑", word: "Avocado", hindi: "एवोकाडो" },
    { emoji: "⚓", word: "Anchor", hindi: "लंगर" },
    { emoji: "👼", word: "Angel", hindi: "परी" },
    { emoji: "👨‍🚀", word: "Astronaut", hindi: "अंतरिक्ष यात्री" },
  ],
  B: [
    { emoji: "⚽", word: "Ball", hindi: "गेंद" },
    { emoji: "🦋", word: "Butterfly", hindi: "तितली" },
    { emoji: "🍌", word: "Banana", hindi: "केला" },
    { emoji: "🐻", word: "Bear", hindi: "भालू" },
    { emoji: "⛵", word: "Boat", hindi: "नाव" },
    { emoji: "🐦", word: "Bird", hindi: "पक्षी" },
    { emoji: "🐝", word: "Bee", hindi: "मधुमक्खी" },
    { emoji: "📚", word: "Book", hindi: "किताब" },
    { emoji: "🎈", word: "Balloon", hindi: "गुब्बारा" },
    { emoji: "🍞", word: "Bread", hindi: "रोटी" },
  ],
  C: [
    { emoji: "🐱", word: "Cat", hindi: "बिल्ली" },
    { emoji: "🚗", word: "Car", hindi: "कार" },
    { emoji: "🎂", word: "Cake", hindi: "केक" },
    { emoji: "🐄", word: "Cow", hindi: "गाय" },
    { emoji: "☁️", word: "Cloud", hindi: "बादल" },
    { emoji: "🦀", word: "Crab", hindi: "केकड़ा" },
    { emoji: "👑", word: "Crown", hindi: "मुकुट" },
    { emoji: "🥕", word: "Carrot", hindi: "गाजर" },
    { emoji: "🍒", word: "Cherry", hindi: "चेरी" },
    { emoji: "🐊", word: "Crocodile", hindi: "मगरमच्छ" },
  ],
  D: [
    { emoji: "🐶", word: "Dog", hindi: "कुत्ता" },
    { emoji: "🦆", word: "Duck", hindi: "बतख" },
    { emoji: "🥁", word: "Drum", hindi: "ढोल" },
    { emoji: "💎", word: "Diamond", hindi: "हीरा" },
    { emoji: "🐬", word: "Dolphin", hindi: "डॉल्फिन" },
    { emoji: "🚪", word: "Door", hindi: "दरवाज़ा" },
    { emoji: "🦌", word: "Deer", hindi: "हिरण" },
    { emoji: "🍩", word: "Donut", hindi: "डोनट" },
    { emoji: "🐉", word: "Dragon", hindi: "अजगर" },
    { emoji: "🎲", word: "Dice", hindi: "पासा" },
  ],
  E: [
    { emoji: "🥚", word: "Egg", hindi: "अंडा" },
    { emoji: "🐘", word: "Elephant", hindi: "हाथी" },
    { emoji: "🦅", word: "Eagle", hindi: "बाज" },
    { emoji: "🌍", word: "Earth", hindi: "पृथ्वी" },
    { emoji: "👁️", word: "Eye", hindi: "आंख" },
    { emoji: "✉️", word: "Envelope", hindi: "लिफाफा" },
    { emoji: "🚂", word: "Engine", hindi: "इंजन" },
    { emoji: "🍆", word: "Eggplant", hindi: "बैंगन" },
    { emoji: "🧝", word: "Elf", hindi: "परी" },
    { emoji: "🧹", word: "Eraser", hindi: "रबर" },
  ],
  F: [
    { emoji: "🐟", word: "Fish", hindi: "मछली" },
    { emoji: "🐸", word: "Frog", hindi: "मेंढक" },
    { emoji: "🌸", word: "Flower", hindi: "फूल" },
    { emoji: "🚩", word: "Flag", hindi: "झंडा" },
    { emoji: "🔥", word: "Fire", hindi: "आग" },
    { emoji: "🦊", word: "Fox", hindi: "लोमड़ी" },
    { emoji: "🦩", word: "Flamingo", hindi: "राजहंस" },
    { emoji: "🏈", word: "Football", hindi: "फुटबॉल" },
    { emoji: "🪶", word: "Feather", hindi: "पंख" },
    { emoji: "🌀", word: "Fan", hindi: "पंखा" },
  ],
  G: [
    { emoji: "🍇", word: "Grapes", hindi: "अंगूर" },
    { emoji: "🦍", word: "Gorilla", hindi: "गोरिल्ला" },
    { emoji: "🎸", word: "Guitar", hindi: "गिटार" },
    { emoji: "🌐", word: "Globe", hindi: "ग्लोब" },
    { emoji: "🎁", word: "Gift", hindi: "उपहार" },
    { emoji: "🐐", word: "Goat", hindi: "बकरी" },
    { emoji: "👻", word: "Ghost", hindi: "भूत" },
    { emoji: "🦒", word: "Giraffe", hindi: "जिराफ" },
    { emoji: "🥇", word: "Gold", hindi: "सोना" },
    { emoji: "🧤", word: "Glove", hindi: "दस्ताना" },
  ],
  H: [
    { emoji: "🎩", word: "Hat", hindi: "टोपी" },
    { emoji: "🐎", word: "Horse", hindi: "घोड़ा" },
    { emoji: "❤️", word: "Heart", hindi: "दिल" },
    { emoji: "🏠", word: "House", hindi: "घर" },
    { emoji: "🐔", word: "Hen", hindi: "मुर्गी" },
    { emoji: "🍯", word: "Honey", hindi: "शहद" },
    { emoji: "🔨", word: "Hammer", hindi: "हथौड़ा" },
    { emoji: "🦛", word: "Hippo", hindi: "दरियाई घोड़ा" },
    { emoji: "🚁", word: "Helicopter", hindi: "हेलीकॉप्टर" },
    { emoji: "🤝", word: "Handshake", hindi: "हाथ मिलाना" },
  ],
  I: [
    { emoji: "🍦", word: "Ice Cream", hindi: "आइसक्रीम" },
    { emoji: "🏝️", word: "Island", hindi: "द्वीप" },
    { emoji: "🏔️", word: "Igloo", hindi: "इग्लू" },
    { emoji: "🖊️", word: "Ink", hindi: "स्याही" },
    { emoji: "🐛", word: "Insect", hindi: "कीड़ा" },
    { emoji: "🪣", word: "Iron", hindi: "लोहा" },
    { emoji: "🌿", word: "Ivy", hindi: "आइवी" },
    { emoji: "🦢", word: "Ibis", hindi: "बगुला" },
    { emoji: "🧊", word: "Iceberg", hindi: "हिमखंड" },
    { emoji: "💌", word: "Invitation", hindi: "आमंत्रण" },
  ],
  J: [
    { emoji: "🧃", word: "Juice", hindi: "जूस" },
    { emoji: "🪼", word: "Jellyfish", hindi: "जेलीफिश" },
    { emoji: "🫙", word: "Jar", hindi: "जार" },
    { emoji: "🧥", word: "Jacket", hindi: "जैकेट" },
    { emoji: "🐆", word: "Jaguar", hindi: "जगुआर" },
    { emoji: "💎", word: "Jewel", hindi: "रत्न" },
    { emoji: "🏺", word: "Jug", hindi: "घड़ा" },
    { emoji: "🤸", word: "Jump", hindi: "कूद" },
    { emoji: "🧩", word: "Jigsaw", hindi: "पहेली" },
    { emoji: "🌳", word: "Jungle", hindi: "जंगल" },
  ],
  K: [
    { emoji: "🪁", word: "Kite", hindi: "पतंग" },
    { emoji: "🦘", word: "Kangaroo", hindi: "कंगारू" },
    { emoji: "🔑", word: "Key", hindi: "चाबी" },
    { emoji: "🤴", word: "King", hindi: "राजा" },
    { emoji: "🐱", word: "Kitten", hindi: "बिल्ली का बच्चा" },
    { emoji: "🫖", word: "Kettle", hindi: "केतली" },
    { emoji: "🐨", word: "Koala", hindi: "कोआला" },
    { emoji: "🥝", word: "Kiwi", hindi: "कीवी" },
    { emoji: "♟️", word: "Knight", hindi: "घोड़ा" },
    { emoji: "🔪", word: "Knife", hindi: "चाकू" },
  ],
  L: [
    { emoji: "🦁", word: "Lion", hindi: "शेर" },
    { emoji: "🍃", word: "Leaf", hindi: "पत्ता" },
    { emoji: "💡", word: "Lamp", hindi: "दीपक" },
    { emoji: "🍋", word: "Lemon", hindi: "नींबू" },
    { emoji: "🐞", word: "Ladybug", hindi: "लेडीबग" },
    { emoji: "🦞", word: "Lobster", hindi: "झींगा मछली" },
    { emoji: "🔒", word: "Lock", hindi: "ताला" },
    { emoji: "🦎", word: "Lizard", hindi: "छिपकली" },
    { emoji: "🦙", word: "Llama", hindi: "लामा" },
    { emoji: "🏠", word: "Lighthouse", hindi: "प्रकाशस्तंभ" },
  ],
  M: [
    { emoji: "🌙", word: "Moon", hindi: "चाँद" },
    { emoji: "🐒", word: "Monkey", hindi: "बंदर" },
    { emoji: "🥭", word: "Mango", hindi: "आम" },
    { emoji: "🐭", word: "Mouse", hindi: "चूहा" },
    { emoji: "🍄", word: "Mushroom", hindi: "मशरूम" },
    { emoji: "🪞", word: "Mirror", hindi: "दर्पण" },
    { emoji: "🥛", word: "Milk", hindi: "दूध" },
    { emoji: "🗺️", word: "Map", hindi: "नक्शा" },
    { emoji: "🏍️", word: "Motorcycle", hindi: "मोटरसाइकिल" },
    { emoji: "🧲", word: "Magnet", hindi: "चुंबक" },
  ],
  N: [
    { emoji: "🪺", word: "Nest", hindi: "घोंसला" },
    { emoji: "👩‍⚕️", word: "Nurse", hindi: "नर्स" },
    { emoji: "📓", word: "Notebook", hindi: "नोटबुक" },
    { emoji: "🪡", word: "Needle", hindi: "सुई" },
    { emoji: "🥅", word: "Net", hindi: "जाल" },
    { emoji: "🌙", word: "Night", hindi: "रात" },
    { emoji: "👃", word: "Nose", hindi: "नाक" },
    { emoji: "🍜", word: "Noodles", hindi: "नूडल्स" },
    { emoji: "🔢", word: "Number", hindi: "संख्या" },
    { emoji: "🐳", word: "Narwhal", hindi: "नारव्हल" },
  ],
  O: [
    { emoji: "🍊", word: "Orange", hindi: "संतरा" },
    { emoji: "🦉", word: "Owl", hindi: "उल्लू" },
    { emoji: "🐙", word: "Octopus", hindi: "ऑक्टोपस" },
    { emoji: "🌊", word: "Ocean", hindi: "सागर" },
    { emoji: "🫒", word: "Olive", hindi: "जैतून" },
    { emoji: "🦤", word: "Ostrich", hindi: "शुतुरमुर्ग" },
    { emoji: "🧅", word: "Onion", hindi: "प्याज" },
    { emoji: "🦦", word: "Otter", hindi: "ऊदबिलाव" },
    { emoji: "🌳", word: "Oak", hindi: "ओक का पेड़" },
    { emoji: "🐂", word: "Ox", hindi: "बैल" },
  ],
  P: [
    { emoji: "🐷", word: "Pig", hindi: "सूअर" },
    { emoji: "🦜", word: "Parrot", hindi: "तोता" },
    { emoji: "✏️", word: "Pencil", hindi: "पेंसिल" },
    { emoji: "🍕", word: "Pizza", hindi: "पिज़्ज़ा" },
    { emoji: "🐧", word: "Penguin", hindi: "पेंगुइन" },
    { emoji: "🎹", word: "Piano", hindi: "पियानो" },
    { emoji: "🍍", word: "Pineapple", hindi: "अनानास" },
    { emoji: "🐼", word: "Panda", hindi: "पांडा" },
    { emoji: "🪐", word: "Planet", hindi: "ग्रह" },
    { emoji: "🦚", word: "Peacock", hindi: "मोर" },
  ],
  Q: [
    { emoji: "👑", word: "Queen", hindi: "रानी" },
    { emoji: "🐦", word: "Quail", hindi: "बटेर" },
    { emoji: "🧠", word: "Quiz", hindi: "क्विज़" },
    { emoji: "🪙", word: "Quarter", hindi: "सिक्का" },
    { emoji: "🛏️", word: "Quilt", hindi: "रजाई" },
    { emoji: "❓", word: "Question", hindi: "सवाल" },
    { emoji: "⚡", word: "Quick", hindi: "तेज" },
    { emoji: "🤫", word: "Quiet", hindi: "चुप" },
    { emoji: "👥", word: "Queue", hindi: "कतार" },
    { emoji: "🗺️", word: "Quest", hindi: "खोज" },
  ],
  R: [
    { emoji: "🌈", word: "Rainbow", hindi: "इंद्रधनुष" },
    { emoji: "🐰", word: "Rabbit", hindi: "खरगोश" },
    { emoji: "🤖", word: "Robot", hindi: "रोबोट" },
    { emoji: "🌹", word: "Rose", hindi: "गुलाब" },
    { emoji: "🚀", word: "Rocket", hindi: "रॉकेट" },
    { emoji: "💍", word: "Ring", hindi: "अंगूठी" },
    { emoji: "🌧️", word: "Rain", hindi: "बारिश" },
    { emoji: "🦏", word: "Rhino", hindi: "गैंडा" },
    { emoji: "🎀", word: "Ribbon", hindi: "रिबन" },
    { emoji: "🐓", word: "Rooster", hindi: "मुर्गा" },
  ],
  S: [
    { emoji: "☀️", word: "Sun", hindi: "सूरज" },
    { emoji: "⭐", word: "Star", hindi: "तारा" },
    { emoji: "🐍", word: "Snake", hindi: "सांप" },
    { emoji: "🐑", word: "Sheep", hindi: "भेड़" },
    { emoji: "🚢", word: "Ship", hindi: "जहाज" },
    { emoji: "🕷️", word: "Spider", hindi: "मकड़ी" },
    { emoji: "🍓", word: "Strawberry", hindi: "स्ट्रॉबेरी" },
    { emoji: "🦢", word: "Swan", hindi: "हंस" },
    { emoji: "⚽", word: "Soccer", hindi: "फुटबॉल" },
    { emoji: "⚔️", word: "Sword", hindi: "तलवार" },
  ],
  T: [
    { emoji: "🌳", word: "Tree", hindi: "पेड़" },
    { emoji: "🐯", word: "Tiger", hindi: "बाघ" },
    { emoji: "🚂", word: "Train", hindi: "ट्रेन" },
    { emoji: "🐢", word: "Turtle", hindi: "कछुआ" },
    { emoji: "🍅", word: "Tomato", hindi: "टमाटर" },
    { emoji: "🏆", word: "Trophy", hindi: "ट्रॉफी" },
    { emoji: "⛺", word: "Tent", hindi: "तंबू" },
    { emoji: "🌷", word: "Tulip", hindi: "ट्यूलिप" },
    { emoji: "🚛", word: "Truck", hindi: "ट्रक" },
    { emoji: "🦜", word: "Toucan", hindi: "टूकन" },
  ],
  U: [
    { emoji: "☂️", word: "Umbrella", hindi: "छाता" },
    { emoji: "🦄", word: "Unicorn", hindi: "एकश्रृंगी" },
    { emoji: "🌌", word: "Universe", hindi: "ब्रह्मांड" },
    { emoji: "🦔", word: "Urchin", hindi: "साही" },
    { emoji: "🎸", word: "Ukulele", hindi: "उकुलेले" },
    { emoji: "👮", word: "Uniform", hindi: "वर्दी" },
    { emoji: "🏺", word: "Urn", hindi: "कलश" },
    { emoji: "🍴", word: "Utensil", hindi: "बर्तन" },
    { emoji: "⛰️", word: "Uphill", hindi: "पहाड़ी" },
    { emoji: "🌊", word: "Underwater", hindi: "पानी के नीचे" },
  ],
  V: [
    { emoji: "🎻", word: "Violin", hindi: "वायलिन" },
    { emoji: "🌋", word: "Volcano", hindi: "ज्वालामुखी" },
    { emoji: "🚐", word: "Van", hindi: "वैन" },
    { emoji: "🏺", word: "Vase", hindi: "फूलदान" },
    { emoji: "🥦", word: "Vegetables", hindi: "सब्जी" },
    { emoji: "🦺", word: "Vest", hindi: "जैकेट" },
    { emoji: "🦅", word: "Vulture", hindi: "गिद्ध" },
    { emoji: "🧛", word: "Vampire", hindi: "पिशाच" },
    { emoji: "💜", word: "Violet", hindi: "बैंगनी" },
    { emoji: "🏘️", word: "Village", hindi: "गांव" },
  ],
  W: [
    { emoji: "🐳", word: "Whale", hindi: "व्हेल" },
    { emoji: "🐺", word: "Wolf", hindi: "भेड़िया" },
    { emoji: "🍉", word: "Watermelon", hindi: "तरबूज" },
    { emoji: "⌚", word: "Watch", hindi: "घड़ी" },
    { emoji: "🧙‍♀️", word: "Witch", hindi: "डायन" },
    { emoji: "💨", word: "Windmill", hindi: "पवनचक्की" },
    { emoji: "🪱", word: "Worm", hindi: "कीड़ा" },
    { emoji: "🦭", word: "Walrus", hindi: "वालरस" },
    { emoji: "🕸️", word: "Web", hindi: "जाला" },
    { emoji: "📣", word: "Whistle", hindi: "सीटी" },
  ],
  X: [
    { emoji: "🎵", word: "Xylophone", hindi: "जाइलोफोन" },
    { emoji: "🩻", word: "X-ray", hindi: "एक्स-रे" },
    { emoji: "❌", word: "X-mark", hindi: "निशान" },
    { emoji: "🎄", word: "Xmas", hindi: "क्रिसमस" },
    { emoji: "✨", word: "Xenon", hindi: "एक्सेनॉन" },
    { emoji: "🐟", word: "Xiphias", hindi: "मछली" },
    { emoji: "🎮", word: "Xbox", hindi: "गेम" },
    { emoji: "📄", word: "Xerox", hindi: "फोटोकॉपी" },
    { emoji: "🌿", word: "Xylem", hindi: "पौधे का भाग" },
    { emoji: "🛸", word: "X-wing", hindi: "अंतरिक्ष यान" },
  ],
  Y: [
    { emoji: "🧶", word: "Yarn", hindi: "धागा" },
    { emoji: "🐄", word: "Yak", hindi: "याक" },
    { emoji: "⛵", word: "Yacht", hindi: "नौका" },
    { emoji: "🪀", word: "Yo-yo", hindi: "यो-यो" },
    { emoji: "💛", word: "Yellow", hindi: "पीला" },
    { emoji: "🥱", word: "Yawn", hindi: "जम्हाई" },
    { emoji: "🌿", word: "Yard", hindi: "आँगन" },
    { emoji: "🥛", word: "Yogurt", hindi: "दही" },
    { emoji: "🧊", word: "Yeti", hindi: "येति" },
    { emoji: "🌵", word: "Yucca", hindi: "युक्का" },
  ],
  Z: [
    { emoji: "🦓", word: "Zebra", hindi: "ज़ेब्रा" },
    { emoji: "🦁", word: "Zoo", hindi: "चिड़ियाघर" },
    { emoji: "🚢", word: "Zeppelin", hindi: "हवाई पोत" },
    { emoji: "〰️", word: "Zigzag", hindi: "टेढ़ी-मेढ़ी" },
    { emoji: "🥒", word: "Zucchini", hindi: "तोरी" },
    { emoji: "0️⃣", word: "Zero", hindi: "शून्य" },
    { emoji: "🧟", word: "Zombie", hindi: "जोम्बी" },
    { emoji: "🗺️", word: "Zone", hindi: "क्षेत्र" },
    { emoji: "🌸", word: "Zinnia", hindi: "जिनिया फूल" },
    { emoji: "🔍", word: "Zoom", hindi: "ज़ूम" },
  ],
};

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// Hue cycle for letter pills & cards
const LETTER_HUES = [
  27, 50, 80, 120, 145, 170, 190, 220, 250, 270, 300, 320, 340, 360, 27, 50, 80,
  120, 145, 170, 190, 220, 250, 270, 300, 320,
];

const CARD_HUES = [27, 50, 80, 120, 145, 170, 190, 220, 250, 270];

function speak(text: string) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = "en-US";
  utt.rate = 0.9;
  window.speechSynthesis.speak(utt);
}

function speakHindi(text: string) {
  if (!window.speechSynthesis) return;
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = "hi-IN";
  utt.rate = 0.85;
  window.speechSynthesis.speak(utt);
}

interface WordCardProps {
  entry: WordEntry;
  index: number;
  hue: number;
}

function WordCard({ entry, index, hue }: WordCardProps) {
  const [burst, setBurst] = useState(false);

  function handleTap() {
    setBurst(true);
    setTimeout(() => setBurst(false), 700);
    addStar();
    speak(entry.word);
    setTimeout(() => speakHindi(entry.hindi), 900);
  }

  return (
    <motion.button
      data-ocid={`abcwords.card.${index + 1}`}
      initial={{ opacity: 0, scale: 0.6, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5, y: -20 }}
      transition={{
        delay: index * 0.05,
        duration: 0.45,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      whileHover={{ scale: 1.06, y: -4 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleTap}
      className="relative flex flex-col items-center justify-center gap-2 rounded-3xl border-4 p-4 cursor-pointer overflow-hidden transition-shadow"
      style={{
        background: `oklch(95% 0.1 ${hue})`,
        borderColor: `oklch(62% 0.22 ${hue})`,
        boxShadow: `0 6px 0 0 oklch(52% 0.22 ${hue})`,
      }}
    >
      {/* star burst */}
      <AnimatePresence>
        {burst && (
          <motion.div
            key="burst"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{ background: `oklch(88% 0.18 ${hue})` }}
          />
        )}
      </AnimatePresence>

      <span className="text-5xl leading-none select-none">{entry.emoji}</span>
      <span
        className="font-display text-base font-extrabold leading-tight text-center"
        style={{ color: `oklch(28% 0.22 ${hue})` }}
      >
        {entry.word}
      </span>
      <span
        className="font-body text-xs font-semibold leading-tight text-center"
        style={{ color: `oklch(42% 0.18 ${hue})` }}
      >
        {entry.hindi}
      </span>

      {burst && (
        <motion.span
          initial={{ scale: 0.5, opacity: 1, y: 0 }}
          animate={{ scale: 1.6, opacity: 0, y: -30 }}
          transition={{ duration: 0.55 }}
          className="absolute top-2 right-2 text-lg pointer-events-none"
        >
          ⭐
        </motion.span>
      )}
    </motion.button>
  );
}

export default function ABCWordsGame({ onBack }: { onBack: () => void }) {
  const [selectedLetter, setSelectedLetter] = useState("A");
  const scrollRef = useRef<HTMLDivElement>(null);

  const hue = LETTER_HUES[LETTERS.indexOf(selectedLetter)];
  const words = ABC_DATA[selectedLetter] ?? [];

  function handleLetterClick(letter: string) {
    setSelectedLetter(letter);
    speak(letter);
  }

  return (
    <GameLayout
      title="ABC Words"
      emoji="📝"
      color={`oklch(38% 0.22 ${hue})`}
      onBack={onBack}
    >
      {/* Letter Selector Row */}
      <div
        ref={scrollRef}
        data-ocid="abcwords.letter.tab"
        className="flex gap-2 overflow-x-auto pb-3 pt-1 px-1 mb-6 scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
      >
        {LETTERS.map((letter, i) => {
          const lHue = LETTER_HUES[i];
          const isSelected = letter === selectedLetter;
          return (
            <motion.button
              key={letter}
              data-ocid={`abcwords.letter.${letter.toLowerCase()}.button`}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.88 }}
              onClick={() => handleLetterClick(letter)}
              className="flex-shrink-0 w-11 h-11 rounded-full font-display text-lg font-extrabold transition-all border-4 cursor-pointer"
              style={{
                background: isSelected
                  ? `oklch(65% 0.22 ${lHue})`
                  : `oklch(94% 0.1 ${lHue})`,
                borderColor: isSelected
                  ? `oklch(38% 0.22 ${lHue})`
                  : `oklch(72% 0.18 ${lHue})`,
                color: isSelected ? "#fff" : `oklch(32% 0.22 ${lHue})`,
                boxShadow: isSelected
                  ? `0 4px 0 0 oklch(42% 0.22 ${lHue}), 0 0 0 3px oklch(80% 0.18 ${lHue})`
                  : `0 3px 0 0 oklch(62% 0.18 ${lHue})`,
                transform: isSelected ? "scale(1.18)" : "scale(1)",
              }}
            >
              {letter}
            </motion.button>
          );
        })}
      </div>

      {/* Big Letter Banner */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedLetter}-banner`}
          initial={{ scale: 0.4, opacity: 0, rotate: -15 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.4, opacity: 0, rotate: 15 }}
          transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
          className="flex flex-col items-center mb-8"
        >
          <div
            className="w-32 h-32 rounded-[2.5rem] flex items-center justify-center border-4 shadow-xl"
            style={{
              background: `oklch(92% 0.14 ${hue})`,
              borderColor: `oklch(60% 0.22 ${hue})`,
              boxShadow: `0 10px 0 0 oklch(50% 0.22 ${hue}), 0 0 40px oklch(80% 0.2 ${hue})`,
            }}
          >
            <span
              className="font-display font-black leading-none select-none"
              style={{
                fontSize: "5rem",
                color: `oklch(32% 0.22 ${hue})`,
                textShadow: `0 4px 0 oklch(72% 0.2 ${hue})`,
              }}
            >
              {selectedLetter}
            </span>
          </div>
          <p
            className="font-body text-base font-semibold mt-3"
            style={{ color: `oklch(45% 0.18 ${hue})` }}
          >
            {selectedLetter.toLowerCase()} • {words.length} words
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Word Cards Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedLetter}-grid`}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          {words.map((entry, i) => (
            <WordCard
              key={entry.word}
              entry={entry}
              index={i}
              hue={CARD_HUES[i % CARD_HUES.length]}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center font-body text-sm text-muted-foreground mt-8"
      >
        🔊 Tap any card to hear the word in English and Hindi!
      </motion.p>
    </GameLayout>
  );
}
