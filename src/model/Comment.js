import mongoose from "mongoose";
// Comment 데이터의 Schema를 생성합니다.
const commentSchema = new mongoose.Schema({
  content: { type: String, require: true, trim: true },
  createAt: { type: Date, default: Date.now },
  // populate를 사용하기 위한 type과 ref입니다.
  recipe: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
// commentSchema 이용하여 Comment Model을 생성합니다.
const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
