// TfilaTimes.jsx
import React, { useState, useEffect } from "react";
import axios from '../component/Axios';

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

  const formatTime = (prayer) => {
    if (prayer.is_fixed_time) {
      return prayer.time;
    }
    return prayer.calculated_time || 'לא ניתן לחשב את הזמן';
  };

  const formatTimeDescription = (prayer) => {
    if (prayer.is_fixed_time) {
      return null;
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

    return `(${prayer.minutes_offset} דקות ${prayer.is_before ? 'לפני' : 'אחרי'} ${referenceTimeLabels[prayer.reference_time] || prayer.reference_time})`;
  };

  const TimeTable = ({ times, title }) => (
    <div className="frame">
      <h3>{title}</h3>
      <table className="table">
        <tbody>
          {times.map(prayer => (
            <tr key={prayer.id}>
              <td className="cell">{prayer.name}</td>
              <td className="cell">
                {formatTime(prayer)}
                {formatTimeDescription(prayer) && (
                  <div className="time-description">
                    {formatTimeDescription(prayer)}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
 
  return (
    <div className="prayer-times">
      <h3 className="title">זמני תפילות</h3>
      <TimeTable times={weekday} title="יום חול" />
      <TimeTable times={sabbath} title="שבת" />
    </div>
  );
};

export default TfilaTimes;