/**
 * Couche métier des villes.
 */
export class VilleService {

    /**
     * @param {Object} repository Repository des relevés.
     */
    constructor(repository) {
        this.repository = repository;
    }

    /**
     * Retourne la liste des villes distinctes avec leurs statistiques.
     *
     * @returns {Promise<Array>}
     */
    async getToutesLesVilles() {
        const releves = await this.repository.findAll();

        const villes = [
            ...new Set(
                releves.map(r => r.ville)
            )
        ];

        return villes.map(ville => {

            const relevesVille =
                releves.filter(r => r.ville === ville);

            const temperatureMinMoyenne =
                (relevesVille.reduce(
                    (sum, r) => sum + r.temperatureMin,
                    0
                ) / relevesVille.length).toFixed(1);

            const temperatureMaxMoyenne =
                (relevesVille.reduce(
                    (sum, r) => sum + r.temperatureMax,
                    0
                ) / relevesVille.length).toFixed(1);

            return {
                ville,
                nombreReleves: relevesVille.length,
                temperatureMinMoyenne,
                temperatureMaxMoyenne
            };
        });
    }

    /**
     * Retourne la ville distincte avec ses statistiques.
     *
     * @returns {Promise<Object|undefined>}
     */
    async getLaVille(ville) {
        const villes = (await this.getToutesLesVilles());
        
        const filtered = villes.filter((element) => element.ville === ville);
        
        return filtered[0] ?? undefined;
    }
}

import { relevesRepository } from "../repositories/reveles.repository.js";
export const villeService = new VilleService(relevesRepository);