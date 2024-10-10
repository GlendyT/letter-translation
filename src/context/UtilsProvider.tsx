import {
  ChangeEvent,
  ChangeEventHandler,
  createContext,
  Dispatch,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLetterStore } from "../store";
import { CARDDESCKTOP, CARDPHONE } from "../utils/utils";

type UtilsContextType = {
  handleTextInput1: ChangeEventHandler<HTMLInputElement>;
  handleTextInput2: ChangeEventHandler<HTMLInputElement>;
  handleResize: () => void;
  isMaxCharLimitReached: boolean;
  isMaxFromLimitReached: boolean;
  selectedPhoto: string;
  setSelectedPhoto: Dispatch<SetStateAction<string>>;
  isMobile: boolean;
  charCount: number;
  charCountFrom: number;
  maxCharLimit: number;
  maxFromLimit: number;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  getTextColor: (photo: string[]) => void;
  generateWordDisplay: () => string;
  handleSubmit: MouseEventHandler<HTMLButtonElement>;
  handleCheckCorrectWord: MouseEventHandler<HTMLButtonElement>;
  showErrorMessage: boolean;
};

type UtilsProviderProps = {
  children: ReactNode;
};

export const UtilsContext = createContext<UtilsContextType>(null!);

export const UtilsProvider = ({ children }: UtilsProviderProps) => {
  const {
    letters,
    maxCharLimit,
    maxFromLimit,
    currWord,
    input,
    isCorrectGuess,
    setInput,
    setIsCorrectGuess,
    setHasSubmitted,
    setShowModal,
    charCount,
    charCountFrom,
    setCharCount,
    setCharCountFrom,
  } = useLetterStore();
  //TODO: UTILS TO USE IN THE FORM COMPONENT
  // const [charCount, setCharCount] = useState(0);
  // const [charCountFrom, setCharCountFrom] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string>("");
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTextInput1 = (e: ChangeEvent<HTMLInputElement>) => {
    setCharCount(e.target.value.length);
  };

  const handleTextInput2 = (e: ChangeEvent<HTMLInputElement>) => {
    setCharCountFrom(e.target.value.length);
  };

  const isMaxCharLimitReached = charCount === maxCharLimit;
  const isMaxFromLimitReached = charCountFrom === maxFromLimit;

  //TODO: UTILS TO USE IN THE RESULT COMPONENT

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const maxWidth = window.innerWidth < 640 ? 350 : 500;
    const pixelRatio = window.devicePixelRatio || 1;

    context.clearRect(0, 0, canvas.width, canvas.height);

    letters.forEach((letter) => {
      letter.photo.forEach((photoSrc) => {
        const image = new Image();
        image.src = photoSrc;
        image.onload = () => {
          const scale = maxWidth / image.width;
          const imageWidth = image.width * scale;
          const imageHeight = image.height * scale;

          canvas.width = imageWidth * pixelRatio;
          canvas.height = imageHeight * pixelRatio;

          canvas.style.width = `${imageWidth}px`;
          canvas.style.height = `${imageHeight}px`;

          context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
          context.drawImage(image, 0, 0, imageWidth, imageHeight);
        };
      });
    });
  }, [letters]);

  //TODO: UTILS TO USE IN RESULT TO CHANGE THE TEXT COLOR
  const getTextColor = (photo: string[]) => {
    if (photo.includes(CARDPHONE.ver1P) || photo.includes(CARDDESCKTOP.ver1D)) {
      return "text-[#7167e6]";
    } else if (
      photo.includes(CARDPHONE.ver2P) ||
      photo.includes(CARDDESCKTOP.ver2D)
    )
      return "text-[rgb(188,79,77)]";
  };

  //TODO: UTILS FROM THE SHOW MODAL

  const generateWordDisplay = () => {
    return isCorrectGuess ? currWord : "_".repeat(currWord.length).trim();
  };

  const handleSubmit = () => {
    if (!input) {
      return;
    }
    const guessedWord = input.toLowerCase();
    const correct = guessedWord === currWord.toLowerCase();
    setIsCorrectGuess(correct);
    setHasSubmitted(true);
    setInput("");

    if (!correct) {
      setShowErrorMessage(true);
    } else {
      setShowErrorMessage(false);
    }
  };

  useEffect(() => {
    if (showErrorMessage) {
      const timer = setTimeout(() => {
        setShowErrorMessage(false);
      }, 2000); // El mensaje desaparece después de 3 segundos

      return () => clearTimeout(timer); // Limpiar el temporizador al desmontar o cuando cambie el estado
    }
  }, [showErrorMessage]);

  const handleCheckCorrectWord = () => {
    if (!isCorrectGuess) {
      setShowErrorMessage(true);
    } else {
      setShowModal(false);
      setHasSubmitted(true);
      setShowErrorMessage(false);
    }
  };

  return (
    <UtilsContext.Provider
      value={{
        handleTextInput1,
        handleTextInput2,
        handleResize,
        isMaxCharLimitReached,
        isMaxFromLimitReached,
        selectedPhoto,
        setSelectedPhoto,
        isMobile,
        charCount,
        maxCharLimit,
        maxFromLimit,
        charCountFrom,
        canvasRef,
        getTextColor,
        generateWordDisplay,
        handleSubmit,
        handleCheckCorrectWord,
        showErrorMessage,
      }}
    >
      {children}
    </UtilsContext.Provider>
  );
};
