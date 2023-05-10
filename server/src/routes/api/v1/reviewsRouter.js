import express from "express";
import { User } from "../../../models/index.js";
import ReviewSerializer from "../../../serializers/ReviewSerializer.js";

const reviewsRouter = new express.Router();

reviewsRouter.get("/", async (req, res) => {
    try {
        const userId = req.user.id
        const findUser = await User.query().findById(userId)
        const relatedReviews = await findUser.$relatedQuery("reviews")
        const serializedReviews = await ReviewSerializer.showDetails(relatedReviews)
        return res.status(200).json({ reviews: serializedReviews });
    } catch (error) {
        res.status(500).json({ errors: error.message });
    }
});

export default reviewsRouter;
