import React, { useState, useEffect } from 'react';
import axios from '../component/Axios'; 
import MemberFormG from './MemberFormG';
import SearchMembers from './SearchMembers';
import { useNavigate } from 'react-router-dom';
import "../../assets/css/Members.css"

const MembersG = () => {
  const navigate = useNavigate();
  const [membersData, setMembersData] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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
    fetchMembersData();
  };

  const handleAddition = async (memberId) => {
    try {
      await axios.put(`/gabai/members/${memberId}`);
      fetchMembersData();
    } catch (error) {
      console.error(error);
      setError('אירעה שגיאה בהוספת הגבאי. נסה שוב מאוחר יותר.');
      
      if (error.response?.data?.error) {
        const errorMessage = error.response.data.error;
        if (['Authentication failed: Missing token', 'Forbidden: Invalid role'].includes(errorMessage)) {
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
      await axios.delete(`/gabai/members/${memberId}`);
      setMembersData((prevData) => prevData.filter((member) => member.id !== memberId));
    } catch (error) {
      console.error(error);
      setError('אירעה שגיאה במחיקת הגבאי. נסה שוב מאוחר יותר.');
    }
  };

  // פונקציות לחיפוש וסינון
  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const filterAndSortMembers = () => {
    const searchTermLower = searchTerm.toLowerCase();
    
    return membersData
      .filter(member => {
        return (
          member.first_name?.toLowerCase().includes(searchTermLower) ||
          member.last_name?.toLowerCase().includes(searchTermLower) ||
          member.email?.toLowerCase().includes(searchTermLower) ||
          member.address?.toLowerCase().includes(searchTermLower)
        );
      })
      .sort((a, b) => {
        // מיון - תוצאות שמתחילות במחרוזת החיפוש יופיעו קודם
        const fields = ['first_name', 'last_name', 'email', 'address'];
        
        for (const field of fields) {
          const aField = a[field]?.toLowerCase() || '';
          const bField = b[field]?.toLowerCase() || '';
          
          const aStartsWith = aField.startsWith(searchTermLower);
          const bStartsWith = bField.startsWith(searchTermLower);
          
          if (aStartsWith && !bStartsWith) return -1;
          if (!aStartsWith && bStartsWith) return 1;
        }
        
        return (a.first_name || '').localeCompare(b.first_name || '', 'he');
      });
  };

  const filteredMembers = filterAndSortMembers();

  return (
    <div className="members-container">
      <h1>חברי בית הכנסת</h1>
      
      <SearchMembers
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onClear={clearSearch}
      />

      <table className="members-table">
        <thead>
          <tr>
            <th>שם</th>
            <th>משפחה</th>
            <th>Email</th>
            <th>כתובת</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.map((member) => (
            <tr key={member.id} style={!member.is_v ? { color: 'red' } : null}>
              <td>{member.first_name}</td>
              <td>{member.last_name}</td>
              <td>{member.email}</td>
              <td>{member.address}</td>
              <td>
                {!member.is_v && (
                  <button onClick={() => handleAddition(member.id)}>
                    אשר הוספה
                  </button>
                )}
                <button onClick={() => handleDeletion(member.id)}>
                  מחיקה
                </button>
              </td>
            </tr>
          ))}
          {filteredMembers.length === 0 && searchTerm && (
            <tr>
              <td colSpan="5" className="no-results">
                לא נמצאו חברים התואמים לחיפוש
              </td>
            </tr>
          )}
        </tbody>
      </table>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <MemberFormG addMembers={addMembers} />
    </div>
  );
};

export default MembersG;