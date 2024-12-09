import React, { useState, useEffect } from 'react';
import axios from '../component/Axios';
import DonationGrid from '../../component/DonationGrid';
import DonationForm from "./DonationForm";
import { useNavigate } from 'react-router-dom';

const DonationsG = () => {
    const [donations, setDonations] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);
    const [isAdd, setIsAdd] = useState(false);
    const [filteredTransactions, setFilteredTransactions] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        if (transactions.length > 0 && donations.length > 0) {
            const grouped = donations.reduce((acc, category) => {
                acc[category.id] = transactions.filter(
                    trans => trans.category_id === category.id
                );
                return acc;
            }, {});
            setFilteredTransactions(grouped);
        }
    }, [transactions, donations]);

    useEffect(() => {
        fetchDonations();
        fetchTransactions();
    }, []);

    const fetchDonations = async () => {
        try {
            const response = await axios.get('/gabai/donations');
            setDonations(response.data);
            setError(null);
        } catch (error) {
            if(error.response?.data?.error === 'Authentication failed: Missing token') {
                navigate('/gabai/login');
            }
            setError('Error fetching data: ' + error.message);
        }
    };

    const fetchTransactions = async () => {
        try {
            console.log("שוךלח בקשה");
            
            const response = await axios.get('/gabai/donations/transactions');
            console.log("ehck ,aucv", response.data);
            
            setTransactions(response.data);
        } catch (error) {
            console.error('שגיאה בקבלת היסטוריית תרומות:', error);
        }
    };

    const handleFormSubmit = async (formData) => {
        try {
            const response = await axios.post('/gabai/donations', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            console.log('Server response:', response.data);
            fetchDonations();
            setIsAdd(false);
        } catch (error) {
            console.error('Error:', error);
            setError('שגיאה בהוספת קטגוריה');
        }
    };

    const handleDeleteClick = async (donationId) => {
        try {
            await axios.delete(`/gabai/donations/${donationId}`);
            fetchDonations();
        } catch (error) {
            console.error('שגיאה בביצוע מחיקת תרומה:', error);
        }
    };

    return (
        <div className="all-donations-container">
            <h1>ניהול קטגוריות תרומה</h1>
            <button 
                onClick={() => setIsAdd(!isAdd)}
                className="add-category-btn"
            >
                הוספת קטגוריה לתרומה
            </button>

            {isAdd && (
                <DonationForm
                    onFormSubmit={handleFormSubmit}
                    donations={donations}
                />
            )}

            {error && <p className="error-message">{error}</p>}
            
            <DonationGrid 
                categories={donations}
                isGabai={true}
                onDelete={handleDeleteClick}
                donations={filteredTransactions}
            />
        </div>
    );
};

export default DonationsG;