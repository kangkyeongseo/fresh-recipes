import express from "express";
import {
  getIngAdd,
  getIngdetail,
  getIngEdit,
  getIngredients,
  getIngSearch,
} from "../controllers/ingredientsController";

const ingredientsRouter = express.Router();

ingredientsRouter.get("/", getIngredients);
ingredientsRouter.get("/add", getIngAdd);
ingredientsRouter.get("/search", getIngSearch);
ingredientsRouter.get("/:id", getIngdetail);
ingredientsRouter.get("/:id/edit", getIngEdit);

export default ingredientsRouter;
