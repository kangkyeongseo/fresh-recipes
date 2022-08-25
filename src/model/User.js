import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, require: true, unique: true },
  passwoord: { type: String },
  name: { type: String, require: true },
});

const User = mongoose.model("User", userSchema);

export default User;
