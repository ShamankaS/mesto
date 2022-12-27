let editButton = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('.popup');
let closeIcon = document.querySelector('.popup__close-icon');
let nameInput = document.querySelector('.popup__editform_type_name');
let jobInput = document.querySelector('.popup__editform_type_intro');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__intro');

function openPopup () {
    formElement.classList.add('popup_active');
    nameInput.value = `${profileName.textContent}`;
    jobInput.value = `${profileJob.textContent}`;
}

function closePopup () {
    formElement.classList.remove('popup_active');
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = `${nameInput.value}`;
    profileJob.textContent = `${jobInput.value}`;
    closePopup();
}

editButton.addEventListener('click', openPopup);

closeIcon.addEventListener('click', closePopup);

formElement.addEventListener('submit', handleFormSubmit);