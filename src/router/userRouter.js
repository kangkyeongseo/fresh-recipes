import express from "express";
import { getUserDetail, getUserEdit } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/:id", getUserDetail);
userRouter.get("/:id/edit", getUserEdit);

export default userRouter;
