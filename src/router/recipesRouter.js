import express from "express";
import { thumbUpload, UserOnlyMiddleware } from "../../middleware";
import {
  getRecipeAdd,
  getRecipeDetail,
  getRecipeEdit,
  getRecipeSearch,
  postRecipeEdit,
  postRecipeAdd,
  getRecipeDelete,
} from "../controllers/recipesController";

const recipesRouter = express.Router();

recipesRouter
  .route("/add")
  .all(UserOnlyMiddleware)
  .get(getRecipeAdd)
  .post(thumbUpload.single("thumb"), postRecipeAdd);
recipesRouter.get("/search", getRecipeSearch);
recipesRouter.get("/:id", getRecipeDetail);
recipesRouter
  .route("/:id/edit")
  .all(UserOnlyMiddleware)
  .get(getRecipeEdit)
  .post(thumbUpload.single("thumb"), postRecipeEdit);
recipesRouter.route("/:id/delete").all(UserOnlyMiddleware).get(getRecipeDelete);

export default recipesRouter;
