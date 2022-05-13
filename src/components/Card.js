export default class Card {
    constructor({ data, handleCardClick }, template) {
        this._title = data.name;
        this._img = data.link;
        this._handleCardClick = handleCardClick;
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

    _handleDeleteCard() {
        this._element.remove();
        this._element = null;
    }

    _toggleLikeButton(evt) {
        evt.target.classList.toggle('element__like-btn_active');
    }

    _setEventListeners() {
        this._element.querySelector('.element__delete-btn').addEventListener('click', () => {
            this._handleDeleteCard();
        });
        this._element.querySelector('.element__like-btn').addEventListener('click', (evt) => {
           this._toggleLikeButton(evt);
        });
        this._elPhoto.addEventListener('click', () => {
            this._handleCardClick((this._title, this._img));
        });
    }
}