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
        const villes = await this.service.getToutesLesVilles();

        res.status(200).json(villes);
    };

    /**
     * Retourne la ville avec ses statistiques.
     *
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     * @returns {Promise<void>}
     */
    afficherVille = async (req, res) => {
        const name = req.params.ville;
        const ville = await this.service.getLaVille(name);

        if (!ville) {
            return res.status(404).json({
                error: "Ville introuvable"
            });
        }

        res.status(200).json(ville);
    };
}

import { villeService } from "../services/villes.service.js";
export const villeController = new VilleController(villeService);