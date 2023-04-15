import * as Db from "./MariaClient.js";

async function vlozPodujatie(nazov,miesto,datum,opis,typ,kraj) {
    await Db.query(
        'INSERT INTO podujatia (meno,miesto,datum,opis,ID_typ,ID_kraj) VALUES (:nazov, :miesto, :datum, :opis, :typ,:kraj)',
        {nazov: nazov, miesto: miesto,datum: datum,opis: opis,typ: typ, kraj: kraj}
    );
}




export {vlozPodujatie}