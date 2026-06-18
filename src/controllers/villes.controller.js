export class VilleController {
    constructor(service) {
        this.service = service;
    }

    listerVilles = async (req, res) => {
        const villes = await this.service.getToutesLesVilles();

        res.status(200).json(villes);
    };
}

import { villeService } from "../services/villes.service.js";
export const villeController = new VilleController(villeService);