import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { DownloadProvider } from "./context/DownloadProvider";
import React from "react";
import { UtilsProvider } from "./context/UtilsProvider";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UtilsProvider>
      <DownloadProvider>
        <App />
      </DownloadProvider>
    </UtilsProvider>
  </React.StrictMode>
);
