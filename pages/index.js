import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/section.js';
import PopupWithImage from '../components/popupWithImage.js';

import {
    popupEditButton,
    popupAddButton,
    popupEditForm,
    popupAddForm,
    profileForm,
    formElementAdd,
    profileName,
    profileJob,
    nameInput,
    jobInput,
    mestoInput,
    linkInput,
    objValidation,
    initialCards
} from '../scripts/constants.js';

const openPopupImg = new PopupWithImage('popup_img');

function renderCard(cardData) {
    const cardElement = new Card({
        data: cardData,
        handleCardClick: () => {
            openPopupImg.open(cardData.name, cardData.link);
            openPopupImg.setEventListeners();
        },
    }, '#element-template');
    section.addItem(cardElement.createCard());
}

const section = new Section({ items: initialCards, renderer: renderCard }, '.elements');
section.renderItems();

function handleAddImageFormSubmit() {
    renderCard([{ mestoInput, linkInput }]);
    //closePopup(popupAddForm);
};

function handleProfileFormSubmit(evt) {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    //closePopup(popupEditForm);
};

popupAddButton.addEventListener('click', () => {
    formElementAdd.reset();
    formAddValidator.toggleButtonDisabled();
    formAddValidator.resetErrors();
    //showPopup(popupAddForm);
});

popupEditButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    formEditValidator.resetErrors();
    //showPopup(popupEditForm);
});

profileForm.addEventListener('submit', handleProfileFormSubmit);
formElementAdd.addEventListener('submit', handleAddImageFormSubmit);

const formEditValidator = new FormValidator(objValidation, popupEditForm);
formEditValidator.enableValidation();
const formAddValidator = new FormValidator(objValidation, popupAddForm);
formAddValidator.enableValidation();