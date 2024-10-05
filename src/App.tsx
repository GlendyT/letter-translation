import { Form } from "./components/Form";
import { Results } from "./components/Results";
import { useLetterStore } from "./store";
import { ShowModal } from "./components/ShowModal";

export function App() {
  const letters = useLetterStore((state) => state.letters);
  const showModal = useLetterStore((state) => state.showModal);
  const isCorrectGuess = useLetterStore((state) => state.isCorrectGuess);

  return (
    <>
      <div className="min-h-screen pt-16 bg-bghobiDesktop1 bg-cover bg-center bg-no-repeat max-sm:bg-center max-sm:bg-bghobiMobile1">
        <div
          className={`flex flex-col justify-center items-center max-sm:px-2 ${
            isCorrectGuess ? "" : "hidden"
          }`}
        >
          {!letters.length ? <Form /> : <Results />}
        </div>
        {showModal ? <ShowModal /> : null}
      </div>
    </>
  );
}
 