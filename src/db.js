import mongoose from "mongoose";
import User from "./model/User";
import Ingredient from "./model/Ingredient";
import Recipe from "./model/Recipe";

mongoose.connect("mongodb://127.0.0.1:27017/fresh-recipes");

mongoose.connection.on("error", () => console.log(error));

mongoose.connection.once("open", () => console.log("DB connect"));
