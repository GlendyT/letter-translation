import { useLetterStore } from "../store";
import { useEffect, useRef } from "react";

export const Results = () => {
  const { letters, deleteLetter } = useLetterStore();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const maxWidth = window.innerWidth < 640 ? 350 : 500;
    const pixelRatio = window.devicePixelRatio || 1;

    context.clearRect(0, 0, canvas.width, canvas.height);

    letters.forEach((letter) => {
      letter.photo.forEach((photoSrc) => {
        const image = new Image();
        image.src = photoSrc;
        image.onload = () => {
          const scale = maxWidth / image.width;
          const imageWidth = image.width * scale;
          const imageHeight = image.height * scale;

          canvas.width = imageWidth * pixelRatio;
          canvas.height = imageHeight * pixelRatio;

          canvas.style.width = `${imageWidth}px`;
          canvas.style.height = `${imageHeight}px`;

          context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
          context.drawImage(image, 0, 0, imageWidth, imageHeight);
        };
      });
    });
  }, [letters]);

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
      <>
        {letters.map((delet) => (
          <div key={delet.id} className="flex flex-row gap-2 pt-2">
            <button
              onClick={() => deleteLetter(delet.id)}
              className=" bg-black text-white cursor-pointer p-3 font-providence uppercase disabled:bg-opacity-25 disabled:cursor-not-allowed transition-colors rounded-xl"
            >
              Other
            </button>
            <button
              // onClick={handleDownloadImage} // Optionally add image download logic
              className=" bg-black text-white cursor-pointer p-3 font-providence uppercase disabled:bg-opacity-25 disabled:cursor-not-allowed transition-colors rounded-xl"
            >
              Share
            </button>
          </div>
        ))}
      </>
    </>
  );
};
