import Popup from './popup.js';

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._saveBtn = this._popup.querySelector('.popup__save-btn');
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        })
        return this._formValues;
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        })
        super.setEventListeners();
    }

    close() {
        this._form.reset();
        super.close();
    }

    loading(state) {
        if (state) {
            this._saveBtn.textContent = 'Сохранение...'
        } else {
            this._saveBtn.textContent = 'Сохранить'
        }
    }
}