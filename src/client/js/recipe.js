const ingContainer = document.querySelector(".ing__container");
const ingBtn = document.querySelector(".ing__btn");
const orderContainer = document.querySelector(".order__container");
const orderBtn = document.querySelector(".order__btn");
const ingDeleteBtn = document.querySelectorAll(".ing__box .delete__btn");
const orderDeleteBtn = document.querySelectorAll(
  ".recipe__order__box .delete__btn"
);

const handleDeleteBtn = (event) => {
  const parentElement = event.target.parentElement;
  parentElement.remove();
};

const createDeleteBtn = () => {
  const btn = document.createElement("button");
  btn.innerText = "X";
  btn.type = "button";
  btn.addEventListener("click", handleDeleteBtn);
  return btn;
};

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

const radioLabel = (name, text, order = ingContainer.childElementCount + 1) => {
  const label = document.createElement("label");
  label.htmlFor = `${name}Amount${order}`;
  label.innerText = text;
  return label;
};

const textInput = (type, name, placeholder) => {
  const input = document.createElement("input");
  input.type = type;
  input.name = name;
  input.placeholder = placeholder;
  input.required = true;
  return input;
};

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

const handleIngBtn = () => {
  addIngBox();
};

const createTextarea = () => {
  const textarea = document.createElement("textarea");
  textarea.name = "order";
  textarea.cols = "30";
  textarea.rows = "2";
  return textarea;
};

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

const handleOrderBtn = () => {
  addOrderBox();
};

ingBtn.addEventListener("click", handleIngBtn);
orderBtn.addEventListener("click", handleOrderBtn);

if (ingDeleteBtn) {
  ingDeleteBtn.forEach((btn) => btn.addEventListener("click", handleDeleteBtn));
}

if (orderDeleteBtn) {
  orderDeleteBtn.forEach((btn) =>
    btn.addEventListener("click", handleDeleteBtn)
  );
}
