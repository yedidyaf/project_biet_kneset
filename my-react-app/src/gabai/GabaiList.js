import React, { useState, useEffect } from 'react';
import axios from './component/Axios';
import { useNavigate } from 'react-router-dom';
import '../assets/css/GabaiList.css'

const GabaiList = () => {
    const navigate = useNavigate();
    const [gabais, setGabais] = useState([]);
    const [newGabai, setNewGabai] = useState({ name: '', email: '', password: '' });
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [deleteDialog, setDeleteDialog] = useState({
        isOpen: false,
        gabaiToDelete: null
    });

    useEffect(() => {
        fetchGabais();
    }, []);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && deleteDialog.isOpen) {
                closeDeleteDialog();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [deleteDialog.isOpen]);

    const fetchGabais = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('/gabai/gabais');
            setGabais(response.data);
        } catch (error) {
            console.error('שגיאה בקריאה לרשימת הגבאים:', error);
            if(error.response?.data?.error === 'Authentication failed: Missing token'){
                navigate('/gabai/login');
            }
            setErrors({ general: 'שגיאה בטעינת רשימת הגבאים' });
        } finally {
            setIsLoading(false);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!newGabai.name.trim()) {
            newErrors.name = 'שם הגבאי הוא שדה חובה';
        }
        
        if (!newGabai.email.trim()) {
            newErrors.email = 'כתובת המייל היא שדה חובה';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newGabai.email)) {
            newErrors.email = 'כתובת המייל אינה תקינה';
        }
        
        if (!newGabai.password) {
            newErrors.password = 'הסיסמה היא שדה חובה';
        } else if (newGabai.password.length < 6) {
            newErrors.password = 'הסיסמה חייבת להכיל לפחות 6 תווים';
        }
        
        if (!password2) {
            newErrors.password2 = 'אנא אשר את הסיסמה';
        } else if (password2 !== newGabai.password) {
            newErrors.password2 = 'הסיסמאות אינן תואמות';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const clearForm = () => {
        setNewGabai({ name: '', email: '', password: '' });
        setPassword2('');
        setErrors({});
    };

    const handleAdd = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.post('/gabai/gabais', JSON.stringify(newGabai));
            
            if (response.statusText === 'OK') {
                await fetchGabais();
                clearForm();
                setSuccessMessage('הגבאי נוסף בהצלחה');
                setTimeout(() => setSuccessMessage(''), 3000);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'שגיאה בהוספת הגבאי. אנא נסה שוב.';
            setErrors({ general: errorMessage });
            
            if (error.response?.status === 409) {
                setErrors({ email: 'כתובת המייל כבר קיימת במערכת' });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const openDeleteDialog = (gabai) => {
        setDeleteDialog({
            isOpen: true,
            gabaiToDelete: gabai
        });
    };

    const closeDeleteDialog = () => {
        setDeleteDialog({
            isOpen: false,
            gabaiToDelete: null
        });
    };

    const handleDelete = async () => {
        if (!deleteDialog.gabaiToDelete) return;

        try {
            setIsLoading(true);
            await axios.delete(`/gabai/gabais/${deleteDialog.gabaiToDelete.id}`);
            await fetchGabais();
            setSuccessMessage('הגבאי נמחק בהצלחה');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            setErrors({ 
                general: error.response?.data?.message || 'שגיאה במחיקת הגבאי. אנא נסה שוב.' 
            });
        } finally {
            setIsLoading(false);
            closeDeleteDialog();
        }
    };

    return (
        <div className="gabais-list-container">
            <h2 className="gabais-list-title">רשימת גבאים</h2>
            
            {successMessage && (
                <div className="success-message">
                    {successMessage}
                </div>
            )}

            {errors.general && (
                <div className="error-message">
                    {errors.general}
                </div>
            )}

            {isLoading && (
                <div className="loading-spinner">
                    <div className="spinner"></div>
                </div>
            )}

            <div className="gabais-grid">
                {gabais.map((gabai) => (
                    <div key={gabai.id} className="gabai-card">
                        <div className="gabai-info">
                            <h3>{`הרב ${gabai.user_id} ${gabai.last_name} שליט"א`}</h3>
                            <p className="email">{gabai.email}</p>
                        </div>
                        <button 
                            className="delete-gabay-button"
                            onClick={() => openDeleteDialog(gabai)}
                            disabled={isLoading}
                        >
                            מחק 🗑️
                        </button>
                    </div>
                ))}
            </div>

            <div className="add-gabai-form">
                <h3>הוספת גבאי חדש</h3>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="הכנס שם גבאי חדש"
                        value={newGabai.name}
                        onChange={(e) => {
                            setNewGabai({ ...newGabai, name: e.target.value });
                            setErrors({ ...errors, name: '' });
                        }}
                        className={errors.name ? 'error' : ''}
                    />
                    {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <input
                        type="email"
                        placeholder="הכנס כתובת מייל של גבאי שקיים בחברי בית כנסת"
                        value={newGabai.email}
                        onChange={(e) => {
                            setNewGabai({ ...newGabai, email: e.target.value });
                            setErrors({ ...errors, email: '' });
                        }}
                        className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        placeholder="בחר סיסמא"
                        value={newGabai.password}
                        onChange={(e) => {
                            setNewGabai({ ...newGabai, password: e.target.value });
                            setErrors({ ...errors, password: '' });
                        }}
                        className={errors.password ? 'error' : ''}
                    />
                    {errors.password && <span className="error-text">{errors.password}</span>}
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        placeholder="חזור על הסיסמא"
                        value={password2}
                        onChange={(e) => {
                            setPassword2(e.target.value);
                            setErrors({ ...errors, password2: '' });
                        }}
                        className={errors.password2 ? 'error' : ''}
                    />
                    {errors.password2 && <span className="error-text">{errors.password2}</span>}
                </div>

                <div className="form-actions">
                    <button 
                        onClick={handleAdd} 
                        className="add-gabai-button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'מוסיף...' : 'הוסף גבאי'}
                    </button>
                    {Object.keys(newGabai).some(key => newGabai[key]) && (
                        <button 
                            onClick={clearForm}
                            className="clear-form-button"
                            type="button"
                            disabled={isLoading}
                        >
                            נקה טופס
                        </button>
                    )}
                </div>
            </div>

            {deleteDialog.isOpen && (
                <div className="modal-overlay" onClick={closeDeleteDialog}>
                    <div className="delete-dialog" onClick={e => e.stopPropagation()}>
                        <h3>אישור מחיקת גבאי</h3>
                        <p>
                            האם אתה בטוח שברצונך למחוק את הגבאי
                            <strong>{` ${deleteDialog.gabaiToDelete?.user_id} ${deleteDialog.gabaiToDelete?.last_name} `}</strong>
                            ?
                        </p>
                        <div className="dialog-buttons">
                            <button 
                                className="cancel-button"
                                onClick={closeDeleteDialog}
                                disabled={isLoading}
                            >
                                ביטול
                            </button>
                            <button 
                                className="confirm-delete-button"
                                onClick={handleDelete}
                                disabled={isLoading}
                            >
                                {isLoading ? 'מוחק...' : 'מחק'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GabaiList;