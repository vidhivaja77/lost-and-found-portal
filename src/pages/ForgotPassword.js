// src/pages/ForgotPassword.js (UPDATED to use Auth.css)

import React from "react";
import { Link } from "react-router-dom";
import './Auth.css'; // 🔥 Import Auth.css for styling

export default function ForgotPassword() {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Password reset link requested!');
    // Future mein yahan forgot password logic aayegi
  };

  return (
    <main className="page-main auth-page"> {/* auth-page class wrapper */}
        {/* 🔥 auth-container-small class use kiya hai */}
      <div className="auth-container-small"> 
        
        {/* Auth Card Content */}
        <div className="auth-card" style={{padding: '0'}}> 
          
          <h1>Forgot Password</h1>
          
          <p className="text-center text-gray-600" style={{ marginBottom: '25px', fontSize: '0.95rem' }}>
            Enter your campus email address and we will send you a password reset link.
          </p>
        
          <form onSubmit={handleSubmit}>
            
            <div className="form-group">
              <label htmlFor="email">Campus Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@university.edu"
                required
              />
            </div>

            <button
              type="submit"
              className="btn submit-btn" // submit-btn class Auth.css se
            >
              Send Reset Link
            </button>
          </form>

          {/* Footer Link */}
          <div className="auth-footer">
            <Link to="/login">Back to Login</Link>
          </div>
        </div>
      </div>
    </main>
  );
}