interface Props {
  ver1: string;
  ver2: string;
  selectedPhoto: string;
  setSelectedPhoto: (photo : string) => void
}

export const CardSelector = ({
  ver1,
  ver2,
  selectedPhoto,
  setSelectedPhoto,
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center text-black font-extrabold">
      <label className="pt-4">Select your Card</label>
      <div className="py-2 flex flex-row justify-between max-sm:text-xs ">
        <label className="px-4 py-2 flex flex-row gap-4 cursor-pointer items-center justify-center">
          <input
            type="radio"
            value={ver1}
            checked={selectedPhoto === ver1}
            onChange={() => setSelectedPhoto(ver1)}
            className="hidden"
          />
          <span
            className={`w-8 h-8 object-cover rounded ${
              selectedPhoto === ver1 ? "ring-4 bg-black" : "bg-gray-400"
            }`}
          ></span>
          1
        </label>

        <label className="px-4 py-2 flex flex-row gap-4 cursor-pointer items-center justify-center">
          <input
            type="radio"
            value={ver2}
            checked={selectedPhoto === ver2}
            onChange={() => setSelectedPhoto(ver2)}
            className="hidden"
          />
          <span
            className={`w-8 h-8 object-cover rounded ${
              selectedPhoto === ver2 ? "ring-4 bg-black" : "bg-gray-400"
            }`}
          ></span>
          2
        </label>
      </div>
    </div>
  );
};
