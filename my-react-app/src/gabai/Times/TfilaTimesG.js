// TfilaTimesG.jsx
import React, { useState, useEffect } from "react";
import axios from '../../component/Axios';

import '../../assets/css/TfilaTimes.css';
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
  };

  
  const handleDeleteClick = async (prayerId) => {
    try {
      await axios.delete(`/gabai/times/${prayerId}`);
      fetchPrayerTimes();
    } catch (error) {
      console.error('שגיאה במחיקת זמן תפילה:', error);
    }
  };

  
  const handleFormSubmit = async (method, id, data) => {
    try {
      // בקשת POST או PUT לשרת, תלוי בהוספה או עריכה
      const response = method === 'add'
        ? await axios.post('/gabai/times', data)
        : await axios.put(`/gabai/times/${id}`, data);

      console.log(response);
  
      fetchPrayerTimes();
    } catch (error) {
      console.error('שגיאה בשליחת בקשת עריכה/הוספה:', error);
    } finally {
      setEditMode(false);
      setSelectedPrayerId(null);
    }
  };

  return (
    <div className="prayer-times">
      
        <div className="frame">
          <h3>זמני תפילות (ימות חול)</h3>
          <table>
            <tbody>
              {weekday&& weekday.map(prayer => (
                <tr key={prayer.id}>
                  <td>{prayer.name}</td>
                  <td>{prayer.time}</td>
                  <td>
                    <button onClick={() => handleEditClick(prayer.id)}>עריכה</button>
                    <button onClick={() => handleDeleteClick(prayer.id)}>מחיקה</button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>  
      

      <div className="frame">
        <h3>זמני תפילות (שבת)</h3>
        <table>
          <tbody>
            {sabbath && sabbath.map(prayer => (
              <tr key={prayer.id}>
                <td>{prayer.name}</td>
                <td>{prayer.time}</td>
                <td>
                  <button onClick={() => handleEditClick(prayer.id)}>עריכה</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h4>הוספת ועריכת זמני תפילות</h4>
      <TfilaTimesForm
        editMode={editMode}
        selectedPrayerId={selectedPrayerId}
        onFormSubmit={handleFormSubmit}
        ArrTfilaTimes={ArrTfilaTimes}
      />
    </div>
  );
};

export default TfilaTimesG;
