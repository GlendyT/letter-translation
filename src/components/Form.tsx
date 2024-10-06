import { useForm } from "react-hook-form";
import { DraftDedicateFrom } from "../types";
import { useLetterStore } from "../store";
import { ChangeEvent, useState } from "react";
import ver1 from "../assets/hobis_discharge_1_square_ver.webp";
import ver2 from "../assets/hobis_discharge_2_square_ver.webp";
import { CardSelector } from "./CardSelector";

export const Form = () => {
  const [charCount, setCharCount] = useState(0);
  const [charCountFrom, setCharCountFrom] = useState(0);
  const maxCharLimit = 21;
  const maxFromLimit = 13;
  const [selectedPhoto, setSelectedPhoto] = useState<string>("");

  const handleTextArea = (e: ChangeEvent<HTMLInputElement>) => {
    setCharCount(e.target.value.length);
  };

  const handleTextInput = (e: ChangeEvent<HTMLInputElement>) => {
    setCharCountFrom(e.target.value.length);
  };

  const isMaxCharLimitReached = charCount === maxCharLimit;
  const isMaxFromLimitReached = charCountFrom === maxFromLimit;

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
    <div className="flex flex-col sm:justify-center items-center text-white max-sm:text-xs">
      <div className="relative sm:max-w-sm w-full">
        <div className="relative w-full px-10 py-4 max-sm:px-10 max-sm:py-10">
          <form
            onSubmit={handleSubmit(registerData)}
            className="font-providence"
          >
            <div
              className={`text-sm mb-2 float-end ${
                isMaxCharLimitReached ? "text-red-500" : "text-black"
              }`}
            >
              {isMaxCharLimitReached && (
                <span className="text-red-500">Too long!</span>
              )}{" "}
              {charCount}/20
            </div>
            <input
              placeholder="Your Country or City"
              maxLength={maxCharLimit}
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none`}
              {...register("name", {
                required: "Content is required",
              })}
              onChange={handleTextArea}
            />
            {errors.name && (
              <p className="text-red-600 font-bold">{errors.name.message}</p>
            )}

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
              {...register("city", {
                required: "Your name is required",
              })}
              onChange={handleTextInput}
            />
            {errors.city && (
              <p className="text-red-600 font-bold">{errors.city.message}</p>
            )}
            <CardSelector
              ver1={ver1}
              ver2={ver2}
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
