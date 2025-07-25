import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
//import SplitText from '../react_bits/TextAnimations/SplitText/SplitText'
import TextType from '../react_bits/TextAnimations/TextType/TextType'
import Particles from '../react_bits/Backgrounds/Particles/Particles'
import '../styles/Getstarted.css'
import ShinyText from '../react_bits/TextAnimations/ShinyText/ShinyText'
import CardSwap, { Card } from '../react_bits/Components/CardSwap/CardSwap'

function Getstarted() {
  const [showAuthButtons, setShowAuthButtons] = useState(false)
  const navigate = useNavigate()

  const handleComplete = () => {
    console.log('Animation finished!')
  }

  const handleGetStarted = () => {
    setShowAuthButtons(true) // Switch to login/signup buttons
  }

  const handleLogin = () => {
    navigate('/login') // Redirect to Login page
  }

  const handleSignup = () => {
    navigate('/signin') // Redirect to Sign Up page
  }

  return (
    <div className="getstarted-container">
      
      <div className="particles-background">
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
      </div>


      {/* Centered Animated Text */}
      <div className="center-text">
      <ShinyText text="Welcome to the website!" disabled={false} speed={3} className='custom-class' />
        {/* Buttons Section */}
        <div className="button-group">
          {showAuthButtons ? (
            <>
              <button className="btn" onClick={handleLogin}>Login</button>
              <button className="btn" onClick={handleSignup}>Sign In</button>
            </>
          ) : (
            <>
              <button className="btn" onClick={handleGetStarted}>Get Started</button>
              <button className="btn">Learn More</button>
            </>
          )}
        </div>
      </div>

      {/* Typing animation below */}
      <div className="typing-text">
        <TextType
          text={[
            "Text typing effect",
            "for your websites",
            "Happy coding!"
          ]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="|"
        />
      </div>
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
  )
}

export default Getstarted