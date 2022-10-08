import Recipe from "../model/Recipe";

export const getSquare = async (req, res) => {
  const recipes = await Recipe.find({});
  return res.render("square/square-recipes", { recipes });
};

export const searchSquare = async (req, res) => {
  const {
    query: { keyword },
  } = req;
  try {
    const recipes = await Recipe.find({ name: keyword });
    return res.render("square/square-recipes", { recipes });
  } catch {
    return;
  }
};
