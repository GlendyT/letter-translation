interface Props {
  ver1D: string;
  ver2D: string;
  selectedPhoto: string;
  setSelectedPhoto: (photo: string) => void;
}

export const CardSelector = ({
  ver1D,
  ver2D,
  selectedPhoto,
  setSelectedPhoto,
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center text-black font-extrabold">
      <label className="pt-4 ">Select your Card</label>
      <div className="py-2 flex flex-row justify-between max-sm:text-xs ">
        <label className="px-4 py-2 flex flex-row gap-4 cursor-pointer items-center justify-center">
          <input
            type="radio"
            value={ver1D}
            checked={selectedPhoto === ver1D}
            onChange={() => setSelectedPhoto(ver1D)}
            className="hidden"
          />
          <span
            className={`w-8 h-6 object-cover rounded ${
              selectedPhoto === ver1D
                ? "ring-4 bg-black"
                : "bg-gray-400 outline-gray-600 outline"
            }`}
          ></span>
          Cute Version
        </label>

        <label className="px-4 py-2 flex flex-row gap-4 cursor-pointer items-center justify-center">
          <input
            type="radio"
            value={ver2D}
            checked={selectedPhoto === ver2D}
            onChange={() => setSelectedPhoto(ver2D)}
            className="hidden"
          />
          <span
            className={`w-8 h-6 object-cover rounded ${
              selectedPhoto === ver2D
                ? "ring-4 bg-black"
                : "bg-gray-400 outline-gray-600 outline"
            }`}
          ></span>
          Boyfriend Version
        </label>
      </div>
    </div>
  );
};
