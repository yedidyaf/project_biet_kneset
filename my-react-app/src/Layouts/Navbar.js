import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../assets/css/Navbar.css';
import logo from './logoImage.jpg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FloatingWhatsApp } from 'react-floating-whatsapp'
import gabaiAvatar from './logoImage.jpg';
import { NavLink } from 'react-router-dom';
import DateH from '../component/DateH';


const Navbar = () => {
  const navigate = useNavigate();
  const [pressing, setPressing] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const addPressing = () => {
    setPressing((prev) => prev + 1)
    if (pressing === 15) {
      setPressing(0)
      navigate('/gabai/login');
    }
  }
  
  return (
    <>
    <nav className="navbar">
      <div className="navbar-top">
        <div className="logo-container" onClick={addPressing}>
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <div className='date'>
        <DateH/>
        </div>
      </div>
      <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <NavLink to="/home" className={({isActive}) => isActive ? "nav-btn active" : "nav-btn"} onClick={toggleMenu}>בית</NavLink>
        <NavLink to="/news" className={({isActive}) => isActive ? "nav-btn active" : "nav-btn"} onClick={toggleMenu}>אירועים</NavLink>
        <NavLink to="/times" className={({isActive}) => isActive ? "nav-btn active" : "nav-btn"} onClick={toggleMenu}>זמנים</NavLink>
        <NavLink to="/members" className={({isActive}) => isActive ? "nav-btn active" : "nav-btn"} onClick={toggleMenu}>חברים</NavLink>
        <NavLink to="/donations" className={({isActive}) => isActive ? "nav-btn active" : "nav-btn"} onClick={toggleMenu}>תרומות</NavLink>
      </div>
    </nav>
    
    
      <Outlet />

      <div className="footer-info">
        <p>בית כנסת חניכי הישיבות תל גיבורים בני ברק</p>
        <p>רחוב האצ"ל 13, בני ברק</p>
        <p>כתובת המייל: jbh0527174650@gmail.com</p>
        <p> פניות בנוגע לאתר: yedidya friedland</p>
        <FloatingWhatsApp
         phoneNumber = "+972527174650"
         accountName = "גבאי בית הכנסת"
         statusMessage = "בית כנסת חניכי הישיבות תל גיבורים"
         chatMessage = "שלום וברכה, במה אני יכול לסייע?"
         messageDelay = {5}       
         darkMode = {true}
         allowClickAway ={true}
         className = "floating-whatsapp"
         buttonClassName = "floating-whatsapp-button"
         avatar= {gabaiAvatar}
         allowBounce={false}

         />
      </div>
    </>


  );
};

export default Navbar;
