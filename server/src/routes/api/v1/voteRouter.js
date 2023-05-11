import express from "express";
import { Vote } from "../../../models/index.js";
import { ValidationError } from "objection";

const voteRouter = new express.Router();

// voteRouter.get("/", async (req, res) => {
//     const currentUser = req.user
//     try {
//         const votes = await Vote.query()
//         res.status(200).json({ voteValue: voteTotal })
//     } catch (error) {

//         res.status(500).json({ errors: error.message })
//     }
// })

voteRouter.post("/", async (req, res) => {
    console.log(`inside of post router`)
    const { body } = req;
    console.log(req.body)
    const votes = req.body.votes;
    const reviewId = req.body.reviewId;
    const userId = req.user.id;
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
            console.log(error.data)
        } else {
            console.log(error.message)
            res.status(500).json({ errors: error.message });
        }
    }
});

export default voteRouter;