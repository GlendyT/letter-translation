import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { DownloadProvider } from "./context/DownloadProvider";
import React from "react";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DownloadProvider>
      <App />
    </DownloadProvider>
  </React.StrictMode>
);
