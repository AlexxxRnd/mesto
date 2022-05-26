export default class Card {
    constructor({ userId, data, handleCardClick, handleCardDelete, handleCardLike, handleCardUnlike }, template) {
        this._title = data.name;
        this._img = data.link;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._handleCardLike = handleCardLike;
        this._handleCardUnlike = handleCardUnlike;
        this._template = template;
        this._userId = userId;
        this._cardId = data._id;
        this._cardOwnerId = data.owner._id;
        this._likes = data.likes;
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
        this._likeBtn = this._element.querySelector('.element__like-btn');
        this._deleteBtn = this._element.querySelector('.element__delete-btn');
        this._elPhoto = this._element.querySelector('.element__photo');
        this._elPhoto.src = this._img;
        this._element.querySelector('.element__title').textContent = this._title;
        this._elPhoto.alt = this._title;
        this._element.querySelector('.element__like-count').textContent = this._likes.length;
        this._setEventListeners();
        this._isCardLiked();
        this._showDeleteBtn();
        return this._element;
    }

    _showDeleteBtn() {
        if (this._userId !== this._cardOwnerId) {
            this._deleteBtn.remove();
        }
    }

    deleteCard() {
        this._element.remove();
        this._element = null;
    }

    handleShowLikesCard(data) {
        this._likes = data.likes;
        this._element.querySelector('.element__like-count').textContent = this._likes.length;
        this._likeBtn.classList.toggle('element__like-btn_active');
    }

    _toggleLikeButton() {
        if (this._likeBtn.classList.contains('element__like-btn_active')) {
            this._handleCardUnlike(this._cardId);
        } else {
            this._handleCardLike(this._cardId);
        }
    }

    _isCardLiked() {
        if (this._likes.some((data) => {
            return this._userId === data._id;
        })) {
            this._likeBtn.classList.add('element__like-btn_active');
        }
    }

    _setEventListeners() {
        this._deleteBtn.addEventListener('click', () => {
            this._handleCardDelete(this._cardId);
        });
        this._likeBtn.addEventListener('click', () => {
            this._toggleLikeButton();
        });
        this._elPhoto.addEventListener('click', () => {
            this._handleCardClick((this._title, this._img));
        });
    }
}