const popupElements = Array.from(document.querySelectorAll(".popup"));
const closeButtons = document.querySelectorAll(".popup__close");

// Переменные для попапа редактирования профиля
const popupProfileElement = document.querySelector(
  '[name="popup_add_profile"]'
);
const btnPopupProfile = document.querySelector(".profile__edit-button");
const textProfileTitle = document.querySelector(".profile__title");
const textProfileSubtitle = document.querySelector(".profile__subtitle");
const formElement = document.querySelector('[name="formPopup"]');
const nameInput = formElement.querySelector(".popup__item_el_heading");
const jobInput = formElement.querySelector(".popup__item_el_subheading");

// Переменные для попапа добавления карточек
const popupCardElement = document.querySelector('[name="popup_add_card"]');
const btnPopupCards = document.querySelector(".profile__add-button");
const cardContainer = document.querySelector(".elements");

const formCard = document.querySelector('[name="cardPopup"]');
const formTitleInput = formCard.querySelector(".popup__item_el_cardHeading");
const formLinkInput = formCard.querySelector(".popup__item_el_cardLink");

// Переменные для попапа изображения
const popupOpenImage = document.querySelector('[name="imagePopup"]');
const imageOpened = popupOpenImage.querySelector(".popup-image__photo");
const labelOpened = popupOpenImage.querySelector(".popup-image__label");

const config = {
    formSelector: ".popup__form",
    inputSelector: ".popup__item",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_invalid",
    inputErrorClass: "popup__item_error",
    errorClass: "popup__error_visible",
  };
  

export {popupElements, closeButtons, popupProfileElement, btnPopupProfile, textProfileTitle, textProfileSubtitle, formElement, nameInput, jobInput, popupCardElement, btnPopupCards, cardContainer, formCard, formTitleInput, formLinkInput, popupOpenImage, imageOpened, labelOpened, config}