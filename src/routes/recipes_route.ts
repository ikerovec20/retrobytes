import { Request, Router, NextFunction } from "express";
import { Recipes } from "../db/schemas/recipe.js";
import { Comment, Comments } from "../db/schemas/comment.js";
import { Ingredient, Ingredients } from "../db/schemas/ingredient.js";
import { IngredientEntry, IngredientEntries } from "../db/schemas/ingredient_entry.js";
import mongoose, { ObjectId } from 'mongoose';
import { User } from "../db/schemas/user.js";

const router = Router();
export default router;

router.get("/", async (req, res) => {
    try {
        // const {pages, index} = req.query;
        const pageSize = req.query.pagesize || 9;
        const pageIndex = req.query.pageindex || 2;

        const results = await Recipes.find().skip((pageIndex as number - 1) * (pageSize as number)).populate<{owner_id: User}>({path: 'owner_id', select: {_id: 1, username: 1}}).limit(9);
        if (results) {
            results.forEach((el) => {
                let avg: number = 0;
                let sum: number = 0;
                el.rating.forEach((elem) => {
                    sum += elem;
                });
                el.avg_rating = sum != 0 ? sum / el.rating.length : 0; 
            });
        }
        const random = results.sort(() => Math.random() - 0.5);

        res.json(random);
        return;
    }
    catch (err) {
        console.log(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const results = await Recipes.findById(id).populate<{owner_id: User}>({path: 'owner_id', select: {_id: 1, username: 1}}).populate<{comments: Comment}>({path: 'comments', populate: {path: 'user_id', select: {username: 1}}});
        console.log(results?.owner_id.username);
        if (results) {
            let avg: number = 0;
            let sum: number = 0;
            results.rating.forEach((el) => {
                sum += el;
            });
            results.avg_rating = sum != 0 ? sum / results.rating.length : 0; 
        }
        res.json(results);
        return;
    }
    catch(err) {
        console.log(err);
    }
});

router.post("/", async (req, res) => {
    try {
        const {name, tags, cooking_time, instructions, owner_id, ingredients, serves, category, description, image} = req.body;
        console.log(category);
        if (!(name && tags && cooking_time && instructions && owner_id && ingredients)) {
            res.status(400).send("All fields are required");
            return;
        }
        // const ingIds: Array<ObjectId> = [];
        // for (let i = 0; i < ingredients.length; i++) {
        //     const ing = new IngredientEntries({ingredient: ingredients[i].ingredient, amount: ingredients[i].amount, unit: ingredients[i].unit});
        //     const id = await ing.save();
        //     console.log(ing);
        //     ingIds.push(ing._id);
        // }

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
            rating: [],
            avg_rating: 0,
            comments: [],
            saves: [],
            image: image
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

router.post("/rate", async (req, res) => {
    try {
        const recipe_id = req.body.recipe_id;
        const rating = req.body.rating;
        console.log(recipe_id);
        const recipe = await Recipes.findById(recipe_id);

        if (recipe == null) {
            res.status(404).send("Recipe not found");
            return;
        }

        recipe.rating.push(rating as number);
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
        const recipe = await Recipes.findById(recipe_id);
        console.log(recipe);
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
        console.log(newComment);
        recipe.comments.push(newComment._id);
        await recipe.save();
        // await Recipes.updateOne({recipe});
        res.status(200).send("Success");
    }
    catch (err) {
        console.log(err);
    }
});