import { useState } from "react";
import AnimalsGame from "./components/AnimalsGame";
import BalloonGame from "./components/BalloonGame";
import BirdsGame from "./components/BirdsGame";
import BodyPartsGame from "./components/BodyPartsGame";
import CitiesGame from "./components/CitiesGame";
import ColorMixGame from "./components/ColorMixGame";
import ColorsGame from "./components/ColorsGame";
import CountingGame from "./components/CountingGame";
import CountriesGame from "./components/CountriesGame";
import DrawingGame from "./components/DrawingGame";
import FlowersGame from "./components/FlowersGame";
import FruitsGame from "./components/FruitsGame";
import HomeScreen from "./components/HomeScreen";
import LettersGame from "./components/LettersGame";
import MatchingGame from "./components/MatchingGame";
import MatraGame from "./components/MatraGame";
import NumbersGame from "./components/NumbersGame";
import PuzzleGame from "./components/PuzzleGame";
import QuizGame from "./components/QuizGame";
import RhymesGame from "./components/RhymesGame";
import ShapesGame from "./components/ShapesGame";
import StatesGame from "./components/StatesGame";
import StoryGame from "./components/StoryGame";
import TablesGame from "./components/TablesGame";
import VegetablesGame from "./components/VegetablesGame";
import VehiclesGame from "./components/VehiclesGame";
import VideoGame from "./components/VideoGame";

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
  | "colormix";

export default function App() {
  const [screen, setScreen] = useState<GameScreen>("home");
  const goHome = () => setScreen("home");

  return (
    <div className="min-h-screen bg-background bg-dots">
      {screen === "home" && <HomeScreen onNavigate={setScreen} />}
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
    </div>
  );
}
