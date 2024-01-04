import React, { useState, useEffect } from 'react';
import axios from '../component/Axios';
import Donation from "./Donation";

const Donations = () => {
    const [donations, setDonations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // בקשת GET לשרת בעת טעינת הקומפוננטה
        axios.get('/donations')
            .then(response => {
                // עדכון הסטייט עם המידע מהשרת
                setDonations(response.data);
            })
            .catch(error => {
                // עדכון הסטייט בשגיאה אם קיימת
                setError('Error fetching data: ' + error.message);
            });
    }, []);

    return (
        <div className="all-donations-container">
            <h1>תרומות</h1>
            {error && <p>{error}</p>}
            {donations.map((donation, index) => (
                <Donation key={index} donation={donation} />
            ))}
        </div>
    );
};

export default Donations;
