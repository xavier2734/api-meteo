/**
 * Représente un relevé météorologique.
 */
class Releve {
    #id;
    #ville;
    #date;
    #temperatureMin
    #temperatureMax
    #description
    #humidite

    /**
   * Crée une instance de Releve.
   *
   * @param {Object} data Données du relevé.
   * @param {?number} [data.id=null] Identifiant du relevé.
   * @param {string} data.ville Nom de la ville.
   * @param {string} data.date Date du relevé.
   * @param {number|string} data.temperatureMin Température minimale.
   * @param {number|string} data.temperatureMax Température maximale.
   * @param {string} data.description Description météo.
   * @param {number|string} data.humidite Taux d'humidité.
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
    * Vérifie la validité du relevé.
    *
    * @returns {string[]} Liste des erreurs de validation.
    */
    valider() {

        const erreurs = [];

        if (!this.#ville) {
            erreurs.push("La ville est obligatoire");
        }

        if (typeof this.#ville !== String) {
            erreurs.push("La ville doit être une chaîne de caractères.");
        }

        if (!this.#date) {
            erreurs.push("La date est obligatoire");
        }

        if (typeof this.#date !== String) {
            erreurs.push("La date doit être une chaîne de caractères.");
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
            erreurs.push("La description est obligatoire");
        }

        if (typeof this.#description !== String) {
            erreurs.push("La description doit être une chaîne de caractères.");
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
     * Construit un relevé à partir d'une ligne CSV.
     *
     * @param {Object} ligne Ligne CSV parsée.
     * @returns {Releve}
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