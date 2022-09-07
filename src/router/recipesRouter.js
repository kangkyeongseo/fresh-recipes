import express from "express";
import { UserOnlyMiddleware } from "../../middleware";
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
  .post(postRecipeAdd);
recipesRouter.get("/search", getRecipeSearch);
recipesRouter.get("/:id", getRecipeDetail);
recipesRouter
  .route("/:id/edit")
  .all(UserOnlyMiddleware)
  .get(getRecipeEdit)
  .post(postRecipeEdit);
recipesRouter.route("/:id/delete").all(UserOnlyMiddleware).get(getRecipeDelete);

export default recipesRouter;
