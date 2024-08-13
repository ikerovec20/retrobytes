import mongoose, { Document, Schema, Types, mongo } from 'mongoose';

export interface Recipe extends Document {
    name: string;
    category: string;
    tags: string[];
    cooking_time: number;
    serves: number;
    description: string;
    instructions: string;
    rating: number[];
    avg_rating: number;
    comments: Types.ObjectId[];
    saves: Types.ObjectId[];
    save_count: number,
    owner_id: Types.ObjectId;
    ingredients: {name: string, amount: number, unit: string}[];
    image: string;
}

const RecipeSchema = new Schema({
    name: {type: String, default: null, required: true},
    category: {type: String, default: null},
    tags: [{type: String}],
    cooking_time: {type: Number, default: 0},
    serves: {type: Number, default: 0},
    description: {type: String, default: null},
    instructions: {type: String, default: null},
    rating: [{type: Number, default: 0}],
    avg_rating: {type: Number, default: 0},
    comments: [{type: Schema.Types.ObjectId, ref: "Comment"}],
    saves: [{type: Schema.Types.ObjectId, ref: "User"}],
    save_count: {type: Number, default: 0},
    owner_id: {type: Schema.Types.ObjectId, ref: "User"},
    ingredients: [{
        name: String,
        amount: Number,
        unit: String
    }],
    image: {type: String}
})

export const Recipes = mongoose.model<Recipe>("Recipe", RecipeSchema);