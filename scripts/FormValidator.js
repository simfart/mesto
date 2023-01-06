export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputs = [...this._form.querySelectorAll(this._config.inputSelector)];
    this._btn = this._form.querySelector(this._config.submitButtonSelector);
  }

  _checkInputValidity = (input) => {
    const error = this._form.querySelector(`#${input.id}-error`);
    if (input.validity.valid) {
      error.textContent = "";
      error.classList.remove(this._config.errorClass);
      input.classList.remove(this._config.inputErrorClass);
    } else {
      error.textContent = input.validationMessage;
      error.classList.add(this._config.errorClass);
      input.classList.add(this._config.inputErrorClass);
    }
  };

  _toggleButton() {
    const isformValid = this._inputs.every((input) => input.validity.valid);
    if (isformValid) {
      this._btn.classList.remove(this._config.inactiveButtonClass);
      this._btn.disabled = "";
    } else {
      this._btn.classList.add(this._config.inactiveButtonClass);
      this._btn.disabled = "disable";
    }
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButton();

        this._form.addEventListener("reset", () => {
          setTimeout(() => {
            this._toggleButton();
          }, 0);
        });
      });
    });
  }
}
