const popupProfile = document.querySelector('.popup_type_profile');
const popupCard = document.querySelector('.popup_type_card');
const popupPicture = document.querySelector('.popup_type_picture');
const nameInput = document.querySelector('#input_type_name');
const introInput = document.querySelector('#input_type_intro');
const titleInput = document.querySelector('#input_type_title');
const linkInput = document.querySelector('#input_type_link');
const profileName = document.querySelector('.profile__name');
const profileIntro = document.querySelector('.profile__intro');
const elementsSection = document.querySelector('.elements');
const cardTemplate = document.querySelector('#template');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active',
};

export {
    popupProfile,
    popupCard,
    popupPicture,
    nameInput,
    introInput,
    titleInput,
    linkInput,
    profileName,
    profileIntro,
    elementsSection,
    cardTemplate,
    popupImage,
    popupCaption,
    validationConfig
};