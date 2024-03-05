import dbFunctions from '../DataB.js';
import express from 'express';
const router = express.Router();


router.get("/", async (req, res) => {
    try {
        const times = await dbFunctions.getTimes();
        res.status(200).send(times);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.get("/day_times", async (req, res) => {
    try {
        const times = await dbFunctions.getDayTimes();
        res.status(200).send(times);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;