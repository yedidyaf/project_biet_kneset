import React, { useState, useEffect } from "react";
import axios from '../component/Axios';

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
<h3 className="title">  זמני תפילות </h3>
<h4>הוספת ועריכת זמני תפילות</h4>
      <TfilaTimesForm
        editMode={editMode}
        selectedPrayerId={selectedPrayerId}
        onFormSubmit={handleFormSubmit}
        ArrTfilaTimes={ArrTfilaTimes}
      />
      <div className="frame">
        <h3 > יום חול </h3>
        <table className="table">
          <tbody>
            {weekday && weekday.map(prayer => (
              <tr key={prayer.id}>
                <td className="cell">{prayer.name}</td>
                <td className="cell">{prayer.time}</td>
                <td>
                  <button className="but-edit" onClick={() => handleEditClick(prayer.id)}>
                    עריכה
                  </button>

                  <button className="but-delete" onClick={() => handleDeleteClick(prayer.id)}>
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <div className="frame">
        <h3 >שבת</h3>
        <table className="table">
          <tbody>
            {sabbath && sabbath.map(prayer => (
              <tr key={prayer.id}>
                <td className="cell">{prayer.name}</td>
                <td className="cell">{prayer.time}</td>
                <td>
                  <button className="but-edit" onClick={() => handleEditClick(prayer.id)}>עריכה</button>
                  <button className="but-delete" onClick={() => handleDeleteClick(prayer.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default TfilaTimesG;
