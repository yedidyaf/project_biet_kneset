import React, { useState, useEffect } from 'react';
import axios from '../component/Axios';
import '../../assets/css/Members.css';

const MembersG = () => {
  const [membersData, setMembersData] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    first_name: '',
    last_name: '',
    email: '',
    address: ''
  });

  useEffect(() => {
    fetchMembersData();
  }, []);

  const fetchMembersData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/gabai/members');
      setMembersData(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
      setError('אירעה שגיאה בטעינת המידע. נסה שוב מאוחר יותר.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/gabai/members', newMember);
      await fetchMembersData();
      setIsModalOpen(false);
      setNewMember({
        first_name: '',
        last_name: '',
        email: '',
        address: ''
      });
    } catch (error) {
      console.error(error);
      setError('אירעה שגיאה בהוספת החבר החדש. נסה שוב מאוחר יותר.');
    }
  };

  const handleAddition = async (memberId) => {
    try {
      await axios.put(`/gabai/members/${memberId}`);
      fetchMembersData();
    } catch (error) {
      console.error(error);
      setError('אירעה שגיאה בהוספת החבר. נסה שוב מאוחר יותר.');
    }
  };

  const handleDeletion = async (memberId) => {
    const isConfirmed = window.confirm('האם אתה בטוח שאתה רוצה למחוק את החבר?');
    if (!isConfirmed) return;

    try {
      await axios.delete(`/gabai/members/${memberId}`);
      setMembersData((prevData) => prevData.filter((member) => member.id !== memberId));
    } catch (error) {
      console.error(error);
      setError('אירעה שגיאה במחיקת החבר. נסה שוב מאוחר יותר.');
    }
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
      .sort((a, b) => (a.first_name || '').localeCompare(b.first_name || '', 'he'));
  };

  const filteredMembers = filterAndSortMembers();

  return (
    <div className="members-container">
      <div className="members-header">
        <h1>חברי בית הכנסת</h1>
        <div className="header-controls">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="חיפוש חברים..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="clear-search"
                onClick={() => setSearchTerm('')}
                aria-label="נקה חיפוש"
              >
                ✕
              </button>
            )}
          </div>
          <button 
            className="add-member-btn"
            onClick={() => setIsModalOpen(true)}
          >
            + הוסף חבר חדש
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="table-container">
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
                <tr 
                  key={member.id}
                  className={!member.is_v ? 'pending-member' : ''}
                >
                  <td>{member.first_name}</td>
                  <td>{member.last_name}</td>
                  <td>{member.email}</td>
                  <td>{member.address}</td>
                  <td>
                    <div className="action-buttons">
                      {!member.is_v && (
                        <button
                          className="approve-btn"
                          onClick={() => handleAddition(member.id)}
                        >
                          אישור
                        </button>
                      )}
                      <button
                        className="delete-btn"
                        onClick={() => handleDeletion(member.id)}
                      >
                        מחיקה
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredMembers.length === 0 && searchTerm && (
                <tr>
                  <td colSpan={5} className="no-results">
                    לא נמצאו חברים התואמים לחיפוש
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for adding new member */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>הוספת חבר חדש</h2>
              <button 
                className="close-modal"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="first_name">שם פרטי:</label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={newMember.first_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="last_name">שם משפחה:</label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={newMember.last_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">אימייל:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newMember.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">כתובת:</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={newMember.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="submit-btn">
                  הוסף חבר
                </button>
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  ביטול
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembersG;