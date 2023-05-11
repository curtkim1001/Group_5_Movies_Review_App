import express from "express";
import { Review, Vote } from "../../../models/index.js";
import { ValidationError } from "objection";
import ReviewSerializer from "../../../serializers/ReviewSerializer.js"

const voteRouter = new express.Router();

voteRouter.post("/", async (req, res) => {
    const voteValue = req.body.voteValue;
    const reviewId = req.body.reviewId;
    const userId = req.user.id;
    try {
        const voteExists = await Vote.query().where("reviewId",`${reviewId}`).where("userId",`${userId}`)
        if (voteExists.length>0) {
            if(voteValue === voteExists[0].voteValue) {
                await Vote.query().delete().where("reviewId",`${reviewId}`).where("userId",`${userId}`)
            } else { 
                await Vote.query().delete().where("reviewId",`${reviewId}`).where("userId",`${userId}`)
                const insertOppositeVote = await Vote.query().insertAndFetch({
                    voteValue,
                    userId,
                    reviewId
                });
            }
        } else {
            const newVote = await Vote.query().insertAndFetch({
                voteValue,
                userId,
                reviewId
            });
        }
        const review = await Review.query().findById(reviewId)
        const serializedReview = await ReviewSerializer.singleShowDetails(review)
        return res.status(201).json({ review: serializedReview });
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(422).json({ errors: error.data });
        } else {
            res.status(500).json({ errors: error.message });
        }
    }
});

export default voteRouter;
