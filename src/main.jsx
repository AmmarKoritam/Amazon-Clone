import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GlobleProvider } from "./context/GlobleState.jsx";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobleProvider>
      <App />
    </GlobleProvider>
  </StrictMode>
);
