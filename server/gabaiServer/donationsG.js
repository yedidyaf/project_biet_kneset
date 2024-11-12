import dbFunctions from '../DatabaseFunctions/Donations.js';
import multer from 'multer';

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
        const donations = await dbFunctions.getDonations();
        res.status(200).send(donations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/", upload.single('file'), async (req, res) => {
    try {

        const savedImagePath = 'C:\\Users\\User\\Documents\\.html\\project_biet_kneset\\server\\images\\' + req.file.originalname;

        const updatedDonation = {
            ...req.body,
            image: savedImagePath,
        };

        updatedDonation.image = JSON.stringify(updatedDonation.image);
        const response = await dbFunctions.addDonation(updatedDonation);
        res.status(200);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.put('/:id', upload.single('file'), async (req, res) => {
    try {

        const savedImagePath = 'C:\\Users\\User\\Documents\\.html\\project_biet_kneset\\server\\images' + req.file.originalname;
        console.log(savedImagePath);

        const updatedDonation = {
            ...req.body,
            image: savedImagePath,
        };

        updatedDonation.image = JSON.stringify(updatedDonation.image);
        const response = await dbFunctions.putDonation(req.params.id, updatedDonation);
        res.status(200);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const response = await dbFunctions.deleteDonation(req.params.id);
        res.status(200);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
export default router;