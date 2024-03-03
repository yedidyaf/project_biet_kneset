import React, { useState, useEffect } from 'react';
import axios from '../component/Axios';

import '../assets/css/Members.css';
import MemberForm from './MemberForm';

const Members = () => {
  const [membersData, setMembersData] = useState([]);
  const [error, setError] = useState(null);

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
  const addMembers=(newMembers)=>{
setMembersData([...membersData,newMembers])
  }

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
          {membersData&& membersData.map((member) => (
            <tr key={member.id}>
              <td>{member.is_v ? member.first_name: <>ממתין לאישור</>}</td>
              <td>{member.is_v && member.last_name}</td>
              <td>{member.is_v && member.email}</td>
              <td>{member.is_v && member.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <MemberForm addMembers={fetchMembersData}/>
    </div>
  );
};

export default Members;
