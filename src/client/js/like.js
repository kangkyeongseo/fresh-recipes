const recipe = document.querySelector(".recipe");
const emptyHeart = document.querySelector(".far.fa-heart");
const fillHeart = document.querySelector(".fas.fa-heart");

const { id } = recipe.dataset;

const handleEmptyHeart = async () => {
  emptyHeart.className = "fas fa-heart";
  await fetch(`/api/recipe/${id}/like/add`, {
    method: "POST",
  });
};

const handleFillHeart = async () => {
  fillHeart.className = "far fa-heart";
  await fetch(`/api/recipe/${id}/like/delete`, {
    method: "POST",
  });
};

if (emptyHeart) {
  emptyHeart.addEventListener("click", handleEmptyHeart);
}

if (fillHeart) {
  fillHeart.addEventListener("click", handleFillHeart);
}
