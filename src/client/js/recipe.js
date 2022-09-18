const ingContainer = document.querySelector(".ing__container");
const ingBtn = document.querySelector(".ing__btn");
const orderContainer = document.querySelector(".order__container");
const orderBtn = document.querySelector(".order__btn");

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
  const title = document.createElement("h5");
  title.innerText = `${ingContainer.childElementCount + 1}.필요재료`;
  const nameInput = textInput("text", "ingredient", "재료명");
  const amountInput = textInput("number", "ingredientAmount", "필요량");
  const gramRadio = radioInput("gram", "g");
  const gramLabel = radioLabel("gram", "그램(g)");
  const mlRadio = radioInput("ml", "ml");
  const mlLabel = radioLabel("ml", "밀리(ml)");
  const countRadio = radioInput("count", "개");
  const countLabel = radioLabel("count", "개수");
  const tableRadio = radioInput("table", "Ts");
  const tableLabel = radioLabel("table", "Ts");
  const teaRadio = radioInput("tea", "ts");
  const teaLabel = radioLabel("tea", "ts");
  const deleteBtn = createDeleteBtn();
  ingBox.appendChild(title);
  ingBox.appendChild(nameInput);
  ingBox.appendChild(amountInput);
  ingBox.appendChild(gramRadio);
  ingBox.appendChild(gramLabel);
  ingBox.appendChild(mlRadio);
  ingBox.appendChild(mlLabel);
  ingBox.appendChild(countRadio);
  ingBox.appendChild(countLabel);
  ingBox.appendChild(tableRadio);
  ingBox.appendChild(tableLabel);
  ingBox.appendChild(teaRadio);
  ingBox.appendChild(teaLabel);
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
  const title = document.createElement("h5");
  title.innerText = `${orderContainer.childElementCount}번`;
  const textarea = createTextarea();
  const deleteBtn = createDeleteBtn();
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