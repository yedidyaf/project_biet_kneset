import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
// import '../../assets/css/Navbar.css';
import logo from './logoImage.jpg';
import Cookies from 'js-cookie';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import gabaiAvatar from './logoImage.jpg';
import DateH from '../../component/DateH';

const NavbarG = () => {
  const navigate = useNavigate();
  const userName = Cookies.get('user_name');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logOut = () => {
    Cookies.remove('token', { path: '/' });
    Cookies.remove('user_id', { path: '/' });
    Cookies.remove('user_name', { path: '/' });
    navigate('/gabai/login');
  };



  return (
    <>
      <nav className="navbar">
        <div className="navbar-top">
          <div className="logo-container" >
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
          <Link to="/gabai/home" className="nav-btn" onClick={toggleMenu}>בית</Link>
          <Link to="/gabai/news" className="nav-btn" onClick={toggleMenu}>אירועים</Link>
          <Link to="/gabai/times" className="nav-btn" onClick={toggleMenu}>זמנים</Link>
          <Link to="/gabai/members" className="nav-btn" onClick={toggleMenu}>חברים</Link>
          <Link to="/gabai/donations" className="nav-btn" onClick={toggleMenu}>תרומות</Link>
          <Link to="/gabai/gabais" className="nav-btn" onClick={toggleMenu}>גבאים</Link>
          {userName && <button className="user-name" onClick={logOut}>יציאה מ: {userName}</button>}
        </div>
      </nav>

      <Outlet />

      <div className="footer-info">
        <p>בית כנסת חניכי הישיבות תל גיבורים בני ברק</p>
        <p>רחוב האצ"ל 13, בני ברק</p>
        <p>כתובת המייל: jbh0527174650@gmail.com</p>
        <p>פניות בנוגע לאתר: yedidya friedland</p>
        {/* <FloatingWhatsApp
          phoneNumber="+972527174650"
          accountName="גבאי בית הכנסת"
          statusMessage="בית כנסת חניכי הישיבות תל גיבורים"
          chatMessage="שלום וברכה, במה אני יכול לסייע?"
          messageDelay={5}       
          darkMode={true}
          allowClickAway={true}
          className="floating-whatsapp"
          buttonClassName="floating-whatsapp-button"
          avatar={gabaiAvatar}
          allowBounce={false}
        /> */}
      </div>
    </>
  );
};

export default NavbarG;
