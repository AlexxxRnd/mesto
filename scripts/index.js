import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const popupEditButton = document.querySelector('.profile__edit-btn');
const popupAddButton = document.querySelector('.profile__add-btn');
const popupCloseButton = document.querySelector('.popup__close-btn');
const popupCurrentList = document.querySelectorAll('.popup');

const popupEditForm = document.getElementById('popup_editProfile');
const popupAddForm = document.getElementById('popup_addCard');
const popupAddSavebtn = document.getElementById('popup_addCard_save-btn');

const profileForm = document.querySelector('.popup__form');
const formElementAdd = document.querySelector('.popup__form_add');
const cardsContainer = document.querySelector('.elements');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__subname');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const mestoInput = document.querySelector('.popup__input_type_mesto-name');
const linkInput = document.querySelector('.popup__input_type_url');


const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

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

function addCard(nameValue, linkValue) {
    const card = new Card(nameValue, linkValue, '#element-template');
    cardsContainer.prepend(card.createCard());
};

initialCards.forEach(function (element) {
    addCard(element.name, element.link);
});

function handleAddImageFormSubmit() {
    addCard(mestoInput.value, linkInput.value);
    closePopup(popupAddForm);
};

function handleEscButton(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    };
};

function disableSaveButton() {
    popupAddSavebtn.classList.add('popup__save-btn_disabled');
    popupAddSavebtn.setAttribute("disabled", "disabled");
}

function resetInputErrorText(popup) {
    popup.querySelectorAll('.popup__input-error').forEach(el => el.textContent = '');
    popup.querySelectorAll('.popup__input_type-error').forEach(el => el.classList.remove('popup__input_type-error'));
}

popupAddButton.addEventListener('click', () => {
    formElementAdd.reset();
    disableSaveButton();
    resetInputErrorText(popupAddForm);
    showPopup(popupAddForm);
});

popupEditButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    resetInputErrorText(popupEditForm);
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

const objValidation = {
    formElement: '.popup__form',
    inputElement: '.popup__input',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_disabled',
    inputErrorClass: 'popup__input_type-error',
};

const formEditValidator = new FormValidator(objValidation, popupEditForm);
formEditValidator.enableValidation();
const formAddValidator = new FormValidator(objValidation, popupAddForm);
formAddValidator.enableValidation();