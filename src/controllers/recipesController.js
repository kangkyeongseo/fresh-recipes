import Recipe from "../model/Recipe";
import User from "../model/User";

export const getRecipeAdd = (req, res) => {
  return res.status(200).render("recipe/recipe-add");
};

export const postRecipeAdd = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
  } = req;
  const { body } = req;
  const { file } = req;
  console.log(body);
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
        thumb: file ? file.path : "",
        owner: user._id,
      });
      for (let i = 0; i < body.ingredient.length; i++) {
        const ingredient = {
          ingredientName: body.ingredient[i],
          ingredientAmount: body.ingredientAmount[i],
          amountType: body[`amountType${i + 1}`],
        };
        recipe.ingredients.push(ingredient);
      }
      for (let i = 0; i < body.order.length; i++) {
        const order = {
          order: i + 1,
          content: body.order[i],
        };
        recipe.orders.push(order);
      }
      await recipe.save();
      // Push Recipe ID
      user.recipes.push(recipe._id);
      // Save User
      await user.save();
      return res.status(200).redirect(`/user/${user._id}/recipes`);
    } catch (error) {
      console.log(error);
      req.flash("error", "허용되지 않는 경로입니다.");
      return res.status(400).redirect("/");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(400).redirect("/");
  }
};

export const getRecipeSearch = (req, res) => res.send("recipes search");

export const getRecipeDetail = async (req, res) => {
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

export const getRecipeEdit = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
  } = req;
  const {
    params: { id },
  } = req;

  // Confirm Owner
  const recipe = await Recipe.findById(id).populate({ path: "owner" });
  if (recipe.owner._id.toString() !== _id) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(403).redirect("/");
  }
  // Get Recipe
  try {
    const recipe = await Recipe.findById(id);
    return res.render("recipe/recipe-edit", { recipe });
  } catch (error) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(400).redirect("/");
  }
};

export const postRecipeEdit = async (req, res) => {
  const {
    params: { id },
  } = req;
  const { body, file } = req;
  const recipe = await Recipe.findById(id);
  try {
    await Recipe.findByIdAndUpdate(id, {
      name: body.name,
      description: body.description,
      serving: body.serving,
      time: body.time,
      thumb: file ? file.path : recipe.thumb,
    });
    return res.status(200).redirect(`/recipe/${id}`);
  } catch (error) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(400).redirect("/");
  }
};

export const getRecipeDelete = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
  } = req;
  const {
    params: { id },
  } = req;
  // Confirm Owner
  const recipe = await Recipe.findById(id).populate({ path: "owner" });
  if (recipe.owner._id.toString() !== _id) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(403).redirect("/");
  }
  // Delete Recipe
  try {
    const user = await User.findById(_id);
    user.recipes.splice(user.recipes.indexOf(id), 1);
    await user.save();
    await Recipe.findByIdAndDelete(id);
    return res.status(200).redirect(`/user/${_id}/recipes`);
  } catch (error) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(400).redirect("/");
  }
};
