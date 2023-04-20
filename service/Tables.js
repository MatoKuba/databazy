import * as Db from "./MariaClient.js";

/**
 * Vratit zoznam prispevkov vratane pouzivatelskeho mena autora zoradeny posla casu vytvorenia zostupne.
 * @returns {Promise<*>}
 */

async function createTables() {
    return Db.query('CREATE TABLE tabulka(column1 VARCHAR(20),column2 VARCHAR(20),column3 VARCHAR(20),column4 VARCHAR(20),column5 VARCHAR(20))');
}

async function dropTables() {
    return Db.query('DROP TABLE tabulka');
}



export {createTables,dropTables}