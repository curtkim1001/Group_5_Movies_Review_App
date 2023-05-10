import express from "express";
import { Review, User, Vote } from "../../../models/index.js";
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

reviewsRouter.post("/", async (req, res) => {
    console.log(`inside of post router`)
    const { body } = req;
    console.log(req.body)
    const formInput = cleanUserInput(body);
    const { votes } = formInput;
    const userId = req.user.id;
    const { reviewId } = req.params;
    try {
        const newVote = await Vote.query().insertAndFetch({
            votes,
            userId,
            reviewId
        });
        return res.status(201).json({ vote: newVote });
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(422).json({ errors: error.data });
        } else {
            res.status(500).json({ errors: error.message });
        }
    }
});

export default reviewsRouter;
