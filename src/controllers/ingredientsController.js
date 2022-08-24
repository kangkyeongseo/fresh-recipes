export const getIngAdd = (req, res) => {
  return res.render("ingredient/ingredient-add");
};

export const postIngAdd = (req, res) => {
  const data = req.body;
  console.log(data);
  return;
};

export const getIngSearch = (req, res) => res.send("ingredients search");

export const getIngdetail = (req, res) => {
  const ingredient = {
    name: "감자",
    type: "subType",
    store: "roomStore",
    amount: "600",
    amountType: "gramAmount",
    purchase: "2022-08-24",
    periodLife: "2022-08-30",
  };

  const periodLife = new Date(ingredient.periodLife);
  const today = new Date();
  const period = Math.round((periodLife - today) / 1000 / 3600 / 24);

  return res.render("ingredient/ingredient-detail", { ingredient, period });
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
