import express, {Express, Request, Response, Application} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import http from 'http';
import mongoose from 'mongoose';
import AuthRouter from './routes/auth_route.js';
import IngredientRouter from './routes/ingredients_route.js';
import RecipeRouter from './routes/recipes_route.js';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
const server = http.createServer(app);
const port = process.env.PORT || 8000;

app.use("/api", AuthRouter);
app.use("/api/ingredients", IngredientRouter);
app.use("/api/recipes", RecipeRouter);


app.get('/', (req, res) => {
    res.send('Welcome!');
});

await mongoose.connect("mongodb://127.0.0.1:27017/cookbook").then(() => {console.log("MongoDB connected!")}).catch((err) => console.log(err));

server.listen(port, () => {
    console.log("Server started listening on port " + port);
});

