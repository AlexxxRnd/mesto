let editButton = document.querySelector('.profile__edit-btn');
let closeButton = document.querySelector('.popup__close-btn');
//let likeButton = document.querySelector('.element__like-btn');
let popupForm = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__subname');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');

let formElement = document.querySelector('.popup__form');

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

//function addLike() {
//    if (likeButton.classList.contains('element__like-btn_active')) {
//        likeButton.classList.remove('element__like-btn_active');
//    }
//    else {
//        likeButton.classList.add('element__like-btn_active');
//    }
//}

//likeButton.addEventListener('click', addLike);
editButton.addEventListener('click', showPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler); 