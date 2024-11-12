import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// טוען את קובץ ה-`.env`
dotenv.config();

export async function sendMail(to, {subject, html}) {
  try {
    // יצירת טרנספורטר
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // כתובת הג'ימייל שלך
        pass: process.env.EMAIL_PASSWORD // סיסמת האפליקציה שנוצרה
      }
    });

    // שליחת המייל
    let info = await transporter.sendMail({
      from: process.env.EMAIL_USER, // כתובת הג'ימייל שלך
      to: to, // כתובת הדוא"ל של הנמען
      subject: subject, // נושא המייל
      html: html // תוכן המייל ב-HTML
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// שימוש:
let email = "jbh0527174650@gmail.com";
let content = {
  subject: "Hello ✔",
  html: "<b>Hello world?</b>"
};

// sendMail(email, content);
