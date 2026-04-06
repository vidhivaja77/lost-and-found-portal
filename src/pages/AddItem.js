// src/pages/AddItem.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';
import './AddItem.css'; 
import { createItem } from '../api/client';

// Stepper items (left side navigation)
const steps = [
  { id: 1, name: 'Item Details', subtitle: 'Item Listings' },
  { id: 2, name: 'Location & Date', subtitle: 'Last Seen Location' },
  { id: 3, name: 'Your Contact Info', subtitle: 'Personal Information' },
];

function AddItem() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get('type') || 'lost'; 
  
  const [currentStep, setCurrentStep] = useState(1); // To track which step is active
  const pageTitle = type === 'found' ? 'Report a Found Item' : 'Report a Lost Item';
  
  // Form data
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    location: '',
    date: '',
    time: '',
    fullName: '',
    email: '',
    phone: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleNext = (e) => {
    if (e) e.preventDefault();
    // Move to next step without validation
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setError('');
    setSuccess('');
    setSubmitting(true);
    try {
      const payload = {
        title: formData.itemName || 'Untitled Item',
        type,
        location: formData.location || 'Not specified',
        description: formData.description || 'No description provided',
      };
      
      if (imagePreview) {
        payload.imageUrl = imagePreview;
      }
      
      await createItem(payload);
      setSuccess('Your report has been submitted successfully!');
      setTimeout(() => {
        window.location.href = type === 'found' ? '/found' : '/lost';
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to submit report');
    } finally {
      setSubmitting(false);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h3>Item Details</h3>
            
            <div className="form-group half-width">
                <label htmlFor="itemName">Item Name (e.g., "Blue Backpack")</label>
                <input type="text" id="itemName" name="itemName" placeholder="e.g., Black Wallet" value={formData.itemName} onChange={(e)=>setFormData(f=>({ ...f, itemName: e.target.value }))} />
            </div>

            <div className="form-group half-width">
                <label htmlFor="category">Category</label>
                <select id="category" name="category">
                    <option value="electronics">Electronics</option>
                    <option value="wallet">Wallet</option>
                    <option value="keys">Keys</option>
                    <option value="clothing">Clothing</option>
                    <option value="books">Books</option>
                    <option value="accessories">Accessories</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="description">Description (color, brand, unique features)</label>
                <textarea id="description" name="description" rows="3" placeholder="Describe the item..." value={formData.description} onChange={(e)=>setFormData(f=>({ ...f, description: e.target.value }))} />
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-primary" onClick={(e) => { e.preventDefault(); handleNext(e); }}>
                Next: Location & Date
              </button>
            </div>
          </>
        );

      case 2:
        return (
          <>
            <h3>Last Seen & Date</h3>
            
            <div className="form-group">
                <label htmlFor="location">Last Seen Location</label>
                <input type="text" id="location" name="location" placeholder="e.g., Library, Gym" value={formData.location} onChange={(e)=>setFormData(f=>({ ...f, location: e.target.value }))} />
            </div>

            <div className="location-date-group">
                <div className="form-group half-width">
                    <label htmlFor="date">Date Last Seen</label>
                    <input type="date" id="date" name="date" value={formData.date} onChange={(e)=>setFormData(f=>({ ...f, date: e.target.value }))} />
                </div>
                <div className="form-group half-width">
                    <label htmlFor="time">Time Last Seen</label>
                    <input type="time" id="time" name="time" value={formData.time} onChange={(e)=>setFormData(f=>({ ...f, time: e.target.value }))} />
                </div>
            </div>
            
            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={(e) => { e.preventDefault(); handlePrevious(); }}>
                Back
              </button>
              <button type="button" className="btn btn-primary" onClick={(e) => { e.preventDefault(); handleNext(e); }}>
                Next: Contact Info
              </button>
            </div>
          </>
        );

      case 3:
        return (
          <>
            <h3>Your Contact Info</h3>
            
            <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={(e)=>setFormData(f=>({ ...f, fullName: e.target.value }))} />
            </div>

            <div className="form-group">
                <label htmlFor="email">Campus Email</label>
                <input type="text" id="email" name="email" placeholder="your@email.com" value={formData.email} onChange={(e)=>setFormData(f=>({ ...f, email: e.target.value }))} />
            </div>

            <div className="form-group">
                <label htmlFor="phone">Phone Number (Optional)</label>
                <input type="text" id="phone" name="phone" placeholder="1234567890" value={formData.phone} onChange={(e)=>setFormData(f=>({ ...f, phone: e.target.value }))} />
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={handlePrevious}>
                Back
              </button>
              {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
              {success && <div style={{ color: 'green', marginBottom: 8 }}>{success}</div>}
              <button type="button" className="btn btn-primary submit-btn" disabled={submitting} onClick={handleSubmit}>
                {submitting ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </>
        );

      default:
        return null;
    }
  };


  return (
    <main className="page-main add-item-page">
      {/* VERSION INDICATOR - If you see this, new code is loaded! */}
      <div style={{ position: 'fixed', top: 10, right: 10, background: 'green', color: 'white', padding: '10px', borderRadius: '5px', zIndex: 9999, fontWeight: 'bold' }}>
        ✅ NEW CODE v2.0 - NO VALIDATION
      </div>
      <div className="container form-layout">
        
        {/* Left Side: Stepper Navigation & Image Upload */}
        <div className="sidebar">
          {/* Image Upload Box */}
          <div className="photo-upload-box">
            {imagePreview ? (
              <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                <button 
                  type="button" 
                  onClick={() => { setImageFile(null); setImagePreview(null); }}
                  style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', borderRadius: '50%', width: 30, height: 30, cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>
            ) : (
              <>
                <FaCamera size={30} />
                <p>Upload Photo</p>
              </>
            )}
            <input 
              type="file" 
              id="itemPhoto" 
              accept="image/*" 
              onChange={handleImageChange}
              style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0, cursor: 'pointer', top: 0, left: 0 }}
            />
          </div>

          {/* Stepper Navigation */}
          <nav className="stepper-nav">
            {steps.map((step) => (
              <div 
                key={step.id} 
                className={`step-item ${step.id === currentStep ? 'active' : ''}`}
                onClick={() => setCurrentStep(step.id)} // User can click to jump
              >
                <span className="step-number">{step.id}.</span>
                <div>
                  <p className="step-subtitle">{step.subtitle}</p>
                  <p className="step-name">{step.name}</p>
                </div>
              </div>
            ))}
          </nav>

        </div>

        {/* Right Side: Form Content */}
        <div className="form-content-area">
          <h1 className="form-page-title">{pageTitle}</h1>
          <p className="form-page-subtext">Help us UniFind hub your belongings.</p>
          
          <div className="actual-form">
            {renderCurrentStep()}
          </div>

        </div>
      </div>
    </main>
  );
}

export default AddItem;
