/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/recipe.js":
/*!*********************************!*\
  !*** ./src/client/js/recipe.js ***!
  \*********************************/
/***/ (() => {

eval("const ingContainer = document.querySelector(\".ing__container\");\nconst ingBtn = document.querySelector(\".ing__btn\");\nconst orderContainer = document.querySelector(\".order__container\");\nconst orderBtn = document.querySelector(\".order__btn\");\nconst ingDeleteBtn = document.querySelectorAll(\".ing__box .delete__btn\");\nconst orderDeleteBtn = document.querySelectorAll(\".recipe__order__box .delete__btn\");\n\nconst handleDeleteBtn = event => {\n  const parentElement = event.target.parentElement;\n  parentElement.remove();\n};\n\nconst createDeleteBtn = () => {\n  const btn = document.createElement(\"button\");\n  btn.innerText = \"X\";\n  btn.type = \"button\";\n  btn.addEventListener(\"click\", handleDeleteBtn);\n  return btn;\n};\n\nconst radioInput = function (name, value) {\n  let order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ingContainer.childElementCount + 1;\n  const input = document.createElement(\"input\");\n  input.type = \"radio\";\n  input.id = \"\".concat(name, \"Amount\").concat(order);\n  input.name = \"amountType\".concat(order);\n  input.value = value;\n  input.required = true;\n  return input;\n};\n\nconst radioLabel = function (name, text) {\n  let order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ingContainer.childElementCount + 1;\n  const label = document.createElement(\"label\");\n  label.htmlFor = \"\".concat(name, \"Amount\").concat(order);\n  label.innerText = text;\n  return label;\n};\n\nconst textInput = (type, name, placeholder) => {\n  const input = document.createElement(\"input\");\n  input.type = type;\n  input.name = name;\n  input.placeholder = placeholder;\n  input.required = true;\n  return input;\n};\n\nconst addIngBox = () => {\n  const ingBox = document.createElement(\"div\");\n  ingBox.className = \"ing__box\";\n  const nameInput = textInput(\"text\", \"ingredient\", \"재료명\");\n  const amountInput = textInput(\"number\", \"ingredientAmount\", \"필요량\");\n  const gramBox = document.createElement(\"div\");\n  gramBox.className = \"ing__box__content\";\n  const gramRadio = radioInput(\"gram\", \"g\");\n  const gramLabel = radioLabel(\"gram\", \"그램(g)\");\n  gramBox.appendChild(gramRadio);\n  gramBox.appendChild(gramLabel);\n  const mlBox = document.createElement(\"div\");\n  mlBox.className = \"ing__box__content\";\n  const mlRadio = radioInput(\"ml\", \"ml\");\n  const mlLabel = radioLabel(\"ml\", \"밀리(ml)\");\n  mlBox.appendChild(mlRadio);\n  mlBox.appendChild(mlLabel);\n  const countBox = document.createElement(\"div\");\n  countBox.className = \"ing__box__content\";\n  const countRadio = radioInput(\"count\", \"개\");\n  const countLabel = radioLabel(\"count\", \"개수\");\n  countBox.appendChild(countRadio);\n  countBox.appendChild(countLabel);\n  const tableBox = document.createElement(\"div\");\n  tableBox.className = \"ing__box__content\";\n  const tableRadio = radioInput(\"table\", \"Ts\");\n  const tableLabel = radioLabel(\"table\", \"Ts\");\n  tableBox.appendChild(tableRadio);\n  tableBox.appendChild(tableLabel);\n  const teaBox = document.createElement(\"div\");\n  teaBox.className = \"ing__box__content\";\n  const teaRadio = radioInput(\"tea\", \"ts\");\n  const teaLabel = radioLabel(\"tea\", \"ts\");\n  teaBox.appendChild(teaRadio);\n  teaBox.appendChild(teaLabel);\n  const deleteBtn = createDeleteBtn();\n  deleteBtn.className = \"delete__btn\";\n  ingBox.appendChild(nameInput);\n  ingBox.appendChild(amountInput);\n  ingBox.appendChild(gramBox);\n  ingBox.appendChild(mlBox);\n  ingBox.appendChild(countBox);\n  ingBox.appendChild(tableBox);\n  ingBox.appendChild(teaBox);\n  ingBox.appendChild(deleteBtn);\n  ingContainer.appendChild(ingBox);\n};\n\nconst handleIngBtn = () => {\n  addIngBox();\n};\n\nconst createTextarea = () => {\n  const textarea = document.createElement(\"textarea\");\n  textarea.name = \"order\";\n  textarea.cols = \"30\";\n  textarea.rows = \"2\";\n  return textarea;\n};\n\nconst addOrderBox = () => {\n  const orderBox = document.createElement(\"div\");\n  orderBox.className = \"recipe__order__box\";\n  const title = document.createElement(\"h5\");\n  title.innerText = \"\".concat(orderContainer.childElementCount, \"\\uBC88\");\n  const textarea = createTextarea();\n  const deleteBtn = createDeleteBtn();\n  deleteBtn.className = \"delete__btn\";\n  orderBox.appendChild(title);\n  orderBox.appendChild(textarea);\n  orderBox.appendChild(deleteBtn);\n  orderContainer.appendChild(orderBox);\n};\n\nconst handleOrderBtn = () => {\n  addOrderBox();\n};\n\ningBtn.addEventListener(\"click\", handleIngBtn);\norderBtn.addEventListener(\"click\", handleOrderBtn);\n\nif (ingDeleteBtn) {\n  ingDeleteBtn.forEach(btn => btn.addEventListener(\"click\", handleDeleteBtn));\n}\n\nif (orderDeleteBtn) {\n  orderDeleteBtn.forEach(btn => btn.addEventListener(\"click\", handleDeleteBtn));\n}\n\n//# sourceURL=webpack://fresh-recipes/./src/client/js/recipe.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/recipe.js"]();
/******/ 	
/******/ })()
;