class Releve {
    #id;
    #ville;
    #date;
    #temperatureMin
    #temperatureMax
    #description
    #humidite

    /**
     * 
     * @param {Object} data 
     */
    constructor(data) {
        this.#id = data.id ?? null;
        this.#ville = data.ville;
        this.#date = data.date;
        this.#temperatureMin = data.temperatureMin;
        this.#temperatureMax = data.temperatureMax;
        this.#description = data.description;
        this.#humidite = data.humidite;
    }

    // ─── Getters ─────────────────────────────
    get id() {
        return this.#id;
    }

    get ville() {
        return this.#ville;
    }

    get date() {
        return this.#date;
    }

    get temperatureMin() {
        return this.#temperatureMin;
    }

    get temperatureMax() {
        return this.#temperatureMax;
    }

    get description() {
        return this.#description;
    }

    get humidite() {
        return this.#humidite;
    }

    // ─── Setters ─────────────────────────────
    set id(newId) {
        this.#id = Number(newId);
    }

    set ville(newVille) {
        this.#ville = newVille
    }

    set date(newDate) {
        this.#date = newDate
    }

    set temperatureMin(newTemperatureMin) {
        this.#temperatureMin = Number(newTemperatureMin)
    }


    set temperatureMax(newTemperatureMax) {
        this.#temperatureMax = Number(newTemperatureMax)
    }


    set description(newDescription) {
        this.#description = newDescription
    }


    set humidite(newHumidite) {
        this.#humidite = Number(newHumidite)
    }


    // ─── Validation ──────────────────────────
    /** 
     * @returns {String[]} 
     */
    valider() {

        const erreurs = [];

        if (!this.#ville) {
            erreurs.push("La ville est obligatoire");
        }

        if (!this.#date) {
            erreurs.push("La date est obligatoire");
        }

        if (!this.#temperatureMin) {
            erreurs.push("La temperatureMin est obligatoire");
        }

        if (Number.isNaN(this.#temperatureMin)) {
            erreurs.push("temperature minimale invalide");
        }

        if (!this.#temperatureMax) {
            erreurs.push("La temperature maximale est obligatoire");
        }

        if (Number.isNaN(this.#temperatureMax)) {
            erreurs.push("temperatureMax invalide");
        }

        if (!this.#description) {
            erreurs.push("La desc#description est obligatoire");
        }

        if (!this.#humidite) {
            erreurs.push("L'humidite est obligatoire");
        }

        if (Number.isNaN(this.#humidite)) {
            erreurs.push("humidite invalide");
        }

        return erreurs;
    }

    // ─── JSON API ────────────────────────────
    /** 
     * @returns {Object} 
     */
    toJSON() {
        return {
            ville: this.#ville,
            date: this.#date,
            temperatureMin: this.#temperatureMin,
            temperatureMax: this.#temperatureMax,
            description: this.#description,
            humidite: this.#humidite
        };
    }

    // ─── CSV → Releve ────────────────────────
    static depuisLigneCsv(ligne) {

        return new Releve({
            id: ligne.id,
            ville: ligne.ville,
            date: ligne.date,
            temperatureMin: ligne.temperatureMin,
            temperatureMax: ligne.temperatureMax,
            description: ligne.description,
            humidite: ligne.humidite
        });
    }
}

export default Releve;