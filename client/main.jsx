import "./global.css";

import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VotingProvider } from "./contexts/VotingContext";

import HomePage from "./pages/HomePage";

function App() {
  return (
    <VotingProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </VotingProvider>
  );
}

createRoot(document.getElementById("root")).render(<App />);
