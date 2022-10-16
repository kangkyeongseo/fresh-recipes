import express from "express";
import { avatarUpload, UserOnlyMiddleware } from "../../middleware";
import {
  getUserDetail,
  getUserEdit,
  getUserIng,
  getUserLike,
  getUserPasswordEdit,
  getUserRecipe,
  getUserRecipeSearch,
  postUserEdit,
  postUserPasswordEdit,
} from "../controllers/userController";

const userRouter = express.Router();

// User Detail Router
userRouter.get("/:id", getUserDetail);
// User Edit Router
userRouter
  .route("/:id/edit")
  .all(UserOnlyMiddleware)
  .get(getUserEdit)
  .post(avatarUpload.single("avatar"), postUserEdit);
// Password Edit Router
userRouter
  .route("/:id/password")
  .all(UserOnlyMiddleware)
  .get(getUserPasswordEdit)
  .post(postUserPasswordEdit);
// User Ingredients Router
userRouter.get("/:id/ingredients", getUserIng);
// User Recipes Router
userRouter.route("/:id/recipes").get(getUserRecipe);
// User Likes Recipes
userRouter.get("/:id/likes", getUserLike);

export default userRouter;
