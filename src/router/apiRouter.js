import express from "express";
import { UserOnlyMiddleware } from "../../middleware";
import {
  ingredientSpend,
  purchaseAdd,
  purchaseRemove,
  recipeCommentAdd,
} from "../controllers/apiController";

const apiRouter = new express.Router();

apiRouter.all(UserOnlyMiddleware).post("/purchase/:id/add", purchaseAdd);
apiRouter.all(UserOnlyMiddleware).post("/purchase/:id/remove", purchaseRemove);
apiRouter
  .all(UserOnlyMiddleware)
  .post("/ingredient/:id/spend", ingredientSpend);
apiRouter
  .all(UserOnlyMiddleware)
  .post("/recipe/:id/comment/add", recipeCommentAdd);

export default apiRouter;
