import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Dashboard from "../components/Dashboard";
import "../styles/about.css";

export default function AboutUs() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="about-wrapper">
      {/* Dashboard Sidebar */}
      <Dashboard isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <button className="dashboard-icon" onClick={toggleSidebar}>
        <FaBars />
      </button>

      {/* About Content */}
      <div className="about-page">
        <h1>About Us</h1>

        <section className="about-section">
          <h2>Our Product</h2>
          <p>
            Our platform is a **SaaS-based solution** designed to bridge the gap 
            between students and teachers by providing tools for collaboration, 
            project management, and knowledge sharing. Students can showcase 
            their projects, track progress, and resolve doubts, while teachers 
            can monitor progress, mentor effectively, and evaluate outcomes in 
            real-time.
          </p>
        </section>

        <section className="about-section">
          <h2>Benefits for Students</h2>
          <ul>
            <li>Showcase and explore innovative projects.</li>
            <li>Track individual and group tasks with progress indicators.</li>
            <li>Ask doubts and get guidance through a collaborative discussion hub.</li>
            <li>Earn recognition and badges for completing milestones.</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Benefits for Teachers</h2>
          <ul>
            <li>Monitor multiple student projects in one dashboard.</li>
            <li>Track deadlines, completion rates, and performance analytics.</li>
            <li>Provide solutions and feedback directly through the discussion forum.</li>
            <li>Save time with an organized, SaaS-powered project tracking tool.</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Our Goals</h2>
          <p>
            To empower students and educators with an integrated ecosystem 
            that simplifies project management, improves communication, and 
            fosters innovation through collaboration.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Vision</h2>
          <p>
            To become the go-to platform for academic collaboration, 
            where students and teachers work together seamlessly to create, 
            track, and showcase impactful projects.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            To leverage technology to enhance education by making project 
            tracking, mentorship, and doubt resolution efficient and accessible 
            to all institutions.
          </p>
        </section>

        <section className="about-section">
          <h2>About the Developers</h2>
          <p>
            This platform is proudly developed by:
          </p>
          <ul>
            <li><strong>Moushmi Grace</strong> – </li>
            <li><strong>Kavinaya</strong> – </li>
            <li><strong>Megavarshini</strong> – </li>
          </ul>
        </section>
      </div>
    </div>
  );
}