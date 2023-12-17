import express from 'express';
import path, { parse } from 'path';
import cors from 'cors';
import dbFunctions from '../server/DataB.js';
const app = express();
console.log("kkkk");
const port = process.env.PORT || 4000;
app.use(cors());
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.method);
    next();
})
app.get("/home", async (req, res) => {
        try {
            const article = await dbFunctions.getArticalHome();
            res.status(200).send(article);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    app.get("/news", async (req, res) => {
        try {
            const articles = await dbFunctions.getNews();
            res.status(200).send(articles);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    app.get("/times", async (req, res) => {
        try {
            const times = await dbFunctions.getTimes();
            res.status(200).send(times);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    app.get("/members", async (req, res) => {
        try {
            const members = await dbFunctions.getMembers();
            console.log(members);
            res.status(200).send(members);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    app.get("/donations", async (req, res) => {
        try {
            const donations = await dbFunctions.getDonations();
            res.status(200).send(donations);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    app.post("/members", async (req, res) => {
        try {
            const response = await dbFunctions.setMember({...req.body, is_v: false});
            console.log(response);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).send("problem in server!");
        }
    });
// פונקציות לגבאים בלבד
app.get("/gabai/home", async (req, res) => {
    try {
        const article = await dbFunctions.getArticalHome();
        res.status(200).send(article);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.post("/gabai/artical_home", async (req, res) => {
    try {
        const response = await dbFunctions.addArticalHome(req.body);
        res.status(200);
        console.log(response);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.put('/gabai/artical_home/:id', async (req, res) => {
    try {
        const response = await dbFunctions.putArticalHome(req.params.id, req.body);
        res.status(200);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.get("/gabai/news", async (req, res) => {
    try {
        const articles = await dbFunctions.getNews();
        res.status(200).send(articles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/gabai/news", async (req, res) => {
    try {
        const response = await dbFunctions.addArticalNews(req.body);
        res.status(200);
        console.log(response);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.put('/gabai/news/:id', async (req, res) => {
    try {
        const response = await dbFunctions.putArticleNews(req.params.id, req.body);
        res.status(200);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.delete('/gabai/news/:id', async (req, res) => {
    try {
        const response = await dbFunctions.deleteArticleNews(req.params.id);
        res.status(200);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/gabai/times", async (req, res) => {
    try {
        const times = await dbFunctions.getTimes();
        res.status(200).send(times);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.post("/gabai/times", async (req, res) => {
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

 app.put('/gabai/times/:id', async (req, res) => {
            
            try {
                const response = await dbFunctions.putTimes(req.params.id);
                res.status(200);
                res.send(response);
            }
            catch (error) {
                res.status(500)
                res.send("problme in server!")
            }
        });

        app.delete('/gabai/times/:id', async (req, res) => {
            try {
                const response = await dbFunctions.deleteTime(req.params.id);
                res.status(200);
                res.send(response);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        
app.get("/gabai/members", async (req, res) => {
    try {
        const members = await dbFunctions.getMembers();
        res.status(200).send(members);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.post("/gabai/members",async (req, res) => {
    try {
        const response = await dbFunctions.setMember({...req.body, is_v: 1});
        console.log(response);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).send("problem in server!");
    }
    });

    app.put('/gabai/members/:id', async (req, res) => {
        try {
            const response = await dbFunctions.putMember(req.params.id);
            res.status(200);
            res.send(response);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    app.delete('/gabai/members/:id', async (req, res) => {
        try {
            const response = await dbFunctions.deleteMember(req.params.id);
            res.status(200);
            res.send(response);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

app.get("/gabai/donations", async (req, res) => {
    try {
        const donations = await dbFunctions.getDonations();
        res.status(200).send(donations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/gabai/donations", async (req, res) => {
    try {
        const response = await dbFunctions.addDonation(req.body);
        res.status(200);
        console.log(response);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.put('/gabai/donations/:id', async (req, res) => {
    try {
        const response = await dbFunctions.putDonation(req.params.id, req.body);
        res.status(200);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.delete('/gabai/donations/:id', async (req, res) => {
    try {
        const response = await dbFunctions.deleteDonation(req.params.id);
        res.status(200);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.get("/gabai/gabais", async (req, res) => {
    try {
        const gabais = await dbFunctions.getGabais();
        res.status(200).send(gabais);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/gabai/gabais", async (req, res) => {
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

app.delete('/gabai/gabais/:id', async (req, res) => {
    try {
        const response = await dbFunctions.deleteGabai(req.params.id);
        res.status(200);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

   

 app.listen(port);

