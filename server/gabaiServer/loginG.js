import dbFunctions from '../DatabaseFunctions/Gabais.js';
import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const response = await dbFunctions.checkGabai(req.body);
         
        if (response) {
           
            const secretKey = process.env.SECRET_KEY;

            const user = {
                member_id: response.member_id,
                user_id: response.user_id,
                user_name: response.user_name 
            };
            
            const token = jwt.sign(user, secretKey, { expiresIn: '1h' });
            console.log("lll");
            res.status(200).json({user_id:response.user_id, token });

        } else {
            console.log(404);
            res.status(404).json({ error: "גבאי לא נמצא" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "שגיאת שרת פנימית" });
    }
});
export default router;