import dbFunctions from '../DatabaseFunctions/News.js';
import express from 'express';

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const articles = await dbFunctions.getNews();
        res.status(200).send(articles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.get("/:id", async (req, res) => {
    try {
        const article = await dbFunctions.getNew(req.params.id);
        res.status(200).send(article[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;