import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { DownloadProvider } from "./context/DownloadProvider";
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
