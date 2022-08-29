import express from "express";
import {
  getUserDetail,
  getUserEdit,
  getUserIng,
  getUserRecipe,
  postUserEdit,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/:id", getUserDetail);
userRouter.route("/:id/edit").get(getUserEdit).post(postUserEdit);
userRouter.get("/:id/ingredients", getUserIng);
userRouter.get("/:id/recipes", getUserRecipe);

export default userRouter;
