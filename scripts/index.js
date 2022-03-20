const editButton = document.querySelector('.profile__edit-btn');
const addButton = document.querySelector('.profile__add-btn');
const closeButtonEdit = document.querySelector('.popup__close-btn-edit');
const closeButtonAdd = document.querySelector('.popup__close-btn-add');
const closeButtonImg = document.querySelector('.popup__close-btn-img');
const imgSrc = document.querySelector('.popup__image');
const titleImgPopup = document.querySelector('.popup__title-img');

const popupEditForm = document.getElementById('popup_editProfile');
const popupAddForm = document.getElementById('popup_addCard');
const popupImg = document.getElementById('popup_img');

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
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEditForm);
}

function createCard(nameValue, linkValue) {
    const elementTemplate = document.querySelector('#element-template').content;
    const cardElement = elementTemplate.querySelector('.element').cloneNode(true);
    const elPhoto = cardElement.querySelector('.element__photo');

    elPhoto.src = linkValue;
    cardElement.querySelector('.element__title').textContent = nameValue;
    elPhoto.alt = nameValue;

    cardElement.querySelector('.element__like-btn').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like-btn_active');
    });

    cardElement.querySelector('.element__delete-btn').addEventListener('click', function (evt) {
        cardElement.remove();
    });

    elPhoto.addEventListener('click', function (evt) {
        imgSrc.src = linkValue;
        imgSrc.alt = nameValue;
        titleImgPopup.textContent = nameValue;
        showPopup(popupImg);
    });

    return cardElement
}

function addCard(nameValue, linkValue) {
    const cardElement = createCard(nameValue, linkValue)
    cardsContainer.prepend(cardElement);
}

function handleAddImageFormSubmit(evt) {
    evt.preventDefault();
    addCard(mestoInput.value, linkInput.value);
    formElementAdd.reset();
    closePopup(popupAddForm);
}

initialCards.forEach(function (element) {
    addCard(element.name, element.link);
})

addButton.addEventListener('click', () => {
    showPopup(popupAddForm);
});

editButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    showPopup(popupEditForm);
});

closeButtonAdd.addEventListener('click', () => {
    closePopup(popupAddForm)
});

closeButtonEdit.addEventListener('click', () => {
    closePopup(popupEditForm)
});

closeButtonImg.addEventListener('click', () => {
    closePopup(popupImg)
});

profileForm.addEventListener('submit', handleProfileFormSubmit);
formElementAdd.addEventListener('submit', handleAddImageFormSubmit);
