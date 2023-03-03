import {
    popupProfile,
    popupCard,
    nameInput,
    introInput,
    titleInput,
    linkInput,
    profileName,
    profileIntro,
    elementsSection,
    validationConfig
} from './constants.js';
import {
    openPopup,
    closePopup
} from './utils.js';
import dataCards from './cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

dataCards.forEach(item => {
    const card = new Card(item, '#template');
    elementsSection.append(card.createCard());
});

document.querySelector('.profile__edit-button').addEventListener('click', () => {
    openPopup(popupProfile);
    nameInput.value = `${profileName.textContent}`;
    introInput.value = `${profileIntro.textContent}`;
});

document.querySelector('.profile__add-button').addEventListener('click', () => {
    openPopup(popupCard);
});

document.querySelectorAll('.popup__close-button').forEach(item => {
    const popup = item.closest('.popup');
    item.addEventListener('click', () => closePopup(popup));
});

document.forms['profile-info'].addEventListener('submit', evt => {
    evt.preventDefault();
    profileName.textContent = `${nameInput.value}`;
    profileIntro.textContent = `${introInput.value}`;
    evt.target.reset();
    closePopup(popupProfile);
});

document.forms['card'].addEventListener('submit', evt => {
    evt.preventDefault();
    const infoInput = {
        name: titleInput.value,
        link: linkInput.value
    };
    const card = new Card(infoInput, '#template');
    elementsSection.prepend(card.createCard());
    evt.target.reset();
    closePopup(popupCard);
});

Array.from(document.querySelectorAll(validationConfig.formSelector)).forEach(item => {
    const form = new FormValidator(validationConfig, item);
    form.enableValidation();
});