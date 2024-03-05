import dbFunctions from '../../server/DataB.js';
import express  from 'express';
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const article = await dbFunctions.getArticalHome();
        res.status(200).send(article);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
export default router;