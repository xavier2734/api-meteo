import { Router } from "express";
import { villeController as controller } from "../controllers/villes.controller.js";

/**
 * Routes HTTP associées aux villes.
 *
 * GET /villes
 */
const router = Router();

/**
 * @openapi
 * /villes:
 *   get:
 *     summary: Liste les villes distinctes avec leurs statistiques
 *     responses:
 *       200:
 *         description: Liste des villes et agrégats calculés
 */
router.get("/", controller.listerVilles);

export default router;