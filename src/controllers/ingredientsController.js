import Ingredient from "../model/Ingredient";
import User from "../model/User";

export const getIngAdd = (req, res) => {
  return res.render("ingredient/ingredient-add");
};

export const postIngAdd = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
  } = req;
  const {
    body: { name, type, store, amount, amountType, purchaseDate, periodLife },
  } = req;
  // Add Ingredient
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
    const user = await User.findById(_id);
    user.ingredients.push(ingredient._id);
    user.save();
    return res.redirect(`/user/${_id}/ingredients`);
  } catch (error) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(404).redirect("/");
  }
};

export const getIngSearch = (req, res) => res.send("ingredients search");

export const getIngDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    // Get Owner Using Populate
    const ingredient = await Ingredient.findById(id).populate({
      path: "owner",
    });
    // Caculate Period
    const periodLife = new Date(ingredient.periodLife);
    const today = new Date();
    const period = Math.round((periodLife - today) / 1000 / 3600 / 24);
    return res
      .status(200)
      .render("ingredient/ingredient-detail", { ingredient, period });
  } catch (error) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(404).redirect("/");
  }
};

export const postIngDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  const {
    body: { spend },
  } = req;
  const ingredient = await Ingredient.findById(id);
  ingredient.amount = ingredient.amount - parseInt(spend);
  ingredient.save();
  return res.status(200).redirect(`/ingredient/${id}`);
};

export const getIngEdit = (req, res) => {
  const ingredient = {
    name: "감자",
    type: "subType",
    store: "roomStore",
    amount: "600",
    amountType: "gramAmount",
    purchase: "2022-08-24",
    periodLife: "2022-08-30",
  };
  return res.render("ingredient/ingredient-edit", { ingredient });
};
