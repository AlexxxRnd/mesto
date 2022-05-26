import Popup from './popup.js';

export default class PopupWithSubmit extends Popup {
    constructor({ popupSelector }) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._deleteBtn = this._popup.querySelector('.popup__delete-confirm-btn');
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

    loading(state) {
        if (state) {
            this._deleteBtn.textContent = 'Удаление...'
        } else {
            this._deleteBtn.textContent = 'Да'
        }
    }
}