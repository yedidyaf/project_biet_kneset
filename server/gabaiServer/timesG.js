import dbFunctions from '../DatabaseFunctions/Times.js';
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
    
    
    router.post("/", async (req, res) => {
        try {
            const response = await dbFunctions.addTime(req.body);
            res.status(200);
            console.log(response);
            res.send(response);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    
    router.put('/:id', async (req, res) => {
    
        try {
            const response = await dbFunctions.putTimes(req.params.id, req.body);
            res.status(200);
            res.send(response);
        }
        catch (error) {
            res.status(500)
            res.send("problme in server!")
        }
    });
    
    router.delete('/:id', async (req, res) => {
        try {
            const response = await dbFunctions.deleteTime(req.params.id);
            res.status(200);
            res.send(response);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    
    export default router;