import './index.css';
import {
    popupProfile, popupCard, popupPicture,
    elementsSection,
    editButton, addButton,
    profileForm, cardForm,
    validationConfig
} from '../utils/constants.js';
import dataCards from '../utils/cards.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';

const cardSection = new Section({
    items: dataCards.reverse(),
    renderer: (data) => {
        const card = renderCards(data);
        cardSection.addItem(card);
    }
}, elementsSection);

const renderCards = (data) => {
    const card = new Card(
        {
            name: data.name,
            link: data.link
        },
        '#template',
        openPicturePopup
    );
    return card.createCard();
};

function openPicturePopup(name, link) {
    imagePopup.open(name, link);
};

const imagePopup = new PopupWithImage(popupPicture);
imagePopup.setEventListeners();

cardSection.renderAll();

addButton.addEventListener('click', () => {
    popupAddingCard.open();
    cardFormValidation.hideAllErrors();
});

const popupAddingCard = new PopupWithForm(popupCard, submitCardForm);
popupAddingCard.setEventListeners();

function submitCardForm(data) {
    const card = renderCards(data);
    cardSection.addItem(card);
    popupAddingCard.close();
};

const cardFormValidation = new FormValidator(validationConfig, cardForm);
cardFormValidation.enableValidation();

editButton.addEventListener('click', () => {
    popupEditProfile.open();
    profileFormValidation.hideAllErrors();
    const info = infoProfile.getUserInfo();
    popupEditProfile.setInputValue(info);
});

const popupEditProfile = new PopupWithForm(popupProfile, submitEditForm);
popupEditProfile.setEventListeners();

function submitEditForm(data) {
    infoProfile.setUserInfo(data);
    popupEditProfile.close();
}

const infoProfile = new UserInfo(
    {
        nameSelector: '.profile__name',
        jobSelector: '.profile__intro'
    }
);

const profileFormValidation = new FormValidator(validationConfig, profileForm);
profileFormValidation.enableValidation();