export class VilleService {
    constructor(repository) {
        this.repository = repository;
    }

    async getToutesLesVilles() {
        const releves = await this.repository.findAll();

        const villes = [...new Set(
            releves.map(r => r.ville)
        )];

        return villes.map(ville => {

            const relevesVille =
                releves.filter(r => r.ville === ville);

            const temperatureMinMoyenne =
                relevesVille.reduce(
                    (sum, r) => sum + r.temperatureMin,
                    0
                ) / relevesVille.length;

            const temperatureMaxMoyenne =
                relevesVille.reduce(
                    (sum, r) => sum + r.temperatureMax,
                    0
                ) / relevesVille.length;

            return {
                ville,
                nombreReleves: relevesVille.length,
                temperatureMinMoyenne,
                temperatureMaxMoyenne
            };
        });
    }
}

import { relevesRepository } from "../repositories/reveles.repository.js";
export const villeService = new VilleService(relevesRepository);