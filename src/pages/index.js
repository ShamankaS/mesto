import './index.css';
import {
    popupProfile, popupCard,
    nameInput, introInput,
    titleInput, linkInput,
    profileName, profileIntro,
    elementsSection,
    editButton, addButton, closeButtons,
    profileForm, cardForm,
    validationConfig
} from '../scripts/constants.js';
import {
    openPopup,
    closePopup,
    renderCard
} from '../scripts/utils.js';
import dataCards from '../scripts/cards.js';
import FormValidator from '../scripts/FormValidator.js';

dataCards.forEach(item => {
    elementsSection.append(renderCard(item, '#template'));
});

editButton.addEventListener('click', () => {
    openPopup(popupProfile);
    profileFormValidation.hideAllErrors();
    nameInput.value = `${profileName.textContent}`;
    introInput.value = `${profileIntro.textContent}`;
});

addButton.addEventListener('click', () => {
    openPopup(popupCard);
    cardFormValidation.hideAllErrors();
    cardForm.reset();
});

closeButtons.forEach(item => {
    const popup = item.closest('.popup');
    item.addEventListener('click', () => closePopup(popup));
});

profileForm.addEventListener('submit', evt => {
    evt.preventDefault();
    profileName.textContent = `${nameInput.value}`;
    profileIntro.textContent = `${introInput.value}`;
    evt.target.reset();
    closePopup(popupProfile);
});

cardForm.addEventListener('submit', evt => {
    evt.preventDefault();
    const infoInput = {
        name: titleInput.value,
        link: linkInput.value
    };
    elementsSection.prepend(renderCard(infoInput, '#template'));
    evt.target.reset();
    closePopup(popupCard);
});

const profileFormValidation = new FormValidator(validationConfig, profileForm);
profileFormValidation.enableValidation();
const cardFormValidation = new FormValidator(validationConfig, cardForm);
cardFormValidation.enableValidation();