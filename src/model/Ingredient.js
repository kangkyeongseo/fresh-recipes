import mongoose from "mongoose";
// Ingredient 데이터의 Schema를 생성합니다.
const ingSchema = new mongoose.Schema({
  name: { type: String, require: true, trim: true },
  type: { type: String, require: true },
  store: { type: String, require: true },
  amount: { type: Number, require: true },
  amountType: { type: String, require: true },
  purchaseDate: { type: String, require: true },
  periodLife: { type: String, require: true },
  purchase: { type: Boolean, default: false },
  // populate를 사용하기 위한 type과 ref입니다.
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
// ingSchema 이용하여 Ingredient Model을 생성합니다.
const Ingredient = mongoose.model("Ingredient", ingSchema);

export default Ingredient;
