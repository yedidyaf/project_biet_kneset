// MemberForm.jsx
import React, { useState } from 'react';
import '../../assets/css/MemberForm.css';
import axios from '../../component/Axios';


const MemberFormG = ({addMembers}) => {
  const [memberData, setMemberData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    address: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMemberData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

const jsonMembersData = JSON.stringify(memberData)
console.log(jsonMembersData);
    try {
      const response = await axios.post('/gabai/members',jsonMembersData );
      addMembers(response)
      console.log('Response from server:', response.data);

      
      
      setMemberData({
        first_name: '',
        last_name: '',
        email: '',
        address: '',
      });
    } catch (error) {
      console.error('Error adding member:', error);
      
      // טיפול בשגיאה מהשרת
      if (error.response) {
        // השגיאה מכילה תגובה מהשרת עם קוד HTTP וגוף התגובה
        setError(`Error: ${error.response.status} - ${error.response.data.message}`);
      } else if (error.request) {
        // אין תגובה מהשרת
        setError('No response from server');
      } else {
        // שגיאה בזמן יצירת הבקשה
        setError(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div>
        <h1>הוספת חבר</h1>
    <form className="member-form" onSubmit={handleSubmit}>
      <label>
        שם:
        <input
          type="text"
          name="first_name"
          value={memberData.first_name}
          onChange={handleChange}
        />
      </label>
      <label>
        משפחה:
        <input
          type="text"
          name="last_name"
          value={memberData.last_name}
          onChange={handleChange}
        />
      </label>
      <label>
        אימייל:
        <input
          type="email"
          name="email"
          value={memberData.email}
          onChange={handleChange}
        />
      </label>
      <label>
        כתובת:
        <input
          type="text"
          name="address"
          value={memberData.address}
          onChange={handleChange}
        />
      </label>
      <button type="submit">שלח</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  </div>);
};

export default MemberFormG;
