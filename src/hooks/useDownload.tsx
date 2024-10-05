import { useContext } from "react";
import { DownloadContext } from "../context/DownloadProvider";

export const useDownload = () => {
    return useContext(DownloadContext)
}