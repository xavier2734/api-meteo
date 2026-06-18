import { Router } from "express";
import { statsController } from "../controllers/stats.controller.js";

/**
 * Routes HTTP associées aux statistiques météo.
 *
 * GET /stats
 */
const router = Router();

/**
 * @openapi
 * /stats:
 *   get:
 *     summary: Retourne les statistiques globales
 *     responses:
 *       200:
 *         description: Statistiques calculées à partir des relevés
 */
router.get("/", statsController.getStats);

export default router;