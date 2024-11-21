import React, { useState, useEffect } from 'react';
import axios from '../component/Axios';
import { DateTime } from 'luxon';

const DailyTimes = () => {
  const [times, setTimes] = useState({});

  useEffect(() => {
    const fetchTimes = async () => {
      try {
        const response = await axios.get('/times/day_times');
        setTimes(convertTimesToDateTimeObjects(response.data));  
      } catch (error) {
        console.error('שגיאה בקבלת זמני היום:', error); 
      }
    };

    fetchTimes();
  }, []);

  const timeFields = [
    { key: 'alotHaShachar', label: 'עלות השחר' },
    { key: 'misheyakir', label: 'משיכיר' },
    { key: 'sunrise', label: 'זריחה' },
    { key: 'sofZmanShmaMGA', label: 'סוף זמן שמע מג"א' },
    { key: 'sofZmanShma', label: 'סוף זמן שמע גר"א' },
    { key: 'sofZmanTfillaMGA', label: 'סוף זמן תפילה מג"א' },
    { key: 'sofZmanTfilla', label: 'סוף זמן תפילה גר"א' },
    { key: 'chatzot', label: 'חצות' },
    { key: 'sunset', label: 'שקיעה' },
    { key: 'tzeit7083deg', label: 'צאת הכוכבים' }
  ];

  return (
    <div className="daily-times-container">
      <h2 className="title">זמני היום</h2>
      <h4>לפי אופק בני - ברק</h4>
      <table className="table">
        <tbody>
          {timeFields.map(({ key, label }) => (
            <tr key={key}>
              <td className="cell">{label}</td>
              <td className="cell">{times[key] || '--:--'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function convertTimesToDateTimeObjects(times) {
  const convertedTimes = {};
  for (const key in times) {
    if (times.hasOwnProperty(key) && times[key]) {
      const timeStr = times[key];
      try {
        const dateTimeObject = DateTime.fromISO(timeStr);
        convertedTimes[key] = dateTimeObject.toFormat('HH:mm');
      } catch (error) {
        console.error(`Error converting time for ${key}:`, error);
        convertedTimes[key] = '--:--';
      }
    }
  }
  return convertedTimes;
}

export default DailyTimes;