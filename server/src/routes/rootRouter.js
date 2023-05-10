import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import moviesRouter from "./api/v1/moviesRouter.js";
import reviewsRouter from "./api/v1/reviewsRouter.js";
import voteRouter from "./api/v1/voteRouter.js";

const rootRouter = new express.Router();

rootRouter.use("/", clientRouter);
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/movies", moviesRouter);
rootRouter.use("/api/v1/reviews", reviewsRouter);
rootRouter.use("/api/v1/votes", voteRouter)

export default rootRouter;
