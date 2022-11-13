import Comment from "../model/Comment";
import Ingredient from "../model/Ingredient";
import Recipe from "../model/Recipe";
import User from "../model/User";

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

export const recipeCommentAdd = async (req, res) => {
  const {
    body: { content },
    session: {
      user: { _id },
    },
    params: { id },
  } = req;
  const user = await User.findById(_id);
  const recipe = await Recipe.findById(id);
  const comment = await Comment.create({
    content,
    recipe,
    owner: user,
  });
  user.comments.push(comment._id);
  await user.save();
  recipe.comments.push(comment._id);
  await recipe.save();
  return res.status(200).json({
    commentId: comment._id,
    avatar: user.avatar,
    name: user.name,
  });
};

export const recipeCommentDelete = async (req, res) => {
  const {
    params: { id },
  } = req;

  const comment = await Comment.findById(id)
    .populate("recipe")
    .populate("owner");

  comment.recipe.comments.splice(comment.recipe.comments.indexOf(id), 1);
  await comment.recipe.save();
  comment.owner.comments.splice(comment.owner.comments.indexOf(id), 1);
  await comment.owner.save();

  res.sendStatus(200);
};

export const recipeCommentEdit = async (req, res) => {
  const {
    params: { id },
    body: { content },
  } = req;
  try {
    const comment = await Comment.findById(id);
    comment.content = content;
    await comment.save();
    res.sendStatus(200);
  } catch {
    res.sendStatus(400);
  }
};

export const likeAdd = async (req, res) => {
  const {
    params: { id },
    session: {
      user: { _id },
    },
  } = req;

  try {
    const recipe = await Recipe.findById(id);
    const user = await User.findById(_id);
    recipe.likes.push(user._id);
    await recipe.save();
    user.likes.push(recipe._id);
    await user.save();
    res.sendStatus(200);
  } catch {
    res.sendStatus(400);
  }
};

export const likeDelete = async (req, res) => {
  const {
    params: { id },
    session: {
      user: { _id },
    },
  } = req;

  try {
    const recipe = await Recipe.findById(id);
    const user = await User.findById(_id);
    recipe.likes.splice(recipe.likes.indexOf(user._id), 1);
    await recipe.save();
    user.likes.splice(user.likes.indexOf(recipe._id), 1);
    await user.save();
    res.sendStatus(200);
  } catch {
    res.sendStatus(400);
  }
};
