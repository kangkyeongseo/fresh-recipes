import Ingredient from "../model/Ingredient";

export const purchaseAdd = async (req, res) => {
  const { id } = req.params;
  const ingredient = await Ingredient.findById(id);
  ingredient.purchase = true;
  await ingredient.save();
};

export const purchaseRemove = async (req, res) => {
  const { id } = req.params;
  const ingredient = await Ingredient.findById(id);
  ingredient.purchase = false;
  await ingredient.save();
};

export const ingredientSpend = async (req, res) => {
  const {
    params: { id },
    body: { caculateAmount, purchase },
  } = req;
  const ingredient = await Ingredient.findById(id);
  ingredient.amount = caculateAmount;
  if (caculateAmount === 0 && purchase) {
    ingredient.purchase = true;
    await ingredient.save();
    return res.status(301).redirect("/");
  }
  if (caculateAmount === 0 && !purchase) {
    ingredient.remove();
    return res.status(301).redirect("/");
  }
  await ingredient.save();
};
