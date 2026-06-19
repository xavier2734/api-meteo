// ============================================================
// src/config.js — Configuration centrale (ES Modules)
// ============================================================
import 'dotenv/config';


export default {
    port: parseInt(process.env.PORT || "3000", 10),
    host: process.env.HOST || "0.0.0.0",
    env: process.env.NODE_ENV || "development"
};