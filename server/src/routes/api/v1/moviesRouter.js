import express from "express"
import objection from "objection"
import { Movie, Review, User } from "../../../models/index.js"
import movieReviewsRouter from "./movieReviewsRouter.js"
import ReviewSerializer from "../../../serializers/ReviewSerializer.js"

const moviesRouter = new express.Router()

moviesRouter.use("/:movieId/reviews", movieReviewsRouter)

moviesRouter.get("/", async (req, res) => {
    try {
        const movies = await Movie.query()
        res.status(200).json({ movies })
    } catch (error) {
        res.status(500).json({ errors: error.message })
    }
})

moviesRouter.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const movie = await Movie.query().findById(id)
        const reviews = await movie.$relatedQuery("reviews")
        const serializedReviews = await Promise.all(reviews.map(async review => {
           return await ReviewSerializer.showDetails(review)
        }
        ))

        movie.reviews = serializedReviews

        return res.status(200).json({ movie: movie })
    } catch (error) {
        console.log(error)
        res.status(500).json({ errors: error })
    }
})

export default moviesRouter

