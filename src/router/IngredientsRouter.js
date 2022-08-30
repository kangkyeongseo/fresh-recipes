import express from "express";
import { UserOnlyMiddleware } from "../../middleware";
import {
  getIngAdd,
  getIngdetail,
  getIngEdit,
  getIngSearch,
  postIngAdd,
} from "../controllers/ingredientsController";

const ingredientsRouter = express.Router();

ingredientsRouter
  .route("/add")
  .all(UserOnlyMiddleware)
  .get(getIngAdd)
  .post(postIngAdd);
ingredientsRouter.post("/add", postIngAdd);
ingredientsRouter.get("/search", getIngSearch);
ingredientsRouter.get("/:id", getIngdetail);
ingredientsRouter.get("/:id/edit", getIngEdit);

export default ingredientsRouter;
