const btnPopupProfile = document.querySelector(".profile__edit-button");
const formElement = document.querySelector('[name="formPopup"]');
const nameInput = formElement.querySelector(".popup__item_el_heading");
const jobInput = formElement.querySelector(".popup__item_el_subheading");

// Переменные для попапа добавления карточек
const popupCardElement = document.querySelector('[name="popup_add_card"]');
const btnPopupCards = document.querySelector(".profile__add-button");
const cardContainer = document.querySelector(".elements");


const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_invalid",
  inputErrorClass: "popup__item_error",
  errorClass: "popup__error_visible",
};


export { btnPopupProfile, formElement, nameInput, jobInput, popupCardElement, btnPopupCards, cardContainer, config }