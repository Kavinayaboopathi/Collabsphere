import { useState } from 'react';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import googleLogo from '../assets/goo.webp';
import DarkVeil from '../react_bits/Backgrounds/DarkVeil/DarkVeil';
import SplitText from '../react_bits/TextAnimations/SplitText/SplitText';
import pro from '../assets/pro.png';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    console.log('Google OAuth triggered');
    // Implement Google login (e.g., Firebase auth)
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });

      localStorage.setItem('token', response.data.token);
      navigate('/homepage');
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert('Login failed. Please try again.');
      }
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="dark-veil">
        <DarkVeil />
      </div>

      <div className="login-box">
        {/* Avatar */}
        <img src={pro} alt="avatar" className="avatar" />

        <div className="login-title">
          <SplitText
            text="LogIn"
            className="animated-title"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 2, y: 40 }}
            to={{ opacity: 5, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
        </div>

        {/* Login Form */}
        <form onSubmit={handleSignIn}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>
            Password
            <a href="/forgot-password" className="forgot-link">
              Forgot password?
            </a>
          </label>
          <div className="password-field">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="show-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <button type="submit" className="sign-in-btn">
            Sign In
          </button>
        </form>

        {/* Google Login */}
        <button className="google-login-btn" onClick={handleGoogleLogin}>
          <img src={googleLogo} alt="Google" />
          Login with Google
        </button>

        {/* Create Account Link */}
        <a href="/signin" className="create-link">
          Create Account
        </a>
      </div>
    </div>
  );
}

export default Login;
