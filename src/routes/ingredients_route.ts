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

router.post("/", async (req, res) => {
    try {
        const {name, category} = req.body;

        if (!(name || category)) {
            res.status(400).send("Both fields are required");
        }
        await Ingredients.findOneAndUpdate({name: name, category: category}, {name: name, category: category}, {upsert: true, new: true}).exec();
        const toReturn = await Ingredients.findOne({name: name, category: category});
        res.json(toReturn);
        return;
    }
    catch (err) {
        console.log(err);
    }
});

router.get("/cat/:category", async (req, res) => {
    try {
        const category = req.params.category;
        const pageSize = req.query.pagesize || 9;
        const pageIndex = req.query.pageindex || 1;
        console.log(category);
        
        if (category != undefined) {
            const results = await Ingredients.find({category: {$regex: new RegExp(category!, "i")}}).skip((pageIndex as number - 1) * (pageSize as number));
            res.json(results);
            return;
        }
        res.status(404).send("Must supply category name");
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