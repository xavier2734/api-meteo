export class StatsController {
    constructor(service) {
        this.service = service;
    }

    getStats = async (req, res) => {
        try {
            const stats = await this.service.getStats();

            res.status(200).json(stats);
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    };
}

import { statsService } from "../services/stats.service.js";
export const statsController = new StatsController(statsService);