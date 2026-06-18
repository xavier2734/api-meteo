import "dotenv/config";
import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";

const BASE =
    process.env.API_URL ??
    "http://localhost:3000";

const rl = readline.createInterface({
    input: stdin,
    output: stdout
});

// GET : lister tous les relevés
async function listerReleves() {
    try {
        const response =
            await fetch(`${BASE}/releves`);

        if (!response.ok) {
            throw new Error(
                `Erreur API : ${response.status}`
            );
        }

        const releves =
            await response.json();

        console.table(releves);

    } catch (error) {
        console.error(
            "Impossible de joindre l'API :",
            error.message
        );
    }
}

// GET : un relevé par id (avec gestion du 404)
async function afficherReleveParId() {
    const id =
        await rl.question("Id : ");

    try {

        const response =
            await fetch(
                `${BASE}/releves/${id}`
            );

        if (response.status === 404) {
            console.log(
                "Relevé introuvable"
            );
            return;
        }

        const releve =
            await response.json();

        console.table([releve]);

    } catch (error) {
        console.error(
            "Impossible de joindre l'API :",
            error.message
        );
    }
}

// POST : Créer un relevé
async function creerReleve() {

    const ville =
        await rl.question("Ville : ");

    const date =
        await rl.question("Date : ");

    const temperatureMin =
        await rl.question("Température min : ");

    const temperatureMax =
        await rl.question("Température max : ");

    const description =
        await rl.question("Description : ");

    const humidite =
        await rl.question("Humidité : ");

    try {

        const response =
            await fetch(
                `${BASE}/releves`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({
                        ville,
                        date,
                        temperatureMin:
                            Number(
                                temperatureMin
                            ),
                        temperatureMax:
                            Number(
                                temperatureMax
                            ),
                        description,
                        humidite:
                            Number(
                                humidite
                            )
                    })
                }
            );

        const releve =
            await response.json();

        console.log(
            "Relevé créé :"
        );

        console.table([releve]);

    } catch (error) {

        console.error(
            "Impossible de joindre l'API :",
            error.message
        );
    }
}

// GET : afficher les stats des villes
async function afficherStats() {
    try {

        const response =
            await fetch(`${BASE}/stats`);

        const stats =
            await response.json();

        console.table([stats]);

    } catch (error) {

        console.error(
            "Impossible de joindre l'API :",
            error.message
        );
    }
}

// GET : lister toutes les villes
async function afficherVilles() {
    try {

        const response =
            await fetch(`${BASE}/villes`);

        const villes =
            await response.json();

        console.table(villes);

    } catch (error) {

        console.error(
            "Impossible de joindre l'API :",
            error.message
        );
    }
}

// GET : une ville par nom (avec gestion du 404)
async function afficherVille() {

    const ville =
        await rl.question("Nom de la ville : ");

    try {

        const response =
            await fetch(
                `${BASE}/villes/${encodeURIComponent(ville)}`
            );

        if (response.status === 404) {
            console.log("Ville introuvable");
            return;
        }

        if (!response.ok) {
            throw new Error(
                `Erreur API : ${response.status}`
            );
        }

        const resultat =
            await response.json();

        console.table([resultat]);

    } catch (error) {

        console.error(
            "Impossible de joindre l'API :",
            error.message
        );
    }
}

async function menu() {

    let quitter = false;

    while (!quitter) {

        console.log("\n=== Météo CLI ===");

        console.log(
            "1 - Lister les relevés"
        );

        console.log(
            "2 - Consulter un relevé"
        );

        console.log(
            "3 - Créer un relevé"
        );

        console.log(
            "4 - Afficher les stats"
        );

        console.log(
            "5 - Afficher les villes"
        );

        console.log(
            "6 - Consulter une ville"
        );



        console.log(
            "0 - Quitter"
        );

        const choix =
            await rl.question(
                "\nChoix : "
            );

        switch (choix) {

            case "1":
                await listerReleves();
                break;

            case "2":
                await afficherReleveParId();
                break;

            case "3":
                await creerReleve();
                break;

            case "4":
                await afficherStats();
                break;

            case "5":
                await afficherVilles();
                break;

            case "6":
                await afficherVille();
                break;

            case "0":
                quitter = true;
                break;

            default:
                console.log(
                    "Choix invalide"
                );
        }
    }

    rl.close();
}

await menu();