import React, { useState, useEffect } from 'react';
import axios from '../component/Axios';
import Donation from './Donation';  // שינוי מ-DonationGrid ל-Donation
import PayPalPaymentComponent from './PayPalPayment';
import '../assets/css/Donations.css'

const Donations = () => {
    const [donations, setDonations] = useState([]);
    const [error, setError] = useState(null);
    const [showPayment, setShowPayment] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [amount, setAmount] = useState('');

    useEffect(() => {
        axios.get('/donations')
            .then(response => {
                setDonations(response.data);
            })
            .catch(error => {
                setError('Error fetching data: ' + error.message);
            });
    }, []);

    const handlePaymentSuccess = (details) => {
        console.log('תשלום הושלם בהצלחה', details);
        axios.post('/donations/transactions', {
            categoryId: selectedCategory,
            amount: amount,
            paymentId: details.id
        }).then(() => {
            setShowPayment(false);
        }).catch(error => {
            console.error('שגיאה בשמירת התרומה', error);
        });
    };

    return (
        <div className="all-donations-container">
            <h1>תרומות</h1>
            {error && <p>{error}</p>}
            
            {donations.map((donation) => (
                <Donation
                    key={donation.id}
                    donation={donation}
                    onShowPayment={(defaultAmount) => {
                        setSelectedCategory(donation.id);
                        setAmount(defaultAmount);
                        setShowPayment(true);
                    }}
                />
            ))}

            {showPayment && (
                <PayPalPaymentComponent
                    amount={amount}
                    onSuccess={handlePaymentSuccess}
                    onError={(error) => console.error('שגיאה בתשלום:', error)}
                    onClose={() => setShowPayment(false)}
                />
            )}
        </div>
    );
};

export default Donations;