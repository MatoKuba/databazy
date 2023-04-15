import express from 'express';
import {query} from "../service/MariaClient.js";
import {authorize} from '../service/Security.js'
import * as Posts from "../service/Posts.js";
import * as Podujatie from "../service/Podujatia.js";

const router = express.Router();

/**
 * Zobrazit vsetky prispevky
 */
router.get("/:id", async function (req, res) {
    // vyhladam v DB vsetky prispevky
    let posts = await Posts.findAllPosts(req.params.id);
    let podujatie = await Podujatie.findPodujatie(req.params.id);


    // ak este neexistuje cookie s informovaou o hlasovani (cookie bude mat nazov postRatings)
    if (!req.cookies.postRatings) {
        // vytvorim ho s prazdnym polom a nastavim jeho platnost na jeden rok
        res.cookie('postRatings', [], {maxAge: 1000 * 3600 * 24 * 365, httpOnly: true, sameSite: "strict"});
    }

    res.render('post/index.twig', {
        posts: posts,
        podujatie : podujatie[0]
    });
});

/**
 * Vymazat prispevok a prejst na zoznam prispevkov
 */
router.get('/delete/:postId', authorize('admin'), async function(req, res) {
    // pockat na dokoncenie funkcie pre pridanie prispevku
    let pod_id = await Posts.getEventID(req.params.postId);
    console.log(pod_id)
    await Posts.deletePost(req.params.postId);
    await req.flash('success', 'Príspevok bol vymazaný.')

    // presmerovat na zobrazenie vsetkych prispevkov
    res.redirect('/post/' + pod_id[0].id_pod);
})

/**
 * Pridat novy prispevok cez formular.
 *
 * Pridavat prispevky moze len prihlaseny pouzivatel s rolou user alebo admin.
 */
router.post("/new/:id",  async function (req, res) {
    // pockat na dokoncenie funkcie pre pridanie prispevku
    console.log(req.body.meno, req.body.message, req.params.id);
    await Posts.addPost(req.body.meno, req.body.message, req.params.id);
    await req.flash('success', 'Príspevok bol pridaný.')
    console.log("som ttu");
    console.log(req.query.meno, req.query.message, req.params.id);

    // presmerovat na zobrazenie vsetkych prispevkov
    res.redirect('/post/'+ req.params.id);
});


export {router as PostController}