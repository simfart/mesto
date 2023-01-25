import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    open(name, src) {

        this._imageOpened = this._popup.querySelector('.popup-image__photo');
        this._labelOpened = this._popup.querySelector('.popup-image__label');
        this._labelOpened.textContent = name;
        this._imageOpened.alt = name;
        this._imageOpened.src = src;
        super.open()
    }
}

