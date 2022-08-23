import express from "express";
import {
  getUserDetail,
  getUserEdit,
  getUserIng,
  getUserRecipe,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/:id", getUserDetail);
userRouter.get("/:id/edit", getUserEdit);
userRouter.get("/:id/ingredients", getUserIng);
userRouter.get("/:id/recipes", getUserRecipe);

export default userRouter;
