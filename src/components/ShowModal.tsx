import { useLetterStore } from "../store";
import { useUtils } from "../hooks/useUtils";

export const ShowModal = () => {
  const { input, isCorrectGuess, setInput } = useLetterStore();
  const {
    generateWordDisplay,
    handleSubmit,
    handleCheckCorrectWord,
    showErrorMessage,
  } = useUtils();

  return (
    <>
      <div className="justify-center items-center flex fixed inset-10 z-40 ">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-xl font-providence font-bold">Access Word</h3>
            </div>
            <div className="relative p-2 flex-auto">
              <p className="my-4 font-providence text-lg leading-relaxed">
                I´m your hope, you are my hope, I´m j-
                {generateWordDisplay()}
              </p>
            </div>
            <form className="flex items-center justify-center">
              <input
                type="text"
                maxLength={4}
                placeholder="Write the correct word"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={`text-center font-providence outline py-2 ${
                  isCorrectGuess ? "hidden" : ""
                }`}
              />
            </form>
            <div className="flex items-center justify-end p-4 rounded-b">
              {isCorrectGuess ? (
                <button
                  className="bg-emerald-500 active:bg-emerald-600 px-6 py-3 text-white font-bold"
                  onClick={handleCheckCorrectWord}
                >
                  Access Granted! Click Here
                </button>
              ) : (
                <button
                  className={`bg-purple-500 px-6 py-3 text-white font-bold transition-colors delay-75 ${
                    showErrorMessage ? "bg-red-500" : "bg-purple-900"
                  }`}
                  onClick={handleSubmit}
                >
                  {showErrorMessage ? "Wrong, Try Again" : "Submit Guess"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-35 fixed inset-10 z-30 bg-black "></div>
    </>
  );
};
