import { Request, Router, NextFunction } from "express";
import { Users } from "../db/schemas/user.js";
import { Ingredients } from "../db/schemas/ingredient.js";

const router = Router();
export default router;


router.get("/", async (req, res) => {
    try {
        // const {pages, index} = req.query;
        const pageSize = req.query.pagesize || 9;
        const pageIndex = req.query.pageindex || 1;

        const results = await Ingredients.find().skip((pageIndex as number - 1) * (pageSize as number));

        res.json(results);
        return;
    }
    catch (err) {
        console.log(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const results = await Ingredients.findById(id);
        console.log(results);
        res.json(results);
        return;
    }
    catch(err) {
        console.log(err);
    }
});

router.post("/", async (req, res) => {
    try {
        const {name} = req.body;

        if (!(name)) {
            res.status(400).send("Name is required.");
        }
        await Ingredients.findOneAndUpdate({name: name}, {name: name}, {upsert: true, new: true}).exec();
        const toReturn = await Ingredients.findOne({name: name});
        res.json(toReturn);
        return;
    }
    catch (err) {
        console.log(err);
    }
});


router.get("/name/:name", async (req, res) => {
    try {
        const name = req.params.name;
        const pageSize = req.query.pagesize || 9;
        const pageIndex = req.query.pageindex || 1;
        
        if (name != undefined) {
            const results = await Ingredients.find({name: {$regex: new RegExp(name!, "i")}}).skip((pageIndex as number - 1) * (pageSize as number));
            res.json(results);
            return;
        }
        res.status(404).send("Must supply ingredient name");
    }
    catch (err) {
        console.log(err);
    }
});