/**
 * Contrôleur des statistiques météo.
 * Reçoit les requêtes HTTP et délègue le traitement au service.
 */
export class StatsController {

    /**
     * @param {import("../services/stats.service.js").StatsService} service
     */
    constructor(service) {
        this.service = service;
    }

    /**
     * Retourne les statistiques globales.
     *
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     * @returns {Promise<void>}
     */
    getStats = async (req, res) => {
        const stats = await this.service.getStats();

        res.status(200).json(stats);
    };
}

import { statsService } from "../services/stats.service.js";
export const statsController = new StatsController(statsService);