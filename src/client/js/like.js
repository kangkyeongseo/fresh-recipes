const recipe = document.querySelector(".recipe");
const emptyHeart = document.querySelector(".far.fa-heart");
const fillHeart = document.querySelector(".fas.fa-heart");

const { id } = recipe.dataset;

const handleEmptyHeart = async () => {
  emptyHeart.classList.add("hidden");
  fillHeart.classList.remove("hidden");
  await fetch(`/api/recipe/${id}/like/add`, {
    method: "POST",
  });
};

const handleFillHeart = async () => {
  fillHeart.classList.add("hidden");
  emptyHeart.classList.remove("hidden");
  await fetch(`/api/recipe/${id}/like/delete`, {
    method: "POST",
  });
};

emptyHeart.addEventListener("click", handleEmptyHeart);
fillHeart.addEventListener("click", handleFillHeart);
