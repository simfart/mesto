const popupElement = Array.from(document.querySelectorAll(".popup"));
const btnClose = Array.from(document.querySelectorAll(".popup__close")); // Кнопки закрытия попапов

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
const cardtemplate = document
  .querySelector("#element-template")
  .content.querySelector(".element");
const formCard = document.querySelector('[name="cardPopup"]');
const formTitleInput = formCard.querySelector(".popup__item_el_cardHeading");
const formLinkInput = formCard.querySelector(".popup__item_el_cardLink");

// Переменные для попапа изображения
const popupOpenImage = document.querySelector('[name="imagePopup"]');
const imageOpened = popupOpenImage.querySelector(".popup-image__photo");
const labelOpened = popupOpenImage.querySelector(".popup-image__label");

//Ф-ция открытия попапа редактирования имени
const openProfilePopup = () => {
  popupProfileElement.classList.add("popup_opened");
  nameInput.value = ("value", textProfileTitle.textContent);
  jobInput.value = ("value", textProfileSubtitle.textContent);
};

// обработчик формы
function submitFormtHandler(evt) {
  evt.preventDefault();
  textProfileTitle.textContent = nameInput.value;
  textProfileSubtitle.textContent = jobInput.value;
  closePopup();
}

//Закрытие всех попапов
const closePopup = () => {
  popupElement.forEach((item, index) => {
    if (item.classList.contains("popup_opened")) {
      popupElement[index].classList.remove("popup_opened");
    }
  });
};

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// Создаем новую карточку
function createCard(item) {
  const card = cardtemplate.cloneNode(true);
  const cardLink = card.querySelector(".element__photo");
  const cardTitle = card.querySelector(".element__title");

  const cardLikeBtn = card.querySelector(".element__button");
  const cardDeleteBtn = card.querySelector(".element__trash");

  cardLikeBtn.addEventListener("click", handleLikeButtonClick);
  cardDeleteBtn.addEventListener("click", handleDeleteButtonClick);

  cardLink.src = item.link;
  cardTitle.textContent = item.name;

  cardLink.addEventListener("click", openImage);

  return card;
}

// Открытие картинки
const openImage = (e) => {
  popupOpenImage.classList.add("popup_opened");
  imageOpened.src = e.target.src;
  labelOpened.textContent =
    e.target.parentNode.querySelector(".element__title").textContent;
};

// Для кнопки like
const handleLikeButtonClick = (e) => {
  e.target.classList.toggle("element__button_active");
};

// Для кнопки trash
const handleDeleteButtonClick = (e) => {
  e.target.closest(".element").remove();
};

//Добавляем карточки из массива
initialCards.forEach(function (item) {
  const element = createCard(item);
  cardContainer.append(element);
});

// Открытие попапа редактирования карточек
const openCardslePopup = () => {
  popupCardElement.classList.add("popup_opened");
};

// Для добавленния карточки
const submitCardFormtHandler = (e) => {
  e.preventDefault();

  const card = {
    name: formTitleInput.value,
    link: formLinkInput.value,
  };

  const element = createCard(card);
  cardContainer.prepend(element);

  formTitleInput.value = "";
  formLinkInput.value = "";

  closePopup();
};

formCard.addEventListener("submit", submitCardFormtHandler);
btnPopupProfile.addEventListener("click", openProfilePopup);
btnPopupCards.addEventListener("click", openCardslePopup);
formElement.addEventListener("submit", submitFormtHandler);
btnClose.forEach(function (elem) {
  elem.addEventListener("click", function () {
    closePopup();
  });
});
