import * as Db from "./MariaClient.js";

/**
 * Vratit zoznam prispevkov vratane pouzivatelskeho mena autora zoradeny posla casu vytvorenia zostupne.
 * @returns {Promise<*>}
 */
async function findAllPodujatia() {
    return Db.query('SELECT * FROM podujatia ORDER BY podujatia.datum ASC');
}

async function createTables(meno,obsah) {
    return Db.query('CREATE TABLE meno(meno,obsah)');
}

async function findPodujatie(id) {
    return Db.query('SELECT * FROM podujatia where podujatia.id = :id', {id: id});
}

async function Zorad() {
    return Db.query('SELECT * FROM podujatia ORDER BY podujatia.datum DESC');
    //return Db.query('SELECT * FROM podujatia ORDER BY podujatia.datum ASC');
}

async function ZoradRegion() {
    return Db.query('SELECT * FROM podujatia ORDER BY podujatia.ID_kraj DESC');
    //return Db.query('SELECT * FROM podujatia ORDER BY podujatia.datum ASC');
}

async function ZoradMeno() {
    return Db.query('SELECT * FROM podujatia ORDER BY podujatia.meno');
    //return Db.query('SELECT * FROM podujatia ORDER BY podujatia.datum ASC');
}

async function vymazPodujatie(id) {
    await Db.query(
        'DELETE FROM podujatia WHERE id = :postId',
        {postId: id}
    );
}

async function upravPodujatie(id,nazov,miesto,kraj,typ,datum,opis) {
    await Db.query(
        'UPDATE podujatia SET meno = :nazov, miesto = :miesto, opis = :opis, ID_kraj = :kraj, ID_typ = :typ, datum = :datum where id = :id',
        {id: id,nazov: nazov,miesto: miesto,opis: opis,kraj: kraj, typ: typ,datum : datum}
    );
}


export {findAllPodujatia, Zorad, ZoradMeno, findPodujatie,vymazPodujatie,upravPodujatie,ZoradRegion,createTables}