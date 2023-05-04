import express from "express"
import objection from "objection"
import { Movie, Review } from "../../../models/index.js"


const reviewsRouter = new express.Router()

reviewsRouter.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const review = await Review.query().findById(id)
        res.status(200).json({ review })
    } catch (error) {
        console.log(error)
        res.status(500).json({ errors: error })
    }
})

export default reviewsRouter