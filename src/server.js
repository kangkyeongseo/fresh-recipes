import express from "express";
import db from "./db";
import ingredientsRouter from "./router/IngredientsRouter";
import recipesRouter from "./router/recipesRouter";
import rootRouter from "./router/rootRouter";
import squareRouter from "./router/squareRouter";
import userRouter from "./router/userRouter";
import session from "express-session";
import morgan from "morgan";
import flash from "express-flash";
import { sessionMiddleware } from "../middleware";

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
  })
);
app.use(express.urlencoded({ extened: true }));
app.use(logger);
app.use(flash());

app.use(sessionMiddleware);

app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/ingredient", ingredientsRouter);
app.use("/recipe", recipesRouter);
app.use("/square", squareRouter);

const handleListen = () => console.log(`Listening on http://localhost${PORT}`);

app.listen(PORT, handleListen);
