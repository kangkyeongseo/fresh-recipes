import express from "express";
import {
  getHome,
  getJoin,
  getLogin,
  getLogout,
} from "../controllers/rootController";

const rootRouter = express.Router();

rootRouter.get("/", getHome);
rootRouter.get("/login", getLogin);
rootRouter.get("/logout", getLogout);
rootRouter.get("/join", getJoin);

export default rootRouter;
