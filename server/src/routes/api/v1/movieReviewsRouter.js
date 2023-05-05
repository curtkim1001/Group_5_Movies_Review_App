import express from "express";
import { Movie, Review } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js";
import objection from "objection";
const { ValidationError } = objection

const movieReviewsRouter = new express.Router({ mergeParams: true })

movieReviewsRouter.post("/", async (req, res) => {
    
    const { body } = req
    const formInput = cleanUserInput(body)
    const { content, rating, spoilerWarning } = formInput
    const userId = req.user.id
    const { movieId } = req.params
    try {
        const newReview = await Review.query().insertAndFetch({ content, rating, spoilerWarning, movieId, userId })
        return res.status(201).json({ review: newReview })
    } catch (error) {
        if(error instanceof ValidationError) {
            res.set({"Content-Type": "application/json"}).status(422).json({ errors: error.data })
        } else {
            res.set({"Content-Type": "application/json"}).status(500).json({ errors: error.message })
        }
    }

})

export default movieReviewsRouter