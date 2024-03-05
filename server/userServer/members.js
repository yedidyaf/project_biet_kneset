import dbFunctions from '../DataB.js';
import express  from 'express';
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const members = await dbFunctions.getMembers();
        res.status(200).send(members);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.post("/", async (req, res) => {
    try {
        const response = await dbFunctions.setMember({ ...req.body, is_v: false });
        console.log(response);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).send("problem in server!");
    }
});
export default router;
