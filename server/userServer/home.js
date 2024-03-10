import ArticalHome from '../DatabaseFunctions/ArticalHome.js';
import express  from 'express';
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const article = await ArticalHome.getArticalHome();
        res.status(200).send(article);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
export default router;