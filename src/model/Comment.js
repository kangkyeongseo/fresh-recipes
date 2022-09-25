import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  content: { type: String, require: true, trim: true },
  createAt: { type: Date, default: Date.now },
  recipe: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
