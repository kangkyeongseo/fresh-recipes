import Recipe from "../model/Recipe";

// getSquare Controller
export const getSquare = async (req, res) => {
  // Recipe 데이터를 불러옵니다.
  const recipes = await Recipe.find({});
  return res.render("square/square-recipes", { recipes });
};
// searchSquare Controller
export const searchSquare = async (req, res) => {
  const {
    query: { keyword },
  } = req;
  // query의 keyword값을 이용하여 Recipe 데이터를 불러옵니다.
  try {
    const recipes = await Recipe.find({ name: keyword });
    return res.render("square/square-recipes", { recipes });
  } catch {
    return;
  }
};
