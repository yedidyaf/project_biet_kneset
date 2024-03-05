
import express, { json } from 'express';
import fs from 'fs/promises';
const router = express.Router();

router.get('/', async (req, res) => {
    const imagePath = req.query.path;
    try {
        const imageBuffer = await fs.readFile(imagePath);

        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': imageBuffer.length,
        });
        res.end(imageBuffer);
    } catch (error) {
        console.error('שגיאה בקריאת התמונה:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
export default router;