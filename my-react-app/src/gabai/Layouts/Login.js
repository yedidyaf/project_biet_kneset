import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../../assets/css/Login.css'; 
import axios from '../component/Axios';
import Cookies from 'js-cookie'; 
const Login = () => {
  const [user_id, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    
    try {  
      const response = await axios.post('/api/gabai/login', 
       { user_id, password}
      );

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
      if(!error.response){
        console.error("אין תגובה מהשרת")
        setError('אין שרת');
      }else{
      console.error('שגיאה במהלך התחברות:', error.response.data.error);
      setError('בדוק אם הקוד ושם הגבאי נכונים, שגיאה במהלך התחברות:');
    }
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
            value={user_id}
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
