import express from "express";
import { PublicOnlyMiddleware, UserOnlyMiddleware } from "../../middleware";
import {
  getHome,
  getJoin,
  getLogin,
  getLogout,
  postJoin,
  postLogin,
} from "../controllers/rootController";

const rootRouter = express.Router();

rootRouter.get("/", getHome);
rootRouter
  .route("/login")
  .all(PublicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);
rootRouter.get("/logout", UserOnlyMiddleware, getLogout);
rootRouter.route("/join").all(PublicOnlyMiddleware).get(getJoin).post(postJoin);

export default rootRouter;
