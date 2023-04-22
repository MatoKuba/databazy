import * as Db from "/../../service/MariaClient.js";

/**
 * Vratit zoznam prispevkov vratane pouzivatelskeho mena autora zoradeny posla casu vytvorenia zostupne.
 * @returns {Promise<*>}
 */


async function createTables(meno,obsah) {
    return Db.query('CREATE TABLE meno(obsah)');
}



export {createTables}