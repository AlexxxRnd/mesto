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
    popupAddForm,
    objValidation,
    nameInput,
    jobInput,
} from '../scripts/constants.js';

let user_Id;

const section = new Section({ renderer: renderCard }, '.elements');

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
        section.renderItems(initialCards);
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    });

const user = new UserInfo({ username: '.profile__name', job: '.profile__subname', avatar: '.profile__avatar' });
const openPopupImg = new PopupWithImage('popup_img');

const openPopupAddFrom = new PopupWithForm({
    popupSelector: 'popup_addCard',
    handleFormSubmit: (data) => {
        //section.addItem(renderCard({ name: data.mestoInput, link: data.urlInput }));
        openPopupAddFrom.close();
    }
});

const openPopupEditForm = new PopupWithForm({
    popupSelector: 'popup_editProfile',
    handleFormSubmit: (data) => {
        user.setUserInfo(data);
        openPopupEditForm.close();
    }
});

const formEditValidator = new FormValidator(objValidation, popupEditForm);
const formAddValidator = new FormValidator(objValidation, popupAddForm);

function renderCard(cardData) {
    const cardElement = new Card({
        data: cardData,
        handleCardClick: () => {
            openPopupImg.open(cardData.name, cardData.link);
        },
    }, '#element-template');
    return section.addItem(cardElement.createCard());
}

formEditValidator.enableValidation();
formAddValidator.enableValidation();

openPopupImg.setEventListeners();
openPopupAddFrom.setEventListeners();
openPopupEditForm.setEventListeners();

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