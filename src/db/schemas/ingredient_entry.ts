import mongoose, { Document, Schema, Types, mongo } from 'mongoose';

export interface IngredientEntry extends Document {
    ingredient: Types.ObjectId,
    amount: number,
    unit: string
}

const IngredientEntrySchema = new Schema({
    ingredient: {type: Schema.Types.ObjectId, ref: "Ingredient"},
    amount: {type: Number},
    unit: {type: String}
})

export const IngredientEntries = mongoose.model<IngredientEntry>("IngredientEntry", IngredientEntrySchema);