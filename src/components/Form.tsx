import { useForm } from "react-hook-form";
import { DraftDedicateFrom } from "../types";
import { useTranslate } from "../hooks/useTranslate";

export const Form = () => {
  const { registerLetter } = useTranslate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DraftDedicateFrom>();

  return (
    <div>
      <p>Write your letter to hobi</p>
      <form onSubmit={handleSubmit(registerLetter)}>
        <div>
          <label>LETTER</label>
          <input
            placeholder="Your name"
            {...register("name", {
              required: "Your name is required",
            })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <label>CONTENT</label>
          <textarea
            placeholder="Write here..."
            {...register("contentinside", {
              required: "Content is required",
            })}
          />
          {errors.contentinside && <p>{errors.contentinside.message}</p>}
        </div>
        <input type="submit" value="GENERATE" />
      </form>
    </div>
  );
};
