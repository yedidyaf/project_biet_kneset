import React, { useState, useEffect } from 'react';
import axios from '../component/Axios';

const Donation = ({ donation, onShowPayment }) => {
  const [amount, setAmount] = useState(donation.default_amount || '36');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      if (donation.images) {
        try {
          const response = await axios.get('/api/getImage', {
            params: { path: donation.images },
            responseType: 'arraybuffer',
          });
          const imageUrl = URL.createObjectURL(
            new Blob([response.data], { type: 'image/png' })
          );
          setImageUrl(imageUrl);
        } catch (error) {
          console.error('שגיאה בטעינת התמונה:', error);
        }
      }
      setLoading(false);
    };

    fetchImage();

    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [donation.images]);

  return (
    <div className="donation-container">
      <div className="donation-image">
        {loading ? (
          <div className="loading">טוען תמונה...</div>
        ) : (
          imageUrl && <img src={imageUrl} alt={donation.title} />
        )}
      </div>
      <div className="donation-content-wrapper">
        <div className="donation-header">
          <h2>{donation.title}</h2>
        </div>
        <div className="donation-content">
          <p>{donation.content}</p>
        </div>
        <div className="donation-actions">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="סכום לתרומה"
            min={donation.default_amount}
          />
          <button
            className="donate-button"
            onClick={() => onShowPayment(amount)}
          >
            תרומה       </button>
        </div>
      </div>
    </div>
  );
};

export default Donation;