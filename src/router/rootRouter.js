import express from "express";
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
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.get("/logout", getLogout);
rootRouter.route("/join").get(getJoin).post(postJoin);

export default rootRouter;
