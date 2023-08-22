import mongoose from "mongoose";
import User from "./model/User";
import Ingredient from "./model/Ingredient";
import Recipe from "./model/Recipe";
import Comment from "./model/Comment";

// mongoose를 사용하여 mongoDB와 Express를 연결시켜 줍니다.
mongoose.connect("mongodb://127.0.0.1:27017/fresh-recipes");
// on 메서드를 사용하여 error가 발생할떄 마다 함수를 호출합니다.
mongoose.connection.on("error", () => console.log(error));
// once 메서드를 사용하여 연결 성공시 한번 함수를 호출합니다.
mongoose.connection.once("open", () => console.log("DB connect"));
