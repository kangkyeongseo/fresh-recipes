import User from "../model/User";
import bcrypt from "bcrypt";
import Recipe from "../model/Recipe";

export const getHome = async (req, res) => {
  const recipe = await Recipe.aggregate([{ $sample: { size: 1 } }]);
  console.log(recipe);
  if (req.session.loggedIn) {
    const {
      session: {
        user: { _id },
      },
    } = req;
    const user = await User.findById(_id).populate({ path: "ingredients" });
    const periodLifeIngredients = user.ingredients.filter((ingredient) => {
      const periodLife = new Date(ingredient.periodLife);
      const today = new Date();
      const period = Math.round((periodLife - today) / 1000 / 3600 / 24);
      return period < 3;
    });
    const purchaseIngredients = user.ingredients.filter(
      (ingredient) => ingredient.purchase === true
    );
    return res.status(200).render("root/home", {
      recipe,
      user,
      periodLifeIngredients,
      purchaseIngredients,
    });
  } else {
    return res.status(200).render("root/home", { recipe });
  }
};

export const getLogin = (req, res) => {
  return res.status(200).render("root/login");
};

export const postLogin = async (req, res) => {
  const {
    body: { email, password },
  } = req;
  // Email Exists Confrim
  const user = await User.findOne({ email });
  if (!user) {
    req.flash("error", "존재하는 않는 이메일입니다.");
    return res.status(400).redirect("/login");
  }
  // password Confrim
  const passwordConfirm = await bcrypt.compare(password, user.password);
  if (!passwordConfirm) {
    req.flash("error", "비밀번호가 일치하지 않습니다.");
    return res.status(400).redirect("/login");
  }
  // Log In and Sessiom Save
  req.session.loggedIn = true;
  req.session.user = user;
  return res.status(200).redirect("/");
};

export const getLogout = (req, res) => {
  // Log Out and Sessiom Destory
  req.session.destroy();
  return res.status(200).redirect("/");
};

export const getJoin = (req, res) => {
  return res.status(200).render("root/join");
};

export const postJoin = async (req, res) => {
  const {
    body: { email, password, confirmPassword, name },
  } = req;
  const emailExists = await User.exists({ email });
  // Email Exists Confrim
  if (emailExists) {
    req.flash("error", "이미 존재하는 이메일입니다.");
    return res.status(400).redirect("/join");
  }
  // Password Confrim
  if (password !== confirmPassword) {
    req.flash("error", "비밀번호 확인이 일치하지 않습니다.");
    return res.status(400).redirect("/join");
  }
  // User Create
  try {
    await User.create({
      email,
      password,
      name,
    });
    req.flash("success", "FRESH RECIPES에 오신 걸 환영합니다");
    return res.status(200).redirect("/login");
  } catch (error) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(404).redirect("/");
  }
};
