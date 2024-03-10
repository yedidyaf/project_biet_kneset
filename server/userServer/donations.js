import dbFunctions from '../DatabaseFunctions/Donations.js';
import express from 'express';
const router = express.Router();


router.get("/", async (req, res) => {
    try {
        const donations = await dbFunctions.getDonations();
        res.status(200).send(donations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
export default router;