const ingredient = document.querySelector(".ingredient__detail");
const ingredientAmount = document.querySelector(
  ".ingredient__detail__amount__current"
);
const ingredientAmountForm = document.querySelector(
  ".ingredient__detail__amount__form"
);
const spendInput = document.querySelector(".spend__input");
const purchaseCheck = document.querySelector(".purchase__check");

const handleCheck = async (evnet) => {
  const checked = evnet.target.checked;
  const { id } = ingredient.dataset;
  if (checked) {
    await fetch(`/api/purchase/${id}/add`, {
      method: "POST",
    });
  } else {
    await fetch(`/api/purchase/${id}/remove`, {
      method: "POST",
    });
  }
};

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

const handleSpendBtn = async (evnet) => {
  evnet.preventDefault();
  const spendAmount = spendInput.value;
  const amount = ingredientAmount.innerHTML;
  const parseIntAmount = parseInt(amount);
  const caculateAmount = parseIntAmount - spendAmount;
  spendInput.value = 0;
  if (caculateAmount > 0) {
    ingredientAmount.innerHTML = caculateAmount;
    const { id } = ingredient.dataset;
    await fetch(`/api/ingredient/${id}/spend`, {
      method: "POST",
      body: JSON.stringify({ caculateAmount }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else if (caculateAmount <= 0) {
    const popupBox = document.createElement("div");
    const popupText = document.createElement("span");
    popupText.innerText = "재료를 모든 소진하였습니다. 구매 목록에 추가할까요?";
    const popupYes = document.createElement("button");
    popupYes.innerText = "추가하기";
    popupYes.addEventListener("click", handelPopupYes);
    const popupNo = document.createElement("button");
    popupNo.innerText = "추가하지 않기";
    popupNo.addEventListener("click", handelPopupNo);
    popupBox.appendChild(popupText);
    popupBox.appendChild(popupYes);
    popupBox.appendChild(popupNo);
    ingredient.prepend(popupBox);
  }
};

ingredientAmountForm.addEventListener("submit", handleSpendBtn);
purchaseCheck.addEventListener("change", handleCheck);
