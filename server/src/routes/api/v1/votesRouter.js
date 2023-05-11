import express from "express";
import { Review, Vote } from "../../../models/index.js";
import { ValidationError } from "objection";
import ReviewSerializer from "../../../serializers/ReviewSerializer.js"
import objection from "objection"

const votesRouter = new express.Router();

votesRouter.post("/", async (req, res) => {
    const voteValue = req.body.voteValue;
    const reviewId = req.body.reviewId;
    const userId = req.user.id;
    try {
        const voteExists = await Vote.query().findOne({
            userId: userId,
            reviewId: reviewId
        })
        if (voteExists) {
            if(voteValue === voteExists.voteValue) {
                await Vote.query().deleteById(voteExists.id)
            } else { 
                await voteExists.$query().patch({ voteValue: -(voteValue) })
            }
        } else {
            const newVote = await Vote.query().insertAndFetch({voteValue, userId, reviewId});
        }
        const review = await Review.query().findById(reviewId)
        const serializedReview = await ReviewSerializer.singleShowDetails(review)
        const voteCountForReview = serializedReview.voteValue
        return res.status(201).json({ vote: voteCountForReview });
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(422).json({ errors: error.data });
        } else {
            res.status(500).json({ errors: error.message });
        }
    }
});

export default votesRouter;
