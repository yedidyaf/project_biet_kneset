import dbFunctions from '../DatabaseFunctions/ArticalHome.js';
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
        const article = await dbFunctions.getArticalHome();
        res.status(200).send(article);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.post('', upload.array('images', 5), async (req, res) => {
    try {
        const savedImagePaths = req.files.map((file) => {
            const imagePath = 'C:\\Users\\User\\Documents\\.html\\project_biet_kneset\\server\\images\\' + file.originalname;
            return imagePath;
        });
        const updatedArticle = {
            ...req.body,
            images: savedImagePaths.map((path) => path.replace('images/', '')), // שינוי נתיבי התמונות למבנה נכון
        };
        updatedArticle.images = JSON.stringify(updatedArticle.images);
        const response = await dbFunctions.putArticalHome(updatedArticle);
        res.status(200);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.put('', upload.array('images', 5), async (req, res) => {
    console.log('Request Body:', req.body);
    console.log('Uploaded Files:', req.files);

    try {
        // וידוא המרת המחרוזת למערך בצורה נכונה
        const imagesToDeleteIndexes = req.body.toDelete ? JSON.parse(req.body.toDelete) : [];
        console.log('Images to delete indexes:', imagesToDeleteIndexes);

        const article = await dbFunctions.getArticalHome();
        console.log('Current article images:', article.images);

        // המרת האינדקסים למספרים
        const imagesToDeleteIndexesNumbers = imagesToDeleteIndexes.map(index => parseInt(index, 10));
        const newArrImages = article.images.filter((_, index) => !imagesToDeleteIndexesNumbers.includes(index));
        console.log('Filtered images:', newArrImages);

        // יצירת רשימת נתיבי התמונות המעודכנת
        const savedImagePaths = [
            ...newArrImages,
            ...req.files.map((file) => {
                const imagePath = 'C:\\Users\\User\\Documents\\.html\\project_biet_kneset\\server\\images\\' + file.originalname;
                return imagePath;
            })
        ];

        const updatedArticle = {
            ...req.body,
            images: savedImagePaths
        };

        // הפיכת רשימת התמונות למחרוזת JSON
        updatedArticle.images = JSON.stringify(savedImagePaths);
        const response = await dbFunctions.putArticalHome(updatedArticle);
        res.status(200).send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


export default router;