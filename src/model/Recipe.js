import mongoose from "mongoose";

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
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  likes: [{ type: String }],
});

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
