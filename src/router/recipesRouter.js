import express from "express";
import { UserOnlyMiddleware } from "../../middleware";
import {
  getRecipesAdd,
  getRecipesDetail,
  getRecipesEdit,
  getRecipesSearch,
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
recipesRouter.get("/:id/edit", getRecipesEdit);

export default recipesRouter;
