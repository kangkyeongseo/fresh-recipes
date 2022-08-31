import express from "express";
import { UserOnlyMiddleware } from "../../middleware";
import {
  getIngAdd,
  getIngDetail,
  getIngEdit,
  getIngSearch,
  postIngAdd,
  postIngDetail,
  postIngEdit,
} from "../controllers/ingredientsController";

const ingredientsRouter = express.Router();

ingredientsRouter
  .route("/add")
  .all(UserOnlyMiddleware)
  .get(getIngAdd)
  .post(postIngAdd);
ingredientsRouter.get("/search", getIngSearch);
ingredientsRouter.route("/:id").get(getIngDetail).post(postIngDetail);
ingredientsRouter
  .route("/:id/edit")
  .all(UserOnlyMiddleware)
  .get(getIngEdit)
  .post(postIngEdit);

export default ingredientsRouter;
