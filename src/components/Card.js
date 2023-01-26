export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._alt = data.alt;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    this._cardImage = this._element.querySelector(".element__photo");
    this._setEventListeners();

    // Добавим данные
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;

    // Вернём элемент наружу
    return this._element;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".element__button");
    this._trashButton = this._element.querySelector(".element__trash");

    this._likeButton.addEventListener("click", () => {
      this._handleLikeButtonClick();
    });

    this._trashButton.addEventListener("click", () => {
      this._handleDeleteButtonClick();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  // Для кнопки like
  _handleLikeButtonClick() {
    this._likeButton.classList.toggle("element__button_active");
  }

  // Для кнопки trash
  _handleDeleteButtonClick() {
    this._element.remove();
    this._element = null
  }
}
