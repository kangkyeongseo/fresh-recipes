const recipe = document.querySelector(".recipe");
const commentForm = document.querySelector(".recipe__comment__form");
const commentInput = document.querySelector(".recipe__comment__form__input");
const commentList = document.querySelector(".recipe__comment__list");
const unExistList = document.querySelector(".recipe__comment__unexist");
const deleteBtn = document.querySelectorAll(".comment__delete");

const handleCommentForm = async (event) => {
  event.preventDefault();
  const content = commentInput.value;
  const { id } = recipe.dataset;
  const response = await fetch(`/api/recipe/${id}/comment/add`, {
    method: "POST",
    body: JSON.stringify({ content }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.status === 200) {
    const data = await response.json();
    addComment(content, data.commentId);
  }
  commentInput.value = "";
};

const addComment = (content, id) => {
  const li = document.createElement("li");
  li.dataset.id = id;

  const span = document.createElement("span");
  span.innerText = content;

  const btn = document.createElement("button");
  btn.innerText = "Delete";
  btn.className = "comment__delete";
  btn.addEventListener("click", handleDeleteBtn);

  li.appendChild(span);
  li.appendChild(btn);
  commentList.appendChild(li);
  if (unExistList) {
    unExistList.remove();
  }
};

const handleDeleteBtn = async (event) => {
  const li = event.target.parentElement;
  const id = li.dataset.id;
  li.remove();
  await fetch(`/api/comment/${id}/delete`, {
    method: "DELETE",
  });
};

commentForm.addEventListener("submit", handleCommentForm);
deleteBtn.forEach((btn) => btn.addEventListener("click", handleDeleteBtn));
