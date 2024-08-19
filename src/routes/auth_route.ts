import { Request, Router, NextFunction } from "express";
import { Users } from "../db/schemas/user.js";
import jwt from 'jsonwebtoken';

const router = Router();

router.post("/login", async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        if (!(username || password)) {
            throw {status: 400, message: "Both fields are required."};
        }
        const user = await Users.findOne({username: username, password: password});
        console.log(user);
        if (user == null) {
            throw {status: 404, message: "User not found."};
        }

        const key = process.env.JWT_KEY!;
        const token = jwt.sign({id: user.id, username: user.username}, key);
        res.send(token);
    }
    catch(err) {
        console.log(err);
    }
});

router.post("/register", async (req, res) => {
    try {
        const {username, password} = req.body;
        if (!(username || password)) {
            throw {status: 400, message: "Both fields are required."};
        }

        const user = await Users.findOne({username: username});
        if (user != null) {
            throw {status: 400, message: "Username already taken."};
        }

        const newUser = new Users({
            username: username,
            password: password
        });


        await newUser.save();
        const key = process.env.JWT_KEY!;
        const token = jwt.sign({id: newUser.id, username: newUser.username}, key);
        res.json(token);
    }
    catch(err) {
        console.log(err);
    }
});

export default router;