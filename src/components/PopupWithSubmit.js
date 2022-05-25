import Popup from './popup.js';

export default class PopupWithSubmit extends Popup {
    constructor({ popupSelector }) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
    }

    handleCallback(func) {
        this._handleSubmit = func;
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit();
        })
        super.setEventListeners();
    }
}