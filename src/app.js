// ============================================================
// app.js — Initialisation app
// ============================================================
import express from "express";
import relevesRoutes from "./routes/releves.routes.js";
import { relevesRepository } from "./repositories/reveles.repository.js";

const app = express();

await relevesRepository.init();

// ─── Middlewares ─────────────────────────────
app.use(express.json());

// ─── Routes ──────────────────────────────────
    app.get("/healthcheck", (req, res) => {
        res.json({ status: "ok" });
    });

    app.use("/releves", relevesRoutes);

export default app;
