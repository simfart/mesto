const popupElement = document.querySelector(".popup");
const popupCloseButtonElement = popupElement.querySelector(".popup__close");
const popupOpenButtonElement = document.querySelector(".profile__edit-button");

const textProfileTitle = document.querySelector(".profile__title");
const textProfileSubtitle = document.querySelector(".profile__subtitle");


const openPopup = () => {
  popupElement.classList.add("popup_opened");
  nameInput.value = ("value", textProfileTitle.textContent);
  jobInput.value = ("value", textProfileSubtitle.textContent);
};

const closePopup = () => popupElement.classList.remove("popup_opened");



const formElement = document.querySelector(".popup__conteiner");
const nameInput = formElement.querySelector(".popup__item_el_heading");
const jobInput = formElement.querySelector(".popup__item_el_subheading");

function submitFormtHandler(evt) {
  evt.preventDefault();
  textProfileTitle.textContent = nameInput.value;
  textProfileSubtitle.textContent = jobInput.value;
  closePopup();
}

popupOpenButtonElement.addEventListener("click", openPopup);
popupCloseButtonElement.addEventListener("click", closePopup);
formElement.addEventListener("submit", submitFormtHandler);