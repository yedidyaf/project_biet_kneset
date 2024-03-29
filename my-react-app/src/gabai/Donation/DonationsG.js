import React, { useState, useEffect } from 'react';
import axios from '../component/Axios';
import DonationG from "./DonationG";
import DonationForm from "./DonationForm";
import { useNavigate } from 'react-router-dom';

const DonationsG = () => {
    const [donations, setDonations] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [selectedDonationId, setSelectedDonationId] = useState(null);
    const [isAdd, setIsAdd] = useState(false)
    useEffect(() => {
        axios.get('/gabai/donations')
            .then(response => {
                
                
            
                setDonations(response.data);
                setError(null)
            })
            .catch(error => {
                if(error.response.data.error==='Authentication failed: Missing token'){
                    navigate('/gabai/login');
                  }
                console.log(error);
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
    const response = await axios.post('http://localhost:4000/gabai/donations', data,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response.data);
    fetchDonations();
  } catch (error) {
    console.error('שגיאה בשליחת בקשת עריכה/הוספה/מחיקה:', error);
  } finally {
    setIsAdd(false);
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
