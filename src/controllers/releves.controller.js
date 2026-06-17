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
        try {
            const releves = await this.service.getTousLesReleves();
            res.status(200).json(releves);
        } catch (error) {
            console.error("error on get all:", error.message);
            res.status(500).json({ error: error.message });
        }
    };

    /**
     * Retourne un relevé à partir de son identifiant.
     *
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     * @returns {Promise<void>}
     */
    getUnReleve = async (req, res) => {
        try {
            const releve = await this.service.getReleveParId(req.params.id);

            if (!releve) {
                return res.status(404).json({
                    error: "Relevé introuvable"
                });
            }

            res.status(200).json(releve);

        } catch (error) {
            console.error("error on get one releve:", error.message);
            res.status(500).json({ error: error.message });
        }
    };

    /**
     * Crée un nouveau relevé météorologique.
     *
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     * @returns {Promise<void>}
     */
    postUnReleve = async (req, res) => {
        try {
            const releve = await this.service.postReleve(req.body);

            res.status(201).json(releve);

        } catch (error) {
            console.error("error on post:", error.message);

            res.status(400).json({
                error: error.message
            });
        }
    };

    /**
    * Modifie un relevé météorologique.
    *
    * @param {import("express").Request} req
    * @param {import("express").Response} res
    * @returns {Promise<void>}
    */
    putUnReleve = async (req, res) => {
        try {
            const releve = await this.service.putReleve(req.params.id, req.body);

            if (!releve) {
                return res.status(404).json({
                    error: "Relevé introuvable"
                });
            }

            res.status(201).json(releve);

        } catch (error) {
            console.error("error on post:", error.message);

            res.status(400).json({
                error: error.message
            });
        }
    };

    /**
     * Supprime un relevé à partir de son identifiant.
     *
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     * @returns {Promise<void>}
     */
    deleteUnReleve = async (req, res) => {
        try {
            const releveSupprime = await this.service.deleteReleveParId(req.params.id);

            if (!releveSupprime) {
                return res.status(404).json({
                    error: "Relevé introuvable"
                });
            }

            res.status(204).send();

        } catch (error) {
            console.error("error on delete one releve:", error.message);
            res.status(500).json({ error: error.message });
        }
    };
}

import { releveService } from "../services/releves.service.js";
export const releveController = new ReleveController(releveService);