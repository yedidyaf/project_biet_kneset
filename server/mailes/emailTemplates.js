export const emailTemplates = {
    approval: (firstName, lastName) => ({
        subject: "ברוך הבא לקהילה שלנו!",
        html: `
            <p>שלום ${firstName} ${lastName},</p>
            <p>ברכותינו! הצטרפותך לקהילה שלנו אושרה בהצלחה. אנו שמחים לקבל אותך כחלק מהקהילה שלנו.</p><p> אם יש לך שאלות או זקוק לעזרה, אל תהסס לפנות אלינו.</p>
            <p>בברכה,<br>צוות הקהילה</p>
        `
    }),
    rejection: (firstName, lastName) => ({
        subject: "עדכון לגבי בקשת הצטרפותך לקהילה",
        html: `
            <p>שלום ${firstName} ${lastName},</p>
            <p>לצערנו, בקשתך להצטרף לקהילה שלנו נדחתה בשלב זה. אנו מעריכים את רצונך להצטרף ומזמינים אותך לנסות שוב בעתיד או לספק פרטים נוספים שיסייעו לנו להעריך מחדש את בקשתך.</p>
            <p>בברכה,<br>צוות הקהילה</p>
        `
    }),
    reminder: (firstName, lastName) => ({
        subject: "תזכורת לפגישה הקרובה",
        html: `
            <p>שלום ${firstName} ${lastName},</p>
            <p>זו תזכורת ידידותית על הפגישה הקרובה שלך עם חברי הקהילה. אנו מחכים לראותך בתאריך [תאריך] בשעה [שעה].</p>
            <p>בברכה,<br>צוות הקהילה</p>
        `
    }),
    eventInvitation: (firstName, lastName) => ({
        subject: "הזמנה לאירוע הקרוב שלנו",
        html: `
            <p>שלום ${firstName} ${lastName},</p>
            <p>אנו שמחים להזמין אותך לאירוע הקרוב שלנו שיתקיים בתאריך [תאריך] בשעה [שעה]. האירוע יתקיים ב[מיקום]. נשמח לראותך משתתף!</p>
            <p>בברכה,<br>צוות הקהילה</p>
        `
    })
};