import { createRoot } from "react-dom/client";
import App from "./App";
import "./global.css";
import "./i18n"; // Import i18n configuration
import { ThemeProvider } from "next-themes";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Silence Clerk development key warning as requested by user
const originalWarn = console.warn;
console.warn = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('Clerk: Clerk has been loaded with development keys')) {
    return;
  }
  originalWarn(...args);
};

// Also catch it if it's a console.log in some versions
const originalLog = console.log;
console.log = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('Clerk: Clerk has been loaded with development keys')) {
    return;
  }
  originalLog(...args);
};

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(rootElement).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <App />
    </ThemeProvider>
  </ClerkProvider>
);
