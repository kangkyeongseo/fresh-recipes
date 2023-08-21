import User from "../model/User";
import bcrypt from "bcrypt";
import Recipe from "../model/Recipe";
import fetch from "node-fetch";

// getUserDetail Controller
export const getUserDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  // param의 id값을 이용하여 User 데이터를 불러옵니다
  try {
    const user = await User.findById(id);
    return res.status(200).render("user/user-detail", { user });
  } catch (error) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(404).render("404");
  }
};

// getUserEdit Controller
export const getUserEdit = async (req, res) => {
  const {
    params: { id },
  } = req;
  const {
    session: {
      user: { _id },
    },
  } = req;
  // Param의 User id와 session의 User _id를 비교합니다.
  if (id !== _id) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(403).redirect("/");
  }
  // param의 id값을 이용하여 User 데이터를 불러옵니다
  try {
    const user = await User.findById(id);
    return res.status(200).render("user/user-edit", { user });
  } catch (error) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(404).render("404");
  }
};

// postUserEdit Controller
export const postUserEdit = async (req, res) => {
  const {
    params: { id },
  } = req;
  // Multer를 사용하여 req.file을 통해 이미지 데이터를 전달받습니다.
  const {
    body: { name },
    file,
  } = req;
  // User 데이터를 update합니다.
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

// getUserPasswordEdit Controller
export const getUserPasswordEdit = (req, res) => {
  const {
    params: { id },
  } = req;
  const {
    session: {
      user: { _id },
    },
  } = req;
  // Param의 User id와 session의 User _id를 비교합니다.
  if (id !== _id) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(403).redirect("/");
  }
  return res.status(200).render("user/user-password-change");
};

// postUserPasswordEdit Controller
export const postUserPasswordEdit = async (req, res) => {
  const {
    params: { id },
  } = req;
  const {
    body: { oldPassword, newPassword, newPasswordConfirm },
  } = req;
  // param의 id값을 이용하여 User 데이터를 불러옵니다
  try {
    const user = await User.findById(id);
    // User의 password와 body.oldPassword를 비교합니다.
    const passwordConfirm = await bcrypt.compare(oldPassword, user.password);
    // passwordConfirmr가 일치하지 않을 경우
    if (!passwordConfirm) {
      req.flash("error", "현재 비밀번호가 일치하지 않습니다.");
      return res.status(403).redirect(`/user/${id}/password`);
    }
    // body.newPassword와 body.newPasswordConfirm가 일치하지 않을 경우
    if (newPassword !== newPasswordConfirm) {
      req.flash("error", "비밀번호 확인이 일치하지 않습니다.");
      return res.status(403).redirect(`/user/${id}/password`);
    }
    // User의 password 변경
    req.flash("success", "비밀번호 변경되었습니다.");
    return res.status(200).redirect(`/user/${id}/edit`);
  } catch (error) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(404).render("404");
  }
};

// getUserIng Controller
export const getUserIng = async (req, res) => {
  const {
    params: { id },
  } = req;
  // 비로그인 유저를 확인합니다.
  if (id === "undefined") {
    req.flash("error", "로그인 후 사용이 가능합니다.");
    return res.status(403).redirect("/");
  }
  // Param의 id를 이용하여 User 데이터를 불러옵니다.
  try {
    // populate를 사용하여 Ingredient 데이터를 불러옵니다.
    const user = await User.findById(id).populate("ingredients");
    // Ingredient 데이터들을 store속성에 따라 구분합니다.
    const coldStore = user.ingredients.filter(
      (ingredient) => ingredient.store === "냉장"
    );
    const frozenStore = user.ingredients.filter(
      (ingredient) => ingredient.store === "냉동"
    );
    const roomStore = user.ingredients.filter(
      (ingredient) => ingredient.store === "상온"
    );
    // Ingredient 데이터 중 유통기한이 3일 미만의 데이터만 반환합니다.
    const periodIng = user.ingredients.filter((ingredient) => {
      const periodLife = new Date(ingredient.periodLife);
      const today = new Date();
      const period = Math.round((periodLife - today) / 1000 / 3600 / 24);
      return period < 3;
    });
    // Ingredient 데이터 중 purchase 속성이 true이 값만 반환합니다.
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

// getUserRecipe Controller
export const getUserRecipe = async (req, res) => {
  const {
    query: { keyword },
    params: { id },
  } = req;
  // 비로그인 유저를 확인합니다.
  if (id === "undefined") {
    req.flash("error", "로그인 후 사용이 가능합니다.");
    return res.status(403).redirect("/");
  }
  // query의 keyword가 없는 경우
  if (!keyword) {
    try {
      // User의 Recipe 데이터를 불러옵니다.
      const user = await User.findById(id).populate({ path: "recipes" });
      return res
        .status(200)
        .render("user/user-recipes", { id, recipes: user.recipes });
    } catch (error) {
      req.flash("error", "허용되지 않는 경로입니다.");
      return res.status(404).render("404");
    }
  }
  // query의 keyword가 있는 경우
  else {
    try {
      // keyword 이름을 가지고 param의 id와 owner의 id가 같은 Recipe 데이터를 불러옵니다.
      const recipes = await Recipe.find({ name: keyword, owner: id });
      return res.status(200).render("user/user-recipes", { id, recipes });
    } catch (error) {
      req.flash("error", "허용되지 않는 경로입니다.");
      return res.status(404).render("404");
    }
  }
};
// getUserLike Controller
export const getUserLike = async (req, res) => {
  const {
    params: { id },
  } = req;
  // User의 likes 속성의 id를 가진 Recipe 데이터를 배열로 만듭니다.
  try {
    const user = await User.findById(id);
    let recipes = [];
    for (let i = 0; i < user.likes.length; i++) {
      const recipe = await Recipe.findById(user.likes[i]);
      recipes.push(recipe);
    }
    return res.render("user/user-likes", { recipes });
  } catch (error) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(404).render("404");
  }
};
// Githup Login
export const githubLogin = (req, res) => {
  const BASE_URL = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.CLIENT_ID,
    scope: "read:user user:email",
    allow_signup: false,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${BASE_URL}?${params}`;
  return res.redirect(finalUrl);
};
// Githup Login Request
export const githubFinish = async (req, res) => {
  const BASE_URL = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${BASE_URL}?${params}`;
  const token = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("access_token" in token) {
    const { access_token } = token;
    const BASE_URL = "https://api.github.com";
    const userData = await (
      await fetch(`${BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${access_token} `,
        },
      })
    ).json();
    const emailData = await (
      await fetch(`${BASE_URL}/user/emails`, {
        headers: {
          Authorization: `Bearer ${access_token} `,
        },
      })
    ).json();
    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!emailObj) {
      return res.redirect("/login");
    }
    const existUser = await User.findOne({ emil: emailObj.email });
    if (!existUser) {
      const user = await User.create({
        name: userData.name,
        email: emailObj.email,
      });
      req.session.loggedIn = true;
      req.session.user = user;
    } else {
      req.session.loggedIn = true;
      req.session.user = existUser;
    }
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};
