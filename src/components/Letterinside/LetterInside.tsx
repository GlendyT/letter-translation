import { useLetterStore } from "../../store";
import { DedicateFrom } from "../../types";

type LetterDetailProps = {
  letter: DedicateFrom;
};


export const LetterInside = ({ letter }: LetterDetailProps) => {
  const deleteLetter = useLetterStore((state) => state.deleteLetter);

  return (
    <>
      <div>{letter.name}</div>
      <div>{letter.toWho}</div>
      <div>{letter.contentinside}</div>

      <button onClick={() => deleteLetter(letter.id)}>Restart</button>
    </>
  );
};
