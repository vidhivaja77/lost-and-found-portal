import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Auth.css';
import { loginUser, setToken, setUser } from '../api/client';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await loginUser({ email, password });
      setToken(res.token);
      setUser(res.user);
      alert('Logged in successfully');
      window.location.href = '/profile';
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <main className="page-main auth-page">
      <div className="auth-container">
        <div className="promo-card">
          <div className="promo-content">
            <h1>Welcome Back to UniFind</h1>
            <p>
              Your campus hub for lost & found items. Securely access your account to report, 
              track, and reunite unfortunate items.
            </p>
          </div>
        </div>

        <div className="auth-card">
          <h1>UniFind Login</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Campus Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="you@university.edu" 
                required
                value={email}
                onChange={(e)=>setEmail(e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  name="password" 
                  placeholder="••••••••" 
                  required
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)} 
                />
                {showPassword ? (
                  <FaEye className="password-toggle-icon" onClick={togglePasswordVisibility} />
                ) : (
                  <FaEyeSlash className="password-toggle-icon" onClick={togglePasswordVisibility} />
                )}
              </div>
            </div>
            
            {error && <div style={{color:'red', marginBottom:8}}>{error}</div>}
            <button type="submit" className="btn btn-secondary submit-btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="auth-footer">
            <Link to="/forgot-password">Forgot Password?</Link>
            <span className="separator">|</span>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;