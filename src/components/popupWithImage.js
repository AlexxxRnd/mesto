import Popup from './popup.js';

export default class PopupWithSubmit extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._link = this._popup.querySelector('.popup__image');
        this._title = this._popup.querySelector('.popup__title-img');
    }
    
    open(name, link) {
        this._link.src = link;
        this._link.alt = name;
        this._title.textContent = name;
        super.open();
    }
}