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

export const getRecipesEdit = async (req, res) => {
  const {
    params: { id },
  } = req;
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
  const { body } = req;
  try {
    await Recipe.findByIdAndUpdate(id, {
      name: body.name,
      description: body.description,
      serving: body.serving,
      time: body.time,
    });
    return res.status(200).redirect(`/recipe/${id}`);
  } catch (error) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(400).redirect("/");
  }
};
