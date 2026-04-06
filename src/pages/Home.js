// src/pages/Home.js

import React from "react";
// import Navbar from "../components/Navbar";  <-- 🔥 YE LINE HATA DO! (Navbar App.js se aayega)
import HeroSection from "../components/HeroSection"; // Assuming you will create this
import Features from "../components/Features";     // Assuming you will create this

export default function Home() {
  return (
    // <div className="min-h-screen flex flex-col bg-cover bg-center" style={{ ... }}>
    // 🔥 Upar wala div bhi hata do. Ab Home component sirf content dega.
    <>
      <HeroSection />
      {/* Features Section ab Hero ke neeche dikhega */}
      <div className="container mx-auto"> 
        <Features />
      </div>
    </>
  );
}
