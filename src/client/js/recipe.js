const ingContainer = document.querySelector(".ing__container");
const ingBtn = document.querySelector(".ing__btn");
const orderContainer = document.querySelector(".order__container");
const orderBtn = document.querySelector(".order__btn");
const ingDeleteBtn = document.querySelectorAll(".ing__box .delete__btn");
const orderDeleteBtn = document.querySelectorAll(
  ".recipe__order__box .delete__btn"
);
const fileInput = document.querySelector(".recipe__file");
const thumbLabel = document.querySelector(".recipe__thumb__label label");
const thumbImage = thumbLabel.querySelector("img");
const thumbIcon = thumbLabel.querySelector("i");
// target을 제거하는 함수입니다.
const handleDeleteBtn = (event) => {
  const parentElement = event.target.parentElement;
  parentElement.remove();
};
// 삭제 버튼을 반환합니다.
const createDeleteBtn = () => {
  const btn = document.createElement("button");
  btn.innerText = "X";
  btn.type = "button";
  btn.addEventListener("click", handleDeleteBtn);
  return btn;
};
// radio type의 input을 반환합니다.
const radioInput = (
  name,
  value,
  order = ingContainer.childElementCount + 1
) => {
  const input = document.createElement("input");
  input.type = "radio";
  input.id = `${name}Amount${order}`;
  input.name = `amountType${order}`;
  input.value = value;
  input.required = true;
  return input;
};
// parameter로 받은 정보로 label을 반환합니다.
const radioLabel = (name, text, order = ingContainer.childElementCount + 1) => {
  const label = document.createElement("label");
  label.htmlFor = `${name}Amount${order}`;
  label.innerText = text;
  return label;
};
// parameter로 받은 정보로 text type의 input을 반환합니다.
const textInput = (type, name, placeholder) => {
  const input = document.createElement("input");
  input.type = type;
  input.name = name;
  input.placeholder = placeholder;
  input.required = true;
  return input;
};
// Ingredient Container를 생성합니다.
const addIngBox = () => {
  const ingBox = document.createElement("div");
  ingBox.className = "ing__box";
  const nameInput = textInput("text", "ingredient", "재료명");
  const amountInput = textInput("number", "ingredientAmount", "필요량");
  const gramBox = document.createElement("div");
  gramBox.className = "ing__box__content";
  const gramRadio = radioInput("gram", "g");
  const gramLabel = radioLabel("gram", "그램(g)");
  gramBox.appendChild(gramRadio);
  gramBox.appendChild(gramLabel);
  const mlBox = document.createElement("div");
  mlBox.className = "ing__box__content";
  const mlRadio = radioInput("ml", "ml");
  const mlLabel = radioLabel("ml", "밀리(ml)");
  mlBox.appendChild(mlRadio);
  mlBox.appendChild(mlLabel);
  const countBox = document.createElement("div");
  countBox.className = "ing__box__content";
  const countRadio = radioInput("count", "개");
  const countLabel = radioLabel("count", "개수");
  countBox.appendChild(countRadio);
  countBox.appendChild(countLabel);
  const tableBox = document.createElement("div");
  tableBox.className = "ing__box__content";
  const tableRadio = radioInput("table", "Ts");
  const tableLabel = radioLabel("table", "Ts");
  tableBox.appendChild(tableRadio);
  tableBox.appendChild(tableLabel);
  const teaBox = document.createElement("div");
  teaBox.className = "ing__box__content";
  const teaRadio = radioInput("tea", "ts");
  const teaLabel = radioLabel("tea", "ts");
  teaBox.appendChild(teaRadio);
  teaBox.appendChild(teaLabel);
  const deleteBtn = createDeleteBtn();
  deleteBtn.className = "delete__btn";
  ingBox.appendChild(nameInput);
  ingBox.appendChild(amountInput);
  ingBox.appendChild(gramBox);
  ingBox.appendChild(mlBox);
  ingBox.appendChild(countBox);
  ingBox.appendChild(tableBox);
  ingBox.appendChild(teaBox);
  ingBox.appendChild(deleteBtn);
  ingContainer.appendChild(ingBox);
};
// addIngBox함수를 실행합니다.
const handleIngBtn = () => {
  addIngBox();
};
// textarea를 반환합니다.
const createTextarea = () => {
  const textarea = document.createElement("textarea");
  textarea.name = "order";
  textarea.cols = "30";
  textarea.rows = "2";
  return textarea;
};
// Order Container를 생성합니다.
const addOrderBox = () => {
  const orderBox = document.createElement("div");
  orderBox.className = "recipe__order__box";
  const title = document.createElement("h5");
  title.innerText = `${orderContainer.childElementCount}번`;
  const textarea = createTextarea();
  const deleteBtn = createDeleteBtn();
  deleteBtn.className = "delete__btn";
  orderBox.appendChild(title);
  orderBox.appendChild(textarea);
  orderBox.appendChild(deleteBtn);
  orderContainer.appendChild(orderBox);
};
// addOrderBox함수를 실행합니다.
const handleOrderBtn = () => {
  addOrderBox();
};

ingBtn.addEventListener("click", handleIngBtn);
orderBtn.addEventListener("click", handleOrderBtn);
// ingDeleteBtn이 있을시 각각의 ingDeleteBtn에 addEventListener를 설정합니다.
if (ingDeleteBtn) {
  ingDeleteBtn.forEach((btn) => btn.addEventListener("click", handleDeleteBtn));
}
// orderDeleteBtn이 있을시 각각의 orderDeleteBtn에 addEventListener를 설정합니다.
if (orderDeleteBtn) {
  orderDeleteBtn.forEach((btn) =>
    btn.addEventListener("click", handleDeleteBtn)
  );
}
// fileInput이 change할 시 실행합니다.
const handelFileInput = (event) => {
  const file = event.target.files[0];
  // createObjectURL 메서드를 사용하여 file을 DOMString으로 반환합니다.
  const fileUrl = URL.createObjectURL(file);
  if (thumbImage) {
    thumbImage.src = fileUrl;
  } else {
    thumbIcon.remove();
    const createThumbImage = document.createElement("img");
    createThumbImage.src = fileUrl;
    thumbLabel.appendChild(createThumbImage);
  }
};

fileInput.addEventListener("change", handelFileInput);
