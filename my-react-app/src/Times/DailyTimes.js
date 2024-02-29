import React, { useState, useEffect } from 'react';
import axios from '../component/Axios';
import { DateTime } from 'luxon';
import '../assets/css/DailyTimes.css';
import DateH from '../gabai/Times/DateH';

const DailyTimes = () => {

  const [times, setTimes] = useState({});

  useEffect(() => {
    const fetchTimes = async () => {
      try {
        const response = await axios.get('/times/day_times');
        setTimes(convertTimesToDateTimeObjects(response.data));  
      } catch (error) {
        console.log(error); 
      }
    };

    fetchTimes();
  }, []);

  return (
    <div className="daily-times">
      <h2 className="title">זמני היום</h2>
      <h4>לפי אופק בני - ברק</h4>
     <DateH/>
      <table className="table">
        <tbody>
          <tr>
            <td className="cell">עלות השחר</td>
            <td className="cell">{times.alotHaShachar}</td>
          </tr>
          <tr>
            <td className="cell">משיכיר</td>  
            <td className="cell">{times.misheyakir}</td>
          </tr>
          <tr>
            <td className="cell">זריחה</td>
            <td className="cell">{times.sunrise}</td>
          </tr>
          <tr>
            <td className="cell">סוף זמן שמע מג"א</td>
            <td className="cell">{times.sofZmanShmaMGA}</td>
          </tr>
          <tr>
            <td className="cell">סוף זמן שמע גר"א</td>
            <td className="cell">{times.sofZmanShma}</td> 
          </tr>
          <tr>
            <td className="cell">סוף זמן תפילה מג"א</td>
            <td className="cell">{times.sofZmanTfillaMGA}</td>  
            </tr>
          <tr>  
            <td className="cell">סוף זמן תפילה גר"א</td>
            <td className="cell">{times.sofZmanTfilla}</td>
          </tr>
          
          <tr>
            <td className="cell">חצות</td>
            <td className="cell">{times.chatzot}</td>
          </tr>
          <tr>
            <td className="cell">שקיעה</td>
            <td className="cell">{times.sunset}</td>
          </tr>  
          <tr>
            <td className="cell">צאת הכוכבים</td>
            <td className="cell">{times.tzeit7083deg}</td>
          </tr>     
        </tbody>
      </table>
    </div>
  );
};

function convertTimesToDateTimeObjects(times) {
  const convertedTimes = {};

  for (const key in times) {
    if (times.hasOwnProperty(key)) {
      const fullTimeString = times[key];
      const dateTimeObject = DateTime.fromISO(fullTimeString);
      const timeOnly = dateTimeObject.toFormat('HH:mm');

      convertedTimes[key] = timeOnly;
    }
  }

  return convertedTimes;
}
export default DailyTimes;