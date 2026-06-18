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
 * /villes{ville}:
 *   get:
 *     summary: Liste les villes distinctes avec leurs statistiques
 *     responses:
 *       200:
 *         description: Liste des villes et agrégats calculés
 */
router.get("/", controller.listerVilles);

/**
 * @openapi
 * /villes/:
 *   get:
 *     summary: Liste une ville distincte avec ses statistiques
 *     responses:
 *       200:
 *         description: Liste une ville et agrégats calculés
 */
router.get("/:ville", controller.afficherVille);

export default router;