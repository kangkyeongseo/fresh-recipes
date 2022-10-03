import express from "express";
import { avatarUpload, UserOnlyMiddleware } from "../../middleware";
import {
  getUserDetail,
  getUserEdit,
  getUserIng,
  getUserLike,
  getUserPasswordEdit,
  getUserRecipe,
  postUserEdit,
  postUserPasswordEdit,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/:id", getUserDetail);
userRouter
  .route("/:id/edit")
  .all(UserOnlyMiddleware)
  .get(getUserEdit)
  .post(avatarUpload.single("avatar"), postUserEdit);
userRouter
  .route("/:id/password")
  .all(UserOnlyMiddleware)
  .get(getUserPasswordEdit)
  .post(postUserPasswordEdit);
userRouter.get("/:id/ingredients", getUserIng);
userRouter.get("/:id/recipes", getUserRecipe);
userRouter.get("/:id/likes", getUserLike);

export default userRouter;
