import { Router } from "express";
import { Recipes } from "../db/schemas/recipe.js";
import mongoose, { ObjectId } from "mongoose";
import { Comments } from "../db/schemas/comment.js";
import { Users } from "../db/schemas/user.js";
const router = Router();
export default router;

router.get("/stats/:id", async (req, res) => {
    try {
        const id = req.params.id;
        
        const user = await Users.findById(id);
        const uploadedRecipeCount = await Recipes.countDocuments({owner_id: id});
        console.log(uploadedRecipeCount);

        const commentsMade = await Comments.countDocuments({user_id: id});

        const averageRatings = await Recipes.aggregate([{
            $match: {
                owner_id: new mongoose.Types.ObjectId(id)
            }
        }, {
            $group: {
                "_id": null,
                "avg_rating": {$avg: "$avg_rating"}
            }
        }
    ]);

    const totalSaves = await Recipes.aggregate([{
        $match: {
            owner_id: new mongoose.Types.ObjectId(id)
        }
    }, {
        $group: {
            "_id": null,
            "total_saves": {$sum: "$save_count"}
        }
    }
]);

const averageSaves = await Recipes.aggregate([{
    $match: {
        owner_id: new mongoose.Types.ObjectId(id)
    }
}, {
    $group: {
        "_id": null,
        "avg_saves": {$avg: "$save_count"}
    }
}
]);
        const result = {
            username: user?.username,
            joined: user?.joined,
            recipe_count: uploadedRecipeCount,
            comments_made: commentsMade,
            avg_ratings: averageRatings[0]?.avg_rating == undefined ? 0 : averageRatings[0].avg_rating,
            total_saves: totalSaves[0]?.total_saves,
            average_saves: averageSaves[0]?.avg_saves ?? 0
        }
        res.json(result);
    }
    catch(err) {
        console.log(err);
    }
});