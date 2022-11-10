const storeList = document.querySelector(".ingredient__list--store");
const periodList = document.querySelector(".ingredient__list--period");
const purchaseList = document.querySelector(".ingredient__list--purchase");
const storeContainer = document.querySelector(
  ".user__ingredient__container--store"
);
const periodContainer = document.querySelector(
  ".user__ingredient__container--period"
);
const purchaseContainer = document.querySelector(
  ".user__ingredient__container--purchase"
);

const handleStoreList = () => {
  storeList.classList.add("select");
  periodList.classList.remove("select");
  purchaseList.classList.remove("select");
  storeContainer.classList.remove("hidden");
  periodContainer.classList.add("hidden");
  purchaseContainer.classList.add("hidden");
};

const handlePeriodList = () => {
  storeList.classList.remove("select");
  periodList.classList.add("select");
  purchaseList.classList.remove("select");
  storeContainer.classList.add("hidden");
  periodContainer.classList.remove("hidden");
  purchaseContainer.classList.add("hidden");
};

const handlePurchaseList = () => {
  storeList.classList.remove("select");
  periodList.classList.remove("select");
  purchaseList.classList.add("select");
  storeContainer.classList.add("hidden");
  periodContainer.classList.add("hidden");
  purchaseContainer.classList.remove("hidden");
};

storeList.addEventListener("click", handleStoreList);
periodList.addEventListener("click", handlePeriodList);
purchaseList.addEventListener("click", handlePurchaseList);
