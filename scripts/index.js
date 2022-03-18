const editButton = document.querySelector('.profile__edit-btn');
const addButton = document.querySelector('.profile__add-btn');
const closeButton = document.querySelector('.popup__close-btn');
const popupForm = document.querySelector('.popup');
const formElement = document.querySelector('.popup__form');

const cardsContainer = document.querySelector('.elements');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__subname');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');

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

function showPopup() {
    popupForm.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function closePopup() {
    popupForm.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
}

function showPopupCard() {
    document.getElementById('popup_addCard').classList.add('popup_opened');
}

function addCard(nameValue, linkValue) {
    //const CardContainer = document.createElement('article');
    // CardContainer.classList.add('element');

    // const DeleteButtonElement = document.createElement('button');
    // DeleteButtonElement.classList.add('element__delete-btn');
    // DeleteButtonElement.ariaLabel = 'Удалить';
    // DeleteButtonElement.type = 'button';

    // const imageElement = document.createElement('img');
    // imageElement.classList.add('element__photo');
    // imageElement.src = urlValue;

    // const infoElement = document.createElement('div');
    // infoElement.classList.add('element__info');

    // const nameElement = document.createElement('h2');
    // nameElement.classList.add('element__title');
    // nameElement.textContent = nameValue; 

    // const LikeButtonElement = document.createElement('button');
    // LikeButtonElement.classList.add('element__like-btn');
    // LikeButtonElement.ariaLabel = 'Оценить';
    // LikeButtonElement.type = 'button';

    // infoElement.append(nameElement, LikeButtonElement);
    // CardContainer.append(DeleteButtonElement, imageElement, infoElement);
    // cardsContainer.append(CardContainer);

    const elementTemplate = document.querySelector('#element-template').content;
    const cardElement = elementTemplate.querySelector('.element').cloneNode(true);

    cardElement.querySelector('.element__photo').src = linkValue;
    cardElement.querySelector('.element__title').textContent = nameValue;

    cardElement.querySelector('.element__like-btn').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like-btn_active');
    });

    cardsContainer.append(cardElement);
}

initialCards.forEach(function (element) {
    addCard(element.name, element.link);
})

addButton.addEventListener('click', showPopupCard);
editButton.addEventListener('click', showPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);