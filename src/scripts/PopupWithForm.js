import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector)
    this._handleSubmit = handleSubmit
    this._form = this._popup.querySelector('.popup__form')
    this._inputs = [...this._form.querySelectorAll('.popup__item')]
  }

  _getInputValues() {
    const values = {}

    this._inputs.forEach(input => {
      const name = input.name
      const value = input.value
      values[name] = value
    })

    return values

  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (e) => this._handleSubmit(e, this._getInputValues()))
  }

  close() {
    super.close()
    this._form.reset()
  }
}