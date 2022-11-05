import User from "../model/User";
import bcrypt from "bcrypt";
import Recipe from "../model/Recipe";

// Get User Detail
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
    return res.status(404).render("404");
  }
};

// Get User Edit
export const getUserEdit = async (req, res) => {
  const {
    params: { id },
  } = req;
  const {
    session: {
      user: { _id },
    },
  } = req;
  // User confrim
  if (id !== _id) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(403).redirect("/");
  }
  // Get User Edit Page
  try {
    const user = await User.findById(id);
    return res.status(200).render("user/user-edit", { user });
  } catch (error) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(404).render("404");
  }
};

// Post User Edit
export const postUserEdit = async (req, res) => {
  const {
    params: { id },
  } = req;
  const {
    body: { name },
    file,
  } = req;
  // User Update
  try {
    const user = await User.findById(id);
    await User.findByIdAndUpdate(id, {
      name,
      avatar: file ? file.path : user.avatar,
    });
  } catch (error) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(404).render("404");
  }
  // User Detail Page Redirect
  return res.status(200).redirect(`/user/${id}`);
};

// Get Password Edit
export const getUserPasswordEdit = (req, res) => {
  const {
    params: { id },
  } = req;
  const {
    session: {
      user: { _id },
    },
  } = req;
  // User confrim
  if (id !== _id) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(403).redirect("/");
  }
  // Get Password Edit Page
  return res.status(200).render("user/user-password-change");
};

// Post Password Edit
export const postUserPasswordEdit = async (req, res) => {
  const {
    params: { id },
  } = req;
  const {
    body: { oldPassword, newPassword, newPasswordConfirm },
  } = req;
  // Find User
  try {
    const user = await User.findById(id);
    // Password Confrim
    const passwordConfirm = await bcrypt.compare(oldPassword, user.password);
    if (!passwordConfirm) {
      req.flash("error", "현재 비밀번호가 일치하지 않습니다.");
      return res.status(403).redirect(`/user/${id}/password`);
    }
    if (newPassword !== newPasswordConfirm) {
      req.flash("error", "비밀번호 확인이 일치하지 않습니다.");
      return res.status(403).redirect(`/user/${id}/password`);
    }
    req.flash("success", "비밀번호 변경되었습니다.");
    return res.status(200).redirect(`/user/${id}/edit`);
  } catch (error) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(404).render("404");
  }
};

// Get User Ingredients
export const getUserIng = async (req, res) => {
  const {
    params: { id },
  } = req;
  // Public User Confirm
  if (id === "undefined") {
    req.flash("error", "로그인 후 사용이 가능합니다.");
    return res.status(403).redirect("/");
  }
  // Get User Ingredients Page
  try {
    // Get Ingredients Using Populate
    const user = await User.findById(id).populate("ingredients");
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
    // Get Ingredients near expirt date
    const periodIng = user.ingredients.filter((ingredient) => {
      const periodLife = new Date(ingredient.periodLife);
      const today = new Date();
      const period = Math.round((periodLife - today) / 1000 / 3600 / 24);
      return period < 3;
    });
    // Get Ingredients to Buy
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
    return res.status(404).render("404");
  }
};

// Get User Recipes
export const getUserRecipe = async (req, res) => {
  const {
    query: { keyword },
    params: { id },
  } = req;
  // Public User Confirm
  if (id === "undefined") {
    req.flash("error", "로그인 후 사용이 가능합니다.");
    return res.status(403).redirect("/");
  }
  // Get Recipes Using Populate
  if (!keyword) {
    try {
      const user = await User.findById(id).populate({ path: "recipes" });
      return res
        .status(200)
        .render("user/user-recipes", { id, recipes: user.recipes });
    } catch (error) {
      req.flash("error", "허용되지 않는 경로입니다.");
      return res.status(404).render("404");
    }
  }
  // Get Search Recipes
  else {
    try {
      const recipes = await Recipe.find({ name: keyword, owner: id });
      return res.status(200).render("user/user-recipes", { id, recipes });
    } catch (error) {
      req.flash("error", "허용되지 않는 경로입니다.");
      return res.status(404).render("404");
    }
  }
};

// Get User Likes Recipes
export const getUserLike = async (req, res) => {
  const {
    params: { id },
  } = req;
  // Get User Likes Recipes
  try {
    const user = await User.findById(id);
    let recipes = [];
    for (let i = 0; i < user.likes.length; i++) {
      const recipe = await Recipe.findById(user.likes[i]);
      recipes.push(recipe);
    }
    console.log(user.likes, recipes);
    return res.render("user/user-likes", { recipes });
  } catch (error) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(404).render("404");
  }
};
