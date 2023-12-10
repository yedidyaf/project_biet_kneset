// DonationComponent.jsx
import React from 'react';
import '../assets/css/Donations.css';
import Gallery from '../component/Gallery';

const Donation = ({ donation }) => {
  return (
    <div className="donation-container">
      <div className="donation-header">
        <h2>{donation.title}</h2>
      </div>
      <div className="donation-content">
        <p>{donation.content}</p>
        <p>How: {donation.how}</p>
      </div>
      <div className="donation-images">
        {<Gallery images={donation.images}/>}
      </div>
      <button className="donate-button">תרומה</button>
    </div>
  );
};

export default Donation;
