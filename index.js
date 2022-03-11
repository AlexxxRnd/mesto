let editButton = document.querySelector(".profile__edit-btn");
let closeButton = document.querySelector(".popup__close-btn");
let popupForm = document.querySelector(".popup");

let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__subname");
let nameInput = document.querySelector(".popup__input-name");
let jobInput = document.querySelector(".popup__input-job");

let formElement = document.querySelector(".popup__form");

function showpopup() {
    popupForm.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function closepopup() {
    popupForm.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closepopup();
}

editButton.addEventListener('click', showpopup);
closeButton.addEventListener('click', closepopup);
formElement.addEventListener('submit', formSubmitHandler); 