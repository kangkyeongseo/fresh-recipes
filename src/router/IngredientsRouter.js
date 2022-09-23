import express from "express";
import { UserOnlyMiddleware } from "../../middleware";
import {
  getIngAdd,
  getIngDelete,
  getIngDetail,
  getIngEdit,
  getIngSearch,
  postIngAdd,
  postIngEdit,
} from "../controllers/ingredientsController";

const ingredientsRouter = express.Router();

ingredientsRouter
  .route("/add")
  .all(UserOnlyMiddleware)
  .get(getIngAdd)
  .post(postIngAdd);
ingredientsRouter.get("/search", getIngSearch);
ingredientsRouter.route("/:id").get(getIngDetail);
ingredientsRouter
  .route("/:id/edit")
  .all(UserOnlyMiddleware)
  .get(getIngEdit)
  .post(postIngEdit);
ingredientsRouter
  .route("/:id/delete")
  .all(UserOnlyMiddleware)
  .get(getIngDelete);

export default ingredientsRouter;
