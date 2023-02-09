import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector)
    this._handleSubmit = handleSubmit
    this._form = this._popup.querySelector('.popup__form')
    
  }

  submitConfirm(deleteCard) {
    this._handleSubmit = deleteCard
  }
 
  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('click', (e) => {
      this._handleSubmit()
      e.preventDefault();
    })
  } 
}

