const btnPopupProfile = document.querySelector(".profile__edit-button");
const btnUpdateAvatar = document.querySelector(".profile__conteiner");
const formElement = document.querySelector('[name="formPopup"]');
const nameInput = formElement.querySelector(".popup__item_el_heading");
const jobInput = formElement.querySelector(".popup__item_el_subheading");
const popupAvatarElement = document.querySelector('[name="popup_update_avatar"]');

// Переменные для попапа добавления карточек
const popupCardElement = document.querySelector('[name="popup_add_card"]');
const btnPopupCards = document.querySelector(".profile__add-button");
const cardContainer = document.querySelector(".elements");

//Профиль 


const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_invalid",
  inputErrorClass: "popup__item_error",
  errorClass: "popup__error_visible",
};


export { btnPopupProfile, btnUpdateAvatar, formElement, nameInput, jobInput, popupCardElement, btnPopupCards, cardContainer, config, popupAvatarElement }