/**
 * @typedef {Object} ReleveData
 * @property {?number} id
 * @property {string} ville
 * @property {string} date
 * @property {number} temperatureMin
 * @property {number} temperatureMax
 * @property {string} description
 * @property {number} humidite
 */
import Releve from "../models/releve.model.js";

/**
 * Couche métier des relevés météorologiques.
 */
export class ReleveService {
    /**
     * @param {ReleveData} data
     */
    constructor(repository) {
        this.repository = repository; // dépendance injectée, pas créée ici
    }

    /**
     * Retourne tous les relevés.
     *
     * @returns {Promise<Array>}
     */
    async getTousLesReleves() {
        const releves = await this.repository.findAll();

        return releves;
    }

    /**
     * Recherche un relevé par son identifiant.
     *
     * @param {number} id Identifiant recherché.
     * @returns {Promise<Object|undefined>}
     */
    async getReleveParId(id) {
        return await this.repository.findById(Number(id));
    }

    /**
     * Valide puis enregistre un nouveau relevé.
     *
     * @param {Object} data Données du relevé.
     * @returns {Promise<Releve>}
     * @throws {Error} Si les données sont invalides.
     */
    async postReleve(data) {
        const releve = new Releve(data);

        const erreurs = releve.valider();
        if (erreurs.length > 0) {
            throw new Error(erreurs.join(", "));
        }

        return await this.repository.save(releve);
    }

    /**
     * Valide puis modifie un relevé.
     *
     * @param {number} id id du relevé.
     * @param {Object} data Données du relevé.
     * @returns {Promise<Releve>}
     * @throws {Error} Si les données sont invalides.
     */
    async putReleve(id, data) {

        const releve = new Releve({
            id: Number(id),
            ...data
        });

        const erreurs = releve.valider();

        if (erreurs.length > 0) {
            throw new Error(erreurs.join(", "));
        }

        return await this.repository.update(id, releve);
    }

    /**
     * Supprime un relevé par son identifiant.
     *
     * @param {number} id Identifiant du relevé.
     * @returns {Promise<Object|undefined>}
     */
    async deleteReleveParId(id) {
        return await this.repository.deleteById(Number(id));
    }
}

// on câble le service avec le repository, et on exporte l'instance prête
import { relevesRepository } from "../repositories/reveles.repository.js";
export const releveService = new ReleveService(relevesRepository);