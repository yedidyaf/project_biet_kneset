import nodemailer from 'nodemailer'
import 'dotenv/config'
async function sendMail(to, {subject, html}) {

  // יצירת טרנספורטר
  let transporter = nodemailer.createTransport({
    logger: true,
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD 
    }
  });

  // שליחת המייל
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>',
    to: to, 
    subject: subject, 
    html: html
  });

  console.log("Message sent: %s", info.messageId);
  
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}

// שימוש:
let email = "jbh0527174650@gmail.com";
let content = {
  subject: "Hello ✔",
  html: "<b>Hello world?</b>"  
};

sendMail(email, content);