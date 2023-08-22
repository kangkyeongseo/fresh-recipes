import mongoose from "mongoose";
import bcrypt from "bcrypt";
// User 데이터의 Schema를 생성합니다.
const userSchema = new mongoose.Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String },
  name: { type: String, require: true },
  avatar: { type: String },
  // populate를 사용하기 위한 type과 ref입니다.
  ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" }],
  recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  likes: [{ type: String }],
});
// pre 메소드를 사용하여 save전에 작업을 실행합니다.
userSchema.pre("save", async function (next) {
  // isModifie를 사용하여 수정 여부를 확인합니다.
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
  next();
});
// userSchema를 이용하여 User Model을 생성합니다.
const User = mongoose.model("User", userSchema);

export default User;
