export const popupEditButton = document.querySelector('.profile__edit-btn');
export const popupAddButton = document.querySelector('.profile__add-btn');
export const popupCloseButton = document.querySelector('.popup__close-btn');
export const popupCurrentList = document.querySelectorAll('.popup');
export const popupEditForm = document.getElementById('popup_editProfile');
export const popupAddForm = document.getElementById('popup_addCard');
export const profileForm = document.querySelector('.popup__form');
export const formElementAdd = document.querySelector('.popup__form_add');
export const cardsContainer = document.querySelector('.elements');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__subname');
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_job');
export const mestoInput = document.querySelector('.popup__input_type_mesto-name');
export const linkInput = document.querySelector('.popup__input_type_url');
export const objValidation = {
    formElement: '.popup__form',
    inputElement: '.popup__input',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_disabled',
    inputErrorClass: 'popup__input_type-error',
};
export const initialCards = [
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