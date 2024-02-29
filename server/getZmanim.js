import { DateTime } from 'luxon'
import dbFunctions from './DataB.js';
import cron from 'node-cron';



// הפעלה של פונקציה כל 42 שעות

export  function fetchData() {
    
  // שלב 1: יצירת אובייקט תאריך באמצעות Luxon
  const currentDate = DateTime.local();

  // שלב 2: הפיכת התאריך לתבנית המבוקשת (YYYY-MM-DD)
  const formattedDate = currentDate.toISODate();

  // שלב 3: הוספת התאריך לכתובת ה-URL
  const url = `https://www.hebcal.com/zmanim?cfg=json&geonameid=295514&date=${formattedDate}`;

  // בצע קריאת GET באמצעות fetch
  fetch(url)
    .then(response => {
      // בדוק אם התשובה היא בסדר 200 (OK)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
        const {
            alotHaShachar, misheyakir, sunrise, sofZmanShma,
            sofZmanShmaMGA, sofZmanTfilla, sofZmanTfillaMGA,
            chatzot, sunset, tzeit7083deg
          } = data.times;
          
          const zmanim = {
            alotHaShachar,
            misheyakir,
            sunrise,
            sofZmanShma,
            sofZmanShmaMGA,
            sofZmanTfilla,
            sofZmanTfillaMGA,
            chatzot,
            sunset,
            tzeit7083deg
          };
          console.log(9999);
          dbFunctions.updateDayTimes(zmanim);
    })
    .catch(error => {
      // טפל בשגיאה אם קיימת
      console.error('Fetch error:', error);
    });
}
fetchData();
cron.schedule('1 0 * * *', () => {
fetchData(); 
});
