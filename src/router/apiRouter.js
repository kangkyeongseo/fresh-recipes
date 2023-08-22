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

// Api Router를 생성합니다.
const apiRouter = new express.Router();
// Purchage Add Api Router("/api/purchase/:id/add")
apiRouter.all(UserOnlyMiddleware).post("/purchase/:id/add", purchaseAdd);
//  Purchage Remove Api Router("/api/purchase/:id/remove")
apiRouter.all(UserOnlyMiddleware).post("/purchase/:id/remove", purchaseRemove);
// Ingredient Spend Api Router("/api/ingredinet/:id/spend")
apiRouter
  .all(UserOnlyMiddleware)
  .post("/ingredient/:id/spend", ingredientSpend);
// Comment Add Api Router("/api/recipe/:id/comment/add")
apiRouter
  .all(UserOnlyMiddleware)
  .post("/recipe/:id/comment/add", recipeCommentAdd);
// Comment Delete Api Router("/api/recipe/:id/comment/delete")
apiRouter
  .all(UserOnlyMiddleware)
  .delete("/comment/:id/delete", recipeCommentDelete);
// Comment Edit Api Router("/api/recipe/:id/comment/edit")
apiRouter.all(UserOnlyMiddleware).post("/comment/:id/edit", recipeCommentEdit);
// like Add Api Router("/api/recipe/:id/like/add")
apiRouter.all(UserOnlyMiddleware).post("/recipe/:id/like/add", likeAdd);
// like Delete Api Router("/api/recipe/:id/like/delete")
apiRouter.all(UserOnlyMiddleware).post("/recipe/:id/like/delete", likeDelete);

export default apiRouter;
