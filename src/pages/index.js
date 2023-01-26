import {
  btnPopupProfile,
  formElement,
  nameInput,
  jobInput,
  popupCardElement,
  btnPopupCards,
  cardContainer,
  config,
} from "../utils/constants.js";
import { initialCards } from "../utils/cards.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import "./index.css";

// обработчик формы
const submitFormtHandler = (e, values) => {
  userInfo.setUserInfo(values.avatarName, values.avatarDescription);
  aditProfileForm.close();
};

const popupWithImage = new PopupWithImage(".popup_img-background");
popupWithImage.setEventListeners();

const aditProfileForm = new PopupWithForm(
  ".popup_add_profile",
  submitFormtHandler
);
aditProfileForm.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelectors: ".profile__subtitle",
});

//Ф-ция открытия попапа редактирования имени
const openProfilePopup = () => {
  const { name, description } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = description;
  aditProfileForm.open();
  formProfileValid.resetValidation();
};

// Открытие попапа редактирования карточек
const openCardslePopup = () => {
  addCardForm.open();
  popupCardValid.resetValidation();
};

// Новая карточка
function newCard(item) {
  // Создадим экземпляр карточки
  const card = new Card(item, "#element-template", handleCardClick);
  // Создаём карточку и возвращаем наружу
  return card.generateCard();
}

const addCard = (item) => {
  defaultCardList.addItem(newCard(item));
};

// Создание экземпляра класса Section
const defaultCardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      addCard(item);
    },
  },
  ".elements"
);

defaultCardList.renderItems();

//Добавление карточек из  попапа
const submitCardFormtHandler = (e, item) => {
  addCard(item);
  addCardForm.close();
};

const addCardForm = new PopupWithForm(
  ".popup_add_card",
  submitCardFormtHandler
);
addCardForm.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

btnPopupProfile.addEventListener("click", openProfilePopup);
btnPopupCards.addEventListener("click", openCardslePopup);

const formProfileValid = new FormValidator(config, formElement);
formProfileValid.enableValidation();

const popupCardValid = new FormValidator(config, popupCardElement);
popupCardValid.enableValidation();
