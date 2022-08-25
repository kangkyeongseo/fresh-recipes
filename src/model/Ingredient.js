import mongoose from "mongoose";

const ingSchema = new mongoose.Schema({
  name: { type: String, require: true, trim: true },
  type: { type: String, require: true },
  store: { type: String, require: true },
  amount: { type: Number, require: true },
  amountType: { type: String, require: true },
  purchaseDate: { type: String },
  periodLife: { type: String },
});

const Ingredient = mongoose.model("Ingredient", ingSchema);

export default Ingredient;
