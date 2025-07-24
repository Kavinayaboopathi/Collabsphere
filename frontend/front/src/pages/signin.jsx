import { useState } from 'react'
import '../styles/signin.css'
import googleLogo from '../assets/goo.webp'
import DarkVeil from '../react_bits/Backgrounds/DarkVeil/DarkVeil'
import SplitText from '../react_bits/TextAnimations/SplitText/SplitText'
import { useNavigate } from 'react-router-dom'
import axios from 'axios' // ✅ Axios import
import pro from '../assets/pro.png'

function Signin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()

  const handleGoogleSignup = () => {
    console.log('Google OAuth Sign-Up triggered')
    // Add Google Sign-Up logic here (Firebase/OAuth)
  }

  const handleSignUp = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert('Passwords do not match!')
      return
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        password
      })

      localStorage.setItem('token', response.data.token)
      navigate('/homepage')
    } catch (error) {
      console.error('Signup Error:', error.response?.data || error.message)
      alert(error.response?.data?.message || 'Signup failed')
    }
  }

  return (
    <div className="signin-container">
      <div className="dark-veil">
        <DarkVeil />
      </div>

      <div className="signin-box">
        <img src={pro} alt="avatar" className="avatar" />

        <div className="signin-title">
          <SplitText
            text="Sign In"
            className="animated-title"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
        </div>

        <form onSubmit={handleSignUp}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Password</label>
          <div className="password-field">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="show-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <label>Confirm Password</label>
          <div className="password-field">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="show-btn"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <button type="submit" className="sign-in-btn">Sign Up</button>
        </form>

        <button className="google-login-btn" onClick={handleGoogleSignup}>
          <img src={googleLogo} alt="Google" />
          Sign Up with Google
        </button>

        <a href="/login" className="create-link">
          Already have an account? Log In
        </a>
      </div>
    </div>
  )
}

export default Signin
