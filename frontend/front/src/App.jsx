import React from "react"; // ✅ Required for JSX
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Getstarted from "./pages/GetStarted";
import Login from "./pages/login";
import Signin from "./pages/signin";
import Homepage from "./pages/homepage";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Getstarted />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/homepage" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}
