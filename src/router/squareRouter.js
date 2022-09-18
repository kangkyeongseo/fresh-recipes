import express from "express";
import { getSquare, postSquare } from "../controllers/squareController";

const squareRouter = express.Router();

squareRouter.route("/").get(getSquare).post(postSquare);

export default squareRouter;
