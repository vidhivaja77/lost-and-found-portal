// src/components/HeroSection.js
import React from "react";
import { Link } from "react-router-dom";
import "./HeroSection.css";

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-overlay" />
      <div className="container hero-content">
        <h1>Found. Fast. UniFind.</h1>
        <p>Your campus hub for lost &amp; found items</p>

        <div className="hero-buttons">
          <Link to="/add?type=lost" className="btn lost-btn">Report a Lost Item</Link>
          <Link to="/add?type=found" className="btn found-btn">Report a Found Item</Link>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
