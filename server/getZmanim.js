import { DateTime } from 'luxon';
import dbFunctions from './DatabaseFunctions/Times.js';
import cron from 'node-cron';

async function fetchDayTimes() {
    try {
        // יצירת התאריך והוספתו ל-URL
        const formattedDate = DateTime.now().toISODate();
        const url = `https://www.hebcal.com/zmanim?cfg=json&geonameid=295514&date=${formattedDate}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // המרת הזמנים לפורמט TIME של MySQL
        const zmanim = {};
        const timeFields = [
            'alotHaShachar', 'misheyakir', 'sunrise', 
            'sofZmanShma', 'sofZmanShmaMGA',
            'sofZmanTfilla', 'sofZmanTfillaMGA',
            'chatzot', 'sunset', 'tzeit7083deg'
        ];

        for (const field of timeFields) {
            if (data.times[field]) {
                // המרת התאריך ISO לפורמט TIME של MySQL
                const dateTime = DateTime.fromISO(data.times[field]);
                zmanim[field] = dateTime.toFormat('HH:mm:ss');
            } else {
                console.warn(`Missing time for ${field}`);
                zmanim[field] = null;
            }
        }

        // שמירה בדאטהבייס
        await dbFunctions.updateDayTimes(zmanim);
        console.log('Daily times updated successfully:', zmanim);

    } catch (error) {
        console.error('Error fetching or updating day times:', error);
        // אפשר להוסיף כאן לוגיקה של retry או שליחת התראה
    }
}

// הפעלה ראשונית
fetchDayTimes();

// הפעלה בכל יום בשעה 00:01
cron.schedule('1 0 * * *', fetchDayTimes, {
    timezone: "Asia/Jerusalem"  // חשוב להגדיר אזור זמן נכון
});

// ייצוא הפונקציה למקרה שנרצה להשתמש בה ממקום אחר
export { fetchDayTimes };