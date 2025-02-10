import { createRoot } from "react-dom/client";
import "./index.scss";
import "./reset.css";
import App from "./components/App/App";

createRoot(document.getElementById("root")!).render(<App />);
