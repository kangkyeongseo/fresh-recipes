import express from "express";
import { getSquare, searchSquare } from "../controllers/squareController";

// Sqaure Router를 생성합니다.
const squareRouter = express.Router();
// Sqaure Router("/square")
squareRouter.route("/").get(getSquare);
// Sqaure Search Router("/square/search")
squareRouter.route("/search").get(searchSquare);

export default squareRouter;
