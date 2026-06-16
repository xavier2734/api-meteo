import { parseCsv, writeCsv } from "../utils/csv.js";
import config from "../config.js";

class ReleveRepository {
    constructor(csvPath) {
        this.csvPath = csvPath;
        this.releves = [];
    }

    async init() {
        this.releves = await parseCsv(this.csvPath);
    }

    // ─────────────────────────────
    // Tous les relevés
    // ─────────────────────────────
    async findAll() {
        return this.releves;
    }

    // ─────────────────────────────
    // Un relevé par id
    // ─────────────────────────────
    async findById(id) {
        return this.releves.find(releve =>
            releve.id === Number(id)
        );
    }

    // ─────────────────────────────
    // Sauvegarde
    // ─────────────────────────────
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
    async deleteById(id) {
        let releve;
        releve = this.releves.find(releve =>
            releve.id === Number(id)
        );

        console.log("repo: ", releve)

        this.releves = this.releves.filter(releve =>
            releve.id !== Number(id)
        );

        await writeCsv(this.csvPath, this.releves);

        return releve
    }
}


// on exporte une instance prête à l'emploi (les services l'importent)
export const relevesRepository = new ReleveRepository(config.csvPath);