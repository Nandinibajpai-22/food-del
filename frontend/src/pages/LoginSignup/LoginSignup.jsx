import React, { useState } from 'react'
import './LoginSignup.css'

const LoginSignup = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      // Login validation
      if (!formData.email || !formData.password) {
        alert('Please fill in all fields');
        return;
      }
    } else {
      // Signup validation
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        alert('Please fill in all fields');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      if (formData.password.length < 6) {
        alert('Password must be at least 6 characters');
        return;
      }
    }

    // Store user data in localStorage
    const userData = isLogin 
      ? { email: formData.email }
      : { 
          name: formData.name, 
          email: formData.email, 
          password: formData.password 
        };

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userData', JSON.stringify(userData));
    onLoginSuccess();
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="login-signup-wrapper">
      <div className="login-signup-container">
        <div className="login-signup-content">
          <h1 className="app-title">Tomato</h1>
          <h2 className="auth-title">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="auth-subtitle">
            {isLogin 
              ? 'Sign in to your account to continue ordering delicious food'
              : 'Join us to start ordering your favorite meals'
            }
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            )}

            <button type="submit" className="auth-button">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="toggle-auth">
            <p>
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button 
                type="button"
                className="toggle-button"
                onClick={toggleAuthMode}
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>

          <div className="demo-login">
            <p className="demo-text">Demo Credentials:</p>
            <p><strong>Email:</strong> user@example.com</p>
            <p><strong>Password:</strong> password123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
