// ============================================================
// app.js — Initialisation app
// ============================================================
import express from "express";
import { parseCsv } from "./utils/csv.js";

const app = express();

// ─── Middlewares ─────────────────────────────
app.use(express.json());

// ─── Routes ──────────────────────────────────
    app.get("/healthcheck", (req, res) => {
        res.json({ status: "ok" });
    });

    app.get("/releves", async (req, res) => {
        try {
            const parsedCsv = await parseCsv("../data/meteo.csv");
            console.log("check parsedCsv:", parsedCsv);

            res.status(200).json(parsedCsv);
        } catch (err) {
            console.error("Erreur CSV:", err);
            res.status(500).json({ error: "CSV import failed" });
        }
    });


export default app;
