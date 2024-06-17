import { Request, Router, NextFunction } from "express";
import { Recipes } from "../db/schemas/recipe.js";
import { Comments } from "../db/schemas/comment.js";
import { Ingredients } from "../db/schemas/ingredient.js";
import mongoose from 'mongoose';

const router = Router();
export default router;

router.get("/", async (req, res) => {
    try {
        // const {pages, index} = req.query;
        const pageSize = req.query.pagesize || 9;
        const pageIndex = req.query.pageindex || 1;

        const results = await Recipes.find().skip((pageIndex as number - 1) * (pageSize as number)).populate('ingredients', 'ingredient_id');
        console.log(results[0].ingredients[0]);
        res.json(results);
        return;
    }
    catch (err) {
        console.log(err);
    }
});

router.post("/", async (req, res) => {
    try {
        const {name, tags, cooking_time, instructions, owner_id, ingredients, serves, category, description} = req.body;
        console.log(category);
        if (!(name && tags && cooking_time && instructions && owner_id && ingredients)) {
            res.status(400).send("All fields are required");
            return;
        }
        const recipe = new Recipes({
            name: name,
            category: category,
            tags: tags,
            cooking_time: cooking_time,
            serves: serves,
            description: description,
            instructions: instructions,
            owner_id: owner_id,
            ingredients: ingredients,
            comments: [],
            saves: []
        });

        await recipe.save();
        res.json(recipe);
    }
    catch (err) {
        console.log(err);
    }
});

router.post("/save", async (req, res) => {
    try {
        const user_id = req.body.user_id;
        const recipe_id = req.body.recipe_id;
        console.log(user_id);
        console.log(recipe_id);
        if (!(user_id && recipe_id)) {
            res.status(400).send("Must provide both arguments");
            return;
        }
        const recipe = await Recipes.findById(recipe_id);

        if (recipe == null) {
            res.status(404).send("Recipe not found");
            return;
        }
        if (recipe.saves.includes(user_id)) {
            res.status(400).send("Already saved");
            return;
        }
        recipe.saves.push(user_id);
        await recipe.save();
        // await Recipes.updateOne({recipe});
        res.status(200).send("Success");
    }
    catch (err) {
        console.log(err);
    }
});

router.post("/comment", async (req, res) => {
    try {
        const {user_id, recipe_id, content} = req.body;

        if (!(user_id && recipe_id)) {
            res.status(400).send("Must provide all arguments");
        }
        const recipe = await Recipes.findById({recipe_id});

        if (recipe == null) {
            res.status(404).send("Recipe not found");
            return;
        }

        const newComment = new Comments({
            recipe_id: recipe_id,
            user_id: user_id,
            content: content
        });

        await newComment.save();

        recipe.comments.push(newComment._id);
        // await recipe.save({});
        await Recipes.updateOne({recipe});
        res.status(200).send("Success");
    }
    catch (err) {
        console.log(err);
    }
});