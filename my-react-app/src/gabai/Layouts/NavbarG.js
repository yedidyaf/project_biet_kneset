import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import '../../assets/css/Navbar.css';
import logo from './logoImage.jpg';
import Cookies from 'js-cookie';
const NavbarG = () => {
  const navigate = useNavigate();
  const userName = Cookies.get('user_name');
  console.log(userName);
  const logOut = () => {
    // מסירה את הטוקן מהקובץ cookie
    Cookies.remove('token', { path: '/' });
    // מסירה את ה user_id מהקובץ cookie
    Cookies.remove('user_id', { path: '/' });
    // מסירה את ה user_name מהקובץ cookie
    Cookies.remove('user_name', { path: '/' });
  
    // הובילות את המשתמש לעמוד התחברות
    
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
    </>
  );
};

export default NavbarG;