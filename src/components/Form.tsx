import { useForm } from "react-hook-form";
import { DraftDedicateFrom } from "../types";
import { useLetterStore } from "../store";
import { CardSelector } from "./CardSelector";
import { useUtils } from "../hooks/useUtils";
import { CARDDESCKTOP, CARDPHONE } from "../utils/utils";

export const Form = () => {
  const {
    handleTextInput1,
    handleTextInput2,
    isMaxCharLimitReached,
    isMaxFromLimitReached,
    selectedPhoto,
    setSelectedPhoto,
    isMobile,
    charCount,
    charCountFrom,
    maxCharLimit,
    maxFromLimit,
  } = useUtils();

  const { addName } = useLetterStore();
  const { register, handleSubmit, reset } = useForm<DraftDedicateFrom>();

  const registerData = (data: DraftDedicateFrom) => {
    addName({ ...data, photo: selectedPhoto ? [selectedPhoto] : [] });
    reset();
    setSelectedPhoto("");
  };

  return (
    <div className="flex flex-col pt-20 justify-center items-center text-white max-sm:text-xs ">
      <div className="relative sm:max-w-sm w-full">
        <div className="relative w-full px-10 py-4 max-sm:px-10 max-sm:py-10 backdrop-blur-sm bg-black/20 rounded-3xl">
          <form
            onSubmit={handleSubmit(registerData)}
            className="font-providence"
          >
            <div
              className={`text-sm float-end font-extrabold ${
                isMaxFromLimitReached ? "text-red-500" : "text-black"
              }`}
            >
              {isMaxFromLimitReached && (
                <span className="text-red-500">Too long!</span>
              )}{" "}
              {charCountFrom}/15
            </div>
            <input
              placeholder="Your Name"
              maxLength={maxFromLimit}
              className={`appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none`}
              {...register("name", {
                required: "Your name is required",
              })}
              onChange={handleTextInput2}
            />

            <div
              className={`text-sm  float-end font-extrabold ${
                isMaxCharLimitReached ? "text-red-500" : "text-black"
              }`}
            >
              {isMaxCharLimitReached && (
                <span className="text-red-500">Too long!</span>
              )}{" "}
              {charCount}/20
            </div>
            <input
              placeholder="Your City or Country"
              maxLength={maxCharLimit}
              className={`appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none`}
              {...register("city", {
                required: "Your city or country is required",
              })}
              onChange={handleTextInput1}
            />

            <CardSelector
              ver1D={isMobile ? CARDPHONE.ver1P : CARDDESCKTOP.ver1D}
              ver2D={isMobile ? CARDPHONE.ver2P : CARDDESCKTOP.ver2D}
              selectedPhoto={selectedPhoto}
              setSelectedPhoto={setSelectedPhoto}
            />
            <button
              id="btn"
              type="submit"
              className="w-full bg-black text-white cursor-pointer font-extrabold p-3 font-providence uppercase disabled:bg-opacity-25 disabled:cursor-not-allowed transition-colors rounded-md"
              disabled={!selectedPhoto}
            >
              Create post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
