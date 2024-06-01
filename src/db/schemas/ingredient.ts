import mongoose, { Schema, mongo } from 'mongoose';

const IngredientSchema = new Schema({
    name: {type: String, default: null, required: true},
    category: {type: String, required: true},
})

export const Ingredients = mongoose.model("Ingredient", IngredientSchema);