import React, { useState, useEffect } from 'react';
import axios from './component/Axios';
import '../assets/css/GabaiList.css'
import { useNavigate } from 'react-router-dom';

const GabaiList = () => {
    const navigate = useNavigate();

    const [gabais, setGabais] = useState([]);
    const [newGabai, setNewGabai] = useState({ name: '', email: '', password: '' });
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');

    const fetchGabais = async () => {
        try {
            const response = await axios.get('/gabai/gabais');
            console.log(response.data);
            setGabais(response.data);
        } catch (error) {
            console.error('שגיאה בקריאה לרשימת הגבאים:', error);
            if(error.response.data.error==='Authentication failed: Missing token'){
                navigate('/gabai/login');
              }
        }
    };

    const addGabai = async () => {
        if (password2 !== newGabai.password) {
            setError('הסיסמאות אינן תואמות')
            setPassword2('');
            setNewGabai({ ...newGabai, password: '' })
            return
        }

        try {
            const response = await axios.post('/gabai/gabais', JSON.stringify(newGabai));
            console.log(response);
            if (response.statusText === 'OK') {

                fetchGabais();

                setNewGabai({ name: '', email: '',password:'' });

                setPassword2('')
            } else {
                console.error('שגיאה בהוספת גבאי:', response.statusText);
            }
        } catch (error) {
            console.error('שגיאה בהוספת גבאי:', error);
        }
    };
    const handleDelete = async (id) => {
        console.log(id);
        try {
            await axios.delete(`/gabai/gabais/${id}`);
            fetchGabais()
        } catch (error) {
            setError(error);
        }

    }
    useEffect(() => {
        fetchGabais();
    }, []);

    return (
        <div className="gabais-list-container">
            <h2 className="gabais-list-title">רשימת גבאים</h2>
            <ul className="gabais-list">
                {gabais.map((gabai) => (
                    <li key={gabai.id+new Date()} className="gabai-item">
                        <strong>שם הגבאי:</strong> {`הרב ${gabai.user_id} ${gabai.last_name} שליט"א`}<br />
                        <strong>Email:</strong> {gabai.email}<br />
                        <button className="delete-button" onClick={() => handleDelete(gabai.id)}>
                            🗑️
                        </button>
                        <hr className="gabai-divider" />
                    </li>
                ))}
            </ul>
            <div className="add-gabai-form">
                <input
                    type="text"
                    placeholder="הכנס שם גבאי חדש"
                    value={newGabai.name}
                    onChange={(e) => setNewGabai({ ...newGabai, name: e.target.value })}
                />
                <input
                    type="email"
                    placeholder=" הכנס כתובת מייל של גבאי שקיים בחברי בית כנסת"
                    value={newGabai.email}
                    onChange={(e) => setNewGabai({ ...newGabai, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="בחר סיסמא"
                    value={newGabai.password}
                    onChange={(e) => {
                        setNewGabai({ ...newGabai, password: e.target.value });
                        setError(null)
                    }}
                />
                <input
                    type="password"
                    placeholder="חזור על הסיסמא"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                />
                <br></br>
                <button onClick={addGabai} className="add-gabai-button">הוסף גבאי</button>
                {error && <div className="login-error">{error}</div>}
            </div>
        </div>
    );
};

export default GabaiList;
