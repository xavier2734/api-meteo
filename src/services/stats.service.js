/**
 * Couche métier des statistiques météo.
 */
export class StatsService {

    /**
     * @param {Object} repository Repository des relevés.
     */
    constructor(repository) {
        this.repository = repository;
    }

    /**
     * Retourne la température minimale globale.
     *
     * @returns {Promise<number>}
     */
    async getTemperatureMinGlobale() {
        const releves = await this.repository.findAll();

        return Math.min(
            ...releves.map(r => r.temperatureMin)
        );
    }

    /**
     * Retourne la température maximale globale.
     *
     * @returns {Promise<number>}
     */
    async getTemperatureMaxGlobale() {
        const releves = await this.repository.findAll();

        return Math.max(
            ...releves.map(r => r.temperatureMax)
        );
    }

    /**
     * Retourne la température moyenne globale.
     *
     * @returns {Promise<number>}
     */
    async getTemperatureMoyenne() {
        const releves = await this.repository.findAll();

        const somme = releves.reduce(
            (total, releve) => total + releve.temperatureMax,
            0
        );

        return somme / releves.length;
    }

    /**
     * Retourne l'humidité moyenne globale.
     *
     * @returns {Promise<number>}
     */
    async getHumiditeMoyenne() {
        const releves = await this.repository.findAll();

        const somme = releves.reduce(
            (total, releve) => total + releve.humidite,
            0
        );

        return somme / releves.length;
    }

    /**
     * Retourne toutes les statistiques globales.
     *
     * @returns {Promise<Object>}
     */
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