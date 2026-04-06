
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AddItem from "./pages/AddItem";
import ItemDetails from "./pages/ItemDetails";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Browse from "./pages/Browse";
import LostItems from "./pages/LostItems";
import FoundItems from "./pages/FoundItems";

function App() {
  return (
    <Router>
      <Navbar />
      <main className="page-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/lost" element={<LostItems />} />
          <Route path="/found" element={<FoundItems />} />
          <Route path="/add" element={<AddItem />} />
          <Route path="/item/:id" element={<ItemDetails />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/my-profile" element={<Profile />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;