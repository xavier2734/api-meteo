export class StatsService {
    constructor(repository) {
        this.repository = repository;
    }

    async getTemperatureMinGlobale() {
        const releves = await this.repository.findAll();

        return Math.min(
            ...releves.map(r => r.temperatureMin)
        );
    }

    async getTemperatureMaxGlobale() {
        const releves = await this.repository.findAll();

        return Math.max(
            ...releves.map(r => r.temperatureMax)
        );
    }

    async getTemperatureMoyenne() {
        const releves = await this.repository.findAll();

        const somme = releves.reduce(
            (total, releve) => total + releve.temperatureMax,
            0
        );

        return somme / releves.length;
    }

    async getHumiditeMoyenne() {
        const releves = await this.repository.findAll();

        const somme = releves.reduce(
            (total, releve) => total + releve.humidite,
            0
        );

        return somme / releves.length;
    }

    async getStats() {
        return {
            temperatureMinGlobale:
                await this.getTemperatureMinGlobale(),

            temperatureMaxGlobale:
                await this.getTemperatureMaxGlobale(),

            temperatureMoyenne:
                await this.getTemperatureMoyenne(),

            humiditeMoyenne:
                await this.getHumiditeMoyenne()
        };
    }
}

import { relevesRepository } from "../repositories/reveles.repository.js";

export const statsService = new StatsService(relevesRepository);

