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

/***/ "./src/client/js/ingredient.js":
/*!*************************************!*\
  !*** ./src/client/js/ingredient.js ***!
  \*************************************/
/***/ (() => {

eval("const ingredient = document.querySelector(\".ingredient__detail\");\nconst ingredientAmount = document.querySelector(\".ingredient__detail__amount__current\");\nconst ingredientAmountForm = document.querySelector(\".ingredient__detail__amount__form\");\nconst spendInput = document.querySelector(\".spend__input\");\nconst purchaseCheck = document.querySelector(\".purchase__check\");\n\nconst handleCheck = async evnet => {\n  const checked = evnet.target.checked;\n  const {\n    id\n  } = ingredient.dataset;\n\n  if (checked) {\n    const response = await fetch(\"/api/purchase/\".concat(id, \"/add\"), {\n      method: \"POST\"\n    });\n\n    if (response.status === 200) {\n      const message = document.createElement(\"span\");\n      message.classList.add(\"message\", \"message__success\");\n      message.innerText = \"구입항목에 추가되었습니다.\";\n      ingredient.appendChild(message);\n    }\n  } else {\n    const response = await fetch(\"/api/purchase/\".concat(id, \"/remove\"), {\n      method: \"POST\"\n    });\n\n    if (response.status === 200) {\n      const message = document.createElement(\"span\");\n      message.classList.add(\"message\", \"message__success\");\n      message.innerText = \"구입항목에서 삭제하였습니다.\";\n      ingredient.appendChild(message);\n    }\n  }\n};\n\nconst handelPopupYes = async () => {\n  const {\n    id\n  } = ingredient.dataset;\n  await fetch(\"/api/ingredient/\".concat(id, \"/spend\"), {\n    method: \"POST\",\n    redirect: \"follow\",\n    body: JSON.stringify({\n      caculateAmount: 0,\n      purchase: true\n    }),\n    headers: {\n      \"Content-Type\": \"application/json\"\n    }\n  }).then(response => {\n    if (response.redirected) {\n      window.location.href = response.url;\n    }\n  });\n};\n\nconst handelPopupNo = async () => {\n  const {\n    id\n  } = ingredient.dataset;\n  await fetch(\"/api/ingredient/\".concat(id, \"/spend\"), {\n    method: \"POST\",\n    redirect: \"follow\",\n    body: JSON.stringify({\n      caculateAmount: 0,\n      purchase: false\n    }),\n    headers: {\n      \"Content-Type\": \"application/json\"\n    }\n  }).then(response => {\n    if (response.redirected) {\n      window.location.href = response.url;\n    }\n  });\n};\n\nconst handleSpendBtn = async evnet => {\n  evnet.preventDefault();\n  const spendAmount = spendInput.value;\n  const amount = ingredientAmount.innerHTML;\n  const parseIntAmount = parseInt(amount);\n  const caculateAmount = parseIntAmount - spendAmount;\n  spendInput.value = 0;\n\n  if (caculateAmount > 0) {\n    ingredientAmount.innerHTML = caculateAmount;\n    const {\n      id\n    } = ingredient.dataset;\n    await fetch(\"/api/ingredient/\".concat(id, \"/spend\"), {\n      method: \"POST\",\n      body: JSON.stringify({\n        caculateAmount\n      }),\n      headers: {\n        \"Content-Type\": \"application/json\"\n      }\n    });\n  } else if (caculateAmount <= 0) {\n    const popupBox = document.createElement(\"div\");\n    const popupText = document.createElement(\"span\");\n    popupText.innerText = \"재료를 모든 소진하였습니다. 구매 목록에 추가할까요?\";\n    const popupYes = document.createElement(\"button\");\n    popupYes.innerText = \"추가하기\";\n    popupYes.addEventListener(\"click\", handelPopupYes);\n    const popupNo = document.createElement(\"button\");\n    popupNo.innerText = \"추가하지 않기\";\n    popupNo.addEventListener(\"click\", handelPopupNo);\n    popupBox.appendChild(popupText);\n    popupBox.appendChild(popupYes);\n    popupBox.appendChild(popupNo);\n    ingredient.prepend(popupBox);\n  }\n};\n\ningredientAmountForm.addEventListener(\"submit\", handleSpendBtn);\npurchaseCheck.addEventListener(\"change\", handleCheck);\n\n//# sourceURL=webpack://fresh-recipes/./src/client/js/ingredient.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/ingredient.js"]();
/******/ 	
/******/ })()
;