const ingredient = document.querySelector(".ingredient__detail");
const ingredientAmount = document.querySelector(
  ".ingredient__detail__amount__current"
);
const ingredientAmountForm = document.querySelector(
  ".ingredient__detail__amount__form"
);
const spendInput = document.querySelector(".spend__input");
const purchaseCheck = document.querySelector(".purchase__check");
// purchaseCheck가 change할 시 실행합니다.
const handleCheck = async (evnet) => {
  const checked = evnet.target.checked;
  const { id } = ingredient.dataset;
  // checked값에 따른 조건문입니다.
  if (checked) {
    // Ingredient 데이터의 purchase속성을 true로 변경하는 api를 호출합니다.
    const response = await fetch(`/api/purchase/${id}/add`, {
      method: "POST",
    });
    if (response.status === 200) {
      const message = document.createElement("span");
      message.classList.add("message", "message__success");
      message.innerText = "구입항목에 추가되었습니다.";
      ingredient.appendChild(message);
    }
  } else {
    // Ingredient 데이터의 purchase속성을 false로 변경하는 api를 호출합니다.
    const response = await fetch(`/api/purchase/${id}/remove`, {
      method: "POST",
    });
    if (response.status === 200) {
      const message = document.createElement("span");
      message.classList.add("message", "message__success");
      message.innerText = "구입항목에서 삭제하였습니다.";
      ingredient.appendChild(message);
    }
  }
};
// 재료소진시 구입항목에 추가하기 위한 함수입니다.
const handelPopupYes = async () => {
  const { id } = ingredient.dataset;
  await fetch(`/api/ingredient/${id}/spend`, {
    method: "POST",
    redirect: "follow",
    body: JSON.stringify({ caculateAmount: 0, purchase: true }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.redirected) {
      window.location.href = response.url;
    }
  });
};
// 재료소진시 구입항목에 추가하지 않기 위한 함수입니다.
const handelPopupNo = async () => {
  const { id } = ingredient.dataset;
  await fetch(`/api/ingredient/${id}/spend`, {
    method: "POST",
    redirect: "follow",
    body: JSON.stringify({ caculateAmount: 0, purchase: false }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.redirected) {
      window.location.href = response.url;
    }
  });
};
// ingredientAmountForm을 submit할 시 실행합니다.
const handleSpendBtn = async (evnet) => {
  evnet.preventDefault();
  // 소모된 양을 계산하여 남은 양을 구합니다.
  const spendAmount = spendInput.value;
  const amount = ingredientAmount.innerHTML;
  const parseIntAmount = parseInt(amount);
  const caculateAmount = parseIntAmount - spendAmount;
  spendInput.value = 0;
  // 남은 양이 양수일 경우
  if (caculateAmount > 0) {
    ingredientAmount.innerHTML = caculateAmount;
    const { id } = ingredient.dataset;
    // fetch를 이용하여 Ingredient 데이터의 amount속성을 수정하는 api를 호출합니다.
    await fetch(`/api/ingredient/${id}/spend`, {
      method: "POST",
      body: JSON.stringify({ caculateAmount }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // 남은 양이 음수 또는 0일 경우
  } else if (caculateAmount <= 0) {
    const popupBox = document.createElement("div");
    popupBox.className = "ingredient__detail__popup";
    const popupText = document.createElement("span");
    popupText.className = "ingredient__detail__popup__text";
    popupText.innerText = "재료를 모든 소진하였습니다. 구매 목록에 추가할까요?";
    const btnContainer = document.createElement("div");
    btnContainer.className = "ingredient__detail__popup__btn__container";
    const popupYes = document.createElement("button");
    popupYes.classList.add(
      "ingredient__detail__popup__btn",
      "ingredient__detail__popup__btn--add"
    );
    popupYes.innerText = "추가하기";
    // popupYes 버튼은 click시 handelPopupYes 함수를 실행합니다.
    popupYes.addEventListener("click", handelPopupYes);
    const popupNo = document.createElement("button");
    popupNo.classList.add(
      "ingredient__detail__popup__btn",
      "ingredient__detail__popup__btn--delete"
    );
    popupNo.innerText = "추가하지 않기";
    // popupNo 버튼은 click시 handelPopupNo 함수를 실행합니다.
    popupNo.addEventListener("click", handelPopupNo);
    popupBox.appendChild(popupText);
    btnContainer.appendChild(popupYes);
    btnContainer.appendChild(popupNo);
    popupBox.appendChild(btnContainer);
    ingredient.append(popupBox);
  }
};

ingredientAmountForm.addEventListener("submit", handleSpendBtn);
purchaseCheck.addEventListener("change", handleCheck);
