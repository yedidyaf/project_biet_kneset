import React, { useState, useEffect } from 'react';
import axios from '../component/Axios';
import MemberForm from './MemberForm';
import "../../src/assets/css/Members.css"
const Members = () => {
  const [membersData, setMembersData] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchMembersData();
  }, []);

  const fetchMembersData = async () => {
    try {
      const response = await axios.get('/members');
      console.log(response);
      setMembersData(response.data);
    } catch (error) {
      console.error(error);
      setError('אירעה שגיאה בטעינת המידע. נסה שוב מאוחר יותר.');
    }
  };

  const addMember = (newMember) => {
    setMembersData([...membersData, newMember]);
  };

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="members-container">
      <h1 className="members-title">חברי בית הכנסת</h1>
      
      <table className="members-table">
        <thead>
          <tr className="table-header">
            <th className="table-header-cell">שם</th>
            <th className="table-header-cell">משפחה</th>
          </tr>
        </thead>
        <tbody>
          {membersData && membersData.map((member) => (
            <tr key={member.id} className="table-row">
              <td className="table-cell">
                {member.is_v ? member.first_name : <>ממתין לאישור</>}
              </td>
              <td className="table-cell">
                {member.is_v && member.last_name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {error && <p className="error-message">{error}</p>}
      
      <button className="add-member-button" onClick={handleShowForm}>
        {showForm ? 'סגור' : 'הוסף חבר חדש'}
      </button>

      {showForm && <MemberForm addMembers={fetchMembersData} />}
    </div>
  );
};

export default Members;
