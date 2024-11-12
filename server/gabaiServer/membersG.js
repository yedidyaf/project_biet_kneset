import dbFunctions from '../DatabaseFunctions/Members.js';
import express from 'express';
import { sendMail } from '../mailes/sendEmail.js';
import { emailTemplates } from '../mailes/emailTemplates.js';
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
        const response = await dbFunctions.setMember({ ...req.body, is_v: 1 });
        console.log(response);
        sendMail(response.email, emailTemplates.approval(response.first_name, response.last_name))
        res.status(200).json(response);
    } catch (error) {
        if (error.message.includes("already exists")) {
            res.status(400).json({ error: "Member with this email already exists" });
        } else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
});
router.put('/:id', async (req, res) => {
    try {
        const response = await dbFunctions.putMember(req.params.id);
        sendMail(response.email, emailTemplates.approval(response.first_name, response.last_name))
        res.status(200).send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const response = await dbFunctions.deleteMember(req.params.id);
        sendMail(response.email, emailTemplates.rejection(response.first_name, response.last_name))
        res.status(200).send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
export default router;