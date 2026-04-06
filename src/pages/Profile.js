// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import { FaEyeSlash } from 'react-icons/fa';
import './Profile.css'; 
import { getUser, getCurrentUser } from '../api/client';

function Profile() {
  const [activeTab, setActiveTab] = useState('info');
  const [profileData, setProfileData] = useState({
    initials: '',
    name: '',
    role: 'Student',
    fullName: '',
    campusEmail: '',
    studentId: '',
    faculty: '',
    phone1: '',
    phone2: '',
    gender: '',
    dob: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage first
    const storedUser = getUser();
    if (storedUser) {
      const initials = storedUser.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
      setProfileData(prev => ({
        ...prev,
        initials,
        name: storedUser.name || '',
        campusEmail: storedUser.email || '',
        fullName: storedUser.name || '',
      }));
    }
    
    // Then fetch full profile from API
    async function loadProfile() {
      try {
        const user = await getCurrentUser();
        const initials = user.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
        setProfileData(prev => ({
          ...prev,
          initials,
          name: user.name || '',
          campusEmail: user.email || '',
          fullName: user.name || '',
        }));
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // In the future, the actual save logic (Firestore update) will go here.
    alert('Changes saved successfully!');
  };

  const renderCurrentTab = () => {
    switch (activeTab) {
      case 'info':
        return (
          <form onSubmit={handleSave} className="profile-form-grid">
            
            {/* -------------------- LEFT COLUMN: Personal Info -------------------- */}
            <div className="form-column">
                <h3 className="section-title">Personal Information</h3>

                <label>Full Name</label>
                <input type="text" name="fullName" value={profileData.fullName} onChange={handleInputChange} />

                <label>Campus Email</label>
                <input type="email" name="campusEmail" value={profileData.campusEmail} onChange={handleInputChange} disabled /> {/* Email generally read-only */}

                <label>Student ID/Register Number</label>
                <input type="text" name="studentId" value={profileData.studentId} onChange={handleInputChange} />

                <label>Faculty</label>
                <input type="text" name="faculty" value={profileData.faculty} onChange={handleInputChange} />

                <label>Phone Number (Primary)</label>
                <input type="tel" name="phone1" value={profileData.phone1} onChange={handleInputChange} />
                
                <label>Phone Number (Secondary)</label>
                <input type="tel" name="phone2" value={profileData.phone2} onChange={handleInputChange} />
            </div>

            {/* -------------------- RIGHT COLUMN: Other Details & Password -------------------- */}
            <div className="form-column">
                <h3 className="section-title">Other Details</h3>

                <label>Gender</label>
                {/* Updated to a Select/Dropdown input for fixed options */}
                <select name="gender" value={profileData.gender} onChange={handleInputChange}>
                    <option value="" disabled>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                <label>Date of Birth</label>
                {/* Changed to type="date" for native date picker experience */}
                <input type="date" name="dob" value={profileData.dob} onChange={handleInputChange} />

                <h3 className="section-title update-password-title">Update Password</h3>
                <label>Current Password</label>
                <div className="password-input-wrapper">
                    <input type="password" placeholder="Current Password" />
                    <FaEyeSlash className="password-toggle-icon" /> 
                </div>

                <label>New Password</label>
                <div className="password-input-wrapper">
                    <input type="password" placeholder="New Password" />
                    <FaEyeSlash className="password-toggle-icon" /> 
                </div>

                <label>Confirm New Password</label>
                <div className="password-input-wrapper">
                    <input type="password" placeholder="Confirm Password" />
                    <FaEyeSlash className="password-toggle-icon" /> 
                </div>
            </div>

            {/* -------------------- FOOTER BUTTONS -------------------- */}
            <div className="form-actions">
                <button type="submit" className="btn btn-secondary">Save Changes</button>
                <button type="button" className="btn btn-tertiary">Cancel</button>
            </div>

          </form>
        );
      case 'reports':
        // Updated to English
        return <div className="tab-content">All your reported lost and found items will be displayed here.</div>;
      
      case 'notifications':
        // Updated to English
        return <div className="tab-content">Your recent notifications and alerts will appear here.</div>;
      default:
        return null;
    }
  };

  return (
    <main className="page-main profile-page-container">
      <div className="profile-card">
        
        {/* Top Maroon Header */}
        <div className="profile-header">
            <h2 className="uni-brand">UniFind</h2>
        </div>

        {/* User Info & Tabs */}
        <div className="user-section">
            <div className="user-info-summary">
                <div className="user-initials">{profileData.initials}</div>
                <div className="user-details">
                    <h1 className="user-name">{profileData.name}</h1>
                    <p className="user-role">{profileData.role}</p>
                </div>
            </div>

            <div className="tabs-container">
                <button 
                  className={`tab-button ${activeTab === 'info' ? 'active' : ''}`}
                  onClick={() => setActiveTab('info')}
                >
                  My Info
                </button>
                <button 
                  className={`tab-button ${activeTab === 'reports' ? 'active' : ''}`}
                  onClick={() => setActiveTab('reports')}
                >
                  My Reports
                </button>
                {/* Removed Account Settings Tab */}
                <button 
                  className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`}
                  onClick={() => setActiveTab('notifications')}
                >
                  Notifications
                </button>
            </div>
        </div>
        
        {/* Tab Content (Form) */}
        <div className="tab-content-wrapper">
          {renderCurrentTab()}
        </div>

        {/* Footer Links & Socials */}
        <div className="profile-footer">
          <div className="footer-links">
              <span>Privacy</span>
              <span>Terms</span>
          </div>
          <div className="footer-socials">
              {/* Note: Social media icons need Font Awesome or a similar library to render correctly. */}
              {/* 🔥 FIX: Commented out the crashing Font Awesome icons: */}
              {/* <i className="fab fa-facebook-f"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-youtube"></i> */}
              
              {/* Optional: Simple text placeholders to fill the space temporarily */}
              <span style={{marginRight: '15px'}}>FB</span>
              <span style={{marginRight: '15px'}}>TW</span>
              <span>YT</span>
          </div>
        </div>

      </div>
    </main>
  );
}

export default Profile;