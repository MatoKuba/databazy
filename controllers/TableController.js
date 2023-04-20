import express from 'express';
import {query} from "../service/MariaClient.js";
import {authorize} from '../service/Security.js'
import * as Table from "../service/Tables.js";


const router = express.Router();


router.get("/create",  async function (req, res) {
    // pockat na dokoncenie funkcie pre pridanie prispevku
    console.log(req.body.name,req.body.values);
    await Table.createTables(req.body.name,req.body.values);
    await req.flash('success', 'Tabuľka bola vytvorená.')

    // presmerovat na zobrazenie vsetkych prispevkov
    res.redirect('/vytvor');
});


export {router as TableController}