import mongoose, { Schema, mongo } from 'mongoose';

const CommentSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: "User"},
    recipe_id: {type: Schema.Types.ObjectId, ref: "Recipe"},
    content: {type: String}
})

export const Comments = mongoose.model("Comment", CommentSchema);