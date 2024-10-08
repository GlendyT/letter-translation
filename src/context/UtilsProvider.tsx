import {
  ChangeEvent,
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLetterStore } from "../store";

type UtilsContextType = {
  handleTextInput1: (e: ChangeEvent<HTMLInputElement>) => void;
  handleTextInput2: (e: ChangeEvent<HTMLInputElement>) => void;
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
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>
};

type UtilsProviderProps = {
  children: ReactNode;
};

export const UtilsContext = createContext<UtilsContextType>(null!);

export const UtilsProvider = ({ children }: UtilsProviderProps) => {
  const { letters } = useLetterStore();
  //TODO: UTILS TO USE IN THE FORM COMPONENT
  const [charCount, setCharCount] = useState(0);
  const [charCountFrom, setCharCountFrom] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const maxCharLimit = 15;
  const maxFromLimit = 13;
  const [selectedPhoto, setSelectedPhoto] = useState<string>("");

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
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
      }}
    >
      {children}
    </UtilsContext.Provider>
  );
};
