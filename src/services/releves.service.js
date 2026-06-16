import Releve from "../models/releve.model.js";

export class ReleveService {
    constructor(repository) {
        this.repository = repository; // dépendance injectée, pas créée ici
    }

    async getTousLesReleves() {
        const releves = await this.repository.findAll();

        return releves;
    }

    async getReleveParId(id) {
        return await this.repository.findById(Number(id));
    }

    async postReleve(data) {
        const releve = new Releve(data);

        const erreurs = releve.valider();
        if (erreurs.length > 0) {
            throw new Error(erreurs.join(", "));
        }

        return await this.repository.save(releve);
    }

    async deleteReleveParId(id) {
        return await this.repository.deleteById(Number(id));
    }
}

// on câble le service avec le repository, et on exporte l'instance prête
import { relevesRepository } from "../repositories/reveles.repository.js";
export const releveService = new ReleveService(relevesRepository);