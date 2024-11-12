// DonationComponent.jsx
import React, { useState } from 'react';
// import '../assets/css/Donations.css';
import Gallery from '../component/Gallery';
import Message from '../component/Message';
import PayPalPaymentComponent from './PayPalPayment';

const Donation = ({ donation }) => {
  const [visible, setVisible] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [amount, setAmount] = useState('36');
  const text = donation.how;

  const handlePaymentSuccess = (details) => {
    console.log('תשלום הושלם בהצלחה', details);
    setShowPayment(false);
    // כאן תוכל להוסיף לוגיקה נוספת, כמו עדכון השרת על התרומה
  };

  const handlePaymentError = (error) => {
    console.error('שגיאה בתשלום', error);
    // כאן תוכל להוסיף טיפול בשגיאות
  };

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
      <input 
        type="number" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
        placeholder="סכום לתרומה"
      />
      <button className="donate-button" onClick={() => setShowPayment(true)}>אני מעוניין לתרום</button>
      <div>
        {visible && (
          <Message
            message={text}
            onClose={() => setVisible(false)}
          />
        )}
        {showPayment && (
          <PayPalPaymentComponent
            amount={amount}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
            onClose={() => setShowPayment(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Donation;