// src/components/Features.js
import React from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaBell } from "react-icons/fa";
import "./Features.css";

function Features() {
  return (
    <section className="features-wrap">
      <div className="features-grid">
        <Link to="/browse" className="feature-card" style={{ textDecoration: "none", color: "inherit" }}>
          <img className="feature-thumb" src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=900&auto=format&fit=crop&q=60" alt="Browse listings" />
          <h4>Browse Listings</h4>
          <p>Explore all lost & found items across campus.</p>
        </Link>

        <div className="feature-card">
          <img className="feature-thumb" src="https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?w=900&auto=format&fit=crop&q=60" alt="Smart search" />
          <h4>Smart Search</h4>
          <p>Search by item, location, date or tag.</p>
        </div>

        <div className="feature-card">
          <img className="feature-thumb" src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&auto=format&fit=crop&q=60" alt="Notifications" />
          <h4>Instant Notifications</h4>
          <p>Get alerts when matching items are posted.</p>
        </div>
      </div>
    </section>
  );
}

export default Features;

