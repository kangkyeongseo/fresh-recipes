import express from "express";
import {
  getUserDetail,
  getUserEdit,
  getUserIng,
  getUserPasswordEdit,
  getUserRecipe,
  postUserEdit,
  postUserPasswordEdit,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/:id", getUserDetail);
userRouter.route("/:id/edit").get(getUserEdit).post(postUserEdit);
userRouter
  .route("/:id/password")
  .get(getUserPasswordEdit)
  .post(postUserPasswordEdit);
userRouter.get("/:id/ingredients", getUserIng);
userRouter.get("/:id/recipes", getUserRecipe);

export default userRouter;
