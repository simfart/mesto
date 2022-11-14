const popupElement = document.querySelector(".popup");
const popupCloseButtonElement = popupElement.querySelector(".popup__close");
const popupOpenButtonElement = document.querySelector(".profile__edit-button");

let textProfileTitle = document.querySelector(".profile__title");
let textProfileSubtitle = document.querySelector(".profile__subtitle");


const openPopup = () => {
  popupElement.classList.add("popup_opened");
  nameInput.setAttribute("value", textProfileTitle.textContent);
  jobInput.setAttribute("value", textProfileSubtitle.textContent);
};

const closePopup = () => popupElement.classList.remove("popup_opened");

popupOpenButtonElement.addEventListener("click", openPopup);
popupCloseButtonElement.addEventListener("click", closePopup);

let formElement = document.querySelector(".popup__conteiner");
let nameInput = formElement.querySelector(".popup__item_el_heading");
let jobInput = formElement.querySelector(".popup__item_el_subheading");

function formSubmitHandler(evt) {
  evt.preventDefault();
  textProfileTitle.textContent = nameInput.value;
  textProfileSubtitle.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener("submit", formSubmitHandler);