import mongoose, { Document, Schema, Types, mongo } from 'mongoose';

export interface User extends Document {
    username: string,
    password: string,
    saves: Types.ObjectId[],
    joined: Date
}

const UserSchema = new Schema({
    username: {type: String, default: null, required: true},
    password: {type: String, required: true},
    joined: {type: Date, default: new Date()}
})

export const Users = mongoose.model<User>("User", UserSchema);