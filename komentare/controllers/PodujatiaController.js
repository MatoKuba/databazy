import express from 'express';
import * as Podujatia from "../service/Podujatia.js";
import {authorize} from "../service/Security.js";
import * as Posts from "../service/Posts.js";

const router = express.Router();

/**
 * Zobrazit vsetky prispevky
 */
router.get("/", async function (req, res) {
    // vyhladam v DB vsetky prispevky
    let podujatia = await Podujatia.findAllPodujatia();
    var datum = new Date();
    res.render('podujatia/podujatia.twig', {
        podujatia: podujatia,
        datum: datum
    });
});

router.get("/sort", async function (req, res) {
    // vyhladam v DB vsetky prispevky
    let podujatia = await Podujatia.Zorad();
    var datum = new Date();

    res.render('podujatia/podujatia.twig', {
        podujatia: podujatia,
        datum: datum
    });
});

router.get("/meno", async function (req, res) {
    // vyhladam v DB vsetky prispevky
    let podujatia = await Podujatia.ZoradMeno();
    var datum = new Date();
    res.render('podujatia/podujatia.twig', {
        podujatia: podujatia,
        datum: datum
    });
});

router.get("/hore", async function (req, res) {
    // vyhladam v DB vsetky prispevky
    let podujatia = await Podujatia.findAllPodujatia();
    var datum = new Date();
    res.render('podujatia/podujatia.twig', {
        podujatia: podujatia,
        datum: datum
    });
});
router.get("/region", async function (req, res) {
    // vyhladam v DB vsetky prispevky
    let podujatia = await Podujatia.ZoradRegion();
    var datum = new Date();
    res.render('podujatia/podujatia.twig', {
        podujatia: podujatia,
        datum: datum
    });
});


router.get('/delete/:postId', authorize('admin'), async function(req, res) {
    // pockat na dokoncenie funkcie pre pridanie prispevku
    console.log(req.params.postId)
    await Podujatia.vymazPodujatie(req.params.postId);
    await req.flash('success', 'Príspevok bol vymazaný.')

    // presmerovat na zobrazenie vsetkych prispevkov
    res.redirect('/podujatia');
})

router.get('/uprav/:postId', authorize('admin'), async function(req, res) {
    let podujatie = await Podujatia.findPodujatie(req.params.postId);
    // presmerovat na zobrazenie vsetkych prispevkov
    //let date = new Date(podujatie[0].datum);
    //podujatie[0].datum = date.getDate()+"/"+(date.getMonth() + 1)+"/"+date.getFullYear();
    res.render('index/upravpodujatie.twig',{
        podujatie : podujatie[0]
    });
})

router.get('/uprav_podujatie/:postId', authorize('admin'), async function(req, res) {
    let query = req.query;
    await Podujatia.upravPodujatie(req.params.postId,query.nazov,query.miesto,query.kraj,query.typ,query.datum,query.opis);
    res.redirect('/podujatia');
})


export {router as PodujatiaController}