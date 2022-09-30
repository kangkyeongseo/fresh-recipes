const recipe = document.querySelector(".recipe");
const commentForm = document.querySelector(".recipe__comment__form");
const commentInput = document.querySelector(".recipe__comment__form__input");
const commentList = document.querySelector(".recipe__comment__list");
const unExistList = document.querySelector(".recipe__comment__unexist");

const handleCommentForm = async (event) => {
  event.preventDefault();
  const content = commentInput.value;
  const { id } = recipe.dataset;
  await fetch(`/api/recipe/${id}/comment/add`, {
    method: "POST",
    body: JSON.stringify({ content }),
    headers: { "Content-Type": "application/json" },
  });
  commentInput.value = "";
  addComment(content);
};

const addComment = (content) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerText = content;
  li.appendChild(span);
  commentList.appendChild(li);
  if (unExistList) {
    unExistList.remove();
  }
};

commentForm.addEventListener("submit", handleCommentForm);
