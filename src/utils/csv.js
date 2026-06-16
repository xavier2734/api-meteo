import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function parseCsv(relativePath) {
    const chemin = resolve(__dirname, '..', relativePath);
    const contenu = await readFile(chemin, 'utf-8');
    const lignes = contenu.split('\n').filter(l => l.trim());
    // La première ligne est l'en-tête — on la saute
    return lignes.slice(1).map((ligne, index) => {
        const colonnes = ligne.split(';');
        return {
            id: index + 1,
            ville: colonnes[0]?.trim() ?? '',
            date: colonnes[1]?.trim() ?? '',
            temperature_min: Number(colonnes[2]?.trim()) ?? '',
            temperature_max: Number(colonnes[3]?.trim()) ?? '',
            description: colonnes[4]?.trim() ?? '',
            humidite: Number(colonnes[5]?.trim()) ?? '',
        };
    }).filter(data => {
        return data.ville 
        && data.date 
        && data.temperature_min 
        && data.temperature_max 
        && data.description 
        && data.humidite
    });    
}