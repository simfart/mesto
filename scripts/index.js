import { popupElements, closeButtons, popupProfileElement, btnPopupProfile, textProfileTitle, textProfileSubtitle, formElement, nameInput, jobInput, popupCardElement, btnPopupCards, cardContainer, formCard, formTitleInput, formLinkInput, popupOpenImage, imageOpened, labelOpened, config } from './constants.js'
import { initialCards } from "./cards.js";
import FormValidator from './FormValidator.js';
import Card from './Card.js';

// Для закрытия попапов по Esc
const handleKeyUp = (e) => {
  if (e.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
};

// Для закрытия попапов по клику на оверлей
const handleOverlayClick = (e) => {
  const openedPopup = document.querySelector('.popup_opened');
  if (openedPopup && e.target === openedPopup) {
    closePopup(openedPopup);
  }
};

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keyup", handleKeyUp);
  document.addEventListener("mousedown", handleOverlayClick);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keyup", handleKeyUp);
  document.removeEventListener("mousedown", handleOverlayClick);
}

//Закрытие всех попапов по Х
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

//Ф-ция открытия попапа редактирования имени
const openProfilePopup = () => {
  nameInput.value = textProfileTitle.textContent;
  jobInput.value = textProfileSubtitle.textContent;
  openPopup(popupProfileElement);
  formProfileValid.resetValidation();
};

// Открытие попапа редактирования карточек
const openCardslePopup = () => {
  openPopup(popupCardElement);
  popupCardValid.resetValidation();
  formCard.reset()
};

// обработчик формы
function submitFormtHandler(evt) {
  evt.preventDefault();
  textProfileTitle.textContent = nameInput.value;
  textProfileSubtitle.textContent = jobInput.value;
  closePopup(popupProfileElement);
}

// Новая карточка
function newCard(item) {
  // Создадим экземпляр карточки
  const card = new Card(item, "#element-template", handleCardClick);
  // Создаём карточку и возвращаем наружу
  return card.generateCard();
}


//Добавление карточек из массива
initialCards.forEach(function (item) {
  const cardElement = newCard(item);
  // Добавляем в DOM
  cardContainer.append(cardElement);
});


//Добавление карточек из  попапа
const submitCardFormtHandler = (e) => {
  e.preventDefault();

  const card = {
    name: formTitleInput.value,
    link: formLinkInput.value,
  };

  const element = newCard(card);
  cardContainer.prepend(element);

  closePopup(popupCardElement);

  e.target.reset();
};

function handleCardClick(name, link) {
  imageOpened.src = link;
  labelOpened.textContent = name;
  imageOpened.alt = name;
  openPopup(popupOpenImage);
}


formCard.addEventListener("submit", submitCardFormtHandler);
btnPopupProfile.addEventListener("click", openProfilePopup);
btnPopupCards.addEventListener("click", openCardslePopup);
formElement.addEventListener("submit", submitFormtHandler);


const formProfileValid = new FormValidator(config, formElement);
formProfileValid.enableValidation();

const popupCardValid = new FormValidator(config, popupCardElement);
popupCardValid.enableValidation();