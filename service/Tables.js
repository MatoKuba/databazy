import * as Db from "./MariaClient.js";

/**
 * Vratit zoznam prispevkov vratane pouzivatelskeho mena autora zoradeny posla casu vytvorenia zostupne.
 * @returns {Promise<*>}
 */

async function createTables(values) {
    return Db.query(values);
}

async function dropTables(drop) {
    return Db.query(drop);
}

async function updateTables(update) {
    return Db.query(update);
}



export {createTables,dropTables,updateTables}