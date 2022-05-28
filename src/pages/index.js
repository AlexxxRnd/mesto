import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/section.js';
import PopupWithImage from '../components/popupWithImage.js';
import PopupWithForm from '../components/popupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import {
    popupEditButton,
    popupAddButton,
    popupEditForm,
    popupAvatarForm,
    avatarButton,
    popupAddForm,
    objValidation,
    nameInput,
    jobInput,
} from '../scripts/constants.js';

let user_Id;

const section = new Section({
    renderer: (card) => {
        section.addItem(renderCard(card));
    },
}, '.elements');

const user = new UserInfo({ username: '.profile__name', job: '.profile__subname', avatar: '.profile__avatar' });

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-41',
    header: {
        authorization: '6e85cbb9-d07a-454d-87dc-f5801edbeaad',
        'Content-Type': 'application/json'
    }
});

Promise.all([api.getInitialCards(), api.getUserInfo()])
    .then(([initialCards, userData]) => {
        user.setUserInfo(userData);
        user_Id = userData._id;
        section.renderItems(initialCards.reverse());
    })
    .catch((error) => {
        console.log(`Ошибка: ${error}`);
    });

function renderCard(cardData) {
    const cardElement = new Card({
        userId: user_Id,
        data: cardData,
        handleCardClick: () => {
            openPopupImg.open(cardData.name, cardData.link);
        },
        handleCardDelete: (cardId) => {
            openDeleteConfirmPopup.open();
            openDeleteConfirmPopup.handleCallback(() => {
                openDeleteConfirmPopup.loading(true);
                api.deleteCard(cardId)
                    .then(() => {
                        openDeleteConfirmPopup.close();
                        cardElement.deleteCard();
                    })
                    .catch((error) => {
                        console.log(`Ошибка: ${error}`);
                    })
                    .finally(() => {
                        openDeleteConfirmPopup.loading(false);
                    })
            });
        },
        handleCardLike: (cardId) => {
            api.likeCard(cardId)
                .then((data) => {
                    cardElement.handleShowLikesCard(data);
                })
                .catch((error) => {
                    console.log(`Ошибка: ${error}`);
                });
        },
        handleCardUnlike: (cardId) => {
            api.unlikeCard(cardId)
                .then((data) => {
                    cardElement.handleShowLikesCard(data)
                })
                .catch((error) => {
                    console.log(`Ошибка: ${error}`);
                });
        }
    }, '#element-template');
    return cardElement.createCard();
};

const openPopupImg = new PopupWithImage('popup_img');

const openDeleteConfirmPopup = new PopupWithSubmit({ popupSelector: 'popup_delete' });

const openPopupEditAvatar = new PopupWithForm({
    popupSelector: 'popup_edit_avatar',
    handleFormSubmit: (data) => {
        openPopupEditAvatar.loading(true);
        api.setUserAvatar(data)
            .then((data) => {
                user.setUserInfo(data);
                openPopupEditAvatar.close();
            })
            .catch((error) => {
                console.log(`Ошибка: ${error}`);
            })
            .finally(() => {
                openPopupEditAvatar.loading(false);
            })
    }
});

const openPopupAddFrom = new PopupWithForm({
    popupSelector: 'popup_addCard',
    handleFormSubmit: (data) => {
        openPopupAddFrom.loading(true);
        api.addCard(data)
            .then((data) => {
                section.addItem(renderCard(data));
                openPopupAddFrom.close();
            })
            .catch((error) => {
                console.log(`Ошибка: ${error}`);
            })
            .finally(() => {
                openPopupAddFrom.loading(false);
            })
    }
});

const openPopupEditForm = new PopupWithForm({
    popupSelector: 'popup_editProfile',
    handleFormSubmit: (data) => {
        openPopupEditForm.loading(true);
        api.setUserInfo(data)
            .then((data) => {
                user.setUserInfo(data);
                openPopupEditForm.close();
            })
            .catch((error) => {
                console.log(`Ошибка: ${error}`);
            })
            .finally(() => {
                openPopupEditForm.loading(false);
            })
    }
});

const formEditValidator = new FormValidator(objValidation, popupEditForm);
const formAddValidator = new FormValidator(objValidation, popupAddForm);
const formAvatarValidator = new FormValidator(objValidation, popupAvatarForm);

formEditValidator.enableValidation();
formAddValidator.enableValidation();
formAvatarValidator.enableValidation();

openPopupImg.setEventListeners();
openPopupAddFrom.setEventListeners();
openPopupEditForm.setEventListeners();
openPopupEditAvatar.setEventListeners();
openDeleteConfirmPopup.setEventListeners();

popupAddButton.addEventListener('click', () => {
    formAddValidator.toggleButtonDisabled();
    formAddValidator.resetErrors();
    openPopupAddFrom.open();
});

popupEditButton.addEventListener('click', () => {
    formEditValidator.resetErrors();
    const userInfo = user.getUserInfo();
    nameInput.value = userInfo.name;
    jobInput.value = userInfo.job;
    openPopupEditForm.open();
});

avatarButton.addEventListener('click', () => {
    openPopupEditAvatar.open();
});