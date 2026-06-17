import { parseCsv, writeCsv } from "../utils/csv.js";
import config from "../config.js";

/**
 * Repository chargé de l'accès aux données des relevés.
 * Gère le chargement, la recherche, l'ajout et la suppression.
 */
class ReleveRepository {
    /**
     * @param {string} csvPath Chemin du fichier CSV.
     */
    constructor(csvPath) {
        this.csvPath = csvPath;
        this.releves = [];
    }

    /**
     * Charge les relevés en mémoire depuis le CSV.
     *
     * @returns {Promise<void>}
     */
    async init() {
        this.releves = await parseCsv(this.csvPath);
    }

    // ─────────────────────────────
    // Tous les relevés
    // ─────────────────────────────

    /**
     * Retourne tous les relevés.
     *
     * @returns {Promise<Array>}
     */
    async findAll() {
        return this.releves;
    }

    // ─────────────────────────────
    // Un relevé par id
    // ─────────────────────────────

    /**
     * Recherche un relevé par son identifiant.
     *
     * @param {number} id Identifiant recherché.
     * @returns {Promise<Object|undefined>}
     */
    async findById(id) {
        return this.releves.find(releve =>
            releve.id === Number(id)
        );
    }

    // ─────────────────────────────
    // Sauvegarde
    // ─────────────────────────────

    /**
     * Ajoute un nouveau relevé et lui attribue un identifiant.
     *
     * @param {Releve} releve Relevé à enregistrer.
     * @returns {Promise<Releve>}
     */
    async save(releve) {
        const maxId = this.releves.length > 0
            ? Math.max(...this.releves.map(r => r.id))
            : 0;

        releve.id = maxId + 1;

        this.releves.push(releve);

        await writeCsv(this.csvPath, this.releves);

        return releve;
    }

    // ─────────────────────────────
    // Suppression
    // ─────────────────────────────

    /**
     * Supprime un relevé par son identifiant.
     *
     * @param {number} id Identifiant du relevé.
     * @returns {Promise<Object|undefined>} Relevé supprimé.
     */
    async deleteById(id) {
        let releve;
        releve = this.releves.find(releve =>
            releve.id === Number(id)
        );

        this.releves = this.releves.filter(releve =>
            releve.id !== Number(id)
        );

        await writeCsv(this.csvPath, this.releves);

        return releve
    }
}


// on exporte une instance prête à l'emploi (les services l'importent)
export const relevesRepository = new ReleveRepository(config.csvPath);