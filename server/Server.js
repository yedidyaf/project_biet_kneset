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
import jwt from 'jsonwebtoken';

const app = express();
console.log("The server file User is working");
const port = process.env.PORT || 5050;
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

app.get('/api/getImage', async (req, res) => {
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
