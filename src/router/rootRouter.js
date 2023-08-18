import express from "express";
import { PublicOnlyMiddleware, UserOnlyMiddleware } from "../middleware";
import {
  getHome,
  getJoin,
  getLogin,
  getLogout,
  postJoin,
  postLogin,
} from "../controllers/rootController";

const rootRouter = express.Router();

// Home Router
rootRouter.get("/", getHome);
// Login Router
rootRouter
  .route("/login")
  .all(PublicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);
// Logout Router
rootRouter.get("/logout", UserOnlyMiddleware, getLogout);
// Join Router
rootRouter.route("/join").all(PublicOnlyMiddleware).get(getJoin).post(postJoin);

export default rootRouter;
