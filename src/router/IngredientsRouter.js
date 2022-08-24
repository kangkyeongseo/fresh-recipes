import express from "express";
import {
  getIngAdd,
  getIngdetail,
  getIngEdit,
  getIngSearch,
  postIngAdd,
} from "../controllers/ingredientsController";

const ingredientsRouter = express.Router();

ingredientsRouter.get("/add", getIngAdd);
ingredientsRouter.post("/add", postIngAdd);
ingredientsRouter.get("/search", getIngSearch);
ingredientsRouter.get("/:id", getIngdetail);
ingredientsRouter.get("/:id/edit", getIngEdit);

export default ingredientsRouter;
