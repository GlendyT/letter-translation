export type DedicateFrom = {
  id: string;
  name: string;
  city: string;
  photo: string[];
};

export type DraftDedicateFrom = Omit<DedicateFrom, "id">;

export type Modal = {
  currWord: string;
  input: string;
  isCorrectGuess: boolean;
  hasSubmitted: boolean;
  showModal: boolean;
  maxCharLimit: number;
  maxFromLimit: number;
  charCount: number
  charCountFrom: number
};
