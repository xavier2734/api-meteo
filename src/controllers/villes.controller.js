/**
 * Contrôleur des villes.
 * Reçoit les requêtes HTTP et délègue le traitement au service.
 */
export class VilleController {

    /**
     * @param {import("../services/villes.service.js").VilleService} service
     */
    constructor(service) {
        this.service = service;
    }

    /**
     * Retourne la liste des villes avec leurs statistiques.
     *
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     * @returns {Promise<void>}
     */
    listerVilles = async (req, res) => {
        try {
            const villes = await this.service.getToutesLesVilles();

            res.status(200).json(villes);

        } catch (error) {
            console.error("error on get villes:", error.message);

            res.status(500).json({
                error: error.message
            });
        }
    };
}

import { villeService } from "../services/villes.service.js";
export const villeController = new VilleController(villeService);