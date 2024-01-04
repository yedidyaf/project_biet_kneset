import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // הייבוא עודכן
import '../../assets/css/Login.css'; 
import axios from '../../component/Axios';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // שימוש עודכן

  const handleLogin = async () => {
    try {
      // הוסף קוד לשליחת בקשה לשרת לבדיקת משתמש
      // נניח שיש נתיב '/api/login' בשרת שצפה לקבל נתונים בפורמט JSON
      const response = await axios('/api/gabai/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // אם התחברות מוצלחת, מעביר לעמוד הבית של הגבאי
        navigate('/gabai/home');
      } else {
        // אם אין משתמש, תציג הודעת שגיאה
        setError('אין כזה גבאי כלל');
      }
    } catch (error) {
      console.error('שגיאה במהלך התחברות:', error.response.data.error);
      setError('בדוק אם הקוד ושם הגבאי נכונים, שגיאה במהלך התחברות:');
    }
  };

  return (
    <div className="login-container">
      <h2>כניסה למערכת</h2>
      <form className="login-form">
        <label>
          שם משתמש:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />
        </label>
        <br />
        <label>
          סיסמה:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
        </label>
        <br />
        <button type="button" onClick={handleLogin} className="login-button">
          שליחה
        </button>
      </form>
      {error && <div className="login-error">{error}</div>}
    </div>
  );
};

export default Login;
