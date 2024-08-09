import { useForm } from "react-hook-form";
import { useLetterStore } from "../store";
import { DraftDedicateFrom } from "../types";


type TranslateFunction = (
    sourceText: string,
    sourceLang: string,
    targetLang: string
  ) => Promise<string>;

export const useTranslate = () => {
    const addLetter = useLetterStore((state) => state.addLetter);

    const {
        reset,
      } = useForm<DraftDedicateFrom>();

      
    const translate: TranslateFunction = async (
        sourceText,
        sourceLang,
        targetLang
      ): Promise<string> => {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(
          sourceText
        )}`;
    
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Translation request failed");
        }
    
        const data = await response.json();
        return data[0][0][0];
      };
    
      const registerLetter = async (data: DraftDedicateFrom) => {
        try {
          const translatedText = await translate(data.contentinside, "en", "ko");
          const translatedData = { ...data, contentinside: translatedText };
    
          addLetter(translatedData);
          reset();
        } catch (error) {
          console.error("Error translating content:", error);
        }
      };
  return {
    registerLetter
  }
}
