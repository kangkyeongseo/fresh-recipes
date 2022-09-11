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

eval("const ingContainer = document.querySelector(\".ing__container\");\nconst ingBtn = document.querySelector(\".ing__btn\");\nconst orderContainer = document.querySelector(\".order__container\");\nconst orderBtn = document.querySelector(\".order__btn\");\n\nconst radioInput = function (name, value) {\n  let order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ingContainer.childElementCount + 1;\n  const input = document.createElement(\"input\");\n  input.type = \"radio\";\n  input.id = \"\".concat(name, \"Amount\").concat(order);\n  input.name = \"amountType\".concat(order);\n  input.value = value;\n  input.required = true;\n  return input;\n};\n\nconst radioLabel = function (name, text) {\n  let order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ingContainer.childElementCount + 1;\n  const label = document.createElement(\"label\");\n  label.htmlFor = \"\".concat(name, \"Amount\").concat(order);\n  label.innerText = text;\n  return label;\n};\n\nconst textInput = (type, name, placeholder) => {\n  const input = document.createElement(\"input\");\n  input.type = type;\n  input.name = name;\n  input.placeholder = placeholder;\n  input.required = true;\n  return input;\n};\n\nconst addIngBox = () => {\n  const ingBox = document.createElement(\"div\");\n  const title = document.createElement(\"h5\");\n  title.innerText = \"\".concat(ingContainer.childElementCount + 1, \".\\uD544\\uC694\\uC7AC\\uB8CC\");\n  const nameInput = textInput(\"text\", \"ingredient\", \"재료명\");\n  const amountInput = textInput(\"number\", \"ingredientAmount\", \"필요량\");\n  const gramRadio = radioInput(\"gram\", \"g\");\n  const gramLabel = radioLabel(\"gram\", \"그램(g)\");\n  const mlRadio = radioInput(\"ml\", \"ml\");\n  const mlLabel = radioLabel(\"ml\", \"밀리(ml)\");\n  const countRadio = radioInput(\"count\", \"개\");\n  const countLabel = radioLabel(\"count\", \"개수\");\n  const tableRadio = radioInput(\"table\", \"Ts\");\n  const tableLabel = radioLabel(\"table\", \"Ts\");\n  const teaRadio = radioInput(\"tea\", \"ts\");\n  const teaLabel = radioLabel(\"tea\", \"ts\");\n  ingBox.appendChild(title);\n  ingBox.appendChild(nameInput);\n  ingBox.appendChild(amountInput);\n  ingBox.appendChild(gramRadio);\n  ingBox.appendChild(gramLabel);\n  ingBox.appendChild(mlRadio);\n  ingBox.appendChild(mlLabel);\n  ingBox.appendChild(countRadio);\n  ingBox.appendChild(countLabel);\n  ingBox.appendChild(tableRadio);\n  ingBox.appendChild(tableLabel);\n  ingBox.appendChild(teaRadio);\n  ingBox.appendChild(teaLabel);\n  ingContainer.appendChild(ingBox);\n};\n\nconst handleIngBtn = () => {\n  addIngBox();\n};\n\nconst createTextarea = () => {\n  const textarea = document.createElement(\"textarea\");\n  textarea.name = \"order\";\n  textarea.cols = \"30\";\n  textarea.rows = \"2\";\n  return textarea;\n};\n\nconst addOrderBox = () => {\n  const orderBox = document.createElement(\"div\");\n  const title = document.createElement(\"h5\");\n  title.innerText = \"\".concat(orderContainer.childElementCount, \"\\uBC88\");\n  const textarea = createTextarea();\n  orderBox.appendChild(title);\n  orderBox.appendChild(textarea);\n  orderContainer.appendChild(orderBox);\n};\n\nconst handleOrderBtn = () => {\n  addOrderBox();\n};\n\ningBtn.addEventListener(\"click\", handleIngBtn);\norderBtn.addEventListener(\"click\", handleOrderBtn);\n\n//# sourceURL=webpack://fresh-recipes/./src/client/js/recipe.js?");

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