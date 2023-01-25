import { btnPopupProfile, formElement, nameInput, jobInput, popupCardElement, btnPopupCards, cardContainer, config } from './scripts/constants.js'
import { initialCards } from "./scripts/cards.js";
import FormValidator from './scripts/FormValidator.js';
import Card from './scripts/Card.js';
import PopupWithImage from './scripts/PopupWithImage.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import UserInfo from './scripts/UserInfo.js'
import Section from './scripts/Section.js'
import './index.css'; 

//Добавление карточек из  попапа
const submitCardFormtHandler = (e, values) => {

  e.preventDefault();

  const card = {
    name: values['cardName'],
    link: values.link
  };

  const element = newCard(card);
  cardContainer.prepend(element);
  addCardForm.close()
};

// обработчик формы
const submitFormtHandler = (e, values) => {

  e.preventDefault();
  userInfo.setUserInfo(values.avatarName, values.avatarDescription)
  aditProfileForm.close()
}

const popupWithImage = new PopupWithImage('.popup_img-background')
popupWithImage.setEventListeners()

const addCardForm = new PopupWithForm('.popup_add_card', submitCardFormtHandler)
addCardForm.setEventListeners()

const aditProfileForm = new PopupWithForm('.popup_add_profile', submitFormtHandler)
aditProfileForm.setEventListeners()

const userInfo = new UserInfo({ nameSelector: '.profile__title', aboutSelectors: '.profile__subtitle' })

//Ф-ция открытия попапа редактирования имени
const openProfilePopup = () => {
  const { name, description } = userInfo.getUserInfo()
  nameInput.value = name;
  jobInput.value = description;
  aditProfileForm.open()
  formProfileValid.resetValidation();
};

// Открытие попапа редактирования карточек
const openCardslePopup = () => {
  addCardForm.open()
  popupCardValid.resetValidation();
};


// Новая карточка
function newCard(item) {
  // Создадим экземпляр карточки
  const card = new Card(item, "#element-template", handleCardClick);
  // Создаём карточку и возвращаем наружу
  return card.generateCard();
}

// Создание экземпляра класса Section
const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    defaultCardList.addItem(newCard(item));
  }
}, '.elements');

defaultCardList.renderItems()

function handleCardClick(name, link) {
  popupWithImage.open(name, link)
}


btnPopupProfile.addEventListener("click", openProfilePopup);
btnPopupCards.addEventListener("click", openCardslePopup);

const formProfileValid = new FormValidator(config, formElement);
formProfileValid.enableValidation();

const popupCardValid = new FormValidator(config, popupCardElement);
popupCardValid.enableValidation();