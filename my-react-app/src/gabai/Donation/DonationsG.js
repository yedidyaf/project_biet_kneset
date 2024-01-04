import React, { useState, useEffect } from 'react';
import axios from '../../component/Axios';
import DonationG from "./DonationG";
import DonationForm from "./DonationForm";

const DonationsG = () => {
    const [donations, setDonations] = useState([]);
    const [error, setError] = useState(null);

    const [selectedDonationId, setSelectedDonationId] = useState(null);
    const [isAdd, setIsAdd] = useState(false)
    useEffect(() => {
        // בקשת GET לשרת בעת טעינת הקומפוננטה
        axios.get('/gabai/donations')
            .then(response => {
                console.log(response);
                // עדכון הסטייט עם המידע מהשרת
                setDonations(response.data);
                setError(null)
            })
            .catch(error => {
                // עדכון הסטייט בשגיאה אם קיימת
                setError('Error fetching data: ' + error.message);
            });
    }, []);

    const handleEditClick = (donationId) => {
        setSelectedDonationId(donationId);
    };

    const handleAddClick = () => {
        setIsAdd(() => !isAdd)
        setSelectedDonationId(null);
    };

    const handleFormSubmit = async (method, id, data) => {
        console.log(data);
        try {
            const response = await fetch('http://localhost:4000/gabai/donations', {
                method: 'POST',
                body: data,
            })

            console.log(response);
            fetchDonations();
        } catch (error) {
            console.error('שגיאה בשליחת בקשת עריכה/הוספה/מחיקה:', error);
        } finally {
            setIsAdd(false)
            setSelectedDonationId(null);
        }
    };

    const fetchDonations = async () => {
        try {
            const response = await axios.get('/gabai/donations');
            setDonations(response.data);
        } catch (error) {
            console.error('שגיאה בקבלת רשימת התרומות:', error);
        }
    };

    const handleDeleteClick = async (donationId) => {
        try {
            // בקשת DELETE לשרת
            const response = await axios.delete(`/gabai/donations/${donationId}`);
            console.log(response);
            fetchDonations();
        } catch (error) {
            console.error('שגיאה בביצוע מחיקת תרומה:', error);
        }
    };
    return (
        <div className="all-donations-container">
            <h1>תרומות</h1>
            <button onClick={handleAddClick}>הוספת קטגוריה לתרומה</button> 
            {isAdd ? (
                <DonationForm
                    selectedDonationId={selectedDonationId}
                    onFormSubmit={handleFormSubmit}
                    donations={donations}
                />
            ) : <></>}
            {error && <p>{error}</p>}
            {donations.map((donation, index) => (
                <DonationG
                    key={index}
                    donation={donation}
                    onEditClick={handleEditClick}
                    onDeleteClick={handleDeleteClick}
                />
            ))}


           
        </div>
    );
};

export default DonationsG;
