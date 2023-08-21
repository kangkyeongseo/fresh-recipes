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

// Root Router를 생성합니다.
const rootRouter = express.Router();
// Home Router("/")
rootRouter.get("/", getHome);
// Login Router("/login")
rootRouter
  .route("/login")
  // PublicOnlyMiddleware은 세션에 로그인 정보가 없는 사용자만을 접근시켜주는 middleware입니다.
  .all(PublicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);
// Logout Router("/logout")
// UserOnlyMiddleware은 세션에 로그인 정보가 있는 사용자만을 접근시켜주는 middleware입니다.
rootRouter.get("/logout", UserOnlyMiddleware, getLogout);
// Join Router("/join")
rootRouter.route("/join").all(PublicOnlyMiddleware).get(getJoin).post(postJoin);

export default rootRouter;
