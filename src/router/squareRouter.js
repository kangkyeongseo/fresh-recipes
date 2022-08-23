import express from "express";
import { getSquare, getSquareSearch } from "../controllers/squareController";

const squareRouter = express.Router();

squareRouter.get("/", getSquare);
squareRouter.get("/search", getSquareSearch);

export default squareRouter;
