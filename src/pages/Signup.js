import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEyeSlash } from 'react-icons/fa';
import './Auth.css';
import { registerUser, setToken, setUser } from '../api/client';

function Signup() {
  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [department, setDepartment] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    if (!name || !email || !password) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      const res = await registerUser({ 
        name, 
        email, 
        password, 
        enrollmentNumber, 
        role, 
        department, 
        phone, 
        username 
      });
      
      if (res && res.token) {
        setToken(res.token);
        setUser(res.user);
        window.location.href = '/profile';
      } else {
        throw new Error('Registration failed - no token received');
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-main auth-page">
      <div className="auth-container">
        <div className="promo-card">
          <div className="promo-content">
            <h1>Join UniFind.</h1>
            <p>
              Your campus hub for lost & found items. Create an account to report, track, and reunite with your belongings.
            </p>
          </div>
        </div>

        <div className="auth-card">
          <h1>UniFind Registration</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" placeholder="Full Name" required value={name} onChange={(e)=>setName(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="enrollmentNumber">Enrollment Number</label>
              <input type="text" id="enrollmentNumber" name="enrollmentNumber" placeholder="e.g. 21BCE1010" required value={enrollmentNumber} onChange={(e)=>setEnrollmentNumber(e.target.value)} />
            </div>

            <div className="form-group">
                <label>Role in Campus</label>
                <div className="role-selector">
                    <button 
                        type="button" 
                        className={`role-button ${role === 'student' ? 'active' : ''}`}
                        onClick={() => setRole('student')}
                    >
                        Student
                    </button>
                    <button 
                        type="button" 
                        className={`role-button ${role === 'faculty' ? 'active' : ''}`}
                        onClick={() => setRole('faculty')}
                    >
                        Faculty
                    </button>
                </div>
            </div>

            <div className="form-group">
              <label htmlFor="department">Department/Faculty Name</label>
              <input type="text" id="department" name="department" placeholder="e.g. Computer Science" required value={department} onChange={(e)=>setDepartment(e.target.value)} />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" placeholder="9876543210" required value={phone} onChange={(e)=>setPhone(e.target.value)} />
            </div>
            
            <div className="form-group">
              <label htmlFor="username">User Name</label>
              <input type="text" id="username" name="username" placeholder="Unique username" required value={username} onChange={(e)=>setUsername(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  placeholder="••••••••" 
                  required value={password} onChange={(e)=>setPassword(e.target.value)} 
                />
                <FaEyeSlash className="password-toggle-icon" /> 
              </div>
            </div>
            
            {error && <div style={{color:'red', marginBottom:8}}>{error}</div>}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="you@university.edu" required value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary submit-btn register-btn" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account? <Link to="/login">Log In</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Signup;
