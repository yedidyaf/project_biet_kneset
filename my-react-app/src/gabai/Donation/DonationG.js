import React, { useState } from 'react';
import Gallery from '../../component/Gallery';
import Message from '../../component/Message';
import PayPalPaymentComponent from '../../Donation/PayPalPayment';

const DonationG = ({ donation, onEditClick, onDeleteClick }) => {
  const [visible, setVisible] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [amount, setAmount] = useState('');
  const [donations, setDonations] = useState([]);
  const [showDonationHistory, setShowDonationHistory] = useState(false);
  const text = donation.how;

  const handlePaymentSuccess = (details) => {
    const newDonation = {
      amount: details.purchase_units[0].amount.value,
      date: new Date().toLocaleString(),
      paymentId: details.id
    };
    setDonations([...donations, newDonation]);
    setShowPayment(false);
    // כאן אפשר להוסיף שליחה לשרת
  };

  const handlePaymentError = (error) => {
    console.error('שגיאה בתשלום:', error);
    // טיפול בשגיאות
  };

  const getDonationTotal = () => {
    return donations.reduce((total, donation) => total + Number(donation.amount), 0);
  };

  return (
    <div className="donation-container">
      <div className="donation-header">
        <h2>{donation.title}</h2>
        <div className="donation-buttons">
          <button 
            onClick={() => onDeleteClick(donation.id)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            מחק קטגוריה
          </button>
          <button 
            onClick={() => setShowDonationHistory(!showDonationHistory)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded ml-2"
          >
            {showDonationHistory ? 'הסתר היסטוריה' : 'הצג היסטוריית תרומות'}
          </button>
        </div>
      </div>

      <div className="donation-content">
        <p>{donation.content}</p>
        <div className="donation-stats mt-4">
          <p className="font-bold">סה"כ תרומות: ₪{getDonationTotal()}</p>
        </div>
      </div>

      {showDonationHistory && (
        <div className="donation-history mt-4">
          <h3 className="text-xl font-bold mb-2">היסטוריית תרומות</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">תאריך</th>
                  <th className="border p-2">סכום</th>
                  <th className="border p-2">מזהה תשלום</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation, index) => (
                  <tr key={index}>
                    <td className="border p-2">{donation.date}</td>
                    <td className="border p-2">₪{donation.amount}</td>
                    <td className="border p-2">{donation.paymentId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="donation-images">
        {<Gallery images={[donation.images]}/>}
      </div>

      <div className="donation-payment mt-4">
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          placeholder="סכום לתרומה"
          className="border p-2 rounded mr-2"
        />
        <button 
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => setShowPayment(true)}
        >
          תרומה מאובטחת
        </button>
      </div>

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

export default DonationG;