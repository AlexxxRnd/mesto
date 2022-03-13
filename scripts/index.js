const editButton = document.querySelector('.profile__edit-btn');
const closeButton = document.querySelector('.popup__close-btn');
const likeButton = document.querySelector('.element__like-btn');
const popupForm = document.querySelector('.popup');
const formElement = document.querySelector('.popup__form');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__subname');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');

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

function addLike() {
    if (likeButton.classList.contains('element__like-btn_active')) {
        likeButton.classList.remove('element__like-btn_active');
    }
    else {
        likeButton.classList.add('element__like-btn_active');
    }
}

likeButton.addEventListener('click', addLike);
editButton.addEventListener('click', showPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler); 