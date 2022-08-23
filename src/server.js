import express from "express";
import ingredientsRouter from "./router/IngredientsRouter";
import recipesRouter from "./router/recipesRouter";
import rootRouter from "./router/rootRouter";
import userRouter from "./router/userRouter";

const app = express();
const PORT = 3000;

app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/ingredients", ingredientsRouter);
app.use("/recipes", recipesRouter);

const handleListen = () => console.log(`Listening on http://localhost${PORT}`);

app.listen(PORT, handleListen);
