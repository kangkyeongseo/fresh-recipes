import Recipe from "../model/Recipe";
import User from "../model/User";

export const getRecipesAdd = (req, res) => {
  return res.status(200).render("recipe/recipe-add");
};

export const postRecipesAdd = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
  } = req;
  const { body } = req;
  // Get User
  try {
    const user = await User.findById(_id);
    // Create Recipe
    try {
      const recipe = await Recipe.create({
        name: body.name,
        description: body.description,
        serving: body.serving,
        time: body.time,
        owner: user._id,
      });
      // Push Recipe ID
      user.recipes.push(recipe._id);
      // Save User
      await user.save();
      return res.status(200).redirect(`/user/${user._id}/recipes`);
    } catch (error) {
      req.flash("error", "허용되지 않는 경로입니다.");
      return res.status(400).redirect("/");
    }
  } catch (error) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(400).redirect("/");
  }
};

export const getRecipesSearch = (req, res) => res.send("recipes search");

export const getRecipesDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  // Get Recipe
  try {
    const recipe = await Recipe.findById(id);
    return res.render("recipe/recipe-detail", { recipe });
  } catch (error) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(400).redirect("/");
  }
};

export const getRecipesEdit = (req, res) => {
  const recipe = {
    name: "오징어볶음",
    serving: "1",
    time: "20",
    ingredients: [
      { id: 1, name: "오징어", amount: "300", amountType: "g" },
      {
        id: 2,
        name: "양파",
        amount: "1",
        amountType: "개",
      },
      {
        id: 3,
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
  return res.render("recipe/recipe-edit", { recipe });
};
