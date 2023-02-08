export default class Card {
  constructor({
    data,
    templateSelector,
    myId,
    handleCardClick,
    handleDeleteClick,
    handleLikes,
    handleLikesDelele,
  }) {
    this._name = data.name;
    this._alt = data.alt;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._id = data._id;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikes = handleLikes;
    this._handleLikesDelele = handleLikesDelele;
    this._likes = data.likes;
    this._myId = myId;
    this._idCard = data._id;
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
    this._likeCounter = this._element.querySelector(".element__counter");

    this._likeButton = this._element.querySelector(".element__button");
    this._trashButton = this._element.querySelector(".element__trash");
    this._isLiked();
    this._setEventListeners();

    // Добавим данные
    this._cardImage.src = this._link; 

    this._cardImage.alt = this._name; 

    this._element.querySelector(".element__title").textContent = this._name; 

    this._likeCounter.textContent = this._likes.length;

    // console.log(data)
    // Вернём элемент наружу
    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButtonClick();
    });

    this._trashButton.addEventListener("click", () => {
      this._handleDeleteClick();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }



  _isLiked() {
    if (
      this._likes.some((user) => {
        return user._id === this._myId;
      })
    ) {
       this._likeButton.classList.add("element__button_active");
    }
  }

  // Для кнопки like
  _handleLikeButtonClick() {
    if (this._likeButton.classList.contains("element__button_active")) {
      this._handleLikesDelele(this._idCard);
    } else {
      this._handleLikes(this._idCard);
    }
  }

  // Для кнопки trash
  _handleDeleteClick() {
    this._element.remove();
    this._element = null;
  }

  likeCards(data) {
    this._likes = data.likes;
    this._likeCounter.textContent = this._likes.length;
    this._likeButton.classList.toggle("element__button_active");
  }
}
//
