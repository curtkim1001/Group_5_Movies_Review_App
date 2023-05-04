import express from "express"
import objection from "objection"
import { Movie } from "../../../models/index.js"
const moviesRouter = new express.Router()

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
        movie.reviews = reviews
        return res.status(200).json({ movie: movie })
    } catch (error) {
        res.status(500).json({ errors: error })
    }
})

export default moviesRouter

