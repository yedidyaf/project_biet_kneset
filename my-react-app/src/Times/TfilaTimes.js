// TfilaTimesG.jsx
import React, { useState, useEffect } from "react";
import axios from '../component/Axios';

import '../assets/css/TfilaTimes.css';

const TfilaTimes = () => {
  const [ArrTfilaTimes, setArrTfilaTimes] = useState([]);
  const [weekday, setWeekday] = useState([]);
  const [sabbath, setSabbath] = useState([]);

  useEffect(() => {
    fetchPrayerTimes();
  }, []);

  const fetchPrayerTimes = async () => {
    try {
      const response = await axios.get('/times');
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
  

  return (
    <div className="prayer-times">
      <h3 className="title">זמני תפילות </h3>
        <div className="frame">
        <h3 > יום חול </h3>
          <table className="table">
            <tbody>
              {weekday&& weekday.map(prayer => (
                <tr key={prayer.id}>
                  <td className="cell">{prayer.name}</td>
                  <td className="cell">{prayer.time}</td>
                  
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
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default TfilaTimes;
