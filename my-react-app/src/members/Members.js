import React, { useState, useEffect } from 'react';
import axios from '../component/Axios';
import MemberForm from './MemberForm';
import SearchMembers from './SearchMembers';
import "../../src/assets/css/Members.css"

const Members = () => {
  const [membersData, setMembersData] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMembersData();
  }, []);

  const fetchMembersData = async () => {
    try {
      const response = await axios.get('/members');
      setMembersData(response.data);
    } catch (error) {
      console.error(error);
      setError('אירעה שגיאה בטעינת המידע. נסה שוב מאוחר יותר.');
    }
  };

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  // פונקציות עזר לסינון ומיון החברים
  const filterAndSortMembers = () => {
    // סינון
    const filtered = membersData.filter(member => {
      const searchTermLower = searchTerm.toLowerCase();
      return (
        (member.first_name && member.first_name.toLowerCase().includes(searchTermLower)) ||
        (member.last_name && member.last_name.toLowerCase().includes(searchTermLower))
      );
    });

    // מיון - תוצאות שמתחילות במחרוזת החיפוש יופיעו קודם
    return filtered.sort((a, b) => {
      const aFirstName = a.first_name?.toLowerCase() || '';
      const bFirstName = b.first_name?.toLowerCase() || '';
      const aLastName = a.last_name?.toLowerCase() || '';
      const bLastName = b.last_name?.toLowerCase() || '';
      const searchTermLower = searchTerm.toLowerCase();

      const aStartsWithFirst = aFirstName.startsWith(searchTermLower);
      const bStartsWithFirst = bFirstName.startsWith(searchTermLower);
      const aStartsWithLast = aLastName.startsWith(searchTermLower);
      const bStartsWithLast = bLastName.startsWith(searchTermLower);

      if ((aStartsWithFirst || aStartsWithLast) && !(bStartsWithFirst || bStartsWithLast)) return -1;
      if (!(aStartsWithFirst || aStartsWithLast) && (bStartsWithFirst || bStartsWithLast)) return 1;

      return aFirstName.localeCompare(bFirstName, 'he');
    });
  };

  const sortedMembers = filterAndSortMembers();

  return (
    <div className="members-container">
      <h1 className="members-title">חברי בית הכנסת</h1>

      <SearchMembers
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onClear={clearSearch}
      />

      <table className="members-table">
        <thead>
          <tr className="table-header">
            <th className="table-header-cell">שם</th>
            <th className="table-header-cell">משפחה</th>
          </tr>
        </thead>
        <tbody>
          {sortedMembers.map((member) => (
            <tr key={member.id} className="table-row">
              <td className="table-cell">
                {member.is_v ? member.first_name : <>ממתין לאישור</>}
              </td>
              <td className="table-cell">
                {member.is_v && member.last_name}
              </td>
            </tr>
          ))}
          {sortedMembers.length === 0 && searchTerm && (
            <tr>
              <td colSpan="2" className="no-results">
                לא נמצאו חברים התואמים לחיפוש
              </td>
            </tr>
          )}
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