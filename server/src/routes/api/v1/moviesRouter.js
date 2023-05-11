import express from "express"
import objection from "objection"
import { Movie, Review, User } from "../../../models/index.js"
import movieReviewsRouter from "./movieReviewsRouter.js"
import ReviewSerializer from "../../../serializers/ReviewSerializer.js"
import MovieSerializer from "../../../serializers/MovieSerializer.js"

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
        const serializedMovie = await MovieSerializer.getSummary(movie, req.user)
        return res.status(200).json({ movie: serializedMovie })
    } catch (error) {
        res.status(500).json({ errors: error })
    }
})

export default moviesRouter

