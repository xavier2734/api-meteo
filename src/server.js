// ============================================================
// src/server.js — Point d'entrée serveur
// ============================================================
import config from "./config.js";
import app from "./app.js";

app.listen(config.port, config.host, () => {
    console.log(`✅ Serveur démarré en mode [${config.env}]`);
    console.log(
        ` → http://${config.host === "0.0.0.0" ? "localhost" : config.host}:${config.port}`
    );
});