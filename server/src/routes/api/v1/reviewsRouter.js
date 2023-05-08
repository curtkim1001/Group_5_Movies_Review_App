import express from "express";
import { Review, User } from "../../../models/index.js";

const reviewsRouter = new express.Router();

reviewsRouter.get("/:userId", async (req, res) => {
  const id = req.params.userId;
  try {
    const user = await User.query().findById(id);
    const reviews = await user.$relatedQuery("reviews");
    return res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
});

export default reviewsRouter;
