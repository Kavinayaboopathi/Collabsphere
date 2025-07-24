import { useState } from 'react'
import CardSwap, { Card } from '../react_bits/Components/CardSwap/CardSwap'
import Particles from '../react_bits/Backgrounds/Particles/Particles'
import { FaBars } from 'react-icons/fa'
import Dashboard from '../components/Dashboard'
import '../styles/Homepage.css'
import TextType from '../react_bits/TextAnimations/TextType/TextType'
import ShinyText from '../react_bits/TextAnimations/ShinyText/ShinyText'

function Homepage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <div className={`homepage-wrapper ${sidebarOpen ? 'dashboard-open' : ''}`}>
      {/* Background Particles */}
      <Particles
        particleColors={['#ffffff', '#00ffff', '#ff00ff']}
        particleCount={200}
        particleSpread={8}
        speed={0.3}
        particleBaseSize={80}
        moveParticlesOnHover={true}
        alphaParticles={true}
        disableRotation={false}
      />

      {/* Dashboard Toggle Button */}
      <button className="dashboard-icon" onClick={toggleSidebar}>
        <FaBars />
      </button>

      {/* Sidebar */}
      <Dashboard isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Glassmorphic Box */}
      <div className="glass-box">
        {/* Left Text */}
        <div className="homepage-text">
        <TextType className='text'
  text={["Text typing effect", "for your websites", "Happy coding!"]}
  typingSpeed={75}
  pauseDuration={1500}
  showCursor={true}
  cursorCharacter="|"
/>
<ShinyText text="Just some shiny text!" disabled={false} speed={3} className='custom-class' />
        </div>

        {/* Right CardSwap */}
        <div className="homepage-cards">
          <CardSwap cardDistance={60} verticalDistance={70} delay={5000} pauseOnHover={false}>
            <Card>
              <h3>Smooth</h3>
              <p>Seamless animations</p>
            </Card>
            <Card>
              <h3>Reliable</h3>
              <p>Always performs well</p>
            </Card>
            <Card>
              <h3>Customizable</h3>
              <p>Easy to tweak</p>
            </Card>
          </CardSwap>
        </div>
      </div>
    </div>
  )
}

export default Homepage
