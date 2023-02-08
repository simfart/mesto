import {
  btnPopupProfile,
  formElement,
  nameInput,
  jobInput,
  popupCardElement,
  btnPopupCards,
  // cardContainer,
  config,
} from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import "./index.css";
import Api from "../components/Api.js"



const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: 'de757743-a43f-41c7-85c7-5187f80aa0ab',
    'Content-Type': 'application/json'
  }
});

let myId


Promise.all([api.getInitialUserInfo(), api.getInitialUserCards()])
  .then(([resUserInfo, resCards]) => {
    myId = resUserInfo._id
    userInfo.setUserInfo(resUserInfo.name, resUserInfo.about, resUserInfo.avatar)
    defaultCardList.renderItems(resCards)
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

  const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    aboutSelectors: ".profile__subtitle",
    avatar: ".profile__avatar"
  });
  
//Ф-ция открытия попапа редактирования имени
const openProfilePopup = () => {
  const { name, description } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = description;
  editProfileForm.open();
  formProfileValid.resetValidation();
};


// обработчик формы редактирования имени

// обработчик формы 

// обработчик формы 

// const submitFormtHandler = (e, values) => { 
//   userInfo.setUserInfo(values.avatarName, values.avatarDescription); 
//   aditProfileForm.close(); 
// }; 

const submitFormtHandler = (e, values) => {
  e.preventDefault();
  api.editlUserInfo(values)
    .then(() => {
      userInfo.setUserInfo(values.avatarName, values.avatarDescription, values.avatar);     
    })
    .catch((err) => {
      console.log('здесь ошибка', err); // выведем ошибку в консоль
    });
    
editProfileForm.close();
};


const editProfileForm = new PopupWithForm(
  ".popup_add_profile",
  submitFormtHandler,
);
editProfileForm.setEventListeners();


// Создание экземпляра класса Section
const defaultCardList = new Section(
  {
    renderer: (item) => {
      addCard(item);
    },
  },
  ".elements"
);



// Новая карточка
function newCard(data) {
  // Создадим экземпляр карточки
  const card = new Card(
    {
      data,
      templateSelector: "#element-template",
      myId,
      handleCardClick,
      handleDeleteClick: () => {   // удаление карточки
        api.deleteUserCards()
          .then(() => {
            card.handleDeleteClick()
          })
          .catch((err) => {
            console.log(err); // выведем ошибку в консоль
          });
      },
      handleLikes: (idCard) => {   // добавление лайков
        api.setLikes(idCard)
          .then((data) => {
            card.likeCards(data)                
          })
          .catch((err) => {
            console.log(err); // выведем ошибку в консоль
          });
       
      },
      handleLikesDelele: (idCard) => {   // удаление лайков
        api.deleteLikes(idCard)
          .then((data) => {
            card.likeCards(data)
          })
          .catch((err) => {
            console.log(err); // выведем ошибку в консоль
          });
      }

    });
  // Создаём карточку и возвращаем наружу
  return card.generateCard();
}

const addCard = (item) => {
  defaultCardList.addItem(newCard(item));

};


//Добавление карточек из  попапа
const submitCardFormtHandler = (e, data) => {
  e.preventDefault();
  api.createNewCard(data)
    .then((data) => {
      addCard(data);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  addCardForm.close();
};

const addCardForm = new PopupWithForm(
  ".popup_add_card",
  submitCardFormtHandler
);
addCardForm.setEventListeners();


const popupWithImage = new PopupWithImage(".popup_img-background");
popupWithImage.setEventListeners();

// Открытие попапа редактирования карточек
const openCardslePopup = () => {
  addCardForm.open();
  popupCardValid.resetValidation();
};

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

btnPopupProfile.addEventListener("click", openProfilePopup);
btnPopupCards.addEventListener("click", openCardslePopup);

const formProfileValid = new FormValidator(config, formElement);
formProfileValid.enableValidation();

const popupCardValid = new FormValidator(config, popupCardElement);
popupCardValid.enableValidation();



