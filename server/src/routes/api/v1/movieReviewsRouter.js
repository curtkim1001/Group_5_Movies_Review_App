import express from "express";
import { Movie, Review } from "../../../models/index.js";
import cleanUserInput from "../../../services/cleanUserInput.js";
import objection from "objection";
import ReviewSerializer from "../../../serializers/ReviewSerializer.js";
const { ValidationError } = objection;

const movieReviewsRouter = new express.Router({ mergeParams: true });

movieReviewsRouter.post("/", async (req, res) => {
    const { body } = req;
    const formInput = cleanUserInput(body);
    const { content, rating, spoilerWarning } = formInput;
    const userId = req.user.id;
    const { movieId } = req.params;
    try {
        const newReview = await Review.query().insertAndFetch({
            content,
            rating,
            spoilerWarning,
            movieId,
            userId,
        });
        const serializedReview = await ReviewSerializer.singleShowDetails(newReview)
        return res.status(201).json({ review: serializedReview });
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(422).json({ errors: error.data });
        } else {
            res.status(500).json({ errors: error.message });
        }
    }
});

movieReviewsRouter.delete("/:id", async (req, res) => {
    const { id } = req.params
    try {
        await Review.query().deleteById(id)
        res.status(200).json({ message: "Review was deleted by user" })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

movieReviewsRouter.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const review = await Review.query().findById(id)
        const serializedReview = await ReviewSerializer.singleShowDetails(review)
        return res.status(200).json({ review: serializedReview });
    } catch (error) {
      res.status(500).json({ errors: error.message })
    }
  })

movieReviewsRouter.patch("/:id/edit", async (req, res) => {
    const { id } = req.params
    try {
        const { body } = req
        const cleanedInput = cleanUserInput(body.review)

        const allowedAttributes = ["content", "rating", "spoilerWarning"]
        const serializedReview = {}
        for (const attribute of allowedAttributes) {
            serializedReview[attribute] = cleanedInput[attribute]
        }

        await Review.query().patchAndFetchById(id, serializedReview)
        return res.status(200).json({ message: "Review successfully edited" })
    } catch (err) {
        if (err instanceof ValidationError) {
            res.status(422).json({ errors: err.data })
        } else {
            res.status(500).json({ errors: err.message })
        }
    }
})

export default movieReviewsRouter;
