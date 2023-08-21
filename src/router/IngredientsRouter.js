import express from "express";
import { UserOnlyMiddleware } from "../middleware";
import {
  getIngAdd,
  getIngDelete,
  getIngDetail,
  getIngEdit,
  getIngSearch,
  postIngAdd,
  postIngEdit,
} from "../controllers/ingredientsController";

// Ingredient Router를 생성합니다.
const ingredientsRouter = express.Router();
// Ingredient Add Router("/ingredient/add")
ingredientsRouter
  .route("/add")
  .all(UserOnlyMiddleware)
  .get(getIngAdd)
  .post(postIngAdd);
// Ingredient Search Router("/ingredient/search")
ingredientsRouter.get("/search", getIngSearch);
// Ingredient Detail Router("/ingredient/:id")
ingredientsRouter.route("/:id").get(getIngDetail);
// Ingredient Edit Router("/ingredient/:id/:edit")
ingredientsRouter
  .route("/:id/edit")
  .all(UserOnlyMiddleware)
  .get(getIngEdit)
  .post(postIngEdit);
// Ingredient Delete Router("/ingredient/delete")
ingredientsRouter
  .route("/:id/delete")
  .all(UserOnlyMiddleware)
  .get(getIngDelete);

export default ingredientsRouter;
