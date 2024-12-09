import express, { json } from 'express';
import path, { parse } from 'path';
import fs from 'fs/promises';
import cors from 'cors';
import multer from 'multer';
// import dbFunctions from '../server/DataB.js';
import handleImages from './handleImages.js';
import { format } from 'date-fns';
import nodemialer from 'nodemailer'
import { fetchDayTimes } from './getZmanim.js';
import jwt from 'jsonwebtoken';
import { Router } from 'express';

const app = express();
console.log("The server file is working 4000");
const port = process.env.PORT || 4000;
app.use(cors());
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.method);
    next();
})


const homeRouter = express.Router();
const newsRouter = express.Router();
const timesRouter = express.Router();
const membersRouter = express.Router();
const donationRouter = express.Router();
const imagesRouter = express.Router();
const gabaisRouter = express.Router();
const loginRouter = express.Router();

import homeRoutes from './gabaiServer/homeG.js';
import newsRoutes from './gabaiServer/newsG.js';
import timesRoutes from './gabaiServer/timesG.js';
import membersRoutes from './gabaiServer/membersG.js';
import donationRoutes from './gabaiServer/donationsG.js';
import gabaisRoutes from './gabaiServer/gabaisG.js';
import loginRoutes from './gabaiServer/loginG.js';

const authenticateGabai = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Authentication failed: Missing token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        req.gabai = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Authentication failed: Invalid token' });
    }
};

app.use(['/gabai/*'], authenticateGabai);

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


app.use("/gabai/home", homeRoutes);
app.use("/gabai/news", newsRoutes);
app.use("/gabai/times", timesRoutes);
app.use("/gabai/members", membersRoutes);
app.use("/gabai/donations", donationRoutes);
app.use("/gabai/gabais", gabaisRoutes);
app.use("/api/gabai/login", loginRoutes);



app.get('/api/getImage', async (req, res) => {
    console.log("ppp");
    
    const imagePath = req.query.path;
    console.log(imagePath);
    try {
        const imageBuffer = await fs.readFile(imagePath);

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
