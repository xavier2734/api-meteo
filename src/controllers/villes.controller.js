export class VilleController {
    constructor(service) {
        this.service = service;
    }

    listerVilles = async (req, res) => {
        try {
            const villes =
                await this.service.getToutesLesVilles();

            res.status(200).json(villes);

        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    };
}

import { villeService } from "../services/villes.service.js";
export const villeController = new VilleController(villeService);