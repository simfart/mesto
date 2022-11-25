const popupElement = Array.from(document.querySelectorAll(".popup"))
const popupProfileElement = document.querySelector(".popup_add_profile"); // Попап Редактирование имени
const popupCardElement = document.querySelector(".popup_add_card"); // Попап Редактирование карточек
const btnClose = Array.from(document.querySelectorAll(".popup__close")) // Кнопки закрытия попапов
const btnPopupProfile = document.querySelector(".profile__edit-button"); // Кнопка открытия попапа Редактирование имени
const btnPopupCards = document.querySelector(".profile__add-button"); // Кнопка открытия попапа Редактирование имени
const textProfileTitle = document.querySelector(".profile__title");
const textProfileSubtitle = document.querySelector(".profile__subtitle");

const formElement = document.querySelector('[name="formPopup"]');
const nameInput = formElement.querySelector(".popup__item_el_heading");
const jobInput = formElement.querySelector(".popup__item_el_subheading");


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
    if (item.classList.contains('popup_opened')) {
      popupElement[index].classList.remove('popup_opened');
    }
  })
}


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardContainer = document.querySelector('.elements')
const elemTemplate = document.querySelector('#element-template').content; //template из HTML в переменную

// Карточки при открытии страницы
initialCards.forEach(function (element) {
  const cardOpenedElement = elemTemplate.cloneNode(true);
  cardOpenedElement.querySelector('.element__title').textContent = element.name // значение title каждого перебираемого элемента;
  cardOpenedElement.querySelector('.element__photo').src = element.link // значение src каждого перебираемого элемента;
  cardContainer.append(cardOpenedElement) // добавляем в section elements
});

//Ф-ция открытия попапа редактирования карточек
const openCardslePopup = () => {
  popupCardElement.classList.add("popup_opened");
};

const cardElement = document.querySelector('[name="cardPopup"]');
const cardName = cardElement.querySelector(".popup__item_el_cardHeading");
const cardLink = cardElement.querySelector(".popup__item_el_cardLink");

// const allNewElements = Array.from(document.querySelectorAll(".element"))

function submitFormtHandlerCards(evt) {
  evt.preventDefault();
  const newCardElement = elemTemplate.cloneNode(true);
  let newCard = {
    name: cardName.value,
    link: cardLink.value
  }

  newCardElement.querySelector('.element__title').textContent = newCard.name
  newCardElement.querySelector('.element__photo').src = newCard.link
  cardContainer.insertBefore(newCardElement, cardContainer.firstChild)
  // allNewElements.push(newCard)

  cardName.value = '';
  cardLink.value = '';

  closePopup();
}

// deleteButton.addEventListener('click', function (evt) {
//   const eventTarget = evt.target;
//    eventTarget.remove();
// }); 


// deleteBtn.addEventListener('click',handleDeleteBtnClick)
// likeBtn.addEventListener('click',handleLikeBtnClick)














cardElement.addEventListener("submit", submitFormtHandlerCards);

btnPopupProfile.addEventListener("click", openProfilePopup);
btnPopupCards.addEventListener("click", openCardslePopup);
formElement.addEventListener("submit", submitFormtHandler);

const btnDelete = document.querySelector('.element__trash');
const btnsLike = document.querySelectorAll('.element__button');

for (let btn of btnsLike) {
  btn.addEventListener('click', (e) => {
    console.log(e.target.closest('.element'))
  // let delegateTarget = e.target.nextElementSibling
  // delegateTarget.classList.add('active');
  
  // for (let list of lists){
  // if(list!==delegateTarget){
  // list.classList.remove('active')
  // }
  // }
  
  
  })
  }

const handleLikeBtnClick = (e) => {
  console.log(e.target.closest('.element'))
  }

  const handleDeleteBtnClick = (e) => {
    console.log(e.target)
  }
  
btnClose.forEach(function (elem) {
  elem.addEventListener("click", function () {
    closePopup()
  });
});