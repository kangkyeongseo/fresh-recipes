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
      ingredientAmount: { type: String, require: true },
      amountType: { type: Number, require: true },
    },
  ],
  orders: [
    {
      order: { type: Number, require: true },
      content: { type: String, require: true },
    },
  ],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
