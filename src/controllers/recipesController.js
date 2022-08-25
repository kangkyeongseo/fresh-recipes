export const getRecipesAdd = (req, res) => {
  return res.render("recipe/recipe-add");
};

export const getRecipesSearch = (req, res) => res.send("recipes search");

export const getRecipesDetail = (req, res) => {
  const recipe = {
    name: "오징어볶음",
    serving: "1",
    time: "20",
    ingredients: [
      {
        name: "오징어",
        amount: "300",
        amountType: "g",
      },
      {
        name: "양파",
        amount: "1",
        amountType: "개",
      },
      {
        name: "고추장",
        amount: "1",
        amountType: "Ts",
      },
    ],
    orders: [
      {
        order: 1,
        text: "손질을 합니다",
      },
      {
        order: 2,
        text: "휘리릭 찹찹",
      },
    ],
  };
  return res.render("recipe/recipe-detail", { recipe });
};

export const getRecipesEdit = (req, res) => res.send("recipes edit");
