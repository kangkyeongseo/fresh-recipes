import express from "express";
import { avatarUpload, UserOnlyMiddleware } from "../middleware";
import {
  getUserDetail,
  getUserEdit,
  getUserIng,
  getUserLike,
  getUserPasswordEdit,
  getUserRecipe,
  getUserRecipeSearch,
  githubFinish,
  githubLogin,
  postUserEdit,
  postUserPasswordEdit,
} from "../controllers/userController";

// User Router를 생성합니다.
const userRouter = express.Router();

// User Detail Router ("/user/:id")
userRouter.get("/:id", getUserDetail);
// User Edit Router ("/user/:id/edit")
userRouter
  .route("/:id/edit")
  .all(UserOnlyMiddleware)
  .get(getUserEdit)
  .post(avatarUpload.single("avatar"), postUserEdit);
// User Password Edit Router ("/user/:id/password")
userRouter
  .route("/:id/password")
  .all(UserOnlyMiddleware)
  .get(getUserPasswordEdit)
  .post(postUserPasswordEdit);
// User Ingredients Router ("/user/:id/ingredinets")
userRouter.get("/:id/ingredients", getUserIng);
// User Recipes Router ("/user/:id/recipes")
userRouter.route("/:id/recipes").get(getUserRecipe);
// User Likes Recipes ("/user/:id/likes")
userRouter.get("/:id/likes", getUserLike);
// Github Login Router
userRouter.get("/github/login", githubLogin);
userRouter.get("/github/finish", githubFinish);

export default userRouter;
