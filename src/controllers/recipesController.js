import Recipe from "../model/Recipe";
import User from "../model/User";

// getRecipeAdd Controller
export const getRecipeAdd = (req, res) => {
  return res.status(200).render("recipe/recipe-add");
};
// postRecipeAdd Controller
export const postRecipeAdd = async (req, res) => {
  // Multer를 사용하여 req.file을 통해 이미지 데이터를 전달받습니다.
  const {
    session: {
      user: { _id },
    },
    body,
    file,
  } = req;

  try {
    const user = await User.findById(_id);
    // Ingredient 데이터를 추가합니다.
    try {
      const recipe = await Recipe.create({
        name: body.name,
        description: body.description,
        serving: body.serving,
        time: body.time,
        thumb: file ? file.path : "",
        owner: user._id,
      });
      // body.ingredient이 배열인지 구분하는 조건문입니다.
      if (Array.isArray(body.ingredient)) {
        for (let i = 0; i < body.ingredient.length; i++) {
          const ingredient = {
            ingredientName: body.ingredient[i],
            ingredientAmount: body.ingredientAmount[i],
            amountType: body[`amountType${i + 1}`],
          };
          recipe.ingredients.push(ingredient);
        }
      } else {
        const ingredient = {
          ingredientName: body.ingredient,
          ingredientAmount: body.ingredientAmount,
          amountType: body.amountType1,
        };
        recipe.ingredients.push(ingredient);
      }
      // body.order가 배열인지 구분하는 조건문입니다.
      if (Array.isArray(body.order)) {
        for (let i = 0; i < body.order.length; i++) {
          const order = {
            order: i + 1,
            content: body.order[i],
          };
          recipe.orders.push(order);
        }
      } else {
        const order = {
          order: 1,
          content: body.order,
        };
        recipe.orders.push(order);
      }
      // Recipe의 ingredients와 orders를 저장합니다.
      await recipe.save();
      // User 데이터의 recipes 속성에 새로 생성된 Recipe 데이터의 id를 추가합니다.
      user.recipes.push(recipe._id);
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
// getRecipeSearch Controller
export const getRecipeSearch = (req, res) => res.send("recipes search");
// getRecipeDetail Controller
export const getRecipeDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  // parameter의 id값을 이용하여 Recipe 데이터를 불러옵니다.
  try {
    const recipe = await Recipe.findById(id)
      .populate("owner")
      .populate({ path: "comments", populate: { path: "owner" } });
    return res.render("recipe/recipe-detail", { recipe });
  } catch (error) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(400).redirect("/");
  }
};
// getRecipeEdit Controller
export const getRecipeEdit = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
  } = req;
  const {
    params: { id },
  } = req;
  // Owner의 _id와 session의 _id를 비교합니다.
  const recipe = await Recipe.findById(id).populate({ path: "owner" });
  if (recipe.owner._id.toString() !== _id) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(403).redirect("/");
  }
  // parameter의 id값을 이용하여 Recipe 데이터를 불러옵니다.
  try {
    const recipe = await Recipe.findById(id);
    console.log(recipe);
    return res.render("recipe/recipe-edit", { recipe });
  } catch (error) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(400).redirect("/");
  }
};
// postRecipeEdit Controller
export const postRecipeEdit = async (req, res) => {
  const {
    params: { id },
  } = req;
  const { body, file } = req;
  // Recipe 데이터를 update합니다.
  try {
    const recipe = await Recipe.findById(id);
    await Recipe.findByIdAndUpdate(id, {
      name: body.name,
      description: body.description,
      serving: body.serving,
      time: body.time,
      thumb: file ? file.path : recipe.thumb,
    });
    recipe.ingredients.splice(0, recipe.ingredients.length);
    recipe.orders.splice(0, recipe.orders.length);
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
    return res.status(200).redirect(`/recipe/${id}`);
  } catch (error) {
    console.log(error);
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(400).redirect("/");
  }
};
// getRecipeDelete Controller
export const getRecipeDelete = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
  } = req;
  const {
    params: { id },
  } = req;
  // Owner의 _id와 session의 _id를 비교합니다.
  const recipe = await Recipe.findById(id).populate({ path: "owner" });
  if (recipe.owner._id.toString() !== _id) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(403).redirect("/");
  }
  // Recipe 데이터를 delete합니다.
  try {
    // User 데이터가 가지고있는 Recipe의 _id또한 삭제합니다.
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
