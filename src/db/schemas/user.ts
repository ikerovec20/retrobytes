import mongoose, { Document, Schema, mongo } from 'mongoose';

export interface User extends Document {
    username: string,
    password: string
}

const UserSchema = new Schema({
    username: {type: String, default: null, required: true},
    password: {type: String, required: true},
})

export const Users = mongoose.model<User>("User", UserSchema);