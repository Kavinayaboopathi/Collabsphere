import React from "react"; // ✅ Required for JSX
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Getstarted from "./pages/GetStarted";
import Login from "./pages/login";
import Signin from "./pages/signin";
import Homepage from "./pages/homepage";
import Community from "./pages/community";
import Chat from "./pages/chat";
import Project from "./pages/project";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Getstarted />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/community" element={<Community />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/project" element={<Project />} />
      </Routes>
    </BrowserRouter>
  );
}
