import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
//import SplitText from '../react_bits/TextAnimations/SplitText/SplitText'
import TextType from '../react_bits/TextAnimations/TextType/TextType'
import DarkVeil from '../react_bits/Backgrounds/DarkVeil/DarkVeil'
import '../styles/Getstarted.css'
import ShinyText from '../react_bits/TextAnimations/ShinyText/ShinyText'

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
      
      <div className="dark-veil">
        <DarkVeil />
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
    </div>
  )
}

export default Getstarted
