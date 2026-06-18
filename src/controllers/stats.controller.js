export class StatsController {
    constructor(service) {
        this.service = service;
    }

    getStats = async (req, res) => {
        const stats = await this.service.getStats();

        res.status(200).json(stats);
    };
}

import { statsService } from "../services/stats.service.js";
export const statsController = new StatsController(statsService);