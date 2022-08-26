import express from "express";
import {
  getHome,
  getJoin,
  getLogin,
  getLogout,
  postJoin,
} from "../controllers/rootController";

const rootRouter = express.Router();

rootRouter.get("/", getHome);
rootRouter.get("/login", getLogin);
rootRouter.get("/logout", getLogout);
rootRouter.route("/join").get(getJoin).post(postJoin);

export default rootRouter;
