import express from "express";
import { thumbUpload, UserOnlyMiddleware } from "../middleware";
import {
  getRecipeAdd,
  getRecipeDetail,
  getRecipeEdit,
  getRecipeSearch,
  postRecipeEdit,
  postRecipeAdd,
  getRecipeDelete,
} from "../controllers/recipesController";

// Recipe Router를 생성합니다.
const recipesRouter = express.Router();
// Recipe Add Router("/recipe/add")
recipesRouter
  .route("/add")
  .all(UserOnlyMiddleware)
  .get(getRecipeAdd)
  .post(thumbUpload.single("thumb"), postRecipeAdd);
// Recipe Search Router("/recipe/search")
recipesRouter.get("/search", getRecipeSearch);
// Recipe Detail Router("/recipe/:id")
recipesRouter.get("/:id", getRecipeDetail);
// Recipe Edit Router("/recipe/:id/edit")
recipesRouter
  .route("/:id/edit")
  .all(UserOnlyMiddleware)
  .get(getRecipeEdit)
  .post(thumbUpload.single("thumb"), postRecipeEdit);
// Recipe Delete Router("/recipe/:id/delete")
recipesRouter.route("/:id/delete").all(UserOnlyMiddleware).get(getRecipeDelete);

export default recipesRouter;
