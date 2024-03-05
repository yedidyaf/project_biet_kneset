import dbFunctions from '../DataB.js';
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
    console.log("mmmm");
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
            const imagePath = 'C:\\Users\\user\\Desktop\\project_biet_kneset\\server\\images\\' + file.originalname;
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
export default router;