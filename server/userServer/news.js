import dbFunctions from '../DatabaseFunctions/News.js';
import express from 'express';

const router = express.Router();

router.get("/", async (req, res) => {
    console.log("jjj");
    try {
        const articles = await dbFunctions.getNews();
        console.log(articles);
        res.status(200).send(articles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;