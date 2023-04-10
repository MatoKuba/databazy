import express from 'express';
import {authenticate, authorize, setUserPassword} from "../service/Security.js";
import * as Security from '../service/Security.js';
import dotenv from 'dotenv';
import {flash} from "express-flash-message";
const router = express.Router();

/**
 * Zobrazit formular pre zadanie mena a hesla
 */
router.get("/login", function (req, res) {
    res.render('login/form.twig');
});

/**
 * Kontrola prihlasovacich udajov odoslanych z formulara metodou POST.
 */
router.post("/check",  function (req, res) {
    // data z formulara su ulozene v tele (body) POST poziadavky.
    authenticate(req.body.username, req.body.password).then(async (user) => {
        if (user) {
            req.session.user = user;
            console.log('Login OK', user);
            await req.flash('success', 'Login OK');
            // kedze pouzivam pomalsie ulozisko pre session data (subory) pockam na ulozenie sesison a az potom presmerujem
            req.session.save(() => {
                res.redirect('/');
            });
        } else {
            console.log('Login failed');
            await req.flash('error', 'Chybné meno alebo heslo!');
            res.redirect('/user/login');
        }
    });
});

/**
 * Odhlasit prihlaseneho pouzivatela a zrusit session
 */
router.get("/logout", function (req, res) {
    let sessionName = req.session.name;
    req.session.destroy(async function(err) {
        if (err) {
            console.error(err);
        } else {
            res.clearCookie(sessionName);
            res.redirect('/');
        }
    });
});

router.get("/password", function (req, res) {
    res.render('zmenahesla/zmenahesla.twig');
});

router.post("/password", authorize('admin', 'user'), async function (req, res) {
    if (req.body.password1 === req.body.password2){
        await setUserPassword(req.session.user.username, req.body.password1);
        await req.flash('success', 'hesla bolo zmenene');
    }else{
        await req.flash('error', 'hesla sa nezhoduju');

    }

    res.redirect('/user/password')
});


export {router as UserController}

