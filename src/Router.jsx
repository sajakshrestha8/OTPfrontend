import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Success from "./Components/Success";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}
