// DonationComponent.jsx
import React, { useState } from 'react';
import '../assets/css/Donations.css';
import Gallery from '../component/Gallery';
import Message from '../component/Message';

const Donation = ({ donation }) => {
  const [visible, setVisible] = useState(false);
  const text = donation.how;
  console.log(donation);
  return (
    <div className="donation-container">
      <div className="donation-header">
        <h2>{donation.title}</h2>
      </div>
      <div className="donation-content">
        <p>{donation.content}</p>
        
      </div>
      <div className="donation-images">
        {<Gallery images={[donation.images]}/>}
      </div>
      <button className="donate-button" onClick={()=>setVisible(true)}>אני מעוניין לתרום</button>
      <div>
      {visible && 
        <Message 
          message={text}
          onClose={() => setVisible(false)} 
        />
      }
    </div>
    </div>
  );
};

export default Donation;
