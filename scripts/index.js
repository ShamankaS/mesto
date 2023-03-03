import {
    popupProfile, popupCard,
    nameInput, introInput,
    titleInput, linkInput,
    profileName, profileIntro,
    elementsSection,
    editButton, addButton, closeButtons,
    profileForm, cardForm,
    validationConfig
} from './constants.js';
import {
    openPopup,
    closePopup
} from './utils.js';
import dataCards from './cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

//создаётся рендер страницы по первичным данным из другого файла (стартовые 6 карточек)
dataCards.forEach(item => {
    const card = new Card(item, '#template');
    elementsSection.append(card.createCard());
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
    titleInput.value = '';
    linkInput.value = '';
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
    //создаются новые карточки по информации пользователя из формы
    const card = new Card(infoInput, '#template');
    //добавление созданных карточек в начало сетки карточек
    elementsSection.prepend(card.createCard());
    evt.target.reset();
    closePopup(popupCard);
});

const profileFormValidation = new FormValidator(validationConfig, profileForm);
profileFormValidation.enableValidation();
const cardFormValidation = new FormValidator(validationConfig, cardForm);
cardFormValidation.enableValidation();