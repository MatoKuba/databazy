import express from 'express';
import {authorize} from '../service/Security.js'
import * as Create from "../service/Create.js";
const router = express.Router();

/**
 * Uvodna stranka
 */
router.get("/", function (req, res) {
    res.render('index/index.twig', {
        message: 'Testovacia sprava'
    });
});

/**
 * Odoslanie dat z dormulara metodou post. Vyzaduje sa rola admin.
 */
router.post("/form", async function (req, res) {
    console.log(req.body)
    await req.flash('success', JSON.stringify(req.body));
    res.redirect('/form');
});

router.get("/form",  function (req, res, next) {

    res.render('index/form.twig');
});

/**
 * Stranka s obmedzenym pristupom. Vyzaduje sa rola admin.
 */
router.get("/admin", authorize('admin'), function (req, res) {
    res.render('index/admin.twig');
});

router.get("/vytvor", authorize('admin'), function (req, res) {
    res.render('index/vytvorpodujatie.twig');
});

router.post("/pridaj_podujatie", authorize('admin'), async function (req, res) {
    console.log(req.body.nazov, req.body.miesto, req.body.datum, req.body.opis, req.body.typ, req.body.kraj);
    await Create.vlozPodujatie(req.body.nazov, req.body.miesto, req.body.datum, req.body.opis, req.body.typ, req.body.kraj) //nazov,miesto,datum,opis,typ,kraj
    res.redirect("/podujatia");
});




export {router as IndexController}

