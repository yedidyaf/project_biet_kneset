import React, { useState, useEffect } from 'react';
import axios from '../../component/Axios'; // ייתכן שיהיה צורך להתקין את הספריה עם npm install axios

import '../../assets/css/Members.css';
import MemberFormG from './MemberFormG';

const MembersG = () => {
  const [membersData, setMembersData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {

    fetchMembersData();
  }, []);

  const fetchMembersData = async () => {
    try {
      const response = await axios.get('/members'); // ניחוש: /members הוא הניתוב הנכון לשרת שלך
      console.log(response);
      setMembersData(response.data);
    } catch (error) {
      console.error(error);
      setError('אירעה שגיאה בטעינת המידע. נסה שוב מאוחר יותר.');
    }
  };
  const addMembers = (newMembers) => {
    setMembersData((prev) => [...prev, newMembers])
  }


  const handleAddition = async (memberId) => {
    try {
      // שלח בקשת PUT לשרת לפי המזהה memberId
      const response = await axios.put(`/gabai/members/${memberId}`);
      // עדכן את המידע ברשימת הגבאים
      fetchMembersData();
      setMembersData((prevData) => {
        return prevData.map((member) => {
          if (member.id === memberId) {
            

            return { ...member, /* נתונים חדשים מהתשובה */ };
          }
          return member;
        });
      });
    } catch (error) {
      console.error(error);
      setError('אירעה שגיאה בהוספת הגבאי. נסה שוב מאוחר יותר.');
    }
  };

  const handleDeletion = async (memberId) => {
    // כאן תוכל להוסיף לוגיקת אישור מחיקה
    const isConfirmed = window.confirm('האם אתה בטוח שאתה רוצה למחוק את החבר?');
    if (!isConfirmed) {
      return;
    }

    try {
      // שלח בקשת DELETE לשרת לפי המזהה memberId
      const response = await axios.delete(`/gabai/members/${memberId}`);
      // עדכן את המידע ברשימת הגבאים
      setMembersData((prevData) => {
        return prevData.filter((member) => member.id !== memberId);
      });
    } catch (error) {
      console.error(error);
      setError('אירעה שגיאה במחיקת הגבאי. נסה שוב מאוחר יותר.');
    }
  };
  return (
    <div className="members-container">
      <h1>חברי בית הכנסת</h1>
      <table className="members-table">
        <thead>
          <tr>
            <th>שם</th>
            <th>משפחה</th>
            <th>Email</th>
            <th>כתובת</th>
          </tr>
        </thead>
        <tbody>
          {membersData && membersData.map((member) => (
            <tr key={member.id} style={!member.is_v ? { color: 'red' } : null}>
              <td >{member.first_name}</td>
              <td>{member.last_name}</td>
              <td>{member.email}</td>
              <td>{member.address}</td>
              <td>
                {!member.is_v && (
                  <>
                    <button onClick={() => handleAddition(member.id)}>
                      אשר הוספה
                    </button></>)}
                <button onClick={() => handleDeletion(member.id)}>
                  מחיקה
                </button>
                <></>


              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <MemberFormG addMembers={addMembers} />
    </div>
  );
};

export default MembersG;
