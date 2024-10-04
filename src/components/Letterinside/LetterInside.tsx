//import { useLetterStore } from "../../store";
import { DedicateFrom } from "../../types";

type LetterDetailProps = {
  letter: DedicateFrom;
};


export const LetterInside = ({ letter }: LetterDetailProps) => {
  const {name, city} = letter

  console.log(name)
  console.log(city)


  return (
    <>
      <div>{letter.name}</div>
      <div>{letter.city}</div>


    </>
  );
};
