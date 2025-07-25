import React from "react"; // ✅ Required for JSX
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Getstarted from "./pages/GetStarted";
import Login from "./pages/login";
import Signin from "./pages/signin";
import Homepage from "./pages/homepage";
import Community from "./pages/community";
import Chat from "./pages/chat";
import Project from "./pages/project";
import OAuthSuccess from './pages/OAuthSuccess';
import MyTracker from "./pages/MyTracker";
import ProjectTracker from "./pages/ProjectTracker"
import Discussion from "./pages/discussion"
import AboutUs from "./pages/about"


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
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route path="/myTracker" element={<MyTracker />} />
        <Route path="/projectTracker" element={<ProjectTracker />} />
        <Route path="/discussion" element={<Discussion />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  );
}
