import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import '../../assets/css/Navbar.css';
import logo from './logoImage.jpg';
import Cookies from 'js-cookie';
const NavbarG = () => {
  const navigate = useNavigate();
  const userName = Cookies.get('user_name');
  const logOut = () => {
    Cookies.remove('token', { path: '/' });
    Cookies.remove('user_id', { path: '/' });
    Cookies.remove('user_name', { path: '/' });
  
    
    navigate('/gabai/login');
  };
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
      <Link to="/gabai/news" className="nav-btn">אירועים</Link>
      <Link to="/gabai/times" className="nav-btn">זמנים</Link>  
      <Link to="/gabai/members" className="nav-btn">חברים </Link>
      <Link to="/gabai/donations" className="nav-btn">תרומות</Link>
      <Link to = "/gabai/gabais" className="nav-btn">גבאים</Link>
      {userName && <button className="user-name" onClick={logOut}>יציאה מ:{userName}</button>}
      <Outlet />
      <div className="footer-info">
        <p>בית כנסת חניכי הישיבות תל גיבורים בני ברק</p>
        <p>רחוב האצ"ל 13, בני ברק</p>
        <p>כתובת המייל: jbh0527174650@gmail.com</p>
        <p> פניות בנוגע לאתר: yedidya friedland</p>
      </div>
    </>
  );
};

export default NavbarG;