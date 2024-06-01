import mongoose, { Schema, mongo } from 'mongoose';

const UserSchema = new Schema({
    username: {type: String, default: null, required: true},
    password: {type: String, required: true},
})

export const Users = mongoose.model("User", UserSchema);