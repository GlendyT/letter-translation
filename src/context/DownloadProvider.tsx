import html2canvas from "html2canvas";
import { createContext, ReactNode } from "react";

type DownloadContextType = {
  handleDownloadImage: () => Promise<void>;
};

type DownloaderProviderProps = {
  children: ReactNode;
};

export const DownloadContext = createContext<DownloadContextType>(null!);

export const DownloadProvider = ({ children }: DownloaderProviderProps) => {
  const handleDownloadImage = async () => {
    const element = document.getElementById("print");
    if (!element) return;

    const options = {
      scale: 8,
    };
    const canvas = await html2canvas(element, options);
    const data = canvas.toDataURL("image/png");
    const link = document.createElement("a");

    link.href = data;
    link.download = "HopeIsBack";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  };

  return (
    <DownloadContext.Provider
      value={{
        handleDownloadImage,
      }}
    >
      {children}
    </DownloadContext.Provider>
  );
};