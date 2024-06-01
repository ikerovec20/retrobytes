import mongoose, { Schema, mongo } from 'mongoose';

const RecipeSchema = new Schema({
    name: {type: String, default: null, required: true},
    tags: [{type: String}],
    cooking_time: {type: Number, default: 0},
    instructions: {type: String, default: null},
    comments: [{type: Schema.Types.ObjectId, ref: "Comment"}],
    saves: [{type: Schema.Types.ObjectId, ref: "User"}],
    owner_id: {type: Schema.Types.ObjectId, ref: "User"},
    ingredients: [
        {
            ingredient_id: {type: Schema.Types.ObjectId, ref: "Ingredient"},
            amount: {type: Number},
            unit: {type: String}
        },
    ]
})

export const Recipes = mongoose.model("Recipe", RecipeSchema);