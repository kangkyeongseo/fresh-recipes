import "dotenv/config";
import "./db";
import express from "express";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import morgan from "morgan";
import { sessionMiddleware } from "./middleware";
import ingredientsRouter from "./router/IngredientsRouter";
import recipesRouter from "./router/recipesRouter";
import rootRouter from "./router/rootRouter";
import squareRouter from "./router/squareRouter";
import userRouter from "./router/userRouter";
import apiRouter from "./router/apiRouter";

// Express application을 생성합니다.
const app = express();
const PORT = 3000;
// HTTP request logger middleware인 morgan을 생성합니다.
const logger = morgan("dev");
// View Engine으로 Pug를 사용합니다.
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
// express-session을 적용합니다.
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/fresh-recipes",
    }),
  })
);
// Body Parser
app.use(express.urlencoded({ extened: true }));
app.use(express.json());
// 정적 파일을 사용합니다.
app.use("/uploads", express.static("uploads"));
app.use("/assets", express.static("assets"));
// morgan을 사용합니다.
app.use(logger);
// express-flash를 사용합니다.
app.use(flash());
// Response Object의 Locals에 세션정보를 저장히기 위한 middleware입니다.
app.use(sessionMiddleware);
// express.Router 클래스를 사용하여 모듈식 마운팅 가능한 핸들러를 구성합니다.
app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/ingredient", ingredientsRouter);
app.use("/recipe", recipesRouter);
app.use("/square", squareRouter);
app.use("/api", apiRouter);

const handleListen = () => console.log(`Listening on http://localhost${PORT}`);
//지정된 포트에 연결합니다.
app.listen(PORT, handleListen);
