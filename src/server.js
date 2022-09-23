import express from "express";
import "./db";
import ingredientsRouter from "./router/IngredientsRouter";
import recipesRouter from "./router/recipesRouter";
import rootRouter from "./router/rootRouter";
import squareRouter from "./router/squareRouter";
import userRouter from "./router/userRouter";
import session from "express-session";
import MongoStore from "connect-mongo";
import morgan from "morgan";
import flash from "express-flash";
import { sessionMiddleware } from "../middleware";
import apiRouter from "./router/apiRouter";

const app = express();
const PORT = 3000;

const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

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
app.use(express.urlencoded({ extened: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/assets", express.static("assets"));
app.use(logger);
app.use(flash());

app.use(sessionMiddleware);

app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/ingredient", ingredientsRouter);
app.use("/recipe", recipesRouter);
app.use("/square", squareRouter);
app.use("/api", apiRouter);

const handleListen = () => console.log(`Listening on http://localhost${PORT}`);

app.listen(PORT, handleListen);
