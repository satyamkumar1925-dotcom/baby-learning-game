import { useState } from "react";
import ABCWordsGame from "./components/ABCWordsGame";
import AnimalSoundGame from "./components/AnimalSoundGame";
import AnimalsGame from "./components/AnimalsGame";
import BalloonGame from "./components/BalloonGame";
import BirdsGame from "./components/BirdsGame";
import BodyPartsGame from "./components/BodyPartsGame";
import CatchFruitGame from "./components/CatchFruitGame";
import CitiesGame from "./components/CitiesGame";
import ColorMixGame from "./components/ColorMixGame";
import ColorsGame from "./components/ColorsGame";
import CountingGame from "./components/CountingGame";
import CountriesGame from "./components/CountriesGame";
import DrawingGame from "./components/DrawingGame";
import FamilyGame from "./components/FamilyGame";
import FlowersGame from "./components/FlowersGame";
import FruitsGame from "./components/FruitsGame";
import HomeScreen from "./components/HomeScreen";
import LettersGame from "./components/LettersGame";
import MatchingGame from "./components/MatchingGame";
import MatraGame from "./components/MatraGame";
import MemoryCardGame from "./components/MemoryCardGame";
import NumberMatchGame from "./components/NumberMatchGame";
import NumbersGame from "./components/NumbersGame";
import ParentDashboard from "./components/ParentDashboard";
import PuzzleGame from "./components/PuzzleGame";
import QuizGame from "./components/QuizGame";
import RhymesGame from "./components/RhymesGame";
import SettingsModal from "./components/SettingsModal";
import ShapesGame from "./components/ShapesGame";
import StatesGame from "./components/StatesGame";
import StoryGame from "./components/StoryGame";
import TablesGame from "./components/TablesGame";
import VegetablesGame from "./components/VegetablesGame";
import VehiclesGame from "./components/VehiclesGame";
import VideoGame from "./components/VideoGame";
import WordBuilderGame from "./components/WordBuilderGame";
import { SettingsProvider } from "./context/SettingsContext";

export type GameScreen =
  | "home"
  | "animals"
  | "colors"
  | "numbers"
  | "letters"
  | "fruits"
  | "vegetables"
  | "shapes"
  | "cities"
  | "countries"
  | "states"
  | "quiz"
  | "birds"
  | "flowers"
  | "vehicles"
  | "bodyparts"
  | "drawing"
  | "rhymes"
  | "tables"
  | "matching"
  | "counting"
  | "matra"
  | "story"
  | "puzzle"
  | "videos"
  | "balloon"
  | "colormix"
  | "dashboard"
  | "numbermatch"
  | "animalsound"
  | "wordbuilder"
  | "memorycards"
  | "catchfruit"
  | "family"
  | "abcwords";

export default function App() {
  const [screen, setScreen] = useState<GameScreen>("home");
  const goHome = () => setScreen("home");

  return (
    <SettingsProvider>
      <SettingsModal />
      <div className="min-h-screen bg-background">
        {screen === "home" && (
          <HomeScreen
            onNavigate={setScreen}
            onDashboard={() => setScreen("dashboard")}
          />
        )}
        {screen === "dashboard" && <ParentDashboard onBack={goHome} />}
        {screen === "animals" && <AnimalsGame onBack={goHome} />}
        {screen === "colors" && <ColorsGame onBack={goHome} />}
        {screen === "numbers" && <NumbersGame onBack={goHome} />}
        {screen === "letters" && <LettersGame onBack={goHome} />}
        {screen === "fruits" && <FruitsGame onBack={goHome} />}
        {screen === "vegetables" && <VegetablesGame onBack={goHome} />}
        {screen === "shapes" && <ShapesGame onBack={goHome} />}
        {screen === "cities" && <CitiesGame onBack={goHome} />}
        {screen === "countries" && <CountriesGame onBack={goHome} />}
        {screen === "states" && <StatesGame onBack={goHome} />}
        {screen === "quiz" && <QuizGame onBack={goHome} />}
        {screen === "birds" && <BirdsGame onBack={goHome} />}
        {screen === "flowers" && <FlowersGame onBack={goHome} />}
        {screen === "vehicles" && <VehiclesGame onBack={goHome} />}
        {screen === "bodyparts" && <BodyPartsGame onBack={goHome} />}
        {screen === "drawing" && <DrawingGame onBack={goHome} />}
        {screen === "rhymes" && <RhymesGame onBack={goHome} />}
        {screen === "tables" && <TablesGame onBack={goHome} />}
        {screen === "matching" && <MatchingGame onBack={goHome} />}
        {screen === "counting" && <CountingGame onBack={goHome} />}
        {screen === "matra" && <MatraGame onBack={goHome} />}
        {screen === "story" && <StoryGame onBack={goHome} />}
        {screen === "puzzle" && <PuzzleGame onBack={goHome} />}
        {screen === "videos" && <VideoGame onBack={goHome} />}
        {screen === "balloon" && <BalloonGame onBack={goHome} />}
        {screen === "colormix" && <ColorMixGame onBack={goHome} />}
        {screen === "numbermatch" && <NumberMatchGame onBack={goHome} />}
        {screen === "animalsound" && <AnimalSoundGame onBack={goHome} />}
        {screen === "wordbuilder" && <WordBuilderGame onBack={goHome} />}
        {screen === "memorycards" && <MemoryCardGame onBack={goHome} />}
        {screen === "catchfruit" && <CatchFruitGame onBack={goHome} />}
        {screen === "family" && <FamilyGame onBack={goHome} />}
        {screen === "abcwords" && <ABCWordsGame onBack={goHome} />}
      </div>
    </SettingsProvider>
  );
}
