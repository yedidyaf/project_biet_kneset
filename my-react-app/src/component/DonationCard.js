import React, { useState, useEffect } from 'react';
import axios from '../component/Axios';
import '../assets/css/DonationCard.css';
const DonationCard = ({
  category,
  isGabai = false,
  onDelete,
  onShowPayment,
  donations = [],
}) => {
  const [showHistory, setShowHistory] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      if (category.images) {
        try {
          const response = await axios.get('/api/getImage', {
            params: { path: category.images },
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
    const getTotalDonations = () => {
      return donations.reduce((sum, d) => sum + Number(d.amount), 0);
    };

    // ניקוי ה-URL בעת הסרת הקומפוננטה
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [category.images]);

  const getTotalDonations = () => {
    return donations.reduce((sum, d) => sum + Number(d.amount), 0);
  };

  return (
    <div className="donation-card">
      <div className="donation-card-header">
        <h3>{category.title}</h3>
        {isGabai && (
          <div className="donation-card-actions">
            <button
              className="delete-btn"
              onClick={() => onDelete(category.id)}
            >
              מחק קטגוריה
            </button>
            <button
              className="history-btn"
              onClick={() => setShowHistory(!showHistory)}
            >
              {showHistory ? 'הסתר היסטוריה' : 'הצג היסטוריה'}
            </button>
          </div>
        )}
      </div>

      <div className="donation-card-content">
        <p>{category.content}</p>
      </div>

      <div className="donation-card-image">
        {loading ? (
          <div className="loading">טוען תמונה...</div>
        ) : (
          imageUrl && <img src={imageUrl} alt={category.title} />
        )}
      </div>

      {isGabai ? (
        <div className="donation-card-summary">
          <div className="donation-stats">
            <p>סכום ברירת מחדל: ₪{category.default_amount}</p>
            <p>סה"כ תרומות: ₪{getTotalDonations()}</p>
          </div>

          {showHistory && (
            <div className="donation-history">
              <h4>היסטוריית תרומות</h4>
              <div className="donation-table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>תאריך</th>
                      <th>סכום</th>
                      <th>מזהה תשלום</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donations.map((donation, idx) => (
                      <tr key={idx}>
                        <td>{new Date(donation.donation_date).toLocaleDateString()}</td>
                        <td>₪{donation.amount}</td>
                        <td>{donation.payment_id}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="donation-card-actions">
          <span className="default-amount">₪{category.defaultAmount}</span>
          <button
            className="donate-btn"
            onClick={() => onShowPayment(category.id, category.defaultAmount)}
          >
            תרומה מאובטחת
          </button>
        </div>
      )}
    </div>
  );
};

export default DonationCard;