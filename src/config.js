// ============================================================
// src/config.js — Configuration centrale (ES Modules)
// ============================================================
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
    port: parseInt(process.env.PORT || "3000", 10),
    host: process.env.HOST || "0.0.0.0",
    env: process.env.NODE_ENV || "development",
    publicDir: join(__dirname, "..", "public"),
};