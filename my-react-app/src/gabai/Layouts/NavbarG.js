import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../../assets/css/Navbar.css';
import logo from './logoImage.jpg';

const NavbarG = () => {
  return (
    <>
    <div className="logo-container">
        <img
          src ={logo} 
          alt="Logo"
          className="logo"
        />
      </div>
    <Link to="/gabai/home" className="nav-btn">בית</Link>
      <Link to="/gabai/news" className="nav-btn">חדשות</Link>
      <Link to="/gabai/times" className="nav-btn">זמני תפילות</Link>  
      <Link to="/gabai/members" className="nav-btn">חברי בית כנסת</Link>
      <Link to="/gabai/donations" className="nav-btn">תרומות</Link>
      <Link to = "/gabai/gabais" className="nav-btn">גבאים</Link>
      <Outlet />
    </>
  );
};

export default NavbarG;