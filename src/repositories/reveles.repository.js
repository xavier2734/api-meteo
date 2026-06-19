import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host:
        process.env.DB_HOST,
    user:
        process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
});

/**
 * Repository chargé de l'accès aux données des relevés.
 * Gère le chargement, la recherche, l'ajout et la suppression.
 */
class ReleveRepository {
    // ─────────────────────────────
    // Tous les relevés
    // ─────────────────────────────

    /**
     * Retourne tous les relevés.
     *
     * @returns {Promise<Array>}
     */
    async findAll() {
        const [rows] = await pool.execute('SELECT * FROM releves ORDER BY id');
        return rows;
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
        const [rows] = await pool.execute('SELECT * FROM releves WHERE id = ?', [id]);
        return rows[0] ?? null;
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
        const [result] = await pool.execute(
            'INSERT INTO releves (ville, date, temperatureMin, temperatureMax, description, humidite) VALUES (?, ?, ?, ?, ?, ?)',
            [
                releve.ville,
                releve.date,
                parseInt(releve.temperatureMin),
                parseInt(releve.temperatureMax),
                releve.description,
                parseInt(releve.humidite),
            ]
        );
        return result.insertId;
    }

    // ─────────────────────────────
    // Modification
    // ─────────────────────────────

    /**
     * Modifie un nouveau relevé et lui attribue un identifiant.
     *
     * @param {number} id id du relevé à modifier.
     * @param {Releve} releve Relevé à enregistrer.
     * @returns {Promise<Releve|undefined>}
     */
    async update(id, releveData) {
        const [result] = await pool.execute(
            'UPDATE releves SET ville = ?, date = ?, temperatureMin = ?, temperatureMax = ?, description = ?, humidite = ? WHERE id = ?',
            [
                releveData.ville,
                releveData.date,
                parseInt(releveData.temperatureMin),
                parseInt(releveData.temperatureMax),
                releveData.description,
                parseInt(releveData.humidite),
                id
            ]
        );
        return result.affectedRows > 0;
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
        const [result] = await pool.execute('DELETE FROM releves WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}


// on exporte une instance prête à l'emploi (les services l'importent)
export const relevesRepository = new ReleveRepository();