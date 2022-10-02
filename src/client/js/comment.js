const recipe = document.querySelector(".recipe");
const commentForm = document.querySelector(".recipe__comment__form");
const commentInput = document.querySelector(".recipe__comment__form__input");
const commentList = document.querySelector(".recipe__comment__list");
const unExistList = document.querySelector(".recipe__comment__unexist");
const deleteBtn = document.querySelectorAll(".comment__delete");
const editBtn = document.querySelectorAll(".comment__edit");

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
    addComment(content, data.commentId, data.avatar, data.name);
  }
  commentInput.value = "";
};

const addComment = (content, id, avatar, name) => {
  const li = document.createElement("li");
  li.dataset.id = id;

  const img = document.createElement("img");
  img.src = "/" + avatar;

  const nickname = document.createElement("span");
  nickname.innerText = name;

  const span = document.createElement("span");
  span.innerText = content;

  const addDelete = document.createElement("button");
  addDelete.innerText = "Delete";
  addDelete.className = "comment__delete";
  addDelete.addEventListener("click", handleDeleteBtn);

  const addEdit = document.createElement("button");
  addEdit.innerText = "Edit";
  addEdit.className = "comment__edit";

  li.appendChild(img);
  li.appendChild(nickname);
  li.appendChild(span);
  li.appendChild(addDelete);
  li.appendChild(addEdit);
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

const editComment = async (event) => {
  const li = event.target.parentNode;
  const { id } = li.dataset;
  const contentElement = li.querySelector(".comment__content");
  const input = li.querySelector(".comment__edit__input");
  const response = await fetch(`/api/comment/${id}/edit`, {
    method: "POST",
    body: JSON.stringify({ content: input.value }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 200) {
    input.remove();
    contentElement.innerText = input.value;
  }
};

const handleEditBtn = (event) => {
  const li = event.target.parentElement;
  const content = event.target.parentElement.children[2].textContent;
  const btn = event.target.parentElement.children[4];
  const input = document.createElement("input");
  input.className = "comment__edit__input";
  input.value = content;
  li.appendChild(input);
  btn.removeEventListener("click", handleEditBtn);
  btn.addEventListener("click", editComment);
};

commentForm.addEventListener("submit", handleCommentForm);
deleteBtn.forEach((btn) => btn.addEventListener("click", handleDeleteBtn));
editBtn.forEach((btn) => btn.addEventListener("click", handleEditBtn));
