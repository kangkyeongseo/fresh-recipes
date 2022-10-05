import Recipe from "../model/Recipe";

export const getSquare = async (req, res) => {
  const recipes = await Recipe.find({});
  return res.render("square/square-recipes", { recipes });
};

export const postSquare = async (req, res) => {
  const {
    body: { keyword },
  } = req;
  const recipes = await Recipe.find({ name: keyword });
  console.log(recipes);
  return res.render("square/square-recipes", { recipes });
};
