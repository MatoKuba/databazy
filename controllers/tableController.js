import { createTables } from "/views/index/script.js";
import express from "express";

const router = express.Router();
router.post("/create/:name", async function (req, res) {
    console.log(req.body.tableSchema, req.params.name);
    await createTables(req.params.name, req.body.tableSchema);
    await req.flash("success", "Tabuľka bola vytvorená.");

    // Redirect to an appropriate page after creating the table
    res.redirect("/create");
});
 export { router as tableController }
