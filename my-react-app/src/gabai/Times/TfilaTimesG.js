import React, { useState, useEffect } from "react";
import axios from '../component/Axios';
import TfilaTimesForm from "./TfilaTimesForm";

const TfilaTimesG = () => {
  const [ArrTfilaTimes, setArrTfilaTimes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedPrayerId, setSelectedPrayerId] = useState(null);
  const [weekday, setWeekday] = useState([]);
  const [sabbath, setSabbath] = useState([]);

  useEffect(() => {
    fetchPrayerTimes();
  }, []);

  const fetchPrayerTimes = async () => {
    try {
      const response = await axios.get('/gabai/times');
      const fetchedArrTfilaTimes = response.data;

      const fetchedWeekday = fetchedArrTfilaTimes.filter(x => !x.is_sabbath);
      const fetchedSabbath = fetchedArrTfilaTimes.filter(x => x.is_sabbath);

      setArrTfilaTimes(fetchedArrTfilaTimes);
      setWeekday(fetchedWeekday);
      setSabbath(fetchedSabbath);
    } catch (error) {
      console.error('שגיאה בקבלת זמני תפילה:', error);
    }
  };

  const handleEditClick = (prayerId) => {
    setEditMode(true);
    setSelectedPrayerId(prayerId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteClick = async (prayerId) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק זמן תפילה זה?')) {
      try {
        await axios.delete(`/gabai/times/${prayerId}`);
        fetchPrayerTimes();
      } catch (error) {
        console.error('שגיאה במחיקת זמן תפילה:', error);
      }
    }
  };

  const handleFormSubmit = async (method, id, data) => {
    try {
      if (method === 'add') {
        await axios.post('/gabai/times', data);
      } else {
        await axios.put(`/gabai/times/${id}`, data);
      }
      fetchPrayerTimes();
      setEditMode(false);
      setSelectedPrayerId(null);
    } catch (error) {
      console.error('שגיאה בשליחת טופס:', error);
    }
  };

  const formatRelativeTime = (prayer) => {
    if (prayer.is_fixed_time) {
      return prayer.time;
    }

    const referenceTimeLabels = {
      'alotHaShachar': 'עלות השחר',
      'misheyakir': 'משיכיר',
      'sunrise': 'הנץ החמה',
      'sofZmanShma': 'סוף זמן ק"ש',
      'sofZmanShmaMGA': 'סוף זמן ק"ש מג"א',
      'sofZmanTfilla': 'סוף זמן תפילה',
      'sofZmanTfillaMGA': 'סוף זמן תפילה מג"א',
      'chatzot': 'חצות',
      'sunset': 'שקיעה',
      'tzeit7083deg': 'צאת הכוכבים'
    };

    return `${prayer.minutes_offset} דקות ${prayer.is_before ? 'לפני' : 'אחרי'} ${referenceTimeLabels[prayer.reference_time] || prayer.reference_time}`;
  };

  const TimeTable = ({ times, title }) => (
    <div className="prayer-times-section">
      <h3 className="section-title">{title}</h3>
      <table className="prayer-times-table">
        <thead>
          <tr>
            <th>שם התפילה</th>
            <th>זמן התפילה</th>
            <th>הגדרת הזמן</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {times.map(prayer => (
            <tr key={prayer.id}>
              <td>{prayer.name}</td>
              <td>
                {prayer.is_fixed_time ? prayer.time : 
                 prayer.calculated_time || 'לא ניתן לחשב את הזמן'}
              </td>
              <td>
                {prayer.is_fixed_time ? 
                  'זמן קבוע' : 
                  `${prayer.minutes_offset} דקות ${prayer.is_before ? 'לפני' : 'אחרי'} ${getReferenceTimeLabel(prayer.reference_time)}`
                }
              </td>
              <td className="action-buttons">
                <button className="edit-button" onClick={() => handleEditClick(prayer.id)}>
                  עריכה
                </button>
                <button className="delete-button" onClick={() => handleDeleteClick(prayer.id)}>
                  מחיקה
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
  // פונקציית עזר להצגת שמות הזמנים בעברית
  const getReferenceTimeLabel = (referenceTime) => {
    const labels = {
      'alotHaShachar': 'עלות השחר',
      'misheyakir': 'משיכיר',
      'sunrise': 'הנץ החמה',
      'sofZmanShma': 'סוף זמן ק"ש',
      'sofZmanShmaMGA': 'סוף זמן ק"ש מג"א',
      'sofZmanTfilla': 'סוף זמן תפילה',
      'sofZmanTfillaMGA': 'סוף זמן תפילה מג"א',
      'chatzot': 'חצות',
      'sunset': 'שקיעה',
      'tzeit7083deg': 'צאת הכוכבים'
    };
    return labels[referenceTime] || referenceTime;
  };

  
  
  return (
    <div className="tfila-times-container">
      <div className="header">
        <h2>ניהול זמני תפילות</h2>
      </div>

      <TfilaTimesForm
        editMode={editMode}
        selectedPrayerId={selectedPrayerId}
        onFormSubmit={handleFormSubmit}
        ArrTfilaTimes={ArrTfilaTimes}
      />
      
      <TimeTable times={weekday} title="זמני תפילות - ימי חול" />
      <TimeTable times={sabbath} title="זמני תפילות - שבת" />
    </div>
  );
};

export default TfilaTimesG;