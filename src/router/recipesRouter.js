import express from "express";
import {
  getRecipes,
  getRecipesAdd,
  getRecipesDetail,
  getRecipesEdit,
  getRecipesSearch,
} from "../controllers/recipesController";

const recipesRouter = express.Router();

recipesRouter.get("/", getRecipes);
recipesRouter.get("/add", getRecipesAdd);
recipesRouter.get("/search", getRecipesSearch);
recipesRouter.get("/:id", getRecipesDetail);
recipesRouter.get("/:id/edit", getRecipesEdit);

export default recipesRouter;
