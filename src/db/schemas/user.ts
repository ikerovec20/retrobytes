import mongoose, { Document, Schema, Types, mongo } from 'mongoose';

export interface User extends Document {
    username: string,
    password: string,
    saves: Types.ObjectId[]
}

const UserSchema = new Schema({
    username: {type: String, default: null, required: true},
    password: {type: String, required: true},
    saves: [{type: Schema.Types.ObjectId, ref: "Recipe"}]
})

export const Users = mongoose.model<User>("User", UserSchema);