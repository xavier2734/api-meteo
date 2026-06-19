// ============================================================
// app.js — Initialisation app
// ============================================================
import express from "express";
import relevesRoutes from "./routes/releves.routes.js";
import villesRoutes from "./routes/villes.routes.js";
import { relevesRepository } from "./repositories/reveles.repository.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import statsRoutes from "./routes/stats.routes.js";
import { logger } from "./middlewares/logger.js";
import { gestionErreurs } from "./middlewares/error.js";

/**
 * Application Express.
 *
 * Configure :
 * - les middlewares
 * - les routes
 */
const app = express();

const spec = swaggerJsdoc({
    definition: { openapi: "3.0.0", info: { title: "MétéoAPI", version: "1.0.0" } },
    apis: ["./src/routes/*.js"], // fichiers où chercher les annotations
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec));

// ─── Middlewares ─────────────────────────────
app.use(express.json());
app.use(logger);

// ─── Routes ──────────────────────────────────
app.get("/healthcheck", (req, res) => {
    res.json({ status: "ok" });
});

app.use("/releves", relevesRoutes);
app.use("/stats", statsRoutes);
app.use("/villes", villesRoutes);

app.use(gestionErreurs);

export default app;
