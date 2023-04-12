import './index.css';
import {
    popupProfile, popupCard, popupPicture, popupAvatar, popupDeleteCard,
    elementsSection,
    editButton, addButton, profileAvatar, avatarForm,
    profileForm, cardForm,
    validationConfig
} from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirm from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

let userId;

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
    headers: {
        authorization: "2d12bc16-8679-4620-86db-cdf1b3dc4893",
        "Content-Type": "application/json"
    }
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
        userId = userData._id;
        infoProfile.setUserInfo(userData);
        cardSection.renderAll(cards.reverse());
    })
    .catch(evt => console.warn(evt));

const cardSection = new Section({
    renderer: (data) => {
        const card = renderCards(data);
        cardSection.addItem(card);
    }
}, elementsSection);

const renderCards = (data) => {
    const card = new Card(
        {
            name: data.name,
            link: data.link,
            likes: data.likes,
            userId,
            id: data._id,
            ownerId: data.owner._id
        },
        '#template',
        function (name, link) {
            imagePopup.open(name, link);
        },
        async () => {
            try {
                card.like();
                card.setLikesCount(await api.putLike(data._id));
            } catch (evt) {
                console.warn(evt);
            }
        },
        async () => {
            try {
                card.dislike();
                card.setLikesCount(await api.deleteLike(data._id));
            } catch (evt) {
                console.warn(evt);
            }
        },
        (evt) => {
            PopupConfirmDeleteCard.open();
            PopupConfirmDeleteCard.submitHandler(async () => {
                try {
                    await api.deleteCard(card._id);
                    evt.target.parentElement.remove();
                    PopupConfirmDeleteCard.close();
                } catch (evt) {
                    console.warn(evt);
                }
            });
        }
    );
    return card.createCard();
};

const imagePopup = new PopupWithImage(popupPicture);
imagePopup.setEventListeners();

addButton.addEventListener('click', () => {
    popupAddingCard.open();
    cardFormValidation.hideAllErrors();
});

const popupAddingCard = new PopupWithForm(popupCard, submitCardForm);
popupAddingCard.setEventListeners();

async function submitCardForm(data) {
    popupAddingCard.renderLoading(true, 'Сохранение...');
    try {
        const card = renderCards(await api.addNewCard(data));
        cardSection.addItem(card);
        popupAddingCard.close();
    } catch (evt) {
        console.warn(evt);
    } finally {
        popupAddingCard.renderLoading(false);
    }
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

async function submitEditForm(data) {
    popupEditProfile.renderLoading(true, 'Сохранение...');
    try {
        infoProfile.setUserInfo(await api.setUserInfo(data));
        popupEditProfile.close();
    } catch (evt) {
        console.warn(evt);
    } finally {
        popupEditProfile.renderLoading(false);
    }
};

const infoProfile = new UserInfo(
    {
        nameSelector: '.profile__name',
        jobSelector: '.profile__intro',
        avatarSelector: '.profile__avatar'
    }
);

const profileFormValidation = new FormValidator(validationConfig, profileForm);
profileFormValidation.enableValidation();

const popupEditAvatar = new PopupWithForm(popupAvatar, submitEditAvatar);
popupEditAvatar.setEventListeners();

profileAvatar.addEventListener('click', () => {
    popupEditAvatar.open();
    popupEditAvatarValidation.hideAllErrors();
});

async function submitEditAvatar(data) {
    popupEditAvatar.renderLoading(true, 'Сохранение...');
    try {
        infoProfile.setUserInfo(await api.changeAvatar(data));
        popupEditAvatar.close();
    } catch (evt) {
        console.warn(evt);
    } finally {
        popupEditAvatar.renderLoading(false);
    }
};

const popupEditAvatarValidation = new FormValidator(validationConfig, avatarForm);
popupEditAvatarValidation.enableValidation();

const PopupConfirmDeleteCard = new PopupConfirm(popupDeleteCard);
PopupConfirmDeleteCard.setEventListeners();