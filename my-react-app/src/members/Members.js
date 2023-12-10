// Members.jsx
import React from 'react';
import '../assets/css/Members.css';
import MemberForm from './MemberForm';

const Members = () => {
    const membersData = [
        {
          id: 1,
          ud: '001',
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@example.com',
          address: '123 Main St, Cityville',
        },
        {
          id: 2,
          ud: '002',
          first_name: 'Jane',
          last_name: 'Smith',
          email: 'jane.smith@example.com',
          address: '456 Oak St, Townsville',
        },
        {
          id: 3,
          ud: '003',
          first_name: 'Mike',
          last_name: 'Johnson',
          email: 'mike.johnson@example.com',
          address: '789 Pine St, Villagetown',
        }
      ];
      
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
          {membersData.map((member) => (
            <tr key={member.id}>
              
              <td>{member.first_name}</td>
              <td>{member.last_name}</td>
              <td>{member.email}</td>
              <td>{member.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <MemberForm/>
    </div>
  );
};

export default Members;
