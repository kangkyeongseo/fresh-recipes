import bcrypt from "bcrypt";
import User from "../model/User";
import Recipe from "../model/Recipe";

// getHome Controller
export const getHome = async (req, res) => {
  // Recipe 데이터에서 랜덤으로 1개의 Recipe를 가져옵니다.
  const recipe = await Recipe.aggregate([{ $sample: { size: 1 } }]);
  // 로그인 유저일 경우
  if (req.session.loggedIn) {
    const {
      session: {
        user: { _id },
      },
    } = req;
    // User 데이터 불러오기
    try {
      // Session의 _id를 이용하여 User 불러오기, User의 Ingredient 데이터를 populate를 이용하여 불러오기
      const user = await User.findById(_id).populate("ingredients");
      // User의 Ingredient 데이터가 포함된 추천 Recipe 데이터 배열 만들기
      const ingredients = user.ingredients.map((ing) => ing.name);
      let recommendRecipes = [];
      for (const ingredient of ingredients) {
        const recipes = await Recipe.find({
          ingredients: { $elemMatch: { ingredientName: ingredient } },
        });
        recipes.forEach((recipe) => recommendRecipes.push(recipe));
      }
      recommendRecipes.splice(4);
      // User의 Ingredient 데이터 중 유통기한이 3일 미만의 데이터만 반환
      const periodLifeIngredients = user.ingredients.filter((ingredient) => {
        const periodLife = new Date(ingredient.periodLife);
        const today = new Date();
        const period = Math.round((periodLife - today) / 1000 / 3600 / 24);
        return period < 3;
      });
      // User의 Ingredient 데이터 중 purchase 속성이 true이 값만 반환
      const purchaseIngredients = user.ingredients.filter(
        (ingredient) => ingredient.purchase === true
      );
      return res.status(200).render("root/home", {
        recipe,
        recommendRecipes,
        user,
        periodLifeIngredients,
        purchaseIngredients,
      });
    } catch (error) {
      req.flash("error", "허용되지 않는 경로입니다.");
      return res.status(404).render("404");
    }
  }
  // 비로그인 유저일 경우
  else {
    return res.status(200).render("root/home", { recipe });
  }
};

// getLogin Controller
export const getLogin = (req, res) => {
  return res.status(200).render("root/login");
};

// postLogin Controller
export const postLogin = async (req, res) => {
  const {
    body: { email, password },
  } = req;
  // email에 맞는 User가 없는 경우
  const existsUser = await User.findOne({ email });
  if (!existsUser) {
    req.flash("error", "존재하는 않는 이메일입니다.");
    return res.status(400).redirect("/login");
  }
  // password가 일치하지 않는 경우
  const passwordConfirm = await bcrypt.compare(password, existsUser.password);
  if (!passwordConfirm) {
    req.flash("error", "비밀번호가 일치하지 않습니다.");
    return res.status(400).redirect("/login");
  }
  // 로그인 성공시 session 저장
  req.session.loggedIn = true;
  req.session.user = existsUser;
  return res.status(200).redirect("/");
};

// getLogout Controller
export const getLogout = (req, res) => {
  // 로그아웃시 session 초기화
  req.session.destroy();
  return res.status(200).redirect("/");
};

// getJoin Controller
export const getJoin = (req, res) => {
  return res.status(200).render("root/join");
};

export const postJoin = async (req, res) => {
  const {
    body: { email, password, confirmPassword, name },
  } = req;
  // email이 이미 존재하는 경우
  const emailExists = await User.exists({ email });
  if (emailExists) {
    req.flash("error", "이미 존재하는 이메일입니다.");
    return res.status(400).redirect("/join");
  }

  // password와 confirmPassword이 일치하지 않는 경우
  if (password !== confirmPassword) {
    req.flash("error", "비밀번호 확인이 일치하지 않습니다.");
    return res.status(400).redirect("/join");
  }
  // User 데이터 추가하기
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
    return res.status(404).render("404");
  }
};
