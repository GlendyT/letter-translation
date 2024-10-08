import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { DedicateFrom, DraftDedicateFrom, Modal } from "./types";

type LetterState = {
  letters: DedicateFrom[];
  currWord: Modal["currWord"];
  input: Modal["input"];
  isCorrectGuess: Modal["isCorrectGuess"];
  hasSubmitted: Modal["hasSubmitted"];
  showModal: Modal["showModal"];
  maxCharLimit: Modal["maxCharLimit"];
  maxFromLimit: Modal["maxFromLimit"];
  charCount: Modal["charCount"];
  charCountFrom: Modal["charCountFrom"];
  addName: (data: DraftDedicateFrom) => void;
  deleteLetter: (id: DedicateFrom["id"]) => void;
  setInput: (value: string) => void;
  setIsCorrectGuess: (value: boolean) => void;
  setHasSubmitted: (value: boolean) => void;
  setShowModal: (value: boolean) => void;
  setCharCount: (count: number) => void;
  setCharCountFrom: (count: number) => void;
};

const createLetter = (letter: DraftDedicateFrom): DedicateFrom => {
  return { ...letter, id: "", photo: letter.photo };
};

export const useLetterStore = create<LetterState>()(
  devtools(
    persist(
      (set) => ({
        letters: [],
        currWord: "hope",
        input: "",
        isCorrectGuess: false,
        hasSubmitted: false,
        showModal: true,
        maxCharLimit: 21,
        maxFromLimit: 16,
        charCount: 0,
        charCountFrom: 0,
        addName: (data) => {
          const newLetter = createLetter(data);
          set((state) => ({
            letters: [...state.letters, newLetter],
          }));
        },
        deleteLetter: (id) => {
          set((state) => ({
            letters: state.letters.filter((letter) => letter.id !== id),
            currWord: "hope",
            input: "",
            maxCharLimit: 21,
            maxFromLimit: 16,
            charCount: 0,
            charCountFrom: 0,
            //isCorrectGuess: false,
            //hasSubmitted: false,
            //showModal: true,
          }));
        },
        setInput: (value) => set({ input: value }),
        setIsCorrectGuess: (value) => set({ isCorrectGuess: value }),
        setHasSubmitted: (value) => set({ hasSubmitted: value }),
        setShowModal: (value) => set({ showModal: value }),
        setCharCount: (count) => set({ charCount: count }),
        setCharCountFrom: (count) => set({ charCountFrom: count }),
      }),
      {
        name: "letter-store",
      }
    )
  )
);
