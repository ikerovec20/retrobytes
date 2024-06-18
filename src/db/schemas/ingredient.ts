import mongoose, { Document, Schema, mongo } from 'mongoose';

export interface Ingredient extends Document {
    name: string,
    category: string
}

const IngredientSchema = new Schema({
    name: {type: String, default: null, required: true},
    category: {type: String, required: true},
})

export const Ingredients = mongoose.model<Ingredient>("Ingredient", IngredientSchema);