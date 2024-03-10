import dbFunctions from '../DatabaseFunctions/News.js';
import multer from 'multer';
import { format } from 'date-fns';

import express from 'express';
const router = express.Router();
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
router.get("/", async (req, res) => {

    try {
        const articles = await dbFunctions.getNews();
        res.status(200).send(articles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/", upload.array('images', 5), async (req, res) => {
    try {

        const savedImagePaths = req.files.map((file) => {
            const imagePath = 'C:\\Users\\user\\Desktop\\project_biet_kneset\\server\\images\\' + file.originalname;
            return imagePath;
        });

        const today = new Date();
        const formattedDate = format(today, 'yyyy-MM-dd');
        const updatedArticle = {
            ...req.body,
            date: formattedDate,
            images: savedImagePaths.map((path) => path.replace('images/', '')), // שינוי נתיבי התמונות למבנה נכון
        };
        console.log(updatedArticle);
        updatedArticle.images = JSON.stringify(updatedArticle.images);
        const response = await dbFunctions.addArticalNews(updatedArticle);
        res.status(200);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const response = await dbFunctions.putArticleNews(req.params.id, req.body);
        res.status(200);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const response = await dbFunctions.deleteArticleNews(req.params.id);
        res.status(200);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;