const recipe = document.querySelector(".recipe__detail");
const commentForm = document.querySelector(".recipe__comment__form");
const commentInput = document.querySelector(".recipe__comment__form__input");
const commentList = document.querySelector(".recipe__comment__list");
const unExistList = document.querySelector(".recipe__comment__unexist");
const deleteBtn = document.querySelectorAll(".comment__delete");
const editBtn = document.querySelectorAll(".comment__edit");
// commentForm이 submit할 떄 실행합니다.
const handleCommentForm = async (event) => {
  event.preventDefault();
  const content = commentInput.value;
  // content값이 비어있을 경우
  if (content === "") {
    commentInput.placeholder = "댓글을 입력하셔야 합니다.";
    return;
  }
  // dataset을 메서드를 이용하여 data-id 속성을 접근합니다.
  const { id } = recipe.dataset;
  // fetch를 통해 content 데이터를 POST합니다.
  const response = await fetch(`/api/recipe/${id}/comment/add`, {
    method: "POST",
    body: JSON.stringify({ content }),
    headers: { "Content-Type": "application/json" },
  });
  // response.status가 200일시 addComment함수를 사용하여 브라우저에 Comment를 표시합니다.
  if (response.status === 200) {
    const data = await response.json();
    addComment(content, data.commentId, data.avatar, data.name);
  }
  commentInput.value = "";
};
// 브라우저에 Comment를 표시합니다.
const addComment = (content, id, avatar, name) => {
  const li = document.createElement("li");
  li.dataset.id = id;
  li.className = "comment";
  let avatarContainer;
  let avatarContent;
  if (avatar !== undefined) {
    avatarContainer = document.createElement("a");
    avatarContent = document.createElement("img");
    avatarContainer.className = "comment__anchor";
    avatarContent.className = "comment__avatar";
    avatarContent.src = "/" + avatar;
    avatarContainer.appendChild(avatarContent);
  } else {
    avatarContainer = document.createElement("a");
    avatarContent = document.createElement("div");
    avatarContainer.className = "comment__anchor";
    avatarContent.className = "comment__no-avatar";
    const avatarIcon = document.createElement("i");
    avatarIcon.className = "fas fa-user";
    avatarContent.appendChild(avatarIcon);
    avatarContainer.appendChild(avatarContent);
  }

  const contentWrapper = document.createElement("div");
  contentWrapper.className = "comment__text";

  const nickname = document.createElement("span");
  nickname.innerText = name;

  const span = document.createElement("span");
  span.className = "comment__content";
  span.innerText = content;

  contentWrapper.appendChild(nickname);
  contentWrapper.appendChild(span);

  const btnWrapper = document.createElement("div");
  btnWrapper.className = "comment__btn";

  const addDelete = document.createElement("button");
  addDelete.innerText = "Delete";
  addDelete.className = "comment__delete";
  addDelete.addEventListener("click", handleDeleteBtn);

  const addEdit = document.createElement("button");
  addEdit.innerText = "Edit";
  addEdit.className = "comment__edit";
  addEdit.addEventListener("click", handleEditBtn);

  btnWrapper.appendChild(addDelete);
  btnWrapper.appendChild(addEdit);

  li.appendChild(avatarContainer);
  li.appendChild(contentWrapper);
  li.appendChild(btnWrapper);
  commentList.appendChild(li);
  if (unExistList) {
    unExistList.remove();
  }
};
// deleteBtn을 click할 때 실행합니다.
const handleDeleteBtn = async (event) => {
  const li = event.target.parentElement.parentElement;
  const id = li.dataset.id;
  li.remove();
  // fetch를 통해 Comment 데이터를 delete할 api를 호출합니다.
  await fetch(`/api/comment/${id}/delete`, {
    method: "DELETE",
  });
};
//Comment 데이터를 수정하는 함수입니다.
const editComment = async (event) => {
  const li = event.target.parentElement.parentElement;
  const { id } = li.dataset;
  const contentElement = li.querySelector(".comment__content");
  const btn = li.children[2].children[1];
  const input = li.querySelector(".comment__edit__input");
  if (input.value === "") {
    input.blur();
    input.placeholder = "댓글을 입력하셔야 합니다.";
    return;
  }
  // fetch를 통해 Comment 데이터를 수정할 api를 호출합니다.
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
  btn.addEventListener("click", handleEditBtn);
  btn.removeEventListener("click", editComment);
};
// editBtn을 click할 때 실행합니다.
const handleEditBtn = (event) => {
  const li = event.target.parentElement.parentElement;
  const content = li.children[1].children[1].textContent;
  const btn = li.children[2].children[1];
  const input = document.createElement("input");
  input.className = "comment__edit__input";
  input.value = content;
  li.appendChild(input);
  btn.removeEventListener("click", handleEditBtn);
  btn.addEventListener("click", editComment);
  input.focus();
};

commentForm.addEventListener("submit", handleCommentForm);
// 각가의 btn에게 addEventListener를 설정합니다.
deleteBtn.forEach((btn) => btn.addEventListener("click", handleDeleteBtn));
editBtn.forEach((btn) => btn.addEventListener("click", handleEditBtn));
