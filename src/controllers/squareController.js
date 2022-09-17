import Recipe from "../model/Recipe";

export const getSquare = async (req, res) => {
  const recipes = await Recipe.find({});
  return res.render("square/square-recipes", { recipes });
};

export const getSquareSearch = (req, res) => res.send("square search");
