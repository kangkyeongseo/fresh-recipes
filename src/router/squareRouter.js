import express from "express";
import { getSquare, searchSquare } from "../controllers/squareController";

const squareRouter = express.Router();

squareRouter.route("/").get(getSquare);
squareRouter.route("/search").get(searchSquare);

export default squareRouter;
