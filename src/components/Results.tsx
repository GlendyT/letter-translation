import { useDownload } from "../hooks/useDownload";
import { useUtils } from "../hooks/useUtils";
import { useLetterStore } from "../store";

export const Results = () => {
  const { letters, deleteLetter } = useLetterStore();
  const { handleDownloadImage } = useDownload();
  const { canvasRef, isMobile, getTextColor } = useUtils();

  return (
    <>
      <div className="relative flex justify-center items-center max-sm:text-xs">
        <div className="relative w-full" id="print">
          <canvas ref={canvasRef} className="mx-auto" />
          {letters.map((letter) => (
            <div
              key={letter.id}
              className={`absolute inset-0 flex flex-col font-extrabold font-providence items-center justify-end shadow-2xl ${
                isMobile ? "pb-20" : "pb-16"
              }`}
            >
              <div
                className={`text-lg px-14 max-sm:text-md ${getTextColor(
                  letter.photo
                )}`}
              >
                {letter.name}
              </div>
              <div
                className={`text-lg px-14 max-sm:text-md ${getTextColor(
                  letter.photo
                )}`}
              >
                from {letter.city}
              </div>
            </div>
          ))}
        </div>
      </div>
      <>
        {letters.map((delet) => (
          <div key={delet.id} className="flex flex-row gap-2 pt-2">
            <button
              onClick={() => deleteLetter(delet.id)}
              className=" bg-black text-white cursor-pointer p-3 font-providence uppercase disabled:bg-opacity-25 disabled:cursor-not-allowed transition-colors rounded-xl"
            >
              Back to Main Page
            </button>
            <button
              onClick={handleDownloadImage} 
              className=" bg-black text-white cursor-pointer p-3 font-providence uppercase disabled:bg-opacity-25 disabled:cursor-not-allowed transition-colors rounded-xl"
            >
              Download
            </button>
          </div>
        ))}
      </>
    </>
  );
};
