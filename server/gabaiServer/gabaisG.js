import dbFunctions from '../DatabaseFunctions/Gabais.js';
import express from 'express';

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const gabais = await dbFunctions.getGabais();
        res.status(200).send(gabais);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/", async (req, res) => {
    console.log(req.body);
    try {
        const response = await dbFunctions.addGabai(req.body);
        res.status(200);
        console.log(response);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const response = await dbFunctions.deleteGabaiByEmail(req.params.id);
        res.status(200);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



export default router;