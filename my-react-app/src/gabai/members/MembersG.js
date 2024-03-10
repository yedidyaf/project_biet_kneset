import React, { useState, useEffect } from 'react';
import axios from '../component/Axios'; 

import '../../assets/css/Members.css';
import MemberFormG from './MemberFormG';
import { useNavigate } from 'react-router-dom';

const MembersG = () => {
  const navigate = useNavigate();

  const [membersData, setMembersData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {

    fetchMembersData();
  }, []);

  const fetchMembersData = async () => {
    try {
      const response = await axios.get('/gabai/members');
      setMembersData(response.data);
    } catch (error) {
      console.error('Error fetching article:', error);
    
        if (error.response && error.response.data && error.response.data.error) {
          const errorMessage = error.response.data.error;
    
          if (errorMessage === 'Authentication failed: Missing token') {
            console.log(errorMessage);
            navigate('/gabai/login');
          } else if (errorMessage === 'Forbidden: Invalid role') {
            console.log(errorMessage);
            navigate('/gabai/login');
          } else {
            console.log(errorMessage);
            navigate('/gabai/login');

          }
        } 
      console.error(error);
      if(error.response.data.error==='Authentication failed: Missing token'){
        navigate('/gabai/login');
      }
      setError('אירעה שגיאה בטעינת המידע. נסה שוב מאוחר יותר.');
    }
  };
  const addMembers = (newMembers) => {
fetchMembersData() 
 }


  const handleAddition = async (memberId) => {
    try {
      const response = await axios.put(`/gabai/members/${memberId}`);
      fetchMembersData();
      setMembersData((prevData) => {
        return prevData.map((member) => {
          if (member.id === memberId) {
            
            return { ...member };
          }
          return member;
        });
      });
    } catch (error) {
      console.error(error);
      setError('אירעה שגיאה בהוספת הגבאי. נסה שוב מאוחר יותר.');
      console.error('Error fetching article:', error);
    
        if (error.response && error.response.data && error.response.data.error) {
          const errorMessage = error.response.data.error;
    
          if (errorMessage === 'Authentication failed: Missing token') {
            console.log(errorMessage);
            navigate('/gabai/login');
          } else if (errorMessage === 'Forbidden: Invalid role') {
            console.log(errorMessage);
            navigate('/gabai/login');
          } else {
            console.log(errorMessage);
            navigate('/gabai/login');

          }
        } 
    }
  };

  const handleDeletion = async (memberId) => {
    const isConfirmed = window.confirm('האם אתה בטוח שאתה רוצה למחוק את החבר?');
    if (!isConfirmed) {
      return;
    }

    try {
      const response = await axios.delete(`/gabai/members/${memberId}`);
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
