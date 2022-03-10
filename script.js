let editButton = document.querySelector(".profile__edit-btn");
let addButton = document.querySelector(".profile__add-btn");
let closeButton = document.querySelector(".popup__close-btn");
let popupForm = document.querySelector(".popup");

let nameInput = document.querySelector(".profile__name");
let jobInput = document.querySelector(".profile__subname");

function showpopup() {
    popupForm.classList.add('popup_opened');
    document.querySelector(".popup__input-name").value = nameInput.textContent;
    document.querySelector(".popup__input-job").value = jobInput.textContent;
}

function closepopup() {
    popupForm.classList.remove('popup_opened');
}

editButton.addEventListener('click', showpopup);
closeButton.addEventListener('click', closepopup);