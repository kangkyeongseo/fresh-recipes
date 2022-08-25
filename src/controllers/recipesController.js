export const getRecipesAdd = (req, res) => {
  return res.render("recipe/recipe-add");
};

export const getRecipesSearch = (req, res) => res.send("recipes search");

export const getRecipesDetail = (req, res) => res.send("recipes detail");

export const getRecipesEdit = (req, res) => res.send("recipes edit");
