import { Router } from "express";
import { releveController as controller } from "../controllers/releves.controller.js";

/**
 * Routes HTTP associées aux relevés météorologiques.
 *
 * GET    /releves
 * GET    /releves/:id
 * POST   /releves
 * DELETE /releves/:id
 */
const router = Router();

/**
 * @openapi
 * /releves:
 *   get:
 *     summary: Liste tous les relevés météo
 *     responses:
 *       200:
 *         description: Tableau des relevés
 */
router.get("/", controller.listerReleves);

/**
 * @openapi
 * /releves/{id}:
 *   get:
 *     summary: Récupère un relevé par son identifiant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Relevé trouvé
 *       404:
 *         description: Relevé introuvable
 */
router.get("/:id", controller.getUnReleve);

/**
 * @openapi
 * /releves:
 *   post:
 *     summary: Crée un nouveau relevé météo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ville:
 *                 type: string
 *               date:
 *                 type: string
 *               temperatureMin:
 *                 type: number
 *               temperatureMax:
 *                 type: number
 *               description:
 *                 type: string
 *               humidite:
 *                 type: number
 *     responses:
 *       201:
 *         description: Relevé créé
 *       400:
 *         description: Données invalides
 */
router.post("/", controller.postUnReleve);

/**
 * @openapi
 * /releves/{id}:
 *   put:
 *     summary: Modifie un relevé météo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ville:
 *                 type: string
 *               date:
 *                 type: string
 *               temperatureMin:
 *                 type: number
 *               temperatureMax:
 *                 type: number
 *               description:
 *                 type: string
 *               humidite:
 *                 type: number
 *     responses:
 *       200:
 *         description: Relevé modifié
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Relevé introuvable
 */
router.put("/:id", controller.putUnReleve);

/**
 * @openapi
 * /releves/{id}:
 *   delete:
 *     summary: Supprime un relevé
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Relevé supprimé
 *       404:
 *         description: Relevé introuvable
 */
router.delete("/:id", controller.deleteUnReleve);

export default router;