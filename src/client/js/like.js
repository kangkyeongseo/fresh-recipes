const recipe = document.querySelector(".recipe__detail");
const emptyHeart = document.querySelector(".far.fa-heart");
const fillHeart = document.querySelector(".fas.fa-heart");
const likesCount = document.querySelector(".likes__count");

const { id } = recipe.dataset;

const handleEmptyHeart = async () => {
  fillHeart.classList.add("hidden");
  emptyHeart.classList.remove("hidden");
  await fetch(`/api/recipe/${id}/like/delete`, {
    method: "POST",
  });
  const currentCount = likesCount.innerText;
  likesCount.innerText = +currentCount - 1;
};

const handleFillHeart = async () => {
  emptyHeart.classList.add("hidden");
  fillHeart.classList.remove("hidden");
  await fetch(`/api/recipe/${id}/like/add`, {
    method: "POST",
  });
  const currentCount = likesCount.innerText;
  likesCount.innerText = +currentCount + 1;
};

emptyHeart.addEventListener("click", handleFillHeart);
fillHeart.addEventListener("click", handleEmptyHeart);
