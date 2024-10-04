import { useForm } from "react-hook-form";
import { DraftDedicateFrom } from "../types";
import { useLetterStore } from "../store";
//import { useTranslate } from "../hooks/useTranslate";

export const Form = () => {
  //  const { registerLetter } = useTranslate();
  const addName = useLetterStore((state) => state.addName);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DraftDedicateFrom>();

  const registerData = (data: DraftDedicateFrom) => {
    addName(data);

    reset();
  };

  return (
    <div className="flex flex-col sm:justify-center items-center text-white max-sm:text-xs">
      <div className="relative sm:max-w-sm w-full">
        <div className="relative w-full px-10 py-4  max-sm:px-10 max-sm:py-10">
          <form
            onSubmit={handleSubmit(registerData)}
            className="mt-5 font-providence"
          >
            <div className="my-5">
              <label
                className="flex float-start text-sm mb-2 text-black"
                htmlFor="descripcion"
              >
                Your Letter
              </label>
              <textarea
                placeholder="Your best wishes"
                className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none 
                }`}
                {...register("name", {
                  required: "Content is required",
                })}
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>

            <div className="my-5">
              <label className="flex float-start text-sm mb-2 text-black">
                From
              </label>
              <input
                placeholder="Your Name"
                className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none 
                }`}
                {...register("city", {
                  required: "Your name is required",
                })}
              />
              {errors.city && <p>{errors.city.message}</p>}
            </div>
            <button
              id="btn"
              type="submit"
              className="w-full bg-black text-white cursor-pointer p-3 font-providence uppercase disabled:bg-opacity-25 disabled:cursor-not-allowed transition-colors"
            >
              Create post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
