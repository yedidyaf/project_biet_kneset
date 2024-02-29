// Navbar.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../assets/css/Navbar.css';
import logo from './logoImage.jpg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; 
const Navbar = () => {
  const navigate = useNavigate();
  const [pressing, setPressing] = useState(0)

  const addPressing = () => {
    setPressing((prev) => prev + 1)
    if (pressing === 15) {
      setPressing(0)
      navigate('/gabai/login');
    }
  }
  
  return (
    <><div className="footer-info" >
      {/* <DateH/> */}
      <div className="logo-container" onClick={addPressing}>
        <img
          src={logo}
          alt="Logo"
          className="logo"
        />
      </div>
    </div>
      <Link to="/home" className="nav-btn">בית</Link>
      <Link to="/news" className="nav-btn">אירועים</Link>
      <Link to="/times" className="nav-btn">זמנים</Link>
      <Link to="/members" className="nav-btn">חברים </Link>
      <Link to="/donations" className="nav-btn">תרומות</Link>
      <Outlet />

      <div className="footer-info">
        <p>בית כנסת חניכי הישיבות תל גיבורים בני ברק</p>
        <p>רחוב האצ"ל 13, בני ברק</p>
        <p>כתובת המייל: example@example.com</p>
        <p> פניות בנוגע לאתר: yedidya friedland</p>
      </div>
    </>


  );
};

export default Navbar;
