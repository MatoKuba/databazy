import express from 'express';
import {query} from "../service/MariaClient.js";
import {authorize} from '../service/Security.js'
import * as Table from "../service/Tables.js";


const router = express.Router();


router.post("/droptab",  async function (req, res) {
    // pockat na dokoncenie funkcie pre pridanie prispevku
    console.log("tusom");
    await Table.dropTables(req.body.remove);
    await req.flash('success', 'Tabuľka bola vymazaná.')

    // presmerovat na zobrazenie vsetkych prispevkov
    res.redirect('/vytvor');
});

router.post("/update",  async function (req, res) {
    // pockat na dokoncenie funkcie pre pridanie prispevku
    console.log(req.body.update);
    await Table.updateTables(req.body.update);
    await req.flash('success', 'Tabuľka bola upravená.')

    // presmerovat na zobrazenie vsetkych prispevkov
    res.redirect('/vytvor');
});


export {router as TableController}