import User from "../model/User";
import bcrypt from "bcrypt";
import userRouter from "../router/userRouter";

export const getUserDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  // Get User Detail Page
  try {
    const user = await User.findById(id);
    return res.status(200).render("user/user-detail", { user });
  } catch (error) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(404).redirect("/");
  }
};

export const getUserEdit = async (req, res) => {
  const {
    params: { id },
  } = req;
  const {
    session: {
      user: { _id },
    },
  } = req;
  // user confrim
  if (id !== _id) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(404).redirect("/");
  }
  // Get User Edit Page
  try {
    const user = await User.findById(id);
    return res.status(200).render("user/user-edit", { user });
  } catch (error) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(404).redirect("/");
  }
};

export const postUserEdit = async (req, res) => {
  const {
    params: { id },
  } = req;
  const {
    body: { name },
    file,
  } = req;
  // User Update
  const user = await User.findById(id);
  try {
    await User.findByIdAndUpdate(id, {
      name,
      avatar: file ? file.path : user.avatar,
    });
  } catch (error) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(404).redirect("/");
  }
  // User Detail Page Redirect
  return res.status(200).redirect(`/user/${id}`);
};

export const getUserPasswordEdit = (req, res) => {
  const {
    params: { id },
  } = req;
  const {
    session: {
      user: { _id },
    },
  } = req;
  // user confrim
  if (id !== _id) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(404).redirect("/");
  }
  // Get Password Edit Page
  return res.status(200).render("user/user-password-change");
};

export const postUserPasswordEdit = async (req, res) => {
  const {
    params: { id },
  } = req;
  const {
    body: { oldPassword, newPassword, newPasswordConfirm },
  } = req;
  // Find User
  const user = await User.findById(id);
  // Password Confrim
  const passwordConfirm = await bcrypt.compare(oldPassword, user.password);
  if (!passwordConfirm) {
    req.flash("error", "현재 비밀번호가 일치하지 않습니다.");
    return res.status(400).redirect(`/user/${id}/password`);
  }
  if (newPassword !== newPasswordConfirm) {
    req.flash("error", "비밀번호 확인이 일치하지 않습니다.");
    return res.status(400).redirect(`/user/${id}/password`);
  }
  req.flash("success", "비밀번호 변경되었습니다.");
  return res.status(200).redirect(`/user/${id}/edit`);
};

export const getUserIng = async (req, res) => {
  const {
    params: { id },
  } = req;
  // Get User Ingredients Page
  try {
    // Get Ingredients Using Populate
    const user = await User.findById(id).populate({ path: "ingredients" });
    // Seperate Ingredients
    const coldStore = user.ingredients.filter(
      (ingredient) => ingredient.store === "냉장"
    );
    const frozenStore = user.ingredients.filter(
      (ingredient) => ingredient.store === "냉동"
    );
    const roomStore = user.ingredients.filter(
      (ingredient) => ingredient.store === "상온"
    );
    const periodIng = user.ingredients.filter((ingredient) => {
      const periodLife = new Date(ingredient.periodLife);
      const today = new Date();
      const period = Math.round((periodLife - today) / 1000 / 3600 / 24);
      return period < 3;
    });
    const purchaseIng = user.ingredients.filter(
      (ingredient) => ingredient.purchase
    );
    return res.status(200).render("user/user-ing", {
      user,
      coldStore,
      frozenStore,
      roomStore,
      periodIng,
      purchaseIng,
    });
  } catch (error) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(404).redirect("/");
  }
};

export const getUserRecipe = async (req, res) => {
  const {
    params: { id },
  } = req;
  // Get User Recipes Page
  try {
    // Get Recipes Using Populate
    const user = await User.findById(id).populate({ path: "recipes" });
    return res.status(200).render("user/user-recipes", { user });
  } catch (error) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(404).redirect("/");
  }
};
