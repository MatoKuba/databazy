import express from 'express';
import {query} from "../service/MariaClient.js";
import {authorize} from '../service/Security.js'
import * as Table from "../service/Tables.js";


const router = express.Router();


router.post("/droptab",  async function (req, res) {
    // pockat na dokoncenie funkcie pre pridanie prispevku
    try {
        await Table.dropTables(req.body.remove);
        res.json({ success: true, message: 'Tabuľka bola vymazaná.' });
    } catch (error) {
        res.json({ success: false, message: 'Nepodarilo sa vymazať tabuľku.' });
    }
});

router.post("/update",  async function (req, res) {
    // pockat na dokoncenie funkcie pre pridanie prispevku
    try {
        await Table.updateTables(req.body.update);
        res.json({ success: true, message: 'Tabuľka bola upravená.' });
    } catch (error) {
        res.json({ success: false, message: 'Nepodarilo sa upraviť tabuľku.' });
    }
});


export {router as TableController}