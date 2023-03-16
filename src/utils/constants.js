const popupProfile = document.querySelector('.popup_type_profile');
const popupCard = document.querySelector('.popup_type_card');
const popupPicture = document.querySelector('.popup_type_picture');

const elementsSection = document.querySelector('.elements');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const profileForm = document.forms['profile-info'];
const cardForm = document.forms['card'];

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
    elementsSection,
    editButton,
    addButton,
    profileForm,
    cardForm,
    validationConfig
};