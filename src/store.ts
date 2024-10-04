import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { DedicateFrom, DraftDedicateFrom } from "./types";

type LetterState = {
  letters: DedicateFrom[];
  addName: (data: DraftDedicateFrom) => void;
  deleteLetter: (id: DedicateFrom["id"]) => void;
};

const createLetter = (letter: DraftDedicateFrom): DedicateFrom => {
  return { ...letter, id:"" };
};

export const useLetterStore = create<LetterState>()(
  devtools(
    persist(
      (set) => ({
        letters: [],
        addName: (data) => {
          const newLetter = createLetter(data);
          set((state) => ({
            letters: [...state.letters, newLetter],
          }));
        },
        deleteLetter: (id) => {
          set((state) => ({
            letters: state.letters.filter((letter) => letter.id !== id),
          }));
        },
      }),
      {
        name: "letter-store",
      }
    )
  )
);
