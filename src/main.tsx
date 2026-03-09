import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { MeetingsProvider } from "./app/context/MeetingsContext";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <MeetingsProvider>
    <App />
  </MeetingsProvider>
);
  