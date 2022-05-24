import Popup from './popup.js';

export default class PopupWithSubmit extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        //this._form = this._popup.querySelector('.popup__form');
    }

    // setEventListeners() {
    //     super.setEventListeners();
    //     this._form.addEventListener('click', (evt) => {
    //         evt.preventDefault();
    //         this._handleFormSubmit();
    //     });
    // }
}