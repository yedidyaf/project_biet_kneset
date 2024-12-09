// api_image.js
import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const requestedPath = req.query.path;
        console.log('Requested image path:', requestedPath);

        let normalizedPath;
        
        // בדיקה האם זה נתיב מלא או יחסי
        if (path.isAbsolute(requestedPath)) {
            // אם זה נתיב מלא, השתמש בו ישירות
            normalizedPath = requestedPath;
        } else {
            // אם זה נתיב יחסי, הוסף את הנתיב הבסיסי
            normalizedPath = path.join(__dirname, '../../', requestedPath);
        }

        console.log('Normalized path:', normalizedPath);

        // בדיקת קיום הקובץ
        try {
            await fs.access(normalizedPath);
            console.log('File exists');
        } catch {
            console.log('File does not exist');
            throw new Error('File not found');
        }

        const imageBuffer = await fs.readFile(normalizedPath);
        console.log('Image loaded successfully');

        // קביעת Content-Type לפי סיומת הקובץ
        const ext = path.extname(normalizedPath).toLowerCase();
        const contentType = ext === '.png' ? 'image/png' : 
                          ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 
                          'application/octet-stream';

        res.writeHead(200, {
            'Content-Type': contentType,
            'Content-Length': imageBuffer.length,
        });
        res.end(imageBuffer);
    } catch (error) {
        console.error('Error serving image:', error);
        res.status(404).json({ error: 'Image not found' });
    }
});

export default router;