import Ingredient from "../model/Ingredient";
import User from "../model/User";

// getIngAdd Controller
export const getIngAdd = (req, res) => {
  return res.render("ingredient/ingredient-add");
};
// postIngAdd Controller
export const postIngAdd = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
  } = req;
  const {
    body: { name, type, store, amount, amountType, purchaseDate, periodLife },
  } = req;
  // Ingredient 데이터 추가하기
  try {
    const ingredient = await Ingredient.create({
      name,
      type,
      store,
      amount,
      amountType,
      purchaseDate,
      periodLife,
      owner: _id,
    });
    // User 데이터의 ingredients 속성에 새로 생성된 Ingredient 데이터의 id를 추가합니다.
    const user = await User.findById(_id);
    user.ingredients.push(ingredient._id);
    await user.save();
    return res.redirect(`/user/${_id}/ingredients`);
  } catch (error) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(400).redirect("/");
  }
};
// getIngSearch Controller
export const getIngSearch = (req, res) => res.send("ingredients search");
// getIngDetail Controller
export const getIngDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  // parameter의 id값을 이용하여 Ingredient 데이터를 불러옵니다.
  try {
    // populate를 사용하여 Owner 데이터도 불러옵니다.
    const ingredient = await Ingredient.findById(id).populate({
      path: "owner",
    });
    // Ingredient의 periodLife 속성과 현재 시간을 비교하여 남은 기간을 구합니다.
    const periodLife = new Date(ingredient.periodLife);
    const today = new Date();
    const period = Math.round((periodLife - today) / 1000 / 3600 / 24);
    return res
      .status(200)
      .render("ingredient/ingredient-detail", { ingredient, period });
  } catch (error) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(400).redirect("/");
  }
};
// getIngEdit Controller
export const getIngEdit = async (req, res) => {
  const {
    params: { id },
  } = req;
  // parameter의 id값을 이용하여 Ingredient 데이터를 불러옵니다.
  try {
    const ingredient = await Ingredient.findById(id);
    return res.status(200).render("ingredient/ingredient-edit", { ingredient });
  } catch (error) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(400).redirect("/");
  }
};
// postIngEdit Controller
export const postIngEdit = async (req, res) => {
  const {
    params: { id },
  } = req;
  const {
    body: { name, type, store, amount, amountType, purchaseDate, periodLife },
  } = req;
  // Ingredient 데이터를 update합니다.
  try {
    await Ingredient.findByIdAndUpdate(id, {
      name,
      type,
      store,
      amount,
      amountType,
      purchaseDate,
      periodLife,
    });
    return res.status(200).redirect(`/ingredient/${id}`);
  } catch (error) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(400).redirect("/");
  }
};
// getIngDelete Controller
export const getIngDelete = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
  } = req;
  const {
    params: { id },
  } = req;
  // Ingredient의 Owner _id와 session의 _id를 비교합니다.
  const ingredient = await Ingredient.findById(id).populate({ path: "owner" });
  // 일치하지 않을 경우
  if (ingredient.owner._id.toString() !== _id) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(403).redirect("/");
  }
  // Ingredient 데이터를 delete합니다.
  try {
    // User 데이터가 가지고있는 Ingredient의 _id또한 삭제합니다.
    const user = await User.findById(_id);
    user.ingredients.splice(user.ingredients.indexOf(id), 1);
    await user.save();
    await Ingredient.findByIdAndDelete(id);
    return res.status(200).redirect(`/user/${_id}/ingredients`);
  } catch (error) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(400).redirect("/");
  }
};
