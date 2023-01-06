import {openPopup} from './index.js'
import {imageOpened, labelOpened, popupOpenImage} from './constants.js'

export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._alt = data.alt;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }
  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    // вернём DOM-элемент карточки
    return cardElement;
  }

  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._setEventListeners();

    // Добавим данные
    this._element.querySelector(".element__photo").src = this._link;
    this._element.querySelector(".element__title").textContent = this._name;

    // Вернём элемент наружу
    return this._element;
  }
  // Открытие картинки
  _openImage() {
    imageOpened.src = this._link;
    labelOpened.textContent = this._name;
    imageOpened.alt = this._name;
    openPopup(popupOpenImage);
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__button")
      .addEventListener("click", () => {
        this._handleLikeButtonClick();
      });

    this._element
      .querySelector(".element__trash")
      .addEventListener("click", () => {
        this._handleDeleteButtonClick();
      });

    this._element
      .querySelector(".element__photo")
      .addEventListener("click", () => {
        this._openImage();
      });
  }

  // Для кнопки like
  _handleLikeButtonClick() {
    this._element
      .querySelector(".element__button")
      .classList.toggle("element__button_active");
  }

  // Для кнопки trash
  _handleDeleteButtonClick() {
    this._element.querySelector(".element__trash").closest(".element").remove();
  }
}
