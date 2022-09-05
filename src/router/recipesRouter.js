import express from "express";
import { UserOnlyMiddleware } from "../../middleware";
import {
  getRecipesAdd,
  getRecipesDetail,
  getRecipesEdit,
  getRecipesSearch,
  postRecipeEdit,
  postRecipesAdd,
} from "../controllers/recipesController";

const recipesRouter = express.Router();

recipesRouter
  .route("/add")
  .all(UserOnlyMiddleware)
  .get(getRecipesAdd)
  .post(postRecipesAdd);
recipesRouter.get("/search", getRecipesSearch);
recipesRouter.get("/:id", getRecipesDetail);
recipesRouter.route("/:id/edit").get(getRecipesEdit).post(postRecipeEdit);

export default recipesRouter;
