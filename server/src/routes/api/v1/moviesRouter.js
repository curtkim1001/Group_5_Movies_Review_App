import express from "express"
import objection from "objection"
import { Movie } from "../../../models/index.js"

const moviesRouter = new express.Router()

moviesRouter.get("/", async (req, res) => {
    try {
        const movies = await Movie.query()
        res.set({"Content-Type": "application/json"}).status(200).json({ movies })
    } catch (error) {
        res.set({"Content-Type": "application/json"}).status(500).json({ errors: error.message })
    }
})

export default moviesRouter