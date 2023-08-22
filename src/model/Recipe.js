import mongoose from "mongoose";
// Recipe 데이터의 Schema를 생성합니다.
const recipeSchema = new mongoose.Schema({
  name: { type: String, require: true, trim: true },
  description: { type: String, require: true },
  serving: { type: Number, require: true },
  time: { type: Number, require: true },
  thumb: { type: String },
  ingredients: [
    {
      ingredientName: { type: String, require: true },
      ingredientAmount: { type: Number, require: true },
      amountType: { type: String, require: true },
    },
  ],
  orders: [
    {
      order: { type: Number, require: true },
      content: { type: String, require: true },
    },
  ],
  // populate를 사용하기 위한 type과 ref입니다.
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  likes: [{ type: String }],
});
// recipeSchema를 이용하여 Recipe Model을 생성합니다.
const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
