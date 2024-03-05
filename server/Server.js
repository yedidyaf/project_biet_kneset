
import express, { json } from 'express';
import path, { parse } from 'path';
import fs from 'fs/promises';
import cors from 'cors';
import multer from 'multer';
import { format } from 'date-fns';
import nodemialer from 'nodemailer'
import jwt from 'jsonwebtoken';
const app = express();
console.log("The server file User is working");
const port = process.env.PORT || 5050;
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    next();
});

const homeRouter = express.Router();
const newsRouter = express.Router();
const timesRouter = express.Router();
const membersRouter = express.Router();
const donationRouter = express.Router();
const imagesRouter = express.Router();

import homeRoutes from './userServer/home.js';
import newsRoutes from './userServer/news.js';
import timesRoutes from './userServer/times.js';
import membersRoutes from './userServer/members.js';
import donationRoutes from './userServer/donations.js';
import imagesRoutes from './userServer/api_image.js';

app.use("/home", homeRoutes);
app.use("/news", newsRoutes);
app.use("/times", timesRoutes);
app.use("/members", membersRoutes);
app.use("/donations", donationRoutes);
app.use("/api/getImage", imagesRoutes);

app.listen(port);