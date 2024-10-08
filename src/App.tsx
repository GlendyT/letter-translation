import { Form } from "./components/Form";
import { Results } from "./components/Results";
import { useLetterStore } from "./store";
import { ShowModal } from "./components/ShowModal";
import { useUtils } from "./hooks/useUtils";

export function App() {
  const letters = useLetterStore((state) => state.letters);
  const showModal = useLetterStore((state) => state.showModal);
  const isCorrectGuess = useLetterStore((state) => state.isCorrectGuess);

  const { isMobile } = useUtils();

  return (
    <>
      <div
        className={`min-h-screen  bg-bghobiDesktop1 bg-cover bg-center bg-no-repeat max-sm:bg-center max-sm:bg-bghobiMobile1 ${
          !letters.length ? "bg-bghobiDesktop1" : "bg-bghobiDesktop2"
        } ${isMobile ? "pt-1" : "pt-16"}`}
      >
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
