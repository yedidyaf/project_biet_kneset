import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../assets/css/Navbar.css';

const Navbar = () => {
  return (
    <>
    <Link to="/home" className="nav-btn">בית</Link>
      <Link to="/news" className="nav-btn">חדשות</Link>
      <Link to="/times" className="nav-btn">זמני תפילות</Link>  
      <Link to="/members" className="nav-btn">חברי בית כנסת</Link>
      <Link to="/donations" className="nav-btn">תרומות</Link>
      <Outlet />
    </>
  );
};

export default Navbar;