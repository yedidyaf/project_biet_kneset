import React, { useState } from 'react';
import '../../assets/css/Donations.css';
import Gallery from '../../component/Gallery';
import Message from '../../component/Message';

const DonationG = ({ donation, onEditClick, onDeleteClick }) => {

const [visible, setVisible] = useState(false);
  const text = donation.how;
  return (
    <div className="donation-container">
      <div className="donation-header">
        <h2>{donation.title}</h2>
        <div className="donation-buttons">
          <button onClick={() => onDeleteClick(donation.id)}>מחק קטגוריה</button>
        </div>
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

export default DonationG;
