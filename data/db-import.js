import 'dotenv/config';
import mysql from 'mysql2/promise';
import { parseCsv } from "../src/utils/csv.js";


import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const dbInit = async () => {
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


    /*
    DB CREATION:
     
    CREATE TABLE releves (
    id INT(11)
    NOT NULL PRIMARY KEY AUTO_INCREMENT,
    ville VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    temperatureMin DECIMAL(4) NOT NULL,
    temperatureMax DECIMAL(4) NOT NULL,
    description VARCHAR(100) NOT NULL,
    humidite DECIMAL(4) NOT NULL
    );
    */

    const releves = await parseCsv(
        join(__dirname, "meteo.csv")
    );

    const results = await Promise.all(
        releves.map(element =>
            pool.execute(
                `INSERT INTO releves
            (ville, date, temperatureMin, temperatureMax, description, humidite)
            VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    element.ville,
                    element.date,
                    parseInt(element.temperatureMin),
                    parseInt(element.temperatureMax),
                    element.description,
                    parseInt(element.humidite)
                ]
            )
        )
    );

    console.log(
        `${results.length} relevés importés`
    );

    await pool.end();
}


await dbInit();
