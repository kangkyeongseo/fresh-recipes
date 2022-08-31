import express from "express";
import { UserOnlyMiddleware } from "../../middleware";
import {
  getIngAdd,
  getIngDetail,
  getIngEdit,
  getIngSearch,
  postIngAdd,
  postIngDetail,
} from "../controllers/ingredientsController";

const ingredientsRouter = express.Router();

ingredientsRouter
  .route("/add")
  .all(UserOnlyMiddleware)
  .get(getIngAdd)
  .post(postIngAdd);
ingredientsRouter.get("/search", getIngSearch);
ingredientsRouter.route("/:id").get(getIngDetail).post(postIngDetail);
ingredientsRouter.get("/:id/edit", getIngEdit);

export default ingredientsRouter;
