import { createRoot } from "react-dom/client";
import App from "./App";
import "./global.css";
import { ThemeProvider } from "next-themes";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
    <App />
  </ThemeProvider>
);
