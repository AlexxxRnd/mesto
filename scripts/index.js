const popupEditButton = document.querySelector('.profile__edit-btn');
const popupAddButton = document.querySelector('.profile__add-btn');
const popupCloseButton = document.querySelector('.popup__close-btn');

//const errorTextList = document.querySelectorAll('.popup__input-error');
//const inputTypeErrorList = document.querySelectorAll('.popup__input_type-error');

const popupCurrentList = document.querySelectorAll('.popup');
const imgSrc = document.querySelector('.popup__image');
const titleImgPopup = document.querySelector('.popup__title-img');
const elementTemplate = document.querySelector('#element-template').content;
const popupEditForm = document.getElementById('popup_editProfile');
const popupAddForm = document.getElementById('popup_addCard');
const popupImg = document.getElementById('popup_img');
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

function showPopup(popup) {
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

function createCard(nameValue, linkValue) {
    const cardElement = elementTemplate.querySelector('.element').cloneNode(true);
    const elPhoto = cardElement.querySelector('.element__photo');

    elPhoto.src = linkValue;
    cardElement.querySelector('.element__title').textContent = nameValue;
    elPhoto.alt = nameValue;

    cardElement.querySelector('.element__like-btn').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like-btn_active');
    });
    cardElement.querySelector('.element__delete-btn').addEventListener('click', () => {
        cardElement.remove();
    });
    elPhoto.addEventListener('click', () => {
        imgSrc.src = linkValue;
        imgSrc.alt = nameValue;
        titleImgPopup.textContent = nameValue;
        showPopup(popupImg);
    });

    return cardElement;
};

function addCard(nameValue, linkValue) {
    cardsContainer.prepend(createCard(nameValue, linkValue));
};

function handleAddImageFormSubmit() {
    addCard(mestoInput.value, linkInput.value);
    closePopup(popupAddForm);
};

function handleEscButton(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    };
};

initialCards.forEach(function (element) {
    addCard(element.name, element.link);
});

function disableSaveButton() {
    popupAddSavebtn.classList.add('popup__save-btn_disabled');
    popupAddSavebtn.setAttribute("disabled", "disabled");
}

// function resetInputErrorText() {
//     errorTextList.forEach(el => el.textContent = '');
//     inputTypeErrorList.forEach(el => el.classList.remove('popup__input_type-error'));
// }

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

// cardsContainer.addEventListener('click', function (evt) {
//     if (evt.target.classList.contains('element__like-btn')) {
//         evt.target.classList.toggle('element__like-btn_active');
//     };
//     if (evt.target.classList.contains('element__delete-btn')) {
//         evt.target.closest('.element').remove();
//     }
//     if (evt.target.classList.contains('element__photo')) {
//         const thisEl = evt.target.closest('.element');
//         const thisElTitle = thisEl.querySelector('.element__title');
//         imgSrc.src = thisEl.querySelector('.element__photo').src;
//         imgSrc.alt = thisElTitle.textContent;
//         titleImgPopup.textContent = thisElTitle.textContent;
//         showPopup(popupImg);
//     }
// });