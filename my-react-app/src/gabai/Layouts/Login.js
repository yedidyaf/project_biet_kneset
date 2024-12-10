import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../component/Axios';
import Cookies from 'js-cookie';
import '../../assets/css/Login.css'
const Login = () => {
  const [user_id, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/api/gabai/login', { user_id, password });

      if (response.status === 200) {
        Cookies.set('token', response.data.token, { expires: 1, path: '/' });
        Cookies.set('user_id', response.data.user_id, { expires: 1, path: '/' });
        const gabaiName = Cookies.get('user_id');
        Cookies.set('user_name', gabaiName, { expires: 1, path: '/' });
        navigate('/gabai/home');
      } else {
        setError('אין כזה גבאי כלל');
      }
    } catch (error) {
      if (!error.response) {
        setError('אין תגובה מהשרת');
      } else {
        setError('בדוק אם הקוד ושם הגבאי נכונים');
      }
    }
  };

  return (
    <div className="gabai-system__login-page">
      <div className="gabai-system__login-container">
        <div className="gabai-system__login-header">
          <h1 className="gabai-system__login-title">מערכת ניהול בית כנסת</h1>
          <h2 className="gabai-system__login-subtitle">כניסת גבאים</h2>
        </div>
        
        <form onSubmit={handleLogin} className="gabai-system__login-form">
          <div className="gabai-system__form-field">
            <label htmlFor="username" className="gabai-system__input-label">
              שם משתמש
            </label>
            <input
              id="username"
              type="text"
              value={user_id}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="הכנס שם משתמש"
              required
              className="gabai-system__input-field"
            />
          </div>

          <div className="gabai-system__form-field">
            <label htmlFor="password" className="gabai-system__input-label">
              סיסמה
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="הכנס סיסמה"
              required
              className="gabai-system__input-field"
            />
          </div>

          {error && (
            <div className="gabai-system__error-message">
              {error}
            </div>
          )}

          <button type="submit" className="gabai-system__submit-button">
            כניסה למערכת
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;