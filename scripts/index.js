import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './section.js';
import {
    popupEditButton,
    popupAddButton,
    popupCloseButton,
    popupCurrentList,
    popupEditForm,
    popupAddForm,
    profileForm,
    formElementAdd,
    cardsContainer,
    profileName,
    profileJob,
    nameInput,
    jobInput,
    mestoInput,
    linkInput,
    objValidation,
    initialCards
} from './constants.js';

function renderCard(cardData) {
    const cardElement = new Card(cardData, '#element-template');
    section.addItem(cardElement.createCard());
}

const section = new Section({ items: initialCards, renderer: renderCard }, '.elements');
section.renderItems();

function handleAddImageFormSubmit() {
    renderCard([{ mestoInput, linkInput }]);
    closePopup(popupAddForm);
};

export function showPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscButton);
};

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscButton);
};

function handleProfileFormSubmit(evt) {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEditForm);
};

function handleEscButton(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    };
};

popupAddButton.addEventListener('click', () => {
    formElementAdd.reset();
    formAddValidator.toggleButtonDisabled();
    formAddValidator.resetErrors();
    showPopup(popupAddForm);
});

popupEditButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    formEditValidator.resetErrors();
    showPopup(popupEditForm);
});

popupCloseButton.addEventListener('click', function (evt) {
    closePopup(evt.target.closest('.popup'));
});

popupCurrentList.forEach(el => el.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
        closePopup(evt.currentTarget);
    }
}));

profileForm.addEventListener('submit', handleProfileFormSubmit);
formElementAdd.addEventListener('submit', handleAddImageFormSubmit);

const formEditValidator = new FormValidator(objValidation, popupEditForm);
formEditValidator.enableValidation();
const formAddValidator = new FormValidator(objValidation, popupAddForm);
formAddValidator.enableValidation();