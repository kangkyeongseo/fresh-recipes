import express from "express";
import { UserOnlyMiddleware } from "../middleware";
import {
  ingredientSpend,
  likeAdd,
  likeDelete,
  purchaseAdd,
  purchaseRemove,
  recipeCommentAdd,
  recipeCommentDelete,
  recipeCommentEdit,
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
apiRouter
  .all(UserOnlyMiddleware)
  .delete("/comment/:id/delete", recipeCommentDelete);
apiRouter.all(UserOnlyMiddleware).post("/comment/:id/edit", recipeCommentEdit);
apiRouter.all(UserOnlyMiddleware).post("/recipe/:id/like/add", likeAdd);
apiRouter.all(UserOnlyMiddleware).post("/recipe/:id/like/delete", likeDelete);

export default apiRouter;
