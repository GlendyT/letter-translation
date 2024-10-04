type ShowModalProps = {
  hasSubmitted: boolean;
  setShowModal: (value: boolean) => void;
  generateWordDisplay: () => string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isCorrectGuess: boolean;
  setInput: (value: string) => void;
  input: string;
};

export const ShowModal = ({
  hasSubmitted,
  setShowModal,
  generateWordDisplay,
  handleSubmit,
  isCorrectGuess,
  setInput,
  input,
}: ShowModalProps) => {
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
                I´m your hope, you are my hope, I am j-
                {generateWordDisplay()}
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex items-center justify-center"
            >
              <input
                type="text"
                placeholder="Write the correct word"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={`text-center font-providence outline py-2 ${
                  isCorrectGuess ? "hidden" : ""
                }`}
              />
            </form>

            <div className="flex items-center justify-end p-4 rounded-b">
              {hasSubmitted && (
                <div
                  className={`text-white font-bold font-providence uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ${
                    isCorrectGuess
                      ? "bg-emerald-500 active:bg-emerald-600"
                      : " bg-red-600 active:bg-red-600 "
                  }`}
                >
                  {isCorrectGuess ? (
                    <button onClick={() => setShowModal(false)}>
                      Access Granted! click Here
                    </button>
                  ) : (
                    <p className="">Try Again</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-35 fixed inset-10 z-30 bg-black "></div>
    </>
  );
};
