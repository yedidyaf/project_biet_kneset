import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../../assets/css/Navbar.css';

const NavbarG = () => {
  return (
    <>
    <Link to="/gabai/home" className="nav-btn">בית</Link>
      <Link to="/gabai/news" className="nav-btn">חדשות</Link>
      <Link to="/gabai/times" className="nav-btn">זמני תפילות</Link>  
      <Link to="/gabai/members" className="nav-btn">חברי בית כנסת</Link>
      <Link to="/gabai/donations" className="nav-btn">תרומות</Link>
      <Outlet />
    </>
  );
};

export default NavbarG;