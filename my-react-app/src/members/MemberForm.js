// MemberForm.jsx
import React, { useState } from 'react';
import '../assets/css/MemberForm.css';

const MemberForm = ({ onAddMember }) => {
  const [memberData, setMemberData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMemberData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // בכאן תוכל להוסיף לוגיקה נוספת לטיפול בכפתור שלח
    onAddMember(memberData);
    // אפשר גם לאפס את הטופס לאחר הוספה
    setMemberData({
      first_name: '',
      last_name: '',
      email: '',
      address: '',
    });
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
    </form>
  </div>);
};

export default MemberForm;
