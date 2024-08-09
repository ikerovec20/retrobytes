import mongoose, { Document, Schema, Types, mongo } from 'mongoose';

export interface Comment extends Document {
    user_id: Types.ObjectId,
    recipe_id: Types.ObjectId,
    timestamp: string,
    content: string
}

const CommentSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: "User"},
    recipe_id: {type: Schema.Types.ObjectId, ref: "Recipe"},
    timestamp: {type: String},
    content: {type: String}
})

export const Comments = mongoose.model<Comment>("Comment", CommentSchema);