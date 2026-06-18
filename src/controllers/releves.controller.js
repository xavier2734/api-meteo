/**
 * Contrôleur des relevés météorologiques.
 * Reçoit les requêtes HTTP et délègue le traitement au service.
 */
export class ReleveController {
    /**
     * @param {import("../services/releves.service.js").ReleveService} service
     */
    constructor(service) {
        this.service = service; // service injecté
    }

    /**
     * Retourne la liste complète des relevés.
     *
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     * @returns {Promise<void>}
     */
    listerReleves = async (req, res) => {
        const releves = await this.service.getTousLesReleves();

        res.status(200).json(releves);
    };

    /**
     * Retourne un relevé à partir de son identifiant.
     *
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     * @returns {Promise<void>}
     */
    getUnReleve = async (req, res) => {
        const releve = await this.service.getReleveParId(req.params.id);

        if (!releve) {
            return res.status(404).json({
                error: "Relevé introuvable"
            });
        }

        res.status(200).json(releve);
    };

    /**
     * Crée un nouveau relevé météorologique.
     *
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     * @returns {Promise<void>}
     */
    postUnReleve = async (req, res) => {
        const releve = await this.service.postReleve(req.body);

        res.status(201).json(releve);
    };

    /**
    * Modifie un relevé météorologique.
    *
    * @param {import("express").Request} req
    * @param {import("express").Response} res
    * @returns {Promise<void>}
    */
    putUnReleve = async (req, res) => {
        const releve = await this.service.putReleve(req.params.id, req.body);

        if (!releve) {
            return res.status(404).json({
                error: "Relevé introuvable"
            });
        }

        res.status(201).json(releve);
    };

    /**
     * Supprime un relevé à partir de son identifiant.
     *
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     * @returns {Promise<void>}
     */
    deleteUnReleve = async (req, res) => {
            const releveSupprime = await this.service.deleteReleveParId(req.params.id);

            if (!releveSupprime) {
                return res.status(404).json({
                    error: "Relevé introuvable"
                });
            }

            res.status(204).send();
    };
}

import { releveService } from "../services/releves.service.js";
export const releveController = new ReleveController(releveService);
