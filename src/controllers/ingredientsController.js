export const getIngAdd = (req, res) => {
  return res.render("ingredient/ingredient-add");
};

export const getIngSearch = (req, res) => res.send("ingredients search");

export const getIngdetail = (req, res) => res.send("ingredients");

export const getIngEdit = (req, res) => res.send("ingredients edit");
