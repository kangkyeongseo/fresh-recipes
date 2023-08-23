const avatarContainer = document.querySelector(".user__edit__avatar");
const avatarImage = avatarContainer.querySelector("img");
const avatarIcon = avatarContainer.querySelector(
  ".user__edit__avatar__no--image"
);
const fileInput = document.querySelector(".user__file");
// fileInput이 change할 시 실행합니다.
const handleFileInput = (event) => {
  const file = event.target.files[0];
  // createObjectURL 메서드를 사용하여 file을 DOMString으로 반환합니다.
  const fileUrl = URL.createObjectURL(file);
  if (avatarImage) {
    avatarImage.src = fileUrl;
  } else {
    avatarIcon.remove();
    const createImgae = document.createElement("img");
    createImgae.className = "user__edit__avatar__image";
    createImgae.src = fileUrl;
    avatarContainer.appendChild(createImgae);
  }
};

fileInput.addEventListener("change", handleFileInput);
