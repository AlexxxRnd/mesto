import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/section.js';
import PopupWithImage from '../components/popupWithImage.js';
import PopupWithForm from '../components/popupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import {
    popupEditButton,
    popupAddButton,
    popupEditForm,
    popupAddForm,
    mestoInput,
    linkInput,
    objValidation,
    initialCards,
    nameInput,
    jobInput,
} from '../scripts/constants.js';

const section = new Section({ items: initialCards, renderer: renderCard }, '.elements');
const user = new UserInfo({ username: '.profile__name', job: '.profile__subname' });
const openPopupImg = new PopupWithImage('popup_img');
const openPopupAddFrom = new PopupWithForm({
    popupSelector: 'popup_addCard',
    handleFormSubmit: () => {
        renderCard([{ mestoInput, linkInput }]);
        openPopupAddFrom.close();
    }
});

const openPopupEditForm = new PopupWithForm({
    popupSelector: 'popup_editProfile',
    handleFormSubmit: () => {
        user.setUserInfo(nameInput.value, jobInput.value);
        openPopupEditForm.close();
    }
});

const formEditValidator = new FormValidator(objValidation, popupEditForm);
const formAddValidator = new FormValidator(objValidation, popupAddForm);

formEditValidator.enableValidation();
formAddValidator.enableValidation();

openPopupImg.setEventListeners();
openPopupAddFrom.setEventListeners();
openPopupEditForm.setEventListeners();

section.renderItems();

function renderCard(cardData) {
    const cardElement = new Card({
        data: cardData,
        handleCardClick: () => {
            openPopupImg.open(cardData.name, cardData.link);
        },
    }, '#element-template');
    section.addItem(cardElement.createCard());
}

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