import { useContext } from "react";
import { UtilsContext } from "../context/UtilsProvider";

export const useUtils = () => {
  return useContext(UtilsContext);
};
