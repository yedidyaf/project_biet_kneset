import dbFunctions from '../DatabaseFunctions/Donations.js';
import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const router = express.Router();


const imagesDir = path.join(__dirname, '../../images');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const imagePath = path.join(__dirname, '../../images');
        if (!fs.existsSync(imagePath)) {
            fs.mkdirSync(imagePath, { recursive: true });
        }
        cb(null, imagePath);
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now();
        const filename = `image-${uniqueSuffix}${path.extname(file.originalname)}`;
        // שמירת הנתיב היחסי לתיקיית images
        req.savedImagePath = 'images/' + filename;
        cb(null, filename);
    }
});

const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        // בדיקת סוג הקובץ
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    }
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

router.post('/', upload.single('file'), async (req, res) => {
    try {
        const donationData = {
            title: req.body.title,
            content: req.body.content,
            defaultAmount: req.body.defaultAmount || '36',
            images: req.savedImagePath
        };
        const result = await dbFunctions.addDonation(donationData);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error adding donation:', error);
        res.status(500).json({ error: error.message });
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


router.get("/transactions", async (req, res) => {    
    try {
        const transactions = await dbFunctions.getDonationTransactions(req.params.id);
        console.log(transactions);
        
        res.status(200).send(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


export default router;