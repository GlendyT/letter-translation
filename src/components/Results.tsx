import { useLetterStore } from "../store"
import { LetterInside } from "./Letterinside/LetterInside"


export const Results = () => {

    const letters = useLetterStore((state) => state.letters)
  return (
    <div>
        {letters.map((letter) => (
            <LetterInside letter={letter} key={letter.id} />
        ))}
    </div>
  )
}
