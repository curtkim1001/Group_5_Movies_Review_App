import express from "express";
import passport from "passport";
import { User } from "../../../models/index.js";
import uploadImage from "../../../services/uploadImage.js"
import objection from "objection"

const usersRouter = new express.Router();

usersRouter.post("/", async (req, res) => {
  const { email, password, passwordConfirmation, username } = req.body;
  try {
    const persistedUser = await User.query().insertAndFetch({ email, password, username });
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    console.log(error);
    return res.status(422).json({ errors: error });
  }
});

usersRouter.get("/image", async (req, res) => {
  try {
    const userToReturn = await User.query().findById(req.user.id)
    return res.status(200).json({ photo : userToReturn.imageUrl })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

// The setup and implementation for this endpoint will be explained in a different article! 

usersRouter.post("/image", uploadImage.single("image"), async (req, res) => {
  try {
    const { body } = req
    const data = {
      ...body,
      image: req.file.location,
    }
    console.log("i'm here"+req.user.id)
    const user = await User.query().findById(req.user.id)
    await user.$query().patch({ imageUrl: req.file.location })
    return res.status(201).json({ photo: user.imageUrl })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ errors: error })
  }
})

export default usersRouter;
