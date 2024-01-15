import express, { json } from 'express';
import path, { parse } from 'path';
import fs from 'fs/promises';
import cors from 'cors';
import multer from 'multer';
import dbFunctions from '../server/DataB.js';
import handleImages from './handleImages.js';
import { format } from 'date-fns';
import nodemialer from 'nodemailer'
import { fetchData } from './getZmanim.js';

const app = express();
console.log("kkkk");
// const upload = multer({ dest: 'uploads/' })
const port = process.env.PORT || 4000;
app.use(cors());
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.method);
    next();
})
app.get("/home", async (req, res) => {
    try {
        const article = await dbFunctions.getArticalHome();
        res.status(200).send(article);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/news", async (req, res) => {
    try {
        const articles = await dbFunctions.getNews();
        res.status(200).send(articles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/times", async (req, res) => {
    try {
        const times = await dbFunctions.getTimes();
        res.status(200).send(times);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/times/day_times", async (req, res) => {
    try {
        const times = await dbFunctions.getDayTimes();
        res.status(200).send(times);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/members", async (req, res) => {
    try {
        const members = await dbFunctions.getMembers();
        console.log(members);
        res.status(200).send(members);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.get("/donations", async (req, res) => {
    try {
        const donations = await dbFunctions.getDonations();
        res.status(200).send(donations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/members", async (req, res) => {
    try {
        const response = await dbFunctions.setMember({ ...req.body, is_v: false });
        console.log(response);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).send("problem in server!");
    }
});
// פונקציות לגבאים בלבד
app.get("/gabai/home", async (req, res) => {
    try {
        const article = await dbFunctions.getArticalHome();
        res.status(200).send(article);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({
    storage: storage,
});

app.post('/gabai/home', upload.array('images', 5), async (req, res) => {
    try {
        // טיפול בתמונות וקבלת הנתיבים החדשים
        const savedImagePaths = req.files.map((file) => {
            const imagePath = 'C:\\Users\\user\\Desktop\\project_biet_kneset\\server\\images\\' + file.originalname;
            return imagePath;
        });
        console.log(savedImagePaths);
        // הכנסת הנתיבים החדשים לאובייקט של הכתבה
        const updatedArticle = {
            ...req.body,
            images: savedImagePaths.map((path) => path.replace('images/', '')), // שינוי נתיבי התמונות למבנה נכון
        };
        updatedArticle.images = JSON.stringify(updatedArticle.images);
        const response = await dbFunctions.putArticalHome(updatedArticle);
        console.log(response);
        res.status(200);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get("/gabai/news", async (req, res) => {

    try {
        const articles = await dbFunctions.getNews();
        res.status(200).send(articles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/gabai/news", upload.array('images', 5), async (req, res) => {
    console.log(req.files);
    try {

        // טיפול בתמונות וקבלת הנתיבים החדשים
        const savedImagePaths = req.files.map((file) => {
            const imagePath = 'C:\\Users\\user\\Desktop\\project_biet_kneset\\server\\images\\' + file.originalname;
            return imagePath;
        });
        console.log(savedImagePaths);

        const today = new Date();
        const formattedDate = format(today, 'yyyy-MM-dd');
        console.log(formattedDate);
        // הכנסת הנתיבים החדשים לאובייקט של הכתבה
        const updatedArticle = {
            ...req.body,
            date: formattedDate,
            images: savedImagePaths.map((path) => path.replace('images/', '')), // שינוי נתיבי התמונות למבנה נכון
        };
        console.log(updatedArticle);
        updatedArticle.images = JSON.stringify(updatedArticle.images);
        const response = await dbFunctions.addArticalNews(updatedArticle);
        console.log(response);
        res.status(200);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/gabai/news/:id', async (req, res) => {
    try {
        const response = await dbFunctions.putArticleNews(req.params.id, req.body);
        res.status(200);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.delete('/gabai/news/:id', async (req, res) => {
    try {
        const response = await dbFunctions.deleteArticleNews(req.params.id);
        res.status(200);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/gabai/times", async (req, res) => {
    try {
        const times = await dbFunctions.getTimes();
        res.status(200).send(times);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.post("/gabai/times", async (req, res) => {
    try {
        const response = await dbFunctions.addTime(req.body);
        res.status(200);
        console.log(response);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.put('/gabai/times/:id', async (req, res) => {

    try {
        const response = await dbFunctions.putTimes(req.params.id, req.body);
        res.status(200);
        res.send(response);
    }
    catch (error) {
        res.status(500)
        res.send("problme in server!")
    }
});

app.delete('/gabai/times/:id', async (req, res) => {
    try {
        const response = await dbFunctions.deleteTime(req.params.id);
        res.status(200);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.get("/gabai/members", async (req, res) => {
    try {
        const members = await dbFunctions.getMembers();
        res.status(200).send(members);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.post("/gabai/members", async (req, res) => {
    try {
        const response = await dbFunctions.setMember({ ...req.body, is_v: 1 });
        console.log(response);
        res.status(200).json(response);
    } catch (error) {
        if (error.message.includes("already exists")) {
            res.status(400).json({ error: "Member with this email already exists" });
        } else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
});
app.put('/gabai/members/:id', async (req, res) => {
    try {
        const response = await dbFunctions.putMember(req.params.id);
        res.status(200);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.delete('/gabai/members/:id', async (req, res) => {
    try {
        const response = await dbFunctions.deleteMember(req.params.id);
        res.status(200);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/gabai/donations", async (req, res) => {
    try {
        const donations = await dbFunctions.getDonations();
        res.status(200).send(donations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/gabai/donations", upload.single('file'), async (req, res) => {
    console.log(req.file);
    try {

        const savedImagePath = 'C:\\Users\\user\\Desktop\\project_biet_kneset\\server\\images\\' + req.file.originalname;
        console.log(savedImagePath);

        const updatedDonation = {
            ...req.body,
            image: savedImagePath,
        };

        updatedDonation.image = JSON.stringify(updatedDonation.image);
        console.log(updatedDonation.image);
        const response = await dbFunctions.addDonation(updatedDonation);
        res.status(200);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.put('/gabai/donations/:id', upload.single('file'), async (req, res) => {
    try {

        const savedImagePath = 'C:\\Users\\user\\Desktop\\project_biet_kneset\\server\\images\\' + req.file.originalname;
        console.log(savedImagePath);

        const updatedDonation = {
            ...req.body,
            image: savedImagePath,
        };

        updatedDonation.image = JSON.stringify(updatedDonation.image);
        console.log(updatedDonation.image);
        const response = await dbFunctions.putDonation(req.params.id, updatedDonation);
        res.status(200);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/gabai/donations/:id', async (req, res) => {
    try {
        const response = await dbFunctions.deleteDonation(req.params.id);
        res.status(200);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.post("/api/gabai/login", async (req, res) => {
    console.log(req.body);
    try {
        const response = await dbFunctions.checkGabai(req.body);
        console.log(response);
        if (response) {
            // אם יש גבאי כזה, תשלח תשובה 200 עם הגבאי
            res.status(200).json(response);
        } else {
            console.log(404);
            // אם אין גבאי כזה, תשלח תשובה 404 (Not Found) עם הודעה מתאימה
            res.status(404).json({ error: "גבאי לא נמצא" });
        }
    } catch (error) {
        console.error(error);
        // אם יש שגיאה במהלך הבדיקה, תשלח תשובת שגיאה 500 (Internal Server Error)
        res.status(500).json({ error: "שגיאת שרת פנימית" });
    }
});

app.get("/gabai/gabais", async (req, res) => {
    try {
        const gabais = await dbFunctions.getGabais();
        res.status(200).send(gabais);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/gabai/gabais", async (req, res) => {
    console.log(req.body);
    try {
        const response = await dbFunctions.addGabai(req.body);
        res.status(200);
        console.log(response);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.delete('/gabai/gabais/:id', async (req, res) => {
    console.log(2222);
    try {
        const response = await dbFunctions.deleteGabaiByEmail(req.params.id);
        res.status(200);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/getImage', async (req, res) => {
    const imagePath = req.query.path;
    console.log(imagePath);
    try {
        // קריאת התמונה באופן אסינכרוני באמצעות promises
        const imageBuffer = await fs.readFile(imagePath);

        // השליחה של התמונה בתגובה
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': imageBuffer.length,
        });
        res.end(imageBuffer);
    } catch (error) {
        console.error('שגיאה בקריאת התמונה:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/api/getImage', async (req, res) => {
    const imagePath = req.query.path;
    console.log(imagePath);
    try {
        // קריאת התמונה באופן אסינכרוני באמצעות promises
        const imageBuffer = await fs.readFile(imagePath);

        // השליחה של התמונה בתגובה
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': imageBuffer.length,
        });
        res.end(imageBuffer);
    } catch (error) {
        console.error('שגיאה בקריאת התמונה:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port);
const transporter = nodemialer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: 'bktgxo@gmail.com', // האימייל שלך
        pass: process.env.EMAIL_PASSWORD // הסיסמה שלך
    }
});
async function sendEmail(senderEmail, recipientEmail, subject, message) {
    console.log(sendEmail);
    try {
        // הגדר את התצורה של ה-transporter (המאפשר לשלוח מיילים)


        // הגדר את פרטי המייל
        const mailOptions = {
            from: senderEmail,
            to: recipientEmail,
            subject: subject,
            text: message
        };

        // שלח את המייל
        const info = await transporter.sendMail(mailOptions);

        console.log('Email sent: ' + info.response);
        return 'Email sent successfully';
    } catch (error) {
        console.error('Error sending email:', error);
        return 'Error sending email';
    }
}
// sendEmail('bktgxo@gmail.com','fyedidya321@gmail.com','שלום',"icrfv")
