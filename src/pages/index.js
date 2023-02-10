import {
  btnPopupProfile,
  btnUpdateAvatar,
  formElement,
  nameInput,
  jobInput,
  popupCardElement,
  btnPopupCards,
  popupAvatarElement,
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
import PopupWithConfirmation from "../components/PopupWithConfirmation.js"

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
    userInfo.setUserInfo(resUserInfo)
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
const submitFormtHandler = (values) => {
  editProfileForm.renderLoading(true);
  api.editlUserInfo(values)
    .then((res) => {
      userInfo.setUserInfo(res)
    })
    .catch((err) => {
      console.log('здесь ошибка', err); // выведем ошибку в консоль
    })
    .finally(() => {
      editProfileForm.renderLoading(false)
    });

  editProfileForm.close();
};

const editProfileForm = new PopupWithForm(
  ".popup_add_profile",
  submitFormtHandler,
);
editProfileForm.setEventListeners();

//Ф-ция открытия попапа редактирования Аватара
const openAvatarPopup = () => {
  editAvatarForm.open();
  popupAvatardValid.resetValidation();
};

// обработчик формы Аватара
const submitAvatarHandler = (values) => {
  editAvatarForm.renderLoading(true);
  api.editAvatar(values)
    .then((res) => {
      userInfo.setUserInfo(res)
    })
    .catch((err) => {
      console.log('здесь ошибка', err); // выведем ошибку в консоль
    })
    .finally(() => {
      editAvatarForm.renderLoading(false)
    });
  editAvatarForm.close();
};

const editAvatarForm = new PopupWithForm(
  ".popup_update_avatar",
  submitAvatarHandler
);
editAvatarForm.setEventListeners();

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
            console.log(idCard)
          })
          .catch((err) => {
            console.log(err); // выведем ошибку в консоль
          });
      },

      handleCardDelete: (idCard) => {   // удаление лайков        
        popupConfirm.open()
        popupConfirm.submitConfirm(() => {
          api.deleteCards(idCard)
            .then(() => {
              card.deleteCards()
              popupConfirm.close();
            })
            .catch((err) => {
              console.log(err); // выведем ошибку в консоль
            });
        })
      }
    });
  // Создаём карточку и возвращаем наружу
  return card.generateCard();
}

const addCard = (item) => {
  defaultCardList.addItem(newCard(item));
};


//Добавление карточек из  попапа
const submitCardFormtHandler = (data) => {
  addCardForm.renderLoading(true);
  api.createNewCard(data)
    .then((data) => {
      addCard(data);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      addCardForm.renderLoading(false)
    });
  addCardForm.close();
};

// Попап добавление карточки
const addCardForm = new PopupWithForm(
  ".popup_add_card",
  submitCardFormtHandler
);
addCardForm.setEventListeners();


// Попап подтверждения
const popupConfirm = new PopupWithConfirmation(".popup_confirm")
popupConfirm.setEventListeners();


// Попап открытия картинки
const popupWithImage = new PopupWithImage(".popup_img-background");
popupWithImage.setEventListeners();

// Открытие попапа открытия картинки
function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

// Открытие попапа редактирования карточек
const openCardslePopup = () => {
  addCardForm.open();
  popupCardValid.resetValidation();
}

btnPopupProfile.addEventListener("click", openProfilePopup);
btnPopupCards.addEventListener("click", openCardslePopup);
btnUpdateAvatar.addEventListener("click", openAvatarPopup);


const formProfileValid = new FormValidator(config, formElement);
formProfileValid.enableValidation();

const popupCardValid = new FormValidator(config, popupCardElement);
popupCardValid.enableValidation();

const popupAvatardValid = new FormValidator(config, popupAvatarElement,);
popupAvatardValid.enableValidation();


