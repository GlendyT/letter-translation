import { useState } from "react";
import { Form } from "./components/Form";
import { Results } from "./components/Results";
import { useLetterStore } from "./store";
import { ShowModal } from "./components/ShowModal";

export function App() {
  const letters = useLetterStore((state) => state.letters);
  const [currWord] = useState("hope");
  const [input, setInput] = useState("");
  const [isCorrectGuess, setIsCorrectGuess] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(true);

  const generateWordDisplay = () => {
    return isCorrectGuess ? currWord : "_".repeat(currWord.length).trim();
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!input) {
      return;
    }
    const guessedWord = input.toLowerCase();
    setIsCorrectGuess(guessedWord === currWord.toLowerCase());
    setHasSubmitted(true);
    setInput("");
  };

  return (
    <>
      <div className="min-h-screen pt-16  bg-bghobiDesktop bg-cover bg-center bg-no-repeat max-sm:bg-center max-sm:bg-bghobidischargep">
        <div
          className={`flex flex-col justify-center items-center max-sm:px-2 ${
            isCorrectGuess ? "" : "hidden"
          }`}
        >
          {!letters.length ? <Form /> : <Results />}
        </div>
        {showModal ? (
          <ShowModal
            hasSubmitted={hasSubmitted}
            setShowModal={setShowModal}
            generateWordDisplay={generateWordDisplay}
            handleSubmit={handleSubmit}
            isCorrectGuess={isCorrectGuess}
            setInput={setInput}
            input={input}
          />
        ) : null}
      </div>
    </>
  );
}
