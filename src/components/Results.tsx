import { useLetterStore } from "../store";
import card from "../assets/hobis_discharge_1_square_ver.webp";
import { useEffect, useRef } from "react";
//import { LetterInside } from "./Letterinside/LetterInside"

export const Results = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const image = new Image();
    image.src = card;

    image.onload = () => {
      const maxWidth = window.innerWidth < 640 ? 350 : 500;
      const scale = maxWidth / image.width;
      const imageWidth = image.width * scale;
      const imageHeight = image.height * scale;

      const pixelRatio = window.devicePixelRatio || 1;

      canvas.width = imageWidth * pixelRatio;
      canvas.height = imageHeight * pixelRatio;

      canvas.style.width = `${imageWidth}px`;
      canvas.style.height = `${imageHeight}px`;

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      context.drawImage(image, 0, 0, imageWidth, imageHeight);
    };
  }, []);

  const letters = useLetterStore((state) => state.letters);
  const deleteLetter = useLetterStore((state) => state.deleteLetter);
  return (
    <>
      <div className="relative flex justify-center items-center max-sm:text-xs">
        <div className="relative w-full" id="print">
          <canvas ref={canvasRef} className="mx-auto" />
          {letters.map((letter) => (
            <div
              key={letter.id}
              className="absolute inset-0 flex flex-col justify-center items-center py-4 text-black text-center font-bold font-providence"
            >
              <div className="text-xl px-14 max-sm:text-xs">{letter.name}</div>
              <div className="text-lg mt-2 max-sm:text-xs">- {letter.city}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-row gap-2">
        {letters.map((delet) => (
          <div key={delet.id}>
            <button
              onClick={() => deleteLetter(delet.id)}
              className=" bg-black text-white cursor-pointer p-3 font-providence uppercase disabled:bg-opacity-25 disabled:cursor-not-allowed transition-colors rounded-xl"
            >
              Other
            </button>
            <button
              //onClick={handleDownloadImage}
              className=" bg-black text-white cursor-pointer p-3 font-providence uppercase disabled:bg-opacity-25 disabled:cursor-not-allowed transition-colors rounded-xl"
            >
              Share
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
