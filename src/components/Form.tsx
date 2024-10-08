import { useForm } from "react-hook-form";
import { DraftDedicateFrom } from "../types";
import { useLetterStore } from "../store";
import ver1D from "../assets/hobis_discharge_hobis_discharge_1_square_ver.webp";
import ver2D from "../assets/hobis_discharge_2_square_ver.webp";
import ver1P from "../assets/hobis_discharge_1_vertical_ver.webp";
import ver2P from "../assets/hobis_discharge_2_vertical_ver.webp";
import { CardSelector } from "./CardSelector";
import { useUtils } from "../hooks/useUtils";

const CARDDESCKTOP = {
  ver1D: ver1D,
  ver2D: ver2D,
};

const CARDPHONE = {
  ver1P: ver1P,
  ver2P: ver2P,
};

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
    maxCharLimit,
    maxFromLimit,
    charCountFrom,
  } = useUtils();

  const { addName } = useLetterStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DraftDedicateFrom>();

  const registerData = (data: DraftDedicateFrom) => {
    addName({ ...data, photo: selectedPhoto ? [selectedPhoto] : [] });
    reset();
    setSelectedPhoto("");
  };

  return (
    <div className="flex flex-col pt-20 justify-center items-center text-white max-sm:text-xs ">
      <div className="relative sm:max-w-sm w-full">
        <div className="relative w-full px-10 py-4 max-sm:px-10 max-sm:py-10">
          <form
            onSubmit={handleSubmit(registerData)}
            className="font-providence"
          >
            <div
              className={`text-sm mb-2 float-end ${
                isMaxFromLimitReached ? "text-red-500" : "text-black"
              }`}
            >
              {isMaxFromLimitReached && (
                <span className="text-red-500">Too long!</span>
              )}{" "}
              {charCountFrom}/12
            </div>
            <input
              placeholder="Your Name"
              maxLength={maxFromLimit}
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none`}
              {...register("name", {
                required: "Your name is required",
              })}
              onChange={handleTextInput2}
            />
            {errors.city && (
              <p className="text-red-600 font-bold">{errors.city.message}</p>
            )}
            <div
              className={`text-sm mb-2 float-end ${
                isMaxCharLimitReached ? "text-red-500" : "text-black"
              }`}
            >
              {isMaxCharLimitReached && (
                <span className="text-red-500">Too long!</span>
              )}{" "}
              {charCount}/14
            </div>
            <input
              placeholder="Your Country or City"
              maxLength={maxCharLimit}
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none`}
              {...register("city", {
                required: "Content is required",
              })}
              onChange={handleTextInput1}
            />
            {errors.name && (
              <p className="text-red-600 font-bold">{errors.name.message}</p>
            )}
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
            >
              Create post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
