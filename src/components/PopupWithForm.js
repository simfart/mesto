import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector)
    this._handleSubmit = handleSubmit
    this._form = this._popup.querySelector('.popup__form')
    this._inputs = [...this._form.querySelectorAll('.popup__item')]
    this._saveButton = this._form.querySelector(".popup__button")
    this._saveButtonFirstText = this._saveButton.textContent
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
    this._form.addEventListener('submit', (e) => {
      this._handleSubmit(this._getInputValues())
      e.preventDefault();
    })
  }
  renderLoading(isLoading) {
    if (isLoading) {
      this._saveButton.textContent = "Сохранение..."
    } else {
      this._saveButton.textContent = this._saveButtonFirstText
    }
  }

  close() {
    super.close()
    this._form.reset()
  }
}