const recipe = document.querySelector(".recipe__detail");
const emptyHeart = document.querySelector(".far.fa-heart");
const fillHeart = document.querySelector(".fas.fa-heart");
const likesCount = document.querySelector(".likes__count");

const { id } = recipe.dataset;
// emptyHeart를 click할 시 실행합니다.
const handleEmptyHeart = async () => {
  fillHeart.classList.add("hidden");
  emptyHeart.classList.remove("hidden");
  // Recipe와 User 데이터의 likes 속성을 삭제할 api를 호출합니다.
  await fetch(`/api/recipe/${id}/like/delete`, {
    method: "POST",
  });
  const currentCount = likesCount.innerText;
  likesCount.innerText = +currentCount - 1;
};
// fillHeart click할 시 실행합니다.
const handleFillHeart = async () => {
  emptyHeart.classList.add("hidden");
  fillHeart.classList.remove("hidden");
  // Recipe와 User 데이터의 likes 속성을 추가할 api를 호출합니다.
  await fetch(`/api/recipe/${id}/like/add`, {
    method: "POST",
  });
  const currentCount = likesCount.innerText;
  likesCount.innerText = +currentCount + 1;
};

emptyHeart.addEventListener("click", handleFillHeart);
fillHeart.addEventListener("click", handleEmptyHeart);
