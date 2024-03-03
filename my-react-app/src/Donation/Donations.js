import React, { useState, useEffect } from 'react';
import axios from '../component/Axios';
import Donation from "./Donation";

const Donations = () => {
    const [donations, setDonations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/donations')
            .then(response => {
                setDonations(response.data);
            })
            .catch(error => {
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
