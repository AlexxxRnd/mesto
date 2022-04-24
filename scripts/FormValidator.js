export class FormValidator {
    constructor(objValidation, formEl) {
        this._objValidation = objValidation;
        this._form = formEl;
        this._inputList = Array.from(this._form.querySelectorAll(this._objValidation.inputElement));
        this._buttonElement = this._form.querySelector(this._objValidation.submitButtonSelector);
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._objValidation.inputErrorClass);
        errorElement.textContent = errorMessage;
    };

    _hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._objValidation.inputErrorClass);
        errorElement.textContent = '';
    };

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _setEventListeners() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.setAttribute("disabled", "disabled");
            this._buttonElement.classList.add(this._objValidation.inactiveButtonClass);
        } else {
            this._buttonElement.removeAttribute("disabled", "disabled");
            this._buttonElement.classList.remove(this._objValidation.inactiveButtonClass);
        };
    };

    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    };
}