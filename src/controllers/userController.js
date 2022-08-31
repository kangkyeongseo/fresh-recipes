import User from "../model/User";
import bcrypt from "bcrypt";

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
  } = req;
  // User Update
  try {
    await User.findByIdAndUpdate(id, {
      name,
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
    return res.status(200).render("user/user-ing", {
      user,
      coldStore,
      frozenStore,
      roomStore,
    });
  } catch (error) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(404).redirect("/");
  }
};

export const getUserRecipe = (req, res) => {
  const recipes = [
    {
      title: "오징어 볶음",
      description: "쫄깃쫄깃 오징어와 매콤 달달 양념의 조화! 밥 두공기 뚝딱!",
      time: 20,
    },
  ];
  return res.render("user/user-recipes", { recipes });
};
