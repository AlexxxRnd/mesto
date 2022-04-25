import { showPopup } from './index.js';
const popupImg = document.getElementById('popup_img');

export class Card {
    constructor(title, img, template) {
        this._title = title;
        this._img = img;
        this._template = template;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._template)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    createCard() {
        this._element = this._getTemplate();
        this._elPhoto = this._element.querySelector('.element__photo');
        this._elPhoto.src = this._img;
        this._element.querySelector('.element__title').textContent = this._title;
        this._elPhoto.alt = this._title;
        this._setEventListeners();
        return this._element;
    }

    _handleShowImg() {
        const imgSrc = document.querySelector('.popup__image');
        imgSrc.src = this._img;
        imgSrc.alt = this._title;
        document.querySelector('.popup__title-img').textContent = this._title;
        showPopup(popupImg);
    }

    _handleDeleteCard() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._element.querySelector('.element__delete-btn').addEventListener('click', () => {
            this._handleDeleteCard();
        });
        this._element.querySelector('.element__like-btn').addEventListener('click', function (evt) {
            evt.target.classList.toggle('element__like-btn_active');
        });
        this._elPhoto.addEventListener('click', () => {
            this._handleShowImg();
        });
    }
}