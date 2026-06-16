import express from "express";

const app = express();

app.get("/healthcheck", (req, res) => {

    res.json({
        status: "ok"
    });

});

app.listen(3000, () => {

    console.log("Serveur démarré");

});