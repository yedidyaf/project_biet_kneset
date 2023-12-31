// Navbar.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../assets/css/Navbar.css';
import logo from './logoImage.jpg';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo-container">
        <img
          src ={logo} 
          alt="Logo"
          className="logo"
        />
      </div>
      <div className="nav-links">
        <Link to="/home" className="nav-btn">בית</Link>
        <Link to="/news" className="nav-btn">חדשות</Link>
        <Link to="/times" className="nav-btn">זמני תפילות</Link>
        <Link to="/members" className="nav-btn">חברי בית כנסת</Link>
        <Link to="/donations" className="nav-btn">תרומות</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Navbar;
