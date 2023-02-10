export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector)
        this._saveButton = this._popup.querySelector(".popup__button")
    }

    _handleEscClose = (e) => {
        if (e.key === "Escape") {
            this.close();
        }
    }

    open() {
        this._popup.classList.add("popup_opened");
        document.addEventListener("keyup", this._handleEscClose);
        if (this._saveButton) {
            this._saveButtonFirstText = this._saveButton.textContent
        }
    }

    close() {
        this._popup.classList.remove("popup_opened");
        document.removeEventListener("keyup", this._handleEscClose);
    }

    setEventListeners() {
        this._popup.addEventListener('click', (e) => {
            if (e.target.classList.contains('popup__close')) {
                this.close()
            }
        })
        this._popup.addEventListener("mousedown", (e) => {
            if (this._popup && e.target === this._popup) {
                this.close()
            }
        })
    }

    renderLoading(isLoading) {
        if (isLoading) {
            this._saveButton.textContent = "Сохранение..."
        } else {
            this._saveButton.textContent = this._saveButtonFirstText
        }
    }
}